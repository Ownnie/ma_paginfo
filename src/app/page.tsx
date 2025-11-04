import Hero from "@/components/Hero";
import Link from "next/link";
import PICO from "@/components/PICO";

export default function Page() {
  return (
    <>
      <Hero />

      {/* Objetivo y por qué importa */}
      <section className="section section-soft">
        <div className="container grid gap-6 sm:grid-cols-2 items-start">
          <div className="card p-6 card-hover">
            <span className="kicker">Para mujeres jóvenes</span>
            <h2 className="h2 mt-2">Objetivo del proyecto</h2>
            <div className="underbar" />
            <p className="mt-4 text-neutral-700">
              Brindar información clara y confiable sobre métodos anticonceptivos y una orientación personalizada
              para apoyar decisiones informadas. La plataforma es móvil, accesible y centrada en mujeres jóvenes.
            </p>
          </div>

          <div className="card p-6 card-hover">
            <span className="kicker">Educación + comparación</span>
            <h2 className="h2 mt-2">¿Por qué es necesario?</h2>
            <div className="underbar" />
            <p className="mt-4 text-neutral-700">
              Muchas usuarias no reciben explicaciones comparables entre opciones hormonales y no hormonales. Aquí
              encontrarás eficacia, efectos adversos y elegibilidad médica resumidos y comparables.
            </p>
          </div>
        </div>
      </section>

      {/* PICO */}
      <PICO />

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-hover">
            <div>
              <h2 className="h2">¿Lista para una recomendación personalizada?</h2>
              <p className="text-neutral-700 mt-2">
                Responde preguntas breves (posparto/lactancia, migraña, tabaquismo, HTA, etc.).
              </p>
            </div>
            <Link
              href="/test"
              className="btn text-white gradient-cta shadow hover:brightness-105"
            >
              Hacer el test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
