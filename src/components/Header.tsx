"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 header-glass">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="inline-block h-7 w-7 rounded-full bg-[--color-brand-500]" />
                    <span className="font-bold">Asesor Anticonceptivo</span>
                </Link>

                <nav className="hidden sm:flex items-center gap-6 text-sm">
                    <Link href="/metodos" className="nav-link">Métodos</Link>
                    <Link href="/test" className="nav-link">Test</Link>
                    <Link href="/comparar" className="nav-link">Compara tus Métodos Anticonceptivos</Link>
                    <Link href="/privacidad" className="nav-link">Privacidad</Link>
                </nav>

                <Link href="/test" className="btn text-white gradient-cta text-sm shadow hover:brightness-105">
                    Hacer el test
                </Link>
            </div>
            <div className="header-accent" aria-hidden="true" />
        </header>
    );
}
