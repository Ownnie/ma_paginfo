// app/metodos/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MethodKey } from "@/types/mec";
import methods from "@/data/mec.methods.json";

// ------- Metadatos de cada método (nombre, slug, tags, descripción corta) -------
type MethodMeta = {
    name: string;
    slug: string;
    tags: ("hormonal" | "no-hormonal" | "larc" | "emergencia")[];
    blurb: string;
};

const METHOD_META: Record<MethodKey, MethodMeta> = {
    DIU_CU: {
        name: "DIU de Cobre",
        slug: "diu-cobre",
        tags: ["no-hormonal", "larc"],
        blurb: "Anticoncepción no hormonal de larga duración. También útil como anticoncepción de emergencia.",
    },
    DIU_LNG: {
        name: "DIU hormonal (LNG)",
        slug: "diu-hormonal",
        tags: ["hormonal", "larc"],
        blurb: "Libera levonorgestrel localmente. Larga duración, sangrados más ligeros en muchas usuarias.",
    },
    IMPLANTE_3A: {
        name: "Implante subdérmico (3 años)",
        slug: "implante-3-anos",
        tags: ["hormonal", "larc"],
        blurb: "Varilla subdérmica con progestágeno. Alta eficacia por 3 años.",
    },
    IMPLANTE_5A: {
        name: "Implante subdérmico (5 años)",
        slug: "implante-5-anos",
        tags: ["hormonal", "larc"],
        blurb: "Varillas subdérmicas con progestágeno. Alta eficacia por 5 años.",
    },
    AMPD_MENSUAL: {
        name: "Inyectable mensual",
        slug: "inyectable-mensual",
        tags: ["hormonal"],
        blurb: "Inyección con hormonas combinadas en esquema mensual.",
    },
    AMPD_3M: {
        name: "Inyectable trimestral",
        slug: "inyectable-trimestral",
        tags: ["hormonal"],
        blurb: "Inyección solo progestina cada 3 meses (DMPA).",
    },
    PPS: {
        name: "Píldora solo progestina",
        slug: "pildora-solo-progestina",
        tags: ["hormonal"],
        blurb: "Píldora diaria sin estrógeno. Útil si AHC no es elegible.",
    },
    AHC_PILDORA: {
        name: "Píldora combinada (estrógeno + progestina)",
        slug: "pildora-combinada",
        tags: ["hormonal"],
        blurb: "Píldora diaria con estrógeno y progestina; necesita más criterios de elegibilidad.",
    },
    AHC_PARCHE: {
        name: "Parche combinado",
        slug: "parche-combinado",
        tags: ["hormonal"],
        blurb: "Parche semanal con estrógeno y progestina.",
    },
    AHC_ANILLO: {
        name: "Anillo vaginal combinado",
        slug: "anillo-combinado",
        tags: ["hormonal"],
        blurb: "Anillo mensual con estrógeno y progestina.",
    },
    BARRERA: {
        name: "Métodos de barrera",
        slug: "barrera",
        tags: ["no-hormonal"],
        blurb: "Preservativo externo/interno, diafragma, espermicida. También protegen contra ITS (preservativo).",
    },
    EC: {
        name: "Postday",
        slug: "anticoncepcion-de-emergencia",
        tags: ["emergencia"],
        blurb: "Para uso después de una relación sin protección. Opción no hormonal: DIU-Cu.",
    },
};

// ------- Filtros visibles en UI -------
type FilterKey = "all" | "hormonal" | "no-hormonal" | "larc" | "emergencia";

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "hormonal", label: "Hormonales" },
    { key: "no-hormonal", label: "No hormonales" },
    { key: "larc", label: "LARC" },
    { key: "emergencia", label: "Emergencia" },
];

// ------- Componentes auxiliares -------
function Badge({ children }: { children: React.ReactNode }) {
    return <span className="badge">{children}</span>;
}

function MethodCard({ keyName }: { keyName: MethodKey }) {
    const meta = METHOD_META[keyName];
    return (
        <Link
            href={`/metodos/${meta.slug}`}
            className="block card p-5 sm:p-6 card-hover h-full"
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-semibold">{meta.name}</h3>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[--color-brand-400]" aria-hidden />
            </div>
            <p className="mt-2 text-sm text-neutral-700">{meta.blurb}</p>

            <div className="mt-3 flex flex-wrap gap-2">
                {meta.tags.includes("hormonal") && <Badge>Hormonal</Badge>}
                {meta.tags.includes("no-hormonal") && <Badge>No hormonal</Badge>}
                {meta.tags.includes("larc") && <Badge>Larga duración (LARC)</Badge>}
                {meta.tags.includes("emergencia") && <Badge>Emergencia</Badge>}
            </div>

            <div className="mt-4 text-sm text-[--color-brand-700]">Ver detalle →</div>
        </Link>
    );
}

// ------- Página principal -------
export default function Page() {
    const [active, setActive] = useState<FilterKey>("all");
    const [q, setQ] = useState("");

    // index rápido por búsqueda
    const idx = useMemo(() => {
        const map = new Map<MethodKey, string>();
        (Object.keys(METHOD_META) as MethodKey[]).forEach((k) => {
            const m = METHOD_META[k];
            map.set(k, `${m.name} ${m.blurb} ${m.tags.join(" ")}`.toLowerCase());
        });
        return map;
    }, []);

    function matchesFilters(m: MethodKey) {
        if (active === "all") return true;
        return METHOD_META[m].tags.includes(active as any);
    }

    function matchesQuery(m: MethodKey) {
        if (!q.trim()) return true;
        const hay = idx.get(m) ?? "";
        return hay.includes(q.toLowerCase().trim());
    }

    return (
        <section className="section section-soft">
            <div className="container max-w-6xl">
                <div className="mb-6">
                    <span className="kicker">Explora tus opciones</span>
                    <h1 className="h1 mt-2">Métodos anticonceptivos</h1>
                    <div className="underbar" />
                    <p className="mt-3 text-neutral-700">
                        Consulta las opciones disponibles (hormonales y no hormonales), con foco en claridad y comparación.
                    </p>
                </div>

                {/* Controles: búsqueda + filtros */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <label className="sr-only" htmlFor="q">Buscar</label>
                        <input
                            id="q"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Buscar: ‘implante’, ‘parche’, ‘DIU’…"
                            className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3 outline-none focus:ring-2 focus:ring-[--color-brand-300]"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setActive(f.key)}
                                className={`btn text-sm ${active === f.key
                                    ? "text-white gradient-cta shadow"
                                    : "btn-ghost"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid por grupos (del JSON) */}
                <div className="mt-8 space-y-8">
                    {methods.groups.map((group) => {
                        // Filtramos items según filtro + búsqueda
                        const visible = (group.items as MethodKey[]).filter(
                            (m) => matchesFilters(m) && matchesQuery(m)
                        );

                        if (visible.length === 0) return null;

                        return (
                            <section key={group.name}>
                                <div className="flex items-center justify-between">
                                    <h2 className="h2">{group.name}</h2>
                                    <span className="badge">{visible.length} método(s)</span>
                                </div>
                                <div className="underbar" />

                                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {visible.map((m) => (
                                        <MethodCard key={m} keyName={m} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Aviso educativo al final */}
                <div className="mt-10 card p-5 sm:p-6">
                    <p className="text-sm text-neutral-700">
                        <strong>Nota:</strong> Esta información es educativa y orientativa. No reemplaza una consulta médica presencial.
                        La elegibilidad final debe ser confirmada por un profesional de salud.
                    </p>
                </div>
            </div>
        </section>
    );
}
