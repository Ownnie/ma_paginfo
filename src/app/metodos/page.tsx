// src/app/metodos/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MethodKey } from "@/types/mec";
import groups from "@/data/mec.methods.json";
import { METHODS_META } from "@/data/methods.meta";

type FilterKey = "all" | "hormonal" | "no-hormonal" | "larc" | "emergencia";

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "hormonal", label: "Hormonales" },
    { key: "no-hormonal", label: "No hormonales" },
    { key: "larc", label: "Larga duración" },
    { key: "emergencia", label: "Emergencia" }
];

function Badge({ children }: { children: React.ReactNode }) {
    return <span className="badge">{children}</span>;
}

function MethodCard({ k }: { k: MethodKey }) {
    const meta = METHODS_META[k];

    return (
        <Link href={`/metodos/${meta.slug}`} className="block card p-5 sm:p-6 card-hover h-full">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-semibold">{meta.name}</h3>
                <span
                    className="inline-block h-2.5 w-2.5 rounded-full bg-[--color-brand-400]"
                    aria-hidden
                />
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

export default function Page() {
    const [active, setActive] = useState<FilterKey>("all");
    const [q, setQ] = useState("");

    const searchIndex = useMemo(() => {
        const map = new Map<MethodKey, string>();
        (Object.keys(METHODS_META) as MethodKey[]).forEach((k) => {
            const m = METHODS_META[k];
            map.set(
                k,
                `${m.name} ${m.blurb} ${m.tags.join(" ")}`.toLowerCase()
            );
        });
        return map;
    }, []);

    const matchesFilter = (k: MethodKey) =>
        active === "all" ? true : METHODS_META[k].tags.includes(active as any);

    const matchesQuery = (k: MethodKey) => {
        if (!q.trim()) return true;
        const hay = searchIndex.get(k) ?? "";
        return hay.includes(q.trim().toLowerCase());
    };

    return (
        <section className="section section-soft">
            <div className="container max-w-6xl">
                <div className="mb-6">
                    <span className="kicker">Explora tus opciones</span>
                    <h1 className="h1 mt-2">Métodos anticonceptivos</h1>
                    <div className="underbar" />
                    <p className="mt-3 text-neutral-700">
                        Selecciona cada método para ver cómo funciona, su eficacia, ventajas, posibles efectos
                        y si puede ser adecuado para ti.
                    </p>
                </div>

                {/* Controles */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <label className="sr-only" htmlFor="q">
                            Buscar método
                        </label>
                        <input
                            id="q"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Buscar: “implante”, “DIU”, “barrera”, “naturales”…"
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

                {/* Comparar CTA */}
                <div className="mt-4">
                    <Link href="/comparar" className="inline-flex text-sm text-[--color-brand-700] underline">
                        Comparar hasta 3 métodos lado a lado →
                    </Link>
                </div>

                {/* Grupos */}
                <div className="mt-8 space-y-8">
                    {groups.groups.map((group) => {
                        const visible = (group.items as MethodKey[]).filter(
                            (m) => METHODS_META[m] && matchesFilter(m) && matchesQuery(m)
                        );
                        if (!visible.length) return null;

                        return (
                            <section key={group.name}>
                                <div className="flex items-center justify-between">
                                    <h2 className="h2">{group.name}</h2>
                                    <span className="badge">{visible.length} método(s)</span>
                                </div>
                                <div className="underbar" />

                                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {visible.map((m) => (
                                        <MethodCard key={m} k={m} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="mt-10 card p-5 sm:p-6">
                    <p className="text-sm text-neutral-700">
                        <strong>Nota:</strong> Esta plataforma es educativa y orientativa. No reemplaza la
                        evaluación individual por un profesional de salud.
                    </p>
                </div>
            </div>
        </section>
    );
}
