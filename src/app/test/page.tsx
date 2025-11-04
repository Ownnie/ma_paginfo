"use client";

import React, { useState } from "react";
import { QUESTIONS } from "@/lib/mec/questions";
import { evaluateMECFromAnswers } from "@/lib/mec/engine";

export default function TestPage() {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [results, setResults] = useState<any[] | null>(null);

    function onChange(id: string, value: any) {
        setAnswers((s) => ({ ...s, [id]: value }));
    }

    function isVisible(q: any) {
        if (!q.when) return true;
        // all conditions in when must be satisfied
        return q.when.every((c: any) => {
            const actual = answers[c.id];
            // if condition expects boolean true/false
            if (typeof c.equals === "boolean") return actual === c.equals;
            // otherwise compare string/number
            return String(actual) === String(c.equals);
        });
    }

    function renderField(q: any) {
        const value = answers[q.id];
        if (q.type === "boolean") {
            // render explicit Sí / No radio buttons for clarity
            return (
                <div className="flex gap-3">
                    <label className={`px-3 py-1 rounded border cursor-pointer ${value === true ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>
                        <input
                            type="radio"
                            name={q.id}
                            value="true"
                            checked={value === true}
                            onChange={() => onChange(q.id, true)}
                            className="hidden"
                        />
                        Sí
                    </label>
                    <label className={`px-3 py-1 rounded border cursor-pointer ${value === false ? 'bg-gray-200 text-gray-800 border-gray-300' : 'bg-white'}`}>
                        <input
                            type="radio"
                            name={q.id}
                            value="false"
                            checked={value === false}
                            onChange={() => onChange(q.id, false)}
                            className="hidden"
                        />
                        No
                    </label>
                </div>
            );
        }
        if (q.type === "number") {
            return (
                <input
                    type="number"
                    value={value ?? ""}
                    onChange={(e) => onChange(q.id, Number(e.target.value))}
                    className="border rounded px-2 py-1 w-40"
                />
            );
        }
        if (q.type === "select") {
            return (
                <select
                    value={value ?? (q.options?.[0]?.value ?? "")}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    className="border rounded px-2 py-1 w-64"
                >
                    {q.options?.map((o: any) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            );
        }
        return null;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Pass answers to engine. engine expects Answers type: record of booleans or values.
        const res = evaluateMECFromAnswers(answers);
        setResults(res);
    }

    const visibleQuestions = QUESTIONS.filter(isVisible);
    const answeredCount = visibleQuestions.reduce((acc, q) => (answers[q.id] !== undefined && answers[q.id] !== "" ? acc + 1 : acc), 0);

    return (
        <section className="section py-12">
            <div className="container max-w-3xl">
                <h1 className="h1 mb-4">Test de elegibilidad MEC (versión interactiva)</h1>
                <p className="text-sm text-neutral-700 mb-6">
                    Responde las preguntas con la información clínica más precisa. El resultado es una
                    recomendación orientativa basada en criterios de elegibilidad médica.
                    Categoría 1: El método puede usarse sin restricciones.
                    Categoría 2: Las ventajas superan los riesgos teóricos o probados.
                    Categoría 3: Los riesgos suelen superar las ventajas debe evaluarse cuidadosamente.
                    Categoría 4: Riesgo inaceptable para la salud; el método no debe usarse.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <div className="text-sm text-neutral-600">Progreso: {answeredCount} / {visibleQuestions.length} completadas</div>
                        <div className="w-full bg-gray-200 rounded h-2 mt-2 overflow-hidden">
                            <div className="h-2 bg-blue-600" style={{ width: `${visibleQuestions.length ? (answeredCount / visibleQuestions.length) * 100 : 0}%` }} />
                        </div>
                    </div>

                    {visibleQuestions.map((q) => (
                        <div key={q.id} className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-3 rounded-md border border-transparent hover:border-gray-100">
                            <div className="sm:w-2/3">
                                <label className="text-sm font-medium">{q.label}</label>
                                {q.help ? <div className="text-xs text-neutral-500">{q.help}</div> : null}
                            </div>
                            <div className="sm:flex-1 mt-2 sm:mt-0">{renderField(q)}</div>
                        </div>
                    ))}

                    <div>
                        <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded">
                            Evaluar
                        </button>
                        <button
                            type="button"
                            className="ml-3 btn border px-3 py-2 rounded"
                            onClick={() => {
                                setAnswers({});
                                setResults(null);
                            }}
                        >
                            Limpiar
                        </button>
                    </div>
                </form>

                {results && (
                    <div className="mt-8 card p-4">
                        <h2 className="h2">Resultados</h2>
                        <div className="underbar" />
                        <ul className="mt-3 space-y-2">
                            {results.map((r) => (
                                <li key={r.key} className="border rounded p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="font-semibold">{r.key}</div>
                                        <div>
                                            {r.category === 1 ? (
                                                <span className="text-green-600 font-bold">✅ 1–2 (apto)</span>
                                            ) : r.category === 2 ? (
                                                <span className="text-amber-600 font-bold">⚠ 3 (precaución)</span>
                                            ) : (
                                                <span className="text-red-600 font-bold">❌ 4 (contraindicado)</span>
                                            )}
                                        </div>
                                    </div>
                                    {r.reason?.length ? (
                                        <div className="mt-2 text-sm text-neutral-600">Motivos: {r.reason.join(", ")}</div>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
