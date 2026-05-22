import Image from "next/image";
import QuestionForm from "@/components/question-form";
import logoExpedienteCheck from "../assets/images/logo/logo_expedientecheck.png";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center gap-4 py-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-brand-blue/10">
            <Image
              src={logoExpedienteCheck}
              alt="Logo de ExpedienteCheck"
              width={42}
              height={42}
              priority
              className="h-10 w-10 object-contain"
            />
          </div>
          <div>
            <p className="text-lg font-bold leading-tight text-brand-blue">
              ExpedienteCheck
            </p>
            <p className="text-sm font-medium leading-5 text-slate-600">
              Inteligencia para inversión pública
            </p>
          </div>
        </header>

        <div className="grid gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-12 lg:py-16">
          <section className="lg:sticky lg:top-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Consulta abierta
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.04] text-brand-blue sm:text-5xl lg:text-6xl">
              ¿Qué dudas tienes sobre inversión pública?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Queremos entender los problemas y dudas reales sobre Invierte.pe,
              ejecución, presupuesto, tesoro y seguimiento de inversiones
              públicas para construir herramientas más útiles para el sector
              público.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                ["Invierte.pe", "Preguntas reales"],
                ["Gestión", "Ejecución y seguimiento"],
                ["Herramientas", "Soluciones útiles"]
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-lg border border-brand-blue/10 bg-white/70 p-4"
                >
                  <p className="text-sm font-bold text-brand-blue">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <QuestionForm />
        </div>
      </section>

      <section className="border-t border-brand-blue/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              ¿Por qué hacemos esto?
            </p>
            <p className="mt-4 text-xl font-bold leading-8 text-brand-blue">
              En ExpedienteCheck creemos que muchas de las dificultades en
              inversión pública se repiten constantemente.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-700">
              Queremos entender mejor esos problemas para construir herramientas
              inteligentes y preventivas que ayuden a mejorar la gestión
              pública.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
