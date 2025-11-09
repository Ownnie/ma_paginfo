// lib/mec/mappings.ts
import type { Category, MethodKey, Answers } from "@/types/mec";

/** Lista canónica de métodos evaluados en el algoritmo */
export const ALL_METHODS: MethodKey[] = [
    "DIU_CU", "DIU_LNG",
    "IMPLANTE",
    "AMPD_MENSUAL", "AMPD_3M",
    "PPS",
    "AHC_PILDORA", "AHC_PARCHE", "AHC_ANILLO",
    "BARRERA", "EC",
];

/** Regla utilitaria: sube categoría si la nueva es peor */
export function worsen(
    current: Category,
    next: Category,
): Category { return next > current ? next : current; }

/** Mapeos “directos” condición→categorías por método (no dependientes de números/días). */
export const CONDITION_TO_METHOD_CATEGORY: Record<
    string,
    Partial<Record<MethodKey, Category>>
> = {
    // Migraña con aura → AHC=4. (US MEC 2024)
    MIGRAÑA_AURA: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4 },
    MIGRAÑA_SIN_AURA: { AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3 },

    // Cáncer de mama actual → toda hormonación =4; DIU-Cu=1.
    CANCER_MAMA_ACTUAL: {
        DIU_LNG: 4, IMPLANTE: 4, AMPD_MENSUAL: 4, AMPD_3M: 4, PPS: 4,
        AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4,
    },

    // Antecedente (≥5 años sin enfermedad): hormonales=3 (excepto DIU-Cu=1).
    CANCER_MAMA_5Y: {
        DIU_LNG: 3, IMPLANTE: 3, AMPD_MENSUAL: 3, AMPD_3M: 3, PPS: 3,
        AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3,
    },

    // HTA grave o con daño vascular
    HTA_160_100: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4, AMPD_MENSUAL: 3, AMPD_3M: 3, PPS: 3 },
    // HTA controlada → precaución con AHC
    HTA_CONTROLADA: { AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3 },

    // TVP/EP (historia): CHC 3–4 según riesgo; base conservadora 4 si sin detalles.
    TVP_EP: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4, AMPD_MENSUAL: 3, AMPD_3M: 3 },

    // ICTUS / ACV: contraindica AHC; precaución con AMPD/Implante
    ICTUS: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4, AMPD_MENSUAL: 3, AMPD_3M: 3, IMPLANTE: 3, DIU_CU: 1, DIU_LNG: 1, PPS: 1 },

    // Mutación trombogénica
    MUTACION_TROMBO: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4 },

    // Diabetes con daño vascular o >20 años
    DIABETES_VASCULAR: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4, AMPD_MENSUAL: 3, AMPD_3M: 3, PPS: 3 },

    // Cirrosis grave (descompensada) / adenoma hepático
    CIRROSIS_GRAVE: {
        AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4,
        DIU_LNG: 3, IMPLANTE: 3, AMPD_MENSUAL: 3, AMPD_3M: 3, PPS: 3,
    },

    // Cardiopatía isquémica / ACV eleva riesgo con CHC
    CARDIO_ISQUEMICA: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4 },
    // Lupus con anticuerpos antifosfolípidos
    LES_ANTIFOSFOLIPIDOS: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4, AMPD_MENSUAL: 3, AMPD_3M: 3, IMPLANTE: 3, DIU_LNG: 3, DIU_CU: 1 },

    // Endometriosis / dismenorrea intensa: hormonales suelen mejorar
    DISMENORREA_INTENSA: { DIU_CU: 3, DIU_LNG: 1, IMPLANTE: 1, AMPD_MENSUAL: 1, AMPD_3M: 1, PPS: 1, AHC_PILDORA: 1, AHC_PARCHE: 1, AHC_ANILLO: 1 },

    // EPI activa -> DIU contraindicado
    EPI_ACTIVA: { DIU_CU: 4, DIU_LNG: 4 },

    // ETS activa -> DIU contraindicado
    ETS_ACTIVA: { DIU_CU: 4, DIU_LNG: 4 },

    // Obesidad (IMC ≥30): precaución con AHC
    OBESIDAD_IMC30: { AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3 },

    // Medicación que reduce eficacia hormonal
    MEDS_ENZYME_INDUCERS: { AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3, IMPLANTE: 3, PPS: 3 },

    // Menarquia <18 o edad >45 → precaución con AHC/AMPD
    MENARQUIA_MENOR_18: { AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3, AMPD_MENSUAL: 3, AMPD_3M: 3 },
    MAYOR_45: { AHC_PILDORA: 3, AHC_PARCHE: 3, AHC_ANILLO: 3, AMPD_MENSUAL: 3, AMPD_3M: 3 },

    // Nulípara: precaución DIU de cobre
    NULIPARA: { DIU_CU: 3 },

    // Cirugía mayor con inmovilización -> AHC contraindicado
    CIRUGIA_MAYOR_INMOVILIZACION: { AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4 },

    // Embarazo actual: según tu instrucción, no indicar métodos
    EMBARAZO_ACTUAL: {
        DIU_CU: 4, DIU_LNG: 4, IMPLANTE: 4, AMPD_MENSUAL: 4, AMPD_3M: 4, PPS: 4,
        AHC_PILDORA: 4, AHC_PARCHE: 4, AHC_ANILLO: 4, BARRERA: 4, EC: 4,
    },

    // Sangrado abundante: hormonales pueden ser preferidos
    SANGRADO_ABUNDANTE: { DIU_CU: 3, DIU_LNG: 1, AHC_PILDORA: 1, AMPD_MENSUAL: 1, AMPD_3M: 1, PPS: 1 },

    // Aborto séptico: DIU contraindicado hasta recuperación
    ABORTO_SEPTICO: { DIU_CU: 4, DIU_LNG: 4 },
    // “Barrera” y “EC” se mantienen en 1 por casi todas las condiciones de la tabla resumen.
    // Si agregas embarazo confirmado en el cuestionario, puedes devolver EC=NA.
};

/** Reglas dinámicas que requieren números/combinaciones (p. ej. posparto, tabaquismo≥35). */
export function applyDynamicRules(
    answers: Answers,
    perMethod: Record<MethodKey, { cat: Category; why: string[] }>,
) {
    const age = Number(answers.EDAD_YEARS ?? NaN);
    const fuma = !!answers.FUMA;
    const cigs = Number(answers.CIGARRILLOS_DIA ?? 0);
    const fuma35 = (fuma && !Number.isNaN(age) && age >= 35);

    // Tabaquismo ≥35:
    if (fuma35) {
        const heavy = cigs >= 15; // MEC: <15 → 3, ≥15 → 4
        worsenOne("AHC_PILDORA", heavy ? 4 : 3, heavy ? "FUMA_≥35_15+:4" : "FUMA_≥35_<15:3");
        worsenOne("AHC_PARCHE", heavy ? 4 : 3, heavy ? "FUMA_≥35_15+:4" : "FUMA_≥35_<15:3");
        worsenOne("AHC_ANILLO", heavy ? 4 : 3, heavy ? "FUMA_≥35_15+:4" : "FUMA_≥35_<15:3");
    }

    // Postaborto: 1er trimestre = 1 para todos; 2º trimestre = 2 p/DIU; séptico → DIU (1/4) según MEC.
    const abortoReciente = String(answers.ABORTO_RECENTE ?? "NO");
    if (abortoReciente === "ABORTO_SEPTICO") {
        worsenOne("DIU_CU", 4, "ABORTO_SEPTICO:DIU_CU=4");
        worsenOne("DIU_LNG", 4, "ABORTO_SEPTICO:DIU_LNG=4");
    }

    // Posparto + lactancia (categorías para CHC según días y factores de TEV)
    const pospartoSel = String(answers.POSPARTO_PERIODO ?? "NO");
    const lactaSel = String(answers.LACTANCIA_PERIODO ?? "NO");
    const hasVTERisk = !!answers.HTA_160_100 || !!answers.MUTACION_TROMBO || !!answers.TVP_EP || fuma35 || !!answers.CARDIO_ISQUEMICA;

    function selToDays(sel: string): number {
        if (sel === "<21") return 10;
        if (sel === "21-42") return 30;
        if (sel === ">42") return 60;
        return NaN;
    }

    // Si la usuaria indica periodo de lactancia (intervalos)
    if (lactaSel && lactaSel !== "NO") {
        const d = selToDays(lactaSel);
        let chcCat: Category | null = null;
        if (lactaSel === "<21") chcCat = 4;
        else if (lactaSel === "21-42") chcCat = hasVTERisk ? 3 : 2;
        else if (lactaSel === ">42") chcCat = 1;
        if (chcCat) {
            worsenOne("AHC_PILDORA", chcCat, `LACTANCIA:${lactaSel}`);
            worsenOne("AHC_PARCHE", chcCat, `LACTANCIA:${lactaSel}`);
            worsenOne("AHC_ANILLO", chcCat, `LACTANCIA:${lactaSel}`);
        }
    }

    // FIX aborto séptico
    const abortoTipo = String(answers.ABORTO_RECIENTE_TIPO ?? "NO");
    if (abortoTipo === "ABORTO_SEPTICO") {
        worsenOne("DIU_CU", 4, "ABORTO_SEPTICO");
        worsenOne("DIU_LNG", 4, "ABORTO_SEPTICO");
    }

    // Si la usuaria indica posparto y no amamanta (intervalos)
    if (pospartoSel && pospartoSel !== "NO") {
        const d = selToDays(pospartoSel);
        let chcCat: Category | null = null;
        if (pospartoSel === "<21") chcCat = 4;
        else if (pospartoSel === "21-42") chcCat = hasVTERisk ? 3 : 2;
        else if (pospartoSel === ">42") chcCat = 1;
        if (chcCat) {
            worsenOne("AHC_PILDORA", chcCat, `POSPARTO:${pospartoSel}`);
            worsenOne("AHC_PARCHE", chcCat, `POSPARTO:${pospartoSel}`);
            worsenOne("AHC_ANILLO", chcCat, `POSPARTO:${pospartoSel}`);
        }
    }

    // Si el sangrado es abundante ajustar recomendaciones (SANGRADO_ABUNDANTE select)
    const sangradoSel = String(answers.SANGRADO_ABUNDANTE ?? "NINGUNO");
    if (sangradoSel === "ABUNDANTE") {
        worsenOne("DIU_CU", 3, "SANGRADO:ABUNDANTE:DIU_CU=3");
        worsenOne("DIU_LNG", 1, "SANGRADO:ABUNDANTE:DIU_LNG=1");
    }

    // Util
    function worsenOne(key: MethodKey, cat: Category, because: string) {
        perMethod[key].cat = worsen(perMethod[key].cat, cat);
        if (cat >= 3) perMethod[key].why.push(because);
    }
}
