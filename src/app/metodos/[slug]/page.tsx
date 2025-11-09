// src/app/metodos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { findBySlug } from "@/data/methods.meta";

type MethodContent = {
  name: string;
  summary: string;
  quick: Record<string, string>;
  efficacy?: {
    typical_failure_rate_pct?: number;
    perfect_failure_rate_pct?: number;
    nota?: string;
  };
  how_it_works?: string[];
  advantages?: string[];
  disadvantages?: string[];
  common_effects?: string[];
  emergency?: boolean;
  references?: string[];
};

const METHOD_FILES: Record<string, () => Promise<{ default: MethodContent }>> = {
  "diu-cobre": () => import("@/content/methods/diu-cobre.json"),
  "diu-hormonal": () => import("@/content/methods/diu-hormonal.json"),
  "implante": () => import("@/content/methods/implante.json"),
  "inyectable-mensual": () => import("@/content/methods/inyectable-mensual.json"),
  "inyectable-trimestral": () =>
    import("@/content/methods/inyectable-trimestral.json"),
  "pildora-solo-progestina": () =>
    import("@/content/methods/pildora-solo-progestina.json"),
  "pildora-combinada": () =>
    import("@/content/methods/pildora-combinada.json"),
  "parche-combinado": () =>
    import("@/content/methods/parche-combinado.json"),
  "anillo-combinado": () =>
    import("@/content/methods/anillo-combinado.json"),
  "barrera": () => import("@/content/methods/barrera.json"),
  "anticoncepcion-de-emergencia": () =>
    import("@/content/methods/anticoncepcion-de-emergencia.json"),
  "metodos-naturales": () =>
    import("@/content/methods/metodos-naturales.json"),
};

const METHOD_IMAGES: Record<string, string> = {
  "diu-cobre": "/images/methods/diu.png",
  "diu-hormonal": "/images/methods/diu.png",
  "implante": "/images/methods/implante.png",
  "barrera": "/images/methods/barrera.png",
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return Object.keys(METHOD_FILES).map((slug) => ({ slug }));
}

type ParamsInput = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ParamsInput) {
  const { slug } = await params;
  const loader = METHOD_FILES[slug];
  if (!loader) return {};

  const { default: data } = await loader();
  const meta = findBySlug(slug);

  const description =
    data.summary?.slice(0, 160) ?? meta?.blurb ?? "Información sobre método anticonceptivo.";

  return {
    title: `${data.name} — Métodos`,
    description,
    openGraph: {
      title: `${data.name} — Métodos`,
      description,
    },
  };
}

export default async function Page({ params }: ParamsInput) {
  const { slug } = await params;

  const loader = METHOD_FILES[slug];
  if (!loader) notFound();

  const { default: data } = await loader();

  const meta = findBySlug(slug);
  if (!meta) notFound();

  const img = METHOD_IMAGES[slug];

  return (
    <section className="section">
      <div className="container max-w-4xl">
        {/* Cabecera */}
        <div className="mb-6">
          <span className="kicker">Ficha informativa</span>
          <h1 className="h1 mt-2">{data.name}</h1>
          <div className="underbar" />
          <p className="mt-3 text-neutral-700">{data.summary}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {meta.tags.includes("hormonal") && (
              <span className="badge">Hormonal</span>
            )}
            {meta.tags.includes("no-hormonal") && (
              <span className="badge">No hormonal</span>
            )}
            {meta.tags.includes("larc") && (
              <span className="badge">Larga duración (LARC)</span>
            )}
            {meta.tags.includes("emergencia") && (
              <span className="badge">También como emergencia</span>
            )}
          </div>

          {img && (
            <div className="mt-4">
              <Image
                src={img}
                alt={data.name}
                width={640}
                height={360}
                className="w-full max-h-64 object-contain rounded-2xl bg-[--color-brand-50] p-4"
              />
            </div>
          )}
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
              Tasa de fallo por año de uso (
              {data.efficacy.nota ?? "aprox."})
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {typeof data.efficacy.typical_failure_rate_pct === "number" && (
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-neutral-600">Uso típico</div>
                  <div className="text-3xl font-extrabold">
                    {data.efficacy.typical_failure_rate_pct}
                    <span className="text-base font-semibold">
                      {" "}
                      % fallos/año
                    </span>
                  </div>
                </div>
              )}
              {typeof data.efficacy.perfect_failure_rate_pct === "number" && (
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-neutral-600">Uso perfecto</div>
                  <div className="text-3xl font-extrabold">
                    {data.efficacy.perfect_failure_rate_pct}
                    <span className="text-base font-semibold">
                      {" "}
                      % fallos/año
                    </span>
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

        {/* CTA Test + Comparar */}
        <div className="mt-8 card p-6 sm:p-7 bg-[--color-brand-50] border-[--color-brand-100]">
          <h2 className="h2">Elegibilidad médica</h2>
          <div className="underbar" />
          <p className="mt-3 text-sm text-neutral-800">
            La elegibilidad depende de tu historia clínica. Resuelve el{" "}
            <strong>Test MEC</strong> para ver si este método se clasifica
            como <em>1–2 (apto)</em>, <em>3 (precaución)</em> o{" "}
            <em>4 (no recomendado)</em>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/test"
              className="btn text-white gradient-cta shadow hover:brightness-105"
            >
              Hacer el test
            </Link>
            <Link href="/comparar" className="btn btn-ghost">
              Comparar con otros métodos
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
