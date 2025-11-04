"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * Página única de Privacidad y Tratamiento de Datos
 * - Processing local-only (sin backend).
 * - Botones para DESCARGAR y BORRAR respuestas/consentimiento almacenados en este navegador.
 * - Texto en lenguaje claro + notas legales (Colombia).
 */

export default function Page() {
    return (
        <section className="section">
            <div className="container max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <span className="kicker">Legal</span>
                    <h1 className="h1 mt-2">Privacidad y Tratamiento de Datos</h1>
                    <div className="underbar" />
                    <p className="mt-3 text-neutral-700">
                        Este sitio procesa tu información <strong>exclusivamente en tu navegador</strong>.
                        No enviamos tus respuestas a ningún servidor. Aquí encontrarás qué datos se usan,
                        con qué finalidades y cómo ejercer tus derechos.
                    </p>
                </div>

                {/* Resumen */}
                <Card title="Resumen rápido">
                    <ul className="mt-2 space-y-2 text-sm">
                        <Item>Procesamiento <strong>local-only</strong> (sin base de datos ni terceros).</Item>
                        <Item>No vendemos ni compartimos datos.</Item>
                        <Item>Sin cookies de seguimiento ni analítica de terceros.</Item>
                        <Item>Puedes <strong>descargar</strong> y <strong>borrar</strong> tus datos locales en un clic.</Item>
                        <Item>La información es educativa y <strong>no reemplaza una consulta médica</strong>.</Item>
                    </ul>
                </Card>

                {/* Datos y finalidades */}
                <Card title="Datos que tratamos y finalidades">
                    <dl className="mt-2">
                        <KVP
                            k="Datos tratados"
                            v="Respuestas del test (edad, posparto/lactancia, condiciones clínicas relevantes como migraña con aura, etc.) y tu decisión de consentimiento."
                        />
                        <KVP
                            k="Finalidad"
                            v="Generar una recomendación orientativa de método anticonceptivo basada en guías (MEC/OMS/ACOG) y recordar tu consentimiento."
                        />
                        <KVP k="No recolectamos" v="Nombre, correo, ubicación precisa, ni identificadores únicos." />
                        <KVP k="Base de licitud" v="Tu consentimiento libre e informado (Ley 1581 de 2012, Colombia)." />
                    </dl>
                </Card>

                {/* Almacenamiento */}
                <Card title="Almacenamiento, retención y seguridad">
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>
                            <strong>Ubicación:</strong> <code>localStorage</code> de tu navegador. No hay copias en servidores.
                        </li>
                        <li>
                            <strong>Retención:</strong> mientras no borres los datos o limpies el navegador. Puedes eliminarlos cuando quieras.
                        </li>
                        <li>
                            <strong>Seguridad:</strong> usamos HTTPS y buenas prácticas. Evita equipos públicos para información sensible.
                        </li>
                    </ul>
                </Card>

                {/* Derechos y contacto */}
                <Card title="Tus derechos (Habeas Data)">
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li><strong>Conocer y acceder</strong> a la información tratada.</li>
                        <li><strong>Rectificar o actualizar</strong> datos inexactos.</li>
                        <li><strong>Suprimir</strong> tus datos y <strong>revocar</strong> el consentimiento.</li>
                    </ul>
                    <p className="mt-2 text-sm text-neutral-600">
                        Para consultas puedes escribir a los creadores de este proyecto
                        Este texto es informativo y no constituye asesoría legal.
                    </p>
                </Card>

                {/* Menores */}
                <Card title="Menores de edad">
                    <p className="text-sm">
                        Esta plataforma está dirigida a personas de <strong>14 años o más</strong>. Si eres menor de 14 años,
                        no debes usar el servicio.
                    </p>
                </Card>

                {/* Cambios */}
                <Card title="Cambios a esta política">
                    <dl className="mt-2">
                        <KVP k="Última actualización" v={new Date().toISOString().slice(0, 10)} />
                        <KVP k="Cómo te avisaremos" v="Publicaremos la versión vigente en esta página." />
                    </dl>
                </Card>

                {/* Herramientas del usuario */}
                <PrivacyTools />

                {/* CTA */}
                <div className="mt-8 card p-6 sm:p-7">
                    <h2 className="h2">¿Tienes dudas?</h2>
                    <div className="underbar" />
                    <p className="mt-2 text-sm">
                        Escríbenos a{" "}
                        <a className="underline" href="mailto:contacto@tu-dominio.com">contacto@tu-dominio.com</a>.
                    </p>
                    <div className="mt-4">
                        <Link href="/" className="btn btn-ghost">Volver al inicio</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ====================== Subcomponentes ====================== */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="card p-6 sm:p-7 mt-6">
            <h2 className="h2">{title}</h2>
            <div className="underbar" />
            <div className="mt-2">{children}</div>
        </div>
    );
}

function Item({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2">
            <span className="mt-1">✅</span>
            <span>{children}</span>
        </li>
    );
}

function KVP({ k, v }: { k: string; v: string }) {
    return (
        <div className="flex items-start gap-3">
            <dt className="min-w-44 text-sm font-medium text-neutral-600">{k}</dt>
            <dd className="text-sm">{v}</dd>
        </div>
    );
}

/* =================== Herramientas (localStorage) =================== */

function PrivacyTools() {
    const [busy, setBusy] = useState<"export" | "clear" | null>(null);
    const [info, setInfo] = useState<string | null>(null);

    // Claves que vamos a gestionar (ajusta si cambian)
    const KEY_PREFIXES = useMemo(
        () => [/^aa_/, /^mec_/, /^answers_/, /^test_/, /^consent/i],
        []
    );

    const matches = (k: string) => KEY_PREFIXES.some((r) => r.test(k));

    const collect = () => {
        const out: Record<string, unknown> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)!;
            if (matches(key)) {
                try {
                    out[key] = JSON.parse(localStorage.getItem(key) || "null");
                } catch {
                    out[key] = localStorage.getItem(key);
                }
            }
        }
        return out;
    };

    const handleExport = async () => {
        setBusy("export");
        try {
            const data = collect();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "mis-datos-asesor-anticonceptivo.json";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            setInfo("Archivo descargado con tus datos locales.");
        } finally {
            setBusy(null);
        }
    };

    const handleClear = async () => {
        if (!confirm("¿Seguro que quieres borrar tus respuestas locales?")) return;
        setBusy("clear");
        try {
            const keys: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)!;
                if (matches(key)) keys.push(key);
            }
            keys.forEach((k) => localStorage.removeItem(k));
            setInfo("Se eliminaron respuestas y preferencias guardadas en este navegador.");
        } finally {
            setBusy(null);
        }
    };

    return (
        <div className="mt-8 card p-6 sm:p-7 bg-[--color-brand-50] border-[--color-brand-100]">
            <h2 className="h2">Tus controles</h2>
            <div className="underbar" />
            <p className="mt-2 text-sm">
                Gestiona la información guardada <strong>solo</strong> en este navegador.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                    className="btn btn-ghost"
                    onClick={handleExport}
                    disabled={busy === "export"}
                >
                    {busy === "export" ? "Exportando…" : "Descargar mis datos"}
                </button>
                <button
                    className="btn text-white gradient-cta shadow hover:brightness-105 disabled:opacity-50"
                    onClick={handleClear}
                    disabled={busy === "clear"}
                >
                    {busy === "clear" ? "Borrando…" : "Borrar mis datos"}
                </button>
            </div>
            {info && <p className="mt-3 text-sm text-neutral-700">{info}</p>}
        </div>
    );
}
