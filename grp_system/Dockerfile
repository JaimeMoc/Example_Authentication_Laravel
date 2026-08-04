# =============================================================================
# Stage 1 — PHP dependencies
# Instala vendor/ con Composer sin devDependencies
# =============================================================================
FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --ignore-platform-reqs

COPY . .
RUN composer dump-autoload --optimize --no-dev


# =============================================================================
# Stage 2 — Frontend build
# Los archivos de Wayfinder (resources/js/routes, resources/js/actions)
# están commiteados en el repo, por lo que Vite no necesita ejecutar
# php artisan durante el build. El plugin solo se activa en modo dev.
# =============================================================================
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY resources/ resources/
COPY public/ public/
COPY vite.config.ts tsconfig.json ./

RUN npm run build


# =============================================================================
# Stage 3 — Runtime
# Imagen final con PHP-FPM + Nginx gestionados por Supervisor
# =============================================================================
FROM php:8.4-fpm-alpine AS runtime

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

COPY docker/php/opcache.ini      /usr/local/etc/php/conf.d/opcache.ini
COPY docker/php/fpm-pool.conf    /usr/local/etc/php-fpm.d/www.conf
COPY docker/nginx/default.conf   /etc/nginx/http.d/default.conf
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /var/www/html

COPY --from=composer /app/vendor ./vendor
COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
