import { Head, Link, usePage } from '@inertiajs/react';
import { Shield, Lock, Smartphone, Users, ChevronRight, Github } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dashboard, login, register } from '@/routes';

const features = [
    {
        icon: Shield,
        title: 'Secure by default',
        description:
            'Password policies enforced in production: minimum 12 characters, mixed case, numbers, symbols, and breach detection.',
    },
    {
        icon: Smartphone,
        title: 'Two-factor authentication',
        description:
            'TOTP-based 2FA with QR code setup, manual key entry, and single-use recovery codes.',
    },
    {
        icon: Lock,
        title: 'Microsoft SSO',
        description:
            'Sign in with a Microsoft account via OAuth2. Accounts are automatically created or linked on first login.',
    },
    {
        icon: Users,
        title: 'Roles & permissions',
        description:
            'Granular access control powered by Spatie Laravel Permission. Assign roles and gate any route or action.',
    },
];

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">

                {/* ── Navbar ── */}
                <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FDFDFC]/80 backdrop-blur-md dark:border-white/5 dark:bg-[#0a0a0a]/80">
                    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                        <div className="flex items-center gap-2.5">
                            <div className="flex size-7 items-center justify-center rounded-md bg-[#1b1b18] dark:bg-white">
                                <AppLogoIcon className="size-4 fill-current text-white dark:text-black" />
                            </div>
                            <span className="text-sm font-semibold tracking-tight">
                                GRP System
                            </span>
                        </div>

                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild size="sm">
                                    <Link href={dashboard()}>
                                        Dashboard
                                        <ChevronRight className="ml-1 size-3.5" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={login()}>Log in</Link>
                                    </Button>
                                    {canRegister && (
                                        <Button asChild size="sm">
                                            <Link href={register()}>
                                                Get started
                                            </Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* ── Hero ── */}
                <main className="flex flex-1 flex-col">
                    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center lg:py-36">
                        <Badge
                            variant="outline"
                            className="mb-6 gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                        >
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            Laravel · React · Inertia
                        </Badge>

                        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight lg:text-6xl">
                            Authentication that{' '}
                            <span className="relative whitespace-nowrap">
                                <span className="relative">just works</span>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 418 42"
                                    className="absolute left-0 top-full mt-1 w-full fill-[#1b1b18]/10 dark:fill-white/10"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.58 14.287-.2.302-.2.484-.024.651.177.136 6.merge.438 16.84-3.948 51.37-21.032 60.43-22.034 67.557-17.185 7.093 4.82 7.208 15.51-.27 23.234-9.15 9.334-27.82 12.792-66.13 14.143-6.45.224-4.483 1.137 3.65 1.6 30.112 1.7 53.534-1.855 69.02-10.36z" />
                                </svg>
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-balance text-lg text-[#1b1b18]/60 dark:text-[#EDEDEC]/60">
                            A production-ready Laravel starter with two-factor authentication,
                            Microsoft SSO, role-based access control, and a modern React frontend.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            {auth.user ? (
                                <Button asChild size="lg" className="rounded-full px-8">
                                    <Link href={dashboard()}>
                                        Go to dashboard
                                        <ChevronRight className="ml-1.5 size-4" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    {canRegister && (
                                        <Button asChild size="lg" className="rounded-full px-8">
                                            <Link href={register()}>
                                                Create an account
                                                <ChevronRight className="ml-1.5 size-4" />
                                            </Link>
                                        </Button>
                                    )}
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full px-8"
                                    >
                                        <Link href={login()}>Sign in</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </section>

                    {/* ── Features grid ── */}
                    <section className="border-t border-black/5 bg-[#f5f5f0] dark:border-white/5 dark:bg-[#111111]">
                        <div className="mx-auto max-w-6xl px-6 py-20">
                            <div className="mb-12 text-center">
                                <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
                                    Everything you need, out of the box
                                </h2>
                                <p className="mt-3 text-[#1b1b18]/55 dark:text-[#EDEDEC]/55">
                                    Skip the boilerplate and focus on building your product.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {features.map(({ icon: Icon, title, description }) => (
                                    <div
                                        key={title}
                                        className="rounded-2xl border border-black/8 bg-[#FDFDFC] p-6 dark:border-white/8 dark:bg-[#1a1a1a]"
                                    >
                                        <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#1b1b18]/5 dark:bg-white/5">
                                            <Icon className="size-5 text-[#1b1b18] dark:text-[#EDEDEC]" />
                                        </div>
                                        <h3 className="mb-1.5 text-sm font-semibold">{title}</h3>
                                        <p className="text-sm leading-relaxed text-[#1b1b18]/55 dark:text-[#EDEDEC]/55">
                                            {description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── CTA banner ── */}
                    {!auth.user && canRegister && (
                        <section className="mx-auto w-full max-w-6xl px-6 py-20">
                            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-black/8 bg-[#1b1b18] px-10 py-12 text-center text-white dark:border-white/8 dark:bg-white dark:text-[#1b1b18] sm:flex-row sm:text-left">
                                <div>
                                    <h2 className="text-xl font-bold">Ready to get started?</h2>
                                    <p className="mt-1 text-sm text-white/60 dark:text-[#1b1b18]/60">
                                        Create your account and explore the full feature set.
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="shrink-0 rounded-full border-white/20 bg-transparent px-8 text-white hover:bg-white/10 dark:border-black/20 dark:text-[#1b1b18] dark:hover:bg-black/10"
                                >
                                    <Link href={register()}>
                                        Create an account
                                        <ChevronRight className="ml-1.5 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Footer ── */}
                <footer className="border-t border-black/5 dark:border-white/5">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-[#1b1b18]/40 dark:text-[#EDEDEC]/40">
                        <div className="flex items-center gap-2">
                            <AppLogoIcon className="size-3.5 fill-current" />
                            <span>GRP System</span>
                        </div>
                        <span>Built with Laravel &amp; React</span>
                    </div>
                </footer>

            </div>
        </>
    );
}
