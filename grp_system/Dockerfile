# =============================================================================
# Stage 1 — Frontend build
# Compila los assets de React/Vite en /public/build
# =============================================================================
FROM node:22-alpine AS frontend

WORKDIR /app

# Copiar manifiestos primero para aprovechar el cache de capas
COPY package.json package-lock.json ./

# Instalar dependencias de Node incluyendo opcionales para Linux
RUN npm ci --include=optional

# Copiar el resto del código fuente necesario para el build
COPY resources/ resources/
COPY public/ public/
COPY vite.config.ts tsconfig.json ./

# Generar los assets de producción
RUN npm run build


# =============================================================================
# Stage 2 — PHP dependencies
# Instala vendor/ con Composer sin devDependencies
# =============================================================================
FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

# Instalar dependencias de producción sin autoload optimizado todavía
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --ignore-platform-reqs

# Copiar el código fuente y generar el autoloader optimizado
COPY . .
RUN composer dump-autoload --optimize --no-dev


# =============================================================================
# Stage 3 — Runtime
# Imagen final liviana con PHP-FPM + Nginx
# =============================================================================
FROM php:8.4-fpm-alpine AS runtime

# --- Extensiones PHP necesarias para Laravel ---
RUN apk add --no-cache \
        nginx \
        supervisor \
        curl \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libzip-dev \
        icu-dev \
        oniguruma-dev \
        mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache

# --- Configuración de OPcache para producción ---
COPY docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# --- Configuración de PHP-FPM ---
COPY docker/php/fpm-pool.conf /usr/local/etc/php-fpm.d/www.conf

# --- Configuración de Nginx ---
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# --- Supervisor: gestiona PHP-FPM + Nginx + queue worker en un solo contenedor ---
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /var/www/html

# Copiar vendor del stage de Composer
COPY --from=composer /app/vendor ./vendor

# Copiar código fuente de la aplicación
COPY . .

# Copiar assets compilados del stage de frontend
COPY --from=frontend /app/public/build ./public/build

# Permisos correctos para Laravel
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Copiar entrypoint y darle permisos de ejecución
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
