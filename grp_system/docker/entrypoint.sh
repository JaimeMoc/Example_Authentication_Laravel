#!/bin/sh
set -e

echo "==> Waiting for database..."
until php artisan db:monitor --databases=mysql 2>/dev/null; do
  sleep 2
done

echo "==> Running migrations..."
php artisan migrate --force --no-interaction

echo "==> Caching config and routes..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "==> Setting storage permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

echo "==> Starting services..."
exec "$@"
