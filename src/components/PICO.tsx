// components/PICO.tsx
export default function PICO() {
    return (
        <section className="section">
            <div className="container">
                <div className="card p-6 sm:p-8 card-hover">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <span className="kicker">Marco de pregunta clínica</span>
                            <h2 className="h2 mt-2">Desglose PICO</h2>
                            <div className="underbar" />
                        </div>
                    </div>

                    <div className="mt-6 table-wrap">
                        <table className="w-full text-sm">
                            <caption className="sr-only">
                                PICO: Población, Intervención, Comparación, Resultado y Contexto/Guías
                            </caption>
                            <thead className="bg-[--color-brand-50]/60">
                                <tr className="text-left text-neutral-600">
                                    <th className="py-3 px-4" scope="col">Elemento</th>
                                    <th className="py-3 px-4" scope="col">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-[--color-brand-50]/30">
                                    <th scope="row" className="py-3 px-4 font-medium">P (Población)</th>
                                    <td className="py-3 px-4">Mujeres jóvenes (≥14 años) en edad reproductiva.</td>
                                </tr>
                                <tr className="odd:bg-[--color-brand-50]/30">
                                    <th scope="row" className="py-3 px-4 font-medium">I (Intervención)</th>
                                    <td className="py-3 px-4">Uso de métodos <em>hormonales</em> y <em>no hormonales</em>.</td>
                                </tr>
                                <tr className="odd:bg-[--color-brand-50]/30">
                                    <th scope="row" className="py-3 px-4 font-medium">C (Comparación)</th>
                                    <td className="py-3 px-4">Hormonales vs. no hormonales.</td>
                                </tr>
                                <tr className="odd:bg-[--color-brand-50]/30">
                                    <th scope="row" className="py-3 px-4 font-medium">O (Resultado)</th>
                                    <td className="py-3 px-4">Eficacia, efectos adversos y <strong>elegibilidad médica</strong> (seguridad).</td>
                                </tr>
                                <tr className="odd:bg-[--color-brand-50]/30">
                                    <th scope="row" className="py-3 px-4 font-medium">Contexto/Guías</th>
                                    <td className="py-3 px-4">Basado en OMS, ACOG y MinSalud Colombia.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <a href="/metodos" className="btn btn-ghost">Explorar métodos</a>
                        <a href="/test" className="btn text-white gradient-cta shadow hover:brightness-105">Empezar test</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
