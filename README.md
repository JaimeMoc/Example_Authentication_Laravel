# Example Authentication Laravel

Este proyecto es un **ejemplo de autenticación en Laravel** que combina:
- [Laravel Breeze](https://laravel.com/docs/breeze) para scaffolding de autenticación.
- [Laravel Sanctum](https://laravel.com/docs/sanctum) para manejo de tokens y protección de APIs.
- **OAuth2 con Microsoft** para inicio de sesión federado con cuentas corporativas (Azure AD / Microsoft Identity Platform).

---

## 🚀 Características principales
- Registro y login básico con Breeze.
- Autenticación de usuarios vía Sanctum (SPA / API).
- Integración con OAuth2 de Microsoft para login corporativo.
- Estructura modular y extensible para proyectos académicos o institucionales.

---

## 📂 Estructura del proyecto
- `grp_system/` → núcleo del sistema.
- `vendor/` → dependencias instaladas vía Composer.
- `composer.json` → definición de librerías y dependencias.
- Frontend en **TypeScript** para integración SPA.

---

## ⚙️ Requisitos
- PHP >= 8.1
- Composer
- Node.js & npm/yarn
- Laravel 10.x
- Cuenta de Microsoft Azure AD para configurar OAuth2

---

## 🔑 Configuración de OAuth2 con Microsoft
1. Registra tu aplicación en [Azure Portal](https://portal.azure.com).
2. Obtén:
   - `CLIENT_ID`
   - `CLIENT_SECRET`
   - `REDIRECT_URI`
3. Configura las variables en tu archivo `.env`:

```env
MICROSOFT_CLIENT_ID=tu_client_id
MICROSOFT_CLIENT_SECRET=tu_client_secret
MICROSOFT_REDIRECT_URI=http://localhost:8000/auth/callback
