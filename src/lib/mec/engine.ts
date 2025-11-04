// lib/mec/engine.ts
import type { Answers, Category, MethodKey, MethodResult } from "@/types/mec";
import { ALL_METHODS, CONDITION_TO_METHOD_CATEGORY, applyDynamicRules } from "@/lib/mec/mappings";

/**
 * Evaluación principal a partir de respuestas (recomendado).
 * Devuelve la peor categoría por método y razones trazables.
 */
export function evaluateMECFromAnswers(answers: Answers): MethodResult[] {
    const perMethod: Record<MethodKey, { cat: Category; why: string[] }> = ALL_METHODS.reduce(
        (acc, m) => {
            acc[m] = { cat: 1 as Category, why: [] };
            return acc;
        },
        {} as Record<MethodKey, { cat: Category; why: string[] }>,
    );

    // 1) Reglas “directas” por booleanos
    for (const [condId, map] of Object.entries(CONDITION_TO_METHOD_CATEGORY)) {
        const v = answers[condId];
        if (!v) continue;
        for (const [method, cat] of Object.entries(map) as [MethodKey, Category][]) {
            if (!cat) continue;
            // sube si es peor
            if (cat > perMethod[method].cat) perMethod[method].cat = cat;
            if (cat >= 3) perMethod[method].why.push(`${condId}:${cat}`);
        }
    }

    // 2) Reglas dinámicas (posparto, tabaquismo≥35, etc.)
    applyDynamicRules(answers, perMethod);

    // 3) Barrera y EC como “siempre 1” salvo que agreguemos embarazo confirmado
    // (Si luego incluyes EMBARAZO_CONFIRMADO, puedes marcar EC como "no aplicable".)

    // 4) Ensamblar salida
    return ALL_METHODS.map((m) => ({
        key: m,
        category: perMethod[m].cat,
        reason: perMethod[m].why,
    }));
}

/**
 * Compatibilidad con tu firma anterior (ids booleanas):
 * Si pasas un string[], se aplica solo el mapeo directo.
 */
export function evaluateMEC(activeConditionIds: string[] | Answers): MethodResult[] {
    if (!Array.isArray(activeConditionIds)) return evaluateMECFromAnswers(activeConditionIds);
    const answers: Answers = {};
    for (const id of activeConditionIds) answers[id] = true;
    return evaluateMECFromAnswers(answers);
}
