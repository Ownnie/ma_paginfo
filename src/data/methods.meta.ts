// data/methods.meta.ts
import type { MethodKey } from "@/types/mec";

export type MethodTag = "hormonal" | "no-hormonal" | "larc" | "emergencia";

export type MethodMeta = {
    key: MethodKey;
    name: string;
    slug: string;
    tags: MethodTag[];
    blurb: string;
};

export const METHODS_META: Record<MethodKey, MethodMeta> = {
    DIU_CU: {
        key: "DIU_CU",
        name: "DIU de Cobre",
        slug: "diu-cobre",
        tags: ["no-hormonal", "larc", "emergencia"],
        blurb: "No hormonal, larga duración (hasta 10 años). También útil como anticoncepción de emergencia.",
    },
    DIU_LNG: {
        key: "DIU_LNG",
        name: "DIU hormonal (LNG)",
        slug: "diu-hormonal",
        tags: ["hormonal", "larc"],
        blurb: "Libera levonorgestrel localmente; reduce sangrado en muchas usuarias.",
    },
    IMPLANTE_3A: {
        key: "IMPLANTE_3A",
        name: "Implante subdérmico (3 años)",
        slug: "implante-3-anos",
        tags: ["hormonal", "larc"],
        blurb: "Varilla subdérmica con progestágeno por 3 años. Muy eficaz.",
    },
    IMPLANTE_5A: {
        key: "IMPLANTE_5A",
        name: "Implante subdérmico (5 años)",
        slug: "implante-5-anos",
        tags: ["hormonal", "larc"],
        blurb: "Varillas subdérmicas con progestágeno por 5 años.",
    },
    AMPD_MENSUAL: {
        key: "AMPD_MENSUAL",
        name: "Inyectable mensual",
        slug: "inyectable-mensual",
        tags: ["hormonal"],
        blurb: "Esquema combinado mensual; requiere adherencia en controles.",
    },
    AMPD_3M: {
        key: "AMPD_3M",
        name: "Inyectable trimestral",
        slug: "inyectable-trimestral",
        tags: ["hormonal"],
        blurb: "DMPA cada 3 meses; eficacia alta si se aplica a tiempo.",
    },
    PPS: {
        key: "PPS",
        name: "Píldora solo progestina",
        slug: "pildora-solo-progestina",
        tags: ["hormonal"],
        blurb: "Opción diaria sin estrógeno; útil cuando AHC no es elegible.",
    },
    AHC_PILDORA: {
        key: "AHC_PILDORA",
        name: "Píldora combinada",
        slug: "pildora-combinada",
        tags: ["hormonal"],
        blurb: "Estrógeno + progestina; requiere criterios de elegibilidad.",
    },
    AHC_PARCHE: {
        key: "AHC_PARCHE",
        name: "Parche combinado",
        slug: "parche-combinado",
        tags: ["hormonal"],
        blurb: "Aplicación semanal con estrógeno + progestina.",
    },
    AHC_ANILLO: {
        key: "AHC_ANILLO",
        name: "Anillo vaginal combinado",
        slug: "anillo-combinado",
        tags: ["hormonal"],
        blurb: "Colocación mensual con estrógeno + progestina.",
    },
    BARRERA: {
        key: "BARRERA",
        name: "Métodos de barrera",
        slug: "barrera",
        tags: ["no-hormonal"],
        blurb: "Preservativo externo/interno, diafragma; protección ITS (preservativo).",
    },
    EC: {
        key: "EC",
        name: "Anticoncepción de emergencia",
        slug: "anticoncepcion-de-emergencia",
        tags: ["emergencia"],
        blurb: "Uso puntual tras relación sin protección. No es método de uso regular.",
    },
};

export const ALL_SLUGS = Object.values(METHODS_META).map(m => m.slug);
export function findBySlug(slug: string) {
    return Object.values(METHODS_META).find((m) => m.slug === slug) ?? null;
}
