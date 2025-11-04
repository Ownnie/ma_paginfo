// lib/mec/questions.ts
import type { QuestionBase } from "@/types/mec";

// Consolidated, conditional questions for the MEC test.
export const QUESTIONS: QuestionBase[] = [
    // Edad / consentimiento
    { id: "EDAD_14_MAS", type: "boolean", label: "Tengo 14 años o más", required: true },
    { id: "EDAD_YEARS", type: "number", label: "¿Cuál es tu edad?", min: 14, max: 55, help: "Ajusta recomendaciones (p. ej. tabaquismo ≥35 años)" },

    // Reproductivas básicas
    { id: "EMBARAZO_ACTUAL", type: "boolean", label: "¿Estás embarazada actualmente o sospechas que podrías estarlo?" },

    // Paridad y posparto/lactancia (se muestran solo si no es nulípara)
    { id: "NULIPARA", type: "boolean", label: "¿Nunca has dado a luz? (Marca 'Sí' si nunca has tenido parto vaginal ni cesárea)" },
    { id: "POSPARTO_RECENTE", type: "boolean", label: "¿Has dado a luz recientemente (posparto)?", when: [{ id: "NULIPARA", equals: false }] },
    {
        id: "POSPARTO_PERIODO", type: "select", label: "Si estás en posparto, indica el intervalo de días desde el parto:", when: [{ id: "POSPARTO_RECENTE", equals: true }], options: [
            { value: "<21", label: "<21 días" },
            { value: "21-42", label: "21–42 días" },
            { value: ">42", label: ">42 días" },
        ]
    },
    { id: "LACTANCIA_ACTUAL", type: "boolean", label: "¿Estás amamantando actualmente?", when: [{ id: "POSPARTO_RECENTE", equals: true }] },
    {
        id: "LACTANCIA_PERIODO", type: "select", label: "Si estás amamantando, indica desde cuántos días postparto:", when: [{ id: "LACTANCIA_ACTUAL", equals: true }], options: [
            { value: "<21", label: "<21 días posparto" },
            { value: "21-42", label: "21–42 días" },
            { value: ">42", label: ">42 días" },
        ]
    },

    // Aborto reciente
    { id: "ABORTO_RECENTE", type: "boolean", label: "¿Has tenido un aborto recientemente?" },
    {
        id: "ABORTO_RECIENTE_TIPO", type: "select", label: "Si tuviste un aborto, indica:", when: [{ id: "ABORTO_RECENTE", equals: true }], options: [
            { value: "PRIMER_SEGUNDO_TRIMESTRE", label: "Primer o segundo trimestre" },
            { value: "ABORTO_SEPTICO", label: "Aborto séptico (con infección)" },
        ]
    },

    // Neurológico
    { id: "MIGRAÑA_AURA", type: "boolean", label: "¿Sufres de migraña con aura?" },
    { id: "MIGRAÑA_SIN_AURA", type: "boolean", label: "¿Sufres de migraña sin aura?" },

    // Tabaquismo
    { id: "FUMA", type: "boolean", label: "¿Fumas cigarrillos actualmente?" },
    { id: "CIGARRILLOS_DIA", type: "number", label: "¿Cuántos cigarrillos por día?", min: 1, max: 60, when: [{ id: "FUMA", equals: true }] },

    // Vascular / cardiológico
    { id: "ICTUS", type: "boolean", label: "¿Has tenido un accidente cerebrovascular (ACV) o 'derrame cerebral'?" },
    { id: "TVP_EP", type: "boolean", label: "¿Has tenido trombosis venosa profunda (TVP) o embolia pulmonar?" },
    { id: "MUTACION_TROMBO", type: "boolean", label: "¿Tienes mutación trombogénica o antecedentes familiares importantes?" },
    { id: "HTA_CONTROLADA", type: "boolean", label: "¿Tienes hipertensión controlada?" },
    { id: "HTA_160_100", type: "boolean", label: "¿Tienes hipertensión no controlada (>160/100 mmHg)?" },
    { id: "CARDIO_ISQUEMICA", type: "boolean", label: "¿Tienes enfermedad cardíaca isquémica (infarto, angina, etc.)?" },

    // Metabólico / endocrino
    { id: "DIABETES_GESTACIONAL", type: "boolean", label: "¿Tienes diabetes gestacional?" },
    { id: "DIABETES_VASCULAR", type: "boolean", label: "¿Tienes diabetes con complicaciones o >20 años de evolución?" },
    { id: "OBESIDAD_IMC30", type: "boolean", label: "¿Tienes obesidad (IMC ≥30)?" },

    // Hepático
    { id: "CIRROSIS_GRAVE", type: "boolean", label: "¿Tienes enfermedad hepática grave o tumores hepáticos?" },

    // Cáncer
    { id: "CANCER_MAMA_ACTUAL", type: "boolean", label: "¿Tienes cáncer de mama actualmente?" },
    { id: "CANCER_MAMA_5Y", type: "boolean", label: "¿Antecedente de cáncer de mama sin evidencia actual (≥5 años)?" },
    { id: "CANCER_CUELLO_ENDOMETRIAL_ACTIVO", type: "boolean", label: "¿Tienes cáncer de cuello uterino o endometrial activo?" },

    // Ginecológicos
    { id: "EPI_ACTIVA", type: "boolean", label: "¿Tienes enfermedad inflamatoria pélvica (EPI) activa o infección genital actual?" },
    { id: "ENDOMETRIOSIS", type: "boolean", label: "¿Tienes endometriosis?" },
    { id: "DISMENORREA_INTENSA", type: "boolean", label: "¿Tienes dismenorrea o cólicos menstruales intensos?" },
    {
        id: "SANGRADO_ABUNDANTE", type: "select", label: "¿Tienes sangrados vaginales?", options: [
            { value: "NINGUNO", label: "No" },
            { value: "IRREGULAR_LEVE", label: "Irregular leve" },
            { value: "ABUNDANTE", label: "Abundante" },
            { value: "SIN_CAUSA_DIAGNOSTICADA", label: "Sin causa diagnosticada" },
        ]
    },

    // Medicación / interacciones
    { id: "MEDS_ENZYME_INDUCERS", type: "boolean", label: "¿Usas medicamentos (anticonvulsivos, rifampicina, ciertos antirretrovirales) que reducen eficacia hormonal?" },

    // Menarquia / edad reproductiva
    { id: "MAYOR_45", type: "boolean", label: "¿Tienes más de 45 años?" },

    // Salud mental / antecedentes y preferencias
    { id: "TRATAMIENTO_DEPRESION", type: "boolean", label: "¿Usas tratamiento para depresión o ansiedad?" },
    { id: "EFECTO_ADVERSO_PREVIO", type: "boolean", label: "¿Has usado antes algún método que te haya causado efectos adversos?" },
];
