import { NextRequest, NextResponse } from "next/server";

type SubmissionPayload = {
  nombre?: string;
  relacionSectorPublico?: string;
  centroTrabajo?: string;
  tema?: string;
  pregunta?: string;
  herramienta?: string;
  recibirRecursos?: string;
  correo?: string;
  pageUrl?: string;
  userAgent?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Falta configurar GOOGLE_SCRIPT_URL. Revisa las variables de entorno."
      },
      { status: 500 }
    );
  }

  let body: SubmissionPayload;

  try {
    body = (await request.json()) as SubmissionPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "No se pudo leer el formulario." },
      { status: 400 }
    );
  }

  const payload = {
    nombre: clean(body.nombre),
    relacionSectorPublico: clean(body.relacionSectorPublico),
    centroTrabajo: clean(body.centroTrabajo),
    tema: clean(body.tema),
    pregunta: clean(body.pregunta),
    herramienta: clean(body.herramienta),
    recibirRecursos: clean(body.recibirRecursos),
    correo: clean(body.correo),
    pageUrl: clean(body.pageUrl),
    userAgent: clean(body.userAgent)
  };

  if (!payload.tema || !payload.pregunta) {
    return NextResponse.json(
      {
        ok: false,
        message: "Completa el tema y tu principal duda antes de enviar."
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    const responseText = await response.text();
    let parsed: { ok?: boolean; message?: string } | null = null;

    try {
      parsed = JSON.parse(responseText) as { ok?: boolean; message?: string };
    } catch {
      parsed = null;
    }

    if (!response.ok || parsed?.ok === false) {
      return NextResponse.json(
        {
          ok: false,
          message:
            parsed?.message ||
            "Google Sheets no confirmó el registro. Inténtalo nuevamente."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Respuesta registrada correctamente."
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos conectar con Google Sheets. Revisa la URL del Apps Script."
      },
      { status: 502 }
    );
  }
}
