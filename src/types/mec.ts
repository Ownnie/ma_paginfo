// src/types/mec.ts

export type Category = 1 | 2 | 3 | 4;

export type MethodKey =
    | "DIU_CU"
    | "DIU_LNG"
    | "IMPLANTE"
    | "AMPD_MENSUAL"
    | "AMPD_3M"
    | "PPS" // Píldora solo progestina
    | "AHC_PILDORA"
    | "AHC_PARCHE"
    | "AHC_ANILLO"
    | "BARRERA"
    | "EC" // Píldora de emergencia
    | "NATURALES"; // Nuevos: métodos basados en reconocimiento de fertilidad

export interface MethodResult {
    key: MethodKey;
    category: Category;
    reason: string[]; // etiquetas/condiciones que empeoraron la categoría
}

export type AnswerValue = boolean | number | string | null;
export type Answers = Record<string, AnswerValue>;

export interface QuestionBase {
    id: string;
    type: "boolean" | "number" | "select";
    label: string;
    help?: string;
    required?: boolean;
    min?: number;
    max?: number;
    options?: { value: string; label: string }[];
    when?: { id: string; equals: boolean | string | number }[];
}
