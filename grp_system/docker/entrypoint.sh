#!/bin/sh
set -e

# ── 1. Crear .env desde variables de entorno si no existe ──────────────────
if [ ! -f /var/www/html/.env ]; then
    echo "==> Generating .env from environment variables..."
    cp /var/www/html/.env.example /var/www/html/.env

    # Reemplazar valores clave con las variables de entorno del contenedor
    sed -i \
        -e "s|^APP_NAME=.*|APP_NAME=\"${APP_NAME:-GRP System}\"|" \
        -e "s|^APP_ENV=.*|APP_ENV=${APP_ENV:-production}|" \
        -e "s|^APP_KEY=.*|APP_KEY=${APP_KEY}|" \
        -e "s|^APP_DEBUG=.*|APP_DEBUG=${APP_DEBUG:-false}|" \
        -e "s|^APP_URL=.*|APP_URL=${APP_URL:-http://localhost}|" \
        -e "s|^DB_CONNECTION=.*|DB_CONNECTION=${DB_CONNECTION:-mysql}|" \
        -e "s|^# DB_HOST=.*|DB_HOST=${DB_HOST:-db}|" \
        -e "s|^# DB_PORT=.*|DB_PORT=${DB_PORT:-3306}|" \
        -e "s|^# DB_DATABASE=.*|DB_DATABASE=${DB_DATABASE:-grp_system}|" \
        -e "s|^# DB_USERNAME=.*|DB_USERNAME=${DB_USERNAME:-grp_user}|" \
        -e "s|^# DB_PASSWORD=.*|DB_PASSWORD=${DB_PASSWORD:-secret}|" \
        -e "s|^CACHE_STORE=.*|CACHE_STORE=${CACHE_STORE:-database}|" \
        -e "s|^SESSION_DRIVER=.*|SESSION_DRIVER=${SESSION_DRIVER:-database}|" \
        -e "s|^QUEUE_CONNECTION=.*|QUEUE_CONNECTION=${QUEUE_CONNECTION:-database}|" \
        -e "s|^MAIL_MAILER=.*|MAIL_MAILER=${MAIL_MAILER:-log}|" \
        -e "s|^MAIL_HOST=.*|MAIL_HOST=${MAIL_HOST:-127.0.0.1}|" \
        -e "s|^MAIL_PORT=.*|MAIL_PORT=${MAIL_PORT:-2525}|" \
        /var/www/html/.env
fi

# ── 2. Esperar a que la base de datos esté lista ────────────────────────────
echo "==> Waiting for database..."
until php artisan db:show > /dev/null 2>&1; do
    echo "   DB not ready, retrying in 3s..."
    sleep 3
done

# ── 3. Migraciones ──────────────────────────────────────────────────────────
echo "==> Running migrations..."
php artisan migrate --force --no-interaction

# ── 4. Caché de configuración ───────────────────────────────────────────────
echo "==> Caching config, routes and views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# ── 5. Permisos ─────────────────────────────────────────────────────────────
echo "==> Setting storage permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

echo "==> Starting services..."
exec "$@"
