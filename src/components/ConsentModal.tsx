"use client";
import { useEffect, useState } from "react";

const KEY = "aa_consent_v1";

export default function ConsentModal() {
    const [open, setOpen] = useState(false);
    const [checkedInfo, setCheckedInfo] = useState(false);
    const [checkedAge, setCheckedAge] = useState(false);

    useEffect(() => {
        const v = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
        if (!v) setOpen(true);
    }, []);

    // Evita scroll de fondo cuando el modal está abierto
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    const accept = () => {
        if (!checkedInfo || !checkedAge) return;
        localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), v: 1 }));
        setOpen(false);
    };

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            aria-describedby="consent-desc"
        >
            <div className="card max-w-lg w-full p-6 sm:p-7 relative">
                {/* botón cerrar */}
                <button
                    aria-label="Cerrar"
                    className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm hover:bg-neutral-100"
                    onClick={() => setOpen(false)}
                >
                    ✕
                </button>

                <span className="kicker">Privacidad y uso educativo</span>
                <h2 id="consent-title" className="h2 mt-2">Aviso y consentimiento</h2>
                <div className="underbar" />

                <p id="consent-desc" className="text-sm text-neutral-700 mt-4">
                    Esta plataforma es educativa e informativa. <strong>No reemplaza una consulta médica</strong> ni ofrece diagnóstico.
                    Las respuestas del test (edad, condiciones de salud y preferencias) se usan <strong>solo en tu navegador</strong> para
                    generar una recomendación orientativa basada en criterios reconocidos (OMS/ACOG/MinSalud). No se envían a ningún servidor.
                </p>

                <div className="mt-4 space-y-3">
                    <label className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            className="mt-1"
                            checked={checkedInfo}
                            onChange={(e) => setCheckedInfo(e.target.checked)}
                        />
                        <span className="text-sm">
                            Acepto que mis respuestas se procesen localmente para brindar una recomendación orientativa.
                        </span>
                    </label>
                    <label className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            className="mt-1"
                            checked={checkedAge}
                            onChange={(e) => setCheckedAge(e.target.checked)}
                        />
                        <span className="text-sm">Confirmo que tengo 14 años o más.</span>
                    </label>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-end">
                    <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancelar</button>
                    <button
                        className="btn text-white gradient-cta shadow hover:brightness-105 disabled:opacity-50"
                        onClick={accept}
                        disabled={!checkedInfo || !checkedAge}
                    >
                        Acepto
                    </button>
                </div>
            </div>
        </div>
    );
}
