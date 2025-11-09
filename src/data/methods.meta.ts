// src/data/methods.meta.ts
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
        blurb:
            "Dispositivo intrauterino no hormonal de larga duración. También puede utilizarse como anticoncepción de emergencia si se inserta pocos días después del evento."
    },
    DIU_LNG: {
        key: "DIU_LNG",
        name: "DIU hormonal (LNG)",
        slug: "diu-hormonal",
        tags: ["hormonal", "larc"],
        blurb:
            "DIU que libera levonorgestrel. Muy efectivo, suele reducir el sangrado y el dolor menstrual."
    },
    IMPLANTE: {
        key: "IMPLANTE",
        name: "Implante subdérmico",
        slug: "implante",
        tags: ["hormonal", "larc"],
        blurb:
            "Implante subdérmico con progestágeno por 3 años. Una de las opciones más eficaces."
    },
    AMPD_MENSUAL: {
        key: "AMPD_MENSUAL",
        name: "Inyectable mensual",
        slug: "inyectable-mensual",
        tags: ["hormonal"],
        blurb: "Inyección mensual con hormonas combinadas. Requiere asistencia periódica."
    },
    AMPD_3M: {
        key: "AMPD_3M",
        name: "Inyectable trimestral",
        slug: "inyectable-trimestral",
        tags: ["hormonal"],
        blurb:
            "Inyección solo progestina cada 3 meses. Muy eficaz si se aplica puntualmente."
    },
    PPS: {
        key: "PPS",
        name: "Píldora solo progestina",
        slug: "pildora-solo-progestina",
        tags: ["hormonal"],
        blurb:
            "Píldora diaria sin estrógeno. Alternativa cuando los combinados no son elegibles. No es la misma que la píldora de emergencia."
    },
    AHC_PILDORA: {
        key: "AHC_PILDORA",
        name: "Píldora combinada",
        slug: "pildora-combinada",
        tags: ["hormonal"],
        blurb:
            "Píldora diaria con estrógeno + progestina. Requiere evaluación de criterios médicos."
    },
    AHC_PARCHE: {
        key: "AHC_PARCHE",
        name: "Parche combinado",
        slug: "parche-combinado",
        tags: ["hormonal"],
        blurb: "Parche semanal con estrógeno + progestina. Uso visible y cómodo."
    },
    AHC_ANILLO: {
        key: "AHC_ANILLO",
        name: "Anillo vaginal combinado",
        slug: "anillo-combinado",
        tags: ["hormonal"],
        blurb:
            "Anillo mensual que libera estrógeno + progestina. No requiere toma diaria."
    },
    BARRERA: {
        key: "BARRERA",
        name: "Métodos de barrera",
        slug: "barrera",
        tags: ["no-hormonal"],
        blurb:
            "Incluye preservativos masculinos y femeninos, diafragma, esponja y otros. Los preservativos ayudan a prevenir ITS."
    },
    EC: {
        key: "EC",
        name: "Píldora de emergencia",
        slug: "anticoncepcion-de-emergencia",
        tags: ["emergencia"],
        blurb:
            "Uso puntual después de una relación sin protección o fallo del método. No es un método de uso regular."
    },
    NATURALES: {
        key: "NATURALES",
        name: "Métodos naturales",
        slug: "metodos-naturales",
        tags: ["no-hormonal"],
        blurb:
            "Métodos basados en observación del ciclo (calendario, moco cervical, temperatura, días fértiles). Requieren constancia y educación."
    }
};

export const ALL_SLUGS = Object.values(METHODS_META).map((m) => m.slug);

export function findBySlug(slug: string) {
    return Object.values(METHODS_META).find((m) => m.slug === slug) ?? null;
}
