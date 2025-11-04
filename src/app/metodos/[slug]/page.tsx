import { notFound } from "next/navigation";
import Link from "next/link";

type MethodContent = {
  name: string;
  summary: string;
  quick: Record<string, string>;
  efficacy?: { typical_failure_rate_pct?: number; perfect_failure_rate_pct?: number; nota?: string };
  how_it_works?: string[];
  advantages?: string[];
  disadvantages?: string[];
  common_effects?: string[];
  emergency?: boolean;
  references?: string[];
};

// Fuente de verdad: slug -> import JSON
const METHOD_FILES: Record<string, () => Promise<{ default: MethodContent }>> = {
  "diu-cobre": () => import("@/content/methods/diu-cobre.json"),
  "diu-hormonal": () => import("@/content/methods/diu-hormonal.json"),
  "implante-3-anos": () => import("@/content/methods/implante-3-anos.json"),
  "implante-6-anos": () => import("@/content/methods/implante-5-anos.json"),
  "inyectable-mensual": () => import("@/content/methods/inyectable-mensual.json"),
  "inyectable-trimestral": () => import("@/content/methods/inyectable-trimestral.json"),
  "pildora-solo-progestina": () => import("@/content/methods/pildora-solo-progestina.json"),
  "pildora-combinada": () => import("@/content/methods/pildora-combinada.json"),
  "parche-combinado": () => import("@/content/methods/parche-combinado.json"),
  "anillo-combinado": () => import("@/content/methods/anillo-combinado.json"),
  "barrera": () => import("@/content/methods/barrera.json"),
  "anticoncepcion-de-emergencia": () => import("@/content/methods/anticoncepcion-de-emergencia.json"),
};

export const dynamicParams = true;

export async function generateStaticParams() {
  // Generamos desde METHOD_FILES para no desincronizar
  return Object.keys(METHOD_FILES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 Next 16: params es Promise
  const loader = METHOD_FILES[slug];
  if (!loader) return {};
  const { default: data } = await loader();
  return {
    title: `${data.name} — Métodos`,
    description: data.summary?.slice(0, 160) ?? "",
    openGraph: {
      title: data.name,
      description: data.summary?.slice(0, 200) ?? "",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 Next 16: params es Promise

  const loader = METHOD_FILES[slug];
  if (!loader) notFound();

  const { default: data } = await loader();

  return (
    <section className="section">
      <div className="container max-w-4xl">
        {/* Cabecera */}
        <div className="mb-6">
          <span className="kicker">Ficha informativa</span>
          <h1 className="h1 mt-2">{data.name}</h1>
          <div className="underbar" />
          <p className="mt-3 text-neutral-700">{data.summary}</p>
        </div>

        {/* Datos rápidos */}
        <div className="card p-6 sm:p-7">
          <h2 className="h2">Datos rápidos</h2>
          <div className="underbar" />
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(data.quick || {}).map(([k, v]) => (
              <div key={k} className="flex items-start gap-3">
                <dt className="min-w-36 text-sm font-medium capitalize text-neutral-600">
                  {k.replaceAll("_", " ")}
                </dt>
                <dd className="text-sm">{v}</dd>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <dt className="min-w-36 text-sm font-medium capitalize text-neutral-600">
                Protección ITS
              </dt>
              <dd className="text-sm">{data.quick?.protege_its ?? "—"}</dd>
            </div>
          </dl>
        </div>

        {/* Eficacia */}
        {data.efficacy && (
          <div className="mt-8 card p-6 sm:p-7">
            <h2 className="h2">Eficacia</h2>
            <div className="underbar" />
            <p className="mt-3 text-sm text-neutral-700">
              Tasa de fallo por año de uso ({data.efficacy.nota ?? "aprox."})
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {"typical_failure_rate_pct" in data.efficacy && (
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-neutral-600">Uso típico</div>
                  <div className="text-3xl font-extrabold">
                    {data.efficacy.typical_failure_rate_pct}%{" "}
                    <span className="text-base font-semibold">fallos/año</span>
                  </div>
                </div>
              )}
              {"perfect_failure_rate_pct" in data.efficacy && (
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-neutral-600">Uso perfecto</div>
                  <div className="text-3xl font-extrabold">
                    {data.efficacy.perfect_failure_rate_pct}%{" "}
                    <span className="text-base font-semibold">fallos/año</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cómo funciona */}
        {data.how_it_works?.length ? (
          <div className="mt-8 card p-6 sm:p-7">
            <h2 className="h2">¿Cómo funciona?</h2>
            <div className="underbar" />
            <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
              {data.how_it_works.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Ventajas / Consideraciones */}
        {(data.advantages?.length || data.disadvantages?.length) && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {data.advantages?.length ? (
              <div className="card p-6 sm:p-7">
                <h3 className="h2">Ventajas</h3>
                <div className="underbar" />
                <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
                  {data.advantages.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div />
            )}

            {data.disadvantages?.length ? (
              <div className="card p-6 sm:p-7">
                <h3 className="h2">Consideraciones</h3>
                <div className="underbar" />
                <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
                  {data.disadvantages.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* Efectos comunes */}
        {data.common_effects?.length ? (
          <div className="mt-8 card p-6 sm:p-7">
            <h2 className="h2">Efectos/ajustes frecuentes</h2>
            <div className="underbar" />
            <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
              {data.common_effects.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* CTA Test */}
        <div className="mt-8 card p-6 sm:p-7 bg-[--color-brand-50] border-[--color-brand-100]">
          <h2 className="h2">Elegibilidad médica</h2>
          <div className="underbar" />
          <p className="mt-3 text-sm text-neutral-800">
            La elegibilidad depende de tu historia clínica. Resuelve el <strong>Test MEC</strong> para ver si este método
            es <em>1–2: apto</em>, <em>3: precaución</em> o <em>4: no usar</em> según las guías.
          </p>
          <div className="mt-4">
            <Link href="/test" className="btn text-white gradient-cta shadow hover:brightness-105">
              Ir al test
            </Link>
          </div>
        </div>

        {/* Referencias */}
        {data.references?.length ? (
          <div className="mt-8 card p-6 sm:p-7">
            <h2 className="h2">Referencias</h2>
            <div className="underbar" />
            <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
              {data.references.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
