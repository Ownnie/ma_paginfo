// src/lib/mec/questions.ts
import type { QuestionBase } from "@/types/mec";

export const QUESTIONS: QuestionBase[] = [
    { id: "EDAD_14_MAS", type: "boolean", label: "Tengo 14 años o más", required: true },
    { id: "EDAD_YEARS", type: "number", label: "¿Cuál es tu edad?", min: 14, max: 55 },

    { id: "EMBARAZO_ACTUAL", type: "boolean", label: "¿Estás embarazada actualmente o sospechas que podrías estarlo?" },

    { id: "NULIPARA", type: "boolean", label: "¿Nunca has dado a luz (parto o cesárea)?" },

    { id: "POSPARTO_RECENTE", type: "boolean", label: "¿Has dado a luz recientemente (posparto)?", when: [{ id: "NULIPARA", equals: false }] },
    {
        id: "POSPARTO_PERIODO",
        type: "select",
        label: "Si estás en posparto, indica los días desde el parto:",
        when: [{ id: "POSPARTO_RECENTE", equals: true }],
        options: [
            { value: "<21", label: "<21 días" },
            { value: "21-42", label: "21–42 días" },
            { value: ">42", label: ">42 días" }
        ]
    },
    { id: "LACTANCIA_ACTUAL", type: "boolean", label: "¿Estás amamantando actualmente?", when: [{ id: "POSPARTO_RECENTE", equals: true }] },
    {
        id: "LACTANCIA_PERIODO",
        type: "select",
        label: "Si estás amamantando, indica desde cuántos días posparto:",
        when: [{ id: "LACTANCIA_ACTUAL", equals: true }],
        options: [
            { value: "<21", label: "<21 días" },
            { value: "21-42", label: "21–42 días" },
            { value: ">42", label: ">42 días" }
        ]
    },

    { id: "ABORTO_RECENTE", type: "boolean", label: "¿Has tenido un aborto recientemente?" },
    {
        id: "ABORTO_RECIENTE_TIPO",
        type: "select",
        label: "Si tuviste un aborto, indica el tipo:",
        when: [{ id: "ABORTO_RECENTE", equals: true }],
        options: [
            { value: "PRIMER_SEGUNDO_TRIMESTRE", label: "Primer/segundo trimestre sin infección" },
            { value: "ABORTO_SEPTICO", label: "Aborto séptico (con infección)" }
        ]
    },

    { id: "MIGRAÑA_AURA", type: "boolean", label: "¿Tienes migraña con aura?" },
    { id: "MIGRAÑA_SIN_AURA", type: "boolean", label: "¿Tienes migraña sin aura?" },

    { id: "FUMA", type: "boolean", label: "¿Fumas cigarrillos actualmente?" },
    {
        id: "CIGARRILLOS_DIA",
        type: "number",
        label: "Si fumas, ¿cuántos cigarrillos al día?",
        when: [{ id: "FUMA", equals: true }],
        min: 1,
        max: 60
    },

    { id: "ICTUS", type: "boolean", label: "¿Has tenido un accidente cerebrovascular (ACV)?" },
    { id: "TVP_EP", type: "boolean", label: "¿Has tenido trombosis venosa profunda o embolia pulmonar?" },
    { id: "MUTACION_TROMBO", type: "boolean", label: "¿Tienes mutación trombogénica conocida o antecedente familiar importante?" },
    { id: "HTA_CONTROLADA", type: "boolean", label: "¿Tienes hipertensión controlada?" },
    { id: "HTA_160_100", type: "boolean", label: "¿Tensión arterial muy elevada (≥160/100) o con daño vascular?" },
    { id: "CARDIO_ISQUEMICA", type: "boolean", label: "¿Enfermedad cardíaca isquémica (infarto, angina)?" },

    { id: "DIABETES_VASCULAR", type: "boolean", label: "¿Diabetes con complicaciones o más de 20 años de evolución?" },
    { id: "OBESIDAD_IMC30", type: "boolean", label: "¿IMC ≥30?" },

    { id: "CIRROSIS_GRAVE", type: "boolean", label: "¿Enfermedad hepática grave o tumores hepáticos?" },

    { id: "CANCER_MAMA_ACTUAL", type: "boolean", label: "¿Cáncer de mama actual?" },
    { id: "CANCER_MAMA_5Y", type: "boolean", label: "¿Antecedente de cáncer de mama (≥5 años sin enfermedad)?" },

    { id: "EPI_ACTIVA", type: "boolean", label: "¿Enfermedad inflamatoria pélvica activa o infección genital importante?" },
    { id: "ENDOMETRIOSIS", type: "boolean", label: "¿Endometriosis diagnosticada?" },
    { id: "DISMENORREA_INTENSA", type: "boolean", label: "¿Cólicos menstruales muy intensos?" },
    {
        id: "SANGRADO_ABUNDANTE",
        type: "select",
        label: "¿Cómo describirías tus sangrados vaginales?",
        options: [
            { value: "NINGUNO", label: "Sin alteraciones importantes" },
            { value: "IRREGULAR_LEVE", label: "Irregulares leves" },
            { value: "ABUNDANTE", label: "Abundantes" },
            { value: "SIN_CAUSA_DIAGNOSTICADA", label: "Anormales sin causa diagnosticada" }
        ]
    },

    { id: "MEDS_ENZYME_INDUCERS", type: "boolean", label: "¿Usas medicamentos que puedan disminuir la eficacia de métodos hormonales (algunos anticonvulsivos, rifampicina, etc.)?" },

    { id: "MAYOR_45", type: "boolean", label: "¿Tienes más de 45 años?" },

    { id: "TRATAMIENTO_DEPRESION", type: "boolean", label: "¿Recibes tratamiento para depresión o ansiedad?" },
    { id: "EFECTO_ADVERSO_PREVIO", type: "boolean", label: "¿Has tenido efectos adversos importantes con algún método previo?" }
];
