"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  nombre: string;
  relacionSectorPublico: string;
  centroTrabajo: string;
  tema: string;
  pregunta: string;
  herramienta: string;
  recibirRecursos: string;
  correo: string;
};

const initialState: FormState = {
  nombre: "",
  relacionSectorPublico: "",
  centroTrabajo: "",
  tema: "",
  pregunta: "",
  herramienta: "",
  recibirRecursos: "",
  correo: ""
};

const relationOptions = [
  "Sí, trabajo en temas relacionados al sector público",
  "Sí y además trabajo en temas de inversión pública",
  "No, pero me interesa"
];

const topicOptions = [
  "Formulación",
  "IOARR",
  "Ejecución de inversiones",
  "Presupuesto público",
  "Tesoro Público",
  "Contrataciones",
  "Avance físico y financiero",
  "Seguimiento de inversiones",
  "Cierre de inversiones",
  "Otro"
];

export default function QuestionForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => status !== "submitting", [status]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.tema.trim()) {
      nextErrors.tema = "Selecciona el tema que más dudas te genera.";
    }

    if (!form.pregunta.trim()) {
      nextErrors.pregunta = "Escribe tu principal duda o pregunta.";
    } else if (form.pregunta.trim().length < 8) {
      nextErrors.pregunta = "Agrega un poco más de detalle para entender mejor tu duda.";
    }

    if (form.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      nextErrors.correo = "Ingresa un correo válido o deja el campo vacío.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      setStatus("error");
      setMessage("Revisa los campos marcados para enviar tu pregunta.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent
        })
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || "No se pudo registrar la respuesta.");
      }

      setForm(initialState);
      setErrors({});
      setStatus("success");
      setMessage(
        "¡Gracias! Tu pregunta ayudará a construir herramientas más útiles para la inversión pública."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu pregunta. Inténtalo nuevamente."
      );
    }
  }

  return (
    <section className="rounded-lg border border-brand-blue/10 bg-white p-5 shadow-soft sm:p-7 lg:p-8">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
          Formulario
        </p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-brand-blue">
          Comparte tu duda principal
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Los campos marcados como obligatorios nos ayudan a ordenar mejor las
          preguntas de la clase.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="field-label" htmlFor="nombre">
            Nombre o iniciales
          </label>
          <input
            className="field-input"
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder="Ej. Ana, J.P., Equipo OPMI"
            value={form.nombre}
            onChange={(event) => updateField("nombre", event.target.value)}
          />
        </div>

        <fieldset>
          <legend className="field-label">
            ¿Trabajas en temas relacionados al sector público?
          </legend>
          <div className="mt-3 grid gap-2">
            {relationOptions.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-brand-blue/40 hover:bg-brand-beige/30"
              >
                <input
                  className="mt-1 h-4 w-4 border-slate-300 text-brand-blue focus:ring-brand-blue"
                  type="radio"
                  name="relacionSectorPublico"
                  value={option}
                  checked={form.relacionSectorPublico === option}
                  onChange={(event) =>
                    updateField("relacionSectorPublico", event.target.value)
                  }
                />
                <span className="text-sm font-medium leading-6 text-slate-700">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="field-label" htmlFor="centroTrabajo">
            ¿Cuál es tu centro de trabajo?
          </label>
          <input
            className="field-input"
            id="centroTrabajo"
            name="centroTrabajo"
            type="text"
            placeholder="Ej. municipalidad, gobierno regional, consultora"
            value={form.centroTrabajo}
            onChange={(event) => updateField("centroTrabajo", event.target.value)}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="tema">
            ¿Qué tema te genera más dudas? <span className="text-brand-red">*</span>
          </label>
          <select
            className="field-input"
            id="tema"
            name="tema"
            required
            value={form.tema}
            aria-invalid={Boolean(errors.tema)}
            aria-describedby={errors.tema ? "tema-error" : undefined}
            onChange={(event) => updateField("tema", event.target.value)}
          >
            <option value="">Selecciona un tema</option>
            {topicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.tema ? (
            <p className="field-error" id="tema-error">
              {errors.tema}
            </p>
          ) : null}
        </div>

        <div>
          <label className="field-label" htmlFor="pregunta">
            Escribe tu principal duda o pregunta sobre inversión pública{" "}
            <span className="text-brand-red">*</span>
          </label>
          <textarea
            className="field-input min-h-36 resize-y"
            id="pregunta"
            name="pregunta"
            required
            placeholder="Ej. ¿Cómo puedo saber si una inversión está retrasada por presupuesto, contratación o expediente técnico?"
            value={form.pregunta}
            aria-invalid={Boolean(errors.pregunta)}
            aria-describedby={errors.pregunta ? "pregunta-error" : undefined}
            onChange={(event) => updateField("pregunta", event.target.value)}
          />
          {errors.pregunta ? (
            <p className="field-error" id="pregunta-error">
              {errors.pregunta}
            </p>
          ) : null}
        </div>

        <div>
          <label className="field-label" htmlFor="herramienta">
            ¿Qué herramienta o solución te gustaría que existiera?
          </label>
          <textarea
            className="field-input min-h-28 resize-y"
            id="herramienta"
            name="herramienta"
            placeholder="Ej. alertas tempranas, checklist, tablero, buscador, resumen automático"
            value={form.herramienta}
            onChange={(event) => updateField("herramienta", event.target.value)}
          />
        </div>

        <fieldset>
          <legend className="field-label">
            ¿Te gustaría recibir contenido o recursos sobre inversión pública?
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Sí", "No"].map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-brand-blue/40 hover:bg-brand-beige/30"
              >
                <input
                  className="h-4 w-4 border-slate-300 text-brand-blue focus:ring-brand-blue"
                  type="radio"
                  name="recibirRecursos"
                  value={option}
                  checked={form.recibirRecursos === option}
                  onChange={(event) =>
                    updateField("recibirRecursos", event.target.value)
                  }
                />
                <span className="text-sm font-medium text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="field-label" htmlFor="correo">
            Correo electrónico
          </label>
          <input
            className="field-input"
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            placeholder="nombre@entidad.gob.pe"
            value={form.correo}
            aria-invalid={Boolean(errors.correo)}
            aria-describedby={errors.correo ? "correo-error" : undefined}
            onChange={(event) => updateField("correo", event.target.value)}
          />
          {errors.correo ? (
            <p className="field-error" id="correo-error">
              {errors.correo}
            </p>
          ) : null}
        </div>

        {message ? (
          <div
            className={`rounded-lg border px-4 py-3 text-sm font-semibold leading-6 ${
              status === "success"
                ? "border-brand-green/30 bg-brand-green/10 text-brand-green"
                : "border-brand-red/30 bg-brand-red/10 text-brand-red"
            }`}
            role={status === "success" ? "status" : "alert"}
          >
            {message}
          </div>
        ) : null}

        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand-blue px-5 py-3 text-base font-bold text-white transition hover:bg-[#123153] focus:outline-none focus:ring-4 focus:ring-brand-blue/20 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={!canSubmit}
        >
          {status === "submitting" ? "Enviando..." : "Enviar pregunta"}
        </button>
      </form>
    </section>
  );
}
