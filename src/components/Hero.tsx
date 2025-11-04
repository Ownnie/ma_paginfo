import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero relative py-16 sm:py-24">
            {/* blobs decorativos */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-60 w-60 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(100px 100px at 70% 30%, var(--color-brand-300), transparent)" }} />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-60 w-60 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(120px 120px at 30% 70%, var(--color-brand-200), transparent)" }} />

            <div className="container grid gap-8 sm:grid-cols-2 items-center">
                <div>
                    <span className="kicker">Plataforma educativa</span>
                    <h1 className="h1 mt-2">Elige tu método con confianza</h1>
                    <p className="lead mt-3">
                        Compara métodos hormonales y no hormonales, entiende pros y contras, y recibe una orientación
                        personalizada basada en guías clínicas. Fácil, claro y pensado para ti.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link href="/test" className="btn text-white gradient-cta shadow hover:brightness-105">
                            Hacer el test
                        </Link>
                        <Link href="/metodos" className="btn btn-ghost">Ver métodos</Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="rounded-2xl bg-[--color-brand-50] p-8 shadow-sm border border-[--color-brand-100] card-hover">
                        <p className="text-sm text-neutral-700">
                            Basado en los <strong>Criterios Médicos de Elegibilidad</strong> (OMS/ACOG/MinSalud).
                            Recomendaciones orientativas categorizadas por seguridad y adecuación clínica.
                        </p>
                        <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <li className="badge-icon"><span aria-hidden>✨</span> Hormonales</li>
                            <li className="badge-icon"><span aria-hidden>✅</span> No hormonales</li>
                            <li className="badge-icon"><span aria-hidden>🍼</span> Posparto</li>
                            <li className="badge-icon"><span aria-hidden>⚠️</span> Condiciones sensibles</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
