import Link from "next/link";

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-surface-alt px-4 py-12 sm:px-6 md:px-8">
            <div className="relative flex flex-col items-center w-full max-w-xl">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[320px] h-[180px] sm:w-[420px] sm:h-[220px] opacity-60 pointer-events-none select-none" aria-hidden>
                    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <ellipse cx="210" cy="110" rx="200" ry="90" fill="url(#cloudGradient)" />
                        <defs>
                            <linearGradient id="cloudGradient" x1="0" y1="0" x2="420" y2="220" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#e0e7ef" stopOpacity="0.7" />
                                <stop offset="1" stopColor="#f8fafc" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 className="text-[7rem] sm:text-[9rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-brand-primaryAccent to-brand-text/60 leading-none select-none drop-shadow-lg">404</h1>
                <p className="mt-2 text-2xl sm:text-3xl font-semibold text-brand-text text-center">Sorry, we couldn't find that page.</p>
                <p className="mt-3 text-base text-brand-textMuted text-center max-w-md">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-primaryAccent px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-brand-primaryAccent/60">
                    Go back home
                </Link>
            </div>
        </div>
    );
}
