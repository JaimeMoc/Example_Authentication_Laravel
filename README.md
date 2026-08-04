# GRP System — Authentication Starter

A production-ready authentication starter built with **Laravel 13**, **React 19**, and **Inertia.js**. Covers the full authentication surface: standard login, Microsoft SSO, two-factor authentication, role-based access control, and a complete user settings panel.

![Login1](/Login1.png)
![Login2](/Login2.png)
![Inicio](/Inicio.png)
![Registro](/Registro.png)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 13 · PHP 8.3+ |
| Auth engine | Laravel Fortify |
| Frontend | React 19 · TypeScript · Inertia.js |
| Styling | Tailwind CSS v4 · Radix UI |
| SSO | Laravel Socialite · Microsoft (Azure AD / Entra ID) |
| Roles & permissions | Spatie Laravel Permission |
| API auth | Laravel Sanctum |
| Type-safe routes | Laravel Wayfinder |

---

## Features

### Authentication
- Email / password login and registration
- Password reset via email
- Email verification
- Sign in with Microsoft (OAuth2 / Azure Entra ID) — accounts are created or linked automatically on first login
- Logout from other devices (session management)

### Two-factor authentication (2FA)
- TOTP-based 2FA via any authenticator app (Google Authenticator, Authy, etc.)
- QR code setup and manual key entry
- OTP confirmation required before 2FA is activated
- Single-use recovery codes

### Security
- In production: passwords require 12+ characters, mixed case, numbers, symbols, and are verified against known breach databases
- Rate limiting on login (5 attempts/min per email + IP) and 2FA challenge (5 attempts/min per session)
- Destructive database commands blocked in production
- CSRF protection via `PreventRequestForgery` middleware (Laravel 13)
- Cache unserialization hardened (`serializable_classes: false`)

### User settings panel
- Edit profile (name, email)
- Change password
- Enable / disable 2FA
- View and regenerate recovery codes
- Manage active sessions
- Appearance preferences (light / dark / system)

### Access control
- Role and permission management via Spatie Laravel Permission
- Assignable roles and gates for any route or action

---

## Requirements

- PHP >= 8.3
- Composer
- Node.js >= 20 & npm
- MySQL 8+ or compatible database
- Microsoft Azure app registration (for SSO — optional)

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/JimmyMoc/Example_Authentication_Laravel.git
cd Example_Authentication_Laravel/grp_system

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Set up environment
cp .env.example .env
php artisan key:generate

# 5. Run migrations
php artisan migrate

# 6. Build frontend assets
npm run build
```

---

## Microsoft SSO setup (optional)

1. Register an application in [Azure Portal](https://portal.azure.com) → Azure Active Directory → App registrations.
2. Add a redirect URI: `http://localhost:8000/auth/microsoft2/callback`
3. Create a client secret under **Certificates & secrets**.
4. Add the following to your `.env`:

```env
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret
MICROSOFT_REDIRECT_URI=http://localhost:8000/auth/microsoft2/callback
```

---

## Development

```bash
# Start all services concurrently (server, queue, logs, Vite)
composer run dev
```

This runs `php artisan serve`, `php artisan queue:listen`, `php artisan pail`, and `npm run dev` in parallel.

---

## Project structure

```
grp_system/
├── app/
│   ├── Actions/Fortify/       # User creation and password reset logic
│   ├── Concerns/              # Shared validation rule traits
│   ├── Http/
│   │   ├── Controllers/       # Settings controllers (profile, password, 2FA, security)
│   │   ├── Middleware/        # HandleAppearance, HandleInertiaRequests
│   │   └── Requests/          # Form requests with validation rules
│   ├── Models/                # User model (2FA, roles, Microsoft SSO)
│   └── Providers/             # AppServiceProvider, FortifyServiceProvider
├── config/
│   ├── fortify.php            # Auth features configuration
│   └── auth.php               # Guards and providers
├── resources/js/
│   ├── pages/
│   │   ├── auth/              # Login, register, 2FA challenge, password reset, verify email
│   │   └── settings/          # Profile, password, 2FA, sessions, appearance
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # use-two-factor-auth, use-appearance, etc.
│   └── layouts/               # App layout, settings layout
└── routes/
    ├── web.php                # Main routes + Microsoft OAuth
    └── settings.php           # Settings routes
```

---

## Docker Image

La imagen oficial está disponible en **Docker Hub**:  
`mocjaim27/grp_system-app:latest`

### Ejecución rápida
```bash
docker pull mocjaim27/grp_system-app:latest
docker run -d -p 8000:8000 mocjaim27/grp_system-app:latest
```

## License

MIT
