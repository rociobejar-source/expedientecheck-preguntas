const SHEET_NAME = 'Respuestas';

const HEADERS = [
  'Fecha',
  'Nombre o iniciales',
  'Relación con sector público',
  'Centro de trabajo',
  'Tema',
  'Pregunta principal',
  'Herramienta o solución deseada',
  'Desea recibir recursos',
  'Correo electrónico',
  'URL de origen',
  'User agent'
];

function doGet() {
  return jsonResponse({
    ok: true,
    message: 'ExpedienteCheck Apps Script activo.'
  });
}

function doPost(e) {
  try {
    const payload = parsePayload(e);
    validatePayload(payload);

    const sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      safeText(payload.nombre),
      safeText(payload.relacionSectorPublico),
      safeText(payload.centroTrabajo),
      safeText(payload.tema),
      safeText(payload.pregunta),
      safeText(payload.herramienta),
      safeText(payload.recibirRecursos),
      safeText(payload.correo),
      safeText(payload.pageUrl),
      safeText(payload.userAgent)
    ]);

    return jsonResponse({
      ok: true,
      message: 'Respuesta registrada correctamente.'
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      message: error && error.message ? error.message : 'No se pudo registrar la respuesta.'
    });
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('No se recibieron datos del formulario.');
  }

  return JSON.parse(e.postData.contents);
}

function validatePayload(payload) {
  if (!payload.tema || !String(payload.tema).trim()) {
    throw new Error('El tema es obligatorio.');
  }

  if (!payload.pregunta || !String(payload.pregunta).trim()) {
    throw new Error('La pregunta principal es obligatoria.');
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeaders(sheet);
  return sheet;
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(function (cell) {
    return cell !== '';
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

function safeText(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
