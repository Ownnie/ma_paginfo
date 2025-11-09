// src/app/comparar/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { MethodKey } from "@/types/mec";
import { METHODS_META } from "@/data/methods.meta";

// Import contenido estático (lado cliente)
import diuCobre from "@/content/methods/diu-cobre.json";
import diuHormonal from "@/content/methods/diu-hormonal.json";
import implante from "@/content/methods/implante.json";
import inyMensual from "@/content/methods/inyectable-mensual.json";
import inyTrimestral from "@/content/methods/inyectable-trimestral.json";
import pps from "@/content/methods/pildora-solo-progestina.json";
import ahcPildora from "@/content/methods/pildora-combinada.json";
import ahcParche from "@/content/methods/parche-combinado.json";
import ahcAnillo from "@/content/methods/anillo-combinado.json";
import barrera from "@/content/methods/barrera.json";
import ec from "@/content/methods/anticoncepcion-de-emergencia.json";
import naturales from "@/content/methods/metodos-naturales.json";

const DETAIL_BY_KEY: Record<MethodKey, any> = {
    DIU_CU: diuCobre,
    DIU_LNG: diuHormonal,
    IMPLANTE: implante,
    AMPD_MENSUAL: inyMensual,
    AMPD_3M: inyTrimestral,
    PPS: pps,
    AHC_PILDORA: ahcPildora,
    AHC_PARCHE: ahcParche,
    AHC_ANILLO: ahcAnillo,
    BARRERA: barrera,
    EC: ec,
    NATURALES: naturales,
};

const ALL_OPTIONS = Object.values(METHODS_META).sort((a, b) =>
    a.name.localeCompare(b.name, "es")
);

export default function ComparePage() {
    const [selected, setSelected] = useState<MethodKey[]>([]);

    function toggle(key: MethodKey) {
        setSelected((prev) => {
            if (prev.includes(key)) return prev.filter((k) => k !== key);
            if (prev.length >= 3) return prev; // máximo 3
            return [...prev, key];
        });
    }

    const cols = selected
        .map((k) => ({
            key: k,
            meta: METHODS_META[k],
            data: DETAIL_BY_KEY[k],
        }))
        .filter((c) => !!c.data && !!c.meta);

    return (
        <section className="section section-soft">
            <div className="container max-w-6xl">
                {/* Header */}
                <div className="mb-6">
                    <span className="kicker">Comparador</span>
                    <h1 className="h1 mt-2">Compara métodos anticonceptivos</h1>
                    <div className="underbar" />
                    <p className="mt-3 text-neutral-700">
                        Selecciona hasta <strong>3 métodos</strong> para ver, en paralelo,
                        tipo, duración, eficacia, protección frente a ITS, ventajas y
                        consideraciones. Esta herramienta es orientativa y no reemplaza una
                        consulta médica.
                    </p>
                </div>

                {/* Selector de métodos */}
                <div className="card p-5 sm:p-6 mb-6">
                    <p className="text-sm text-neutral-700 mb-3">
                        Toca para seleccionar o quitar métodos. Máximo{" "}
                        <strong>3 a la vez</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {ALL_OPTIONS.map((opt) => {
                            const active = selected.includes(opt.key);
                            return (
                                <button
                                    key={opt.key}
                                    onClick={() => toggle(opt.key)}
                                    className={`px-3 py-2 rounded-full text-xs sm:text-sm border transition-all whitespace-nowrap ${active
                                        ? "bg-[--color-brand-500] text-white border-[--color-brand-500] shadow-sm shadow-[--color-brand-200]"
                                        : "bg-pink-50 text-[--color-brand-700] border-pink-100 hover:border-[--color-brand-300] hover:bg-pink-100"
                                        }`}
                                >
                                    {opt.name}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 text-xs text-neutral-500">
                        Seleccionados:{" "}
                        <span className="font-semibold text-[--color-brand-600]">
                            {selected.length}
                        </span>{" "}
                        / 3
                    </div>
                </div>

                {/* Si hay menos de 2 seleccionados */}
                {cols.length < 2 ? (
                    <div className="card p-6">
                        <p className="text-sm text-neutral-700">
                            Selecciona al menos <strong>dos</strong> métodos para ver la
                            comparación lado a lado.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm border-separate border-spacing-x-4">
                            <thead>
                                <tr>
                                    <th className="w-40 align-bottom text-left text-neutral-500">
                                        Característica
                                    </th>
                                    {cols.map((c) => (
                                        <th
                                            key={c.key}
                                            className="min-w-[180px] align-bottom text-left"
                                        >
                                            <div className="px-3 py-3 rounded-2xl bg-pink-50 border border-pink-100 shadow-xs">
                                                <div className="font-semibold text-[--color-brand-700]">
                                                    {c.meta.name}
                                                </div>
                                                <div className="mt-1 flex flex-wrap gap-1">
                                                    {c.meta.tags.includes("hormonal") && (
                                                        <span className="badge">Hormonal</span>
                                                    )}
                                                    {c.meta.tags.includes("no-hormonal") && (
                                                        <span className="badge">No hormonal</span>
                                                    )}
                                                    {c.meta.tags.includes("larc") && (
                                                        <span className="badge">Larga duración</span>
                                                    )}
                                                    {c.meta.tags.includes("emergencia") && (
                                                        <span className="badge">Emergencia</span>
                                                    )}
                                                </div>
                                                <Link
                                                    href={`/metodos/${c.meta.slug}`}
                                                    className="mt-2 inline-block text-[10px] text-[--color-brand-600] hover:underline"
                                                >
                                                    Ver ficha completa →
                                                </Link>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="align-top">
                                <Row
                                    label="Tipo / hormonas"
                                    cols={cols.map((c) => c.data.quick?.tipo ?? "—")}
                                />
                                <Row
                                    label="Duración / uso"
                                    cols={cols.map((c) => c.data.quick?.duracion ?? "—")}
                                />
                                <Row
                                    label="¿Usa hormonas?"
                                    cols={cols.map((c) => c.data.quick?.hormonas ?? "—")}
                                />
                                <Row
                                    label="Protección frente a ITS"
                                    cols={cols.map(
                                        (c) => c.data.quick?.protege_its ?? "No"
                                    )}
                                />
                                <Row
                                    label="Eficacia uso típico (fallos/año)"
                                    cols={cols.map((c) =>
                                        c.data.efficacy?.typical_failure_rate_pct != null
                                            ? `${c.data.efficacy.typical_failure_rate_pct}%`
                                            : "—"
                                    )}
                                />
                                <Row
                                    label="Eficacia uso perfecto (fallos/año)"
                                    cols={cols.map((c) =>
                                        c.data.efficacy?.perfect_failure_rate_pct != null
                                            ? `${c.data.efficacy.perfect_failure_rate_pct}%`
                                            : "—"
                                    )}
                                />
                                <Row
                                    label="¿Sirve como emergencia?"
                                    cols={cols.map((c) =>
                                        c.data.emergency ? "Sí (ver ficha)" : "No"
                                    )}
                                />
                                <Row
                                    label="Ventajas clave"
                                    cols={cols.map((c) =>
                                        (c.data.advantages || [])
                                            .slice(0, 3)
                                            .join(" · ") || "—"
                                    )}
                                />
                                <Row
                                    label="Consideraciones / efectos"
                                    cols={cols.map((c) =>
                                        (c.data.disadvantages || [])
                                            .slice(0, 3)
                                            .join(" · ") || "—"
                                    )}
                                />
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Nota final */}
                <div className="mt-8 card p-5 sm:p-6">
                    <p className="text-sm text-neutral-700">
                        Esta tabla resume diferencias clave para ayudarte a comparar.
                        Revisa la ficha completa de cada método y consulta con un
                        profesional de salud antes de tomar una decisión.
                    </p>
                    <div className="mt-3 flex gap-3 flex-wrap">
                        <Link href="/metodos" className="btn btn-ghost text-sm">
                            Ver listado completo
                        </Link>
                        <Link
                            href="/test"
                            className="btn text-white gradient-cta shadow text-sm"
                        >
                            Hacer el test personalizado
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Row({
    label,
    cols,
}: {
    label: string;
    cols: (string | number)[];
}) {
    return (
        <tr>
            <td className="py-3 pr-4 font-medium text-neutral-600 align-top sticky left-0 bg-white/90 backdrop-blur-sm">
                {label}
            </td>
            {cols.map((v, i) => (
                <td
                    key={i}
                    className="py-3 pr-4 align-top text-neutral-800 border-b border-pink-50"
                >
                    {v || "—"}
                </td>
            ))}
        </tr>
    );
}
