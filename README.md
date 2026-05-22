# ExpedienteCheck - Landing de preguntas sobre inversión pública

Mini landing page funcional para recopilar preguntas y dudas reales sobre inversión pública en Perú. Esta versión está pensada para uso rápido en clase: los alumnos escanean un QR, completan el formulario y las respuestas se guardan automáticamente en Google Sheets.

## Stack

- Next.js
- TypeScript
- TailwindCSS
- Google Apps Script
- Google Sheets
- Vercel

## Identidad visual

La landing sigue el archivo `BRAND.md` del proyecto:

- Azul institucional: `#0B2341`
- Beige editorial: `#F4EFE7`
- Dorado de acento: `#D4A62A`
- Verde operativo: `#1D8F6A`
- Rojo de alerta: `#D64545`
- Texto editorial: `#1C1C1C`

El logo se carga desde:

```txt
assets/images/logo/logo_expedientecheck.png
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx_REEMPLAZA_CON_TU_URL/exec
```

`GOOGLE_SCRIPT_URL` es la URL del despliegue web de Google Apps Script. No necesita prefijo `NEXT_PUBLIC_` porque solo se usa en el endpoint interno de Next.js.

## Desarrollo local

Instala dependencias:

```bash
npm install
```

Ejecuta el servidor local:

```bash
npm run dev
```

Abre:

```txt
http://localhost:3000
```

Si ese puerto ya está ocupado, Next.js puede usar otro puerto. También puedes fijarlo manualmente:

```bash
npm run dev -- --port 3017 --hostname 127.0.0.1
```

## 1. Crear el Google Sheet

1. Entra a Google Drive.
2. Crea una hoja de cálculo nueva.
3. Ponle un nombre claro, por ejemplo: `ExpedienteCheck - Preguntas clase`.
4. Puedes dejar la primera hoja vacía. El script creará o usará una pestaña llamada `Respuestas`.

## 2. Crear el Google Apps Script

1. En el Google Sheet, ve a `Extensiones` > `Apps Script`.
2. Borra el contenido inicial de `Code.gs`.
3. Copia y pega el contenido de:

```txt
google-apps-script/Code.gs
```

4. Guarda el proyecto con un nombre, por ejemplo: `ExpedienteCheck Formulario`.

## 3. Publicar el Apps Script como Web App

1. En Apps Script, haz clic en `Implementar` > `Nueva implementación`.
2. En `Seleccionar tipo`, elige `Aplicación web`.
3. Configura:
   - `Ejecutar como`: `Yo`
   - `Quién tiene acceso`: `Cualquier usuario`
4. Haz clic en `Implementar`.
5. Google pedirá autorización. Acepta los permisos para escribir en tu hoja.
6. Copia la URL que termina en `/exec`.

La documentación oficial de Google indica que una Web App debe exponer `doGet` o `doPost`, y que se publica desde `Deploy` > `New deployment` como tipo `Web app`: https://developers.google.com/apps-script/guides/web

## 4. Conectar el formulario

1. Crea `.env.local` en la raíz del proyecto.
2. Pega la URL del Apps Script:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_DE_IMPLEMENTACION/exec
```

3. Reinicia el servidor local si estaba corriendo:

```bash
npm run dev
```

4. Envía una respuesta de prueba desde `http://localhost:3000`.
5. Revisa que aparezca una fila nueva en la pestaña `Respuestas` del Google Sheet.

## 5. Deploy en Vercel

Opción recomendada con GitHub:

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a Vercel y elige `Add New` > `Project`.
3. Importa el repositorio.
4. Vercel detectará Next.js automáticamente.
5. En `Environment Variables`, agrega:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_DE_IMPLEMENTACION/exec
```

6. Haz clic en `Deploy`.

La documentación oficial de Vercel indica que Next.js funciona con despliegue de configuración cero y que las variables de entorno se agregan desde `Project Settings` > `Environment Variables`: https://vercel.com/docs/frameworks/full-stack/nextjs y https://vercel.com/docs/environment-variables/managing-environment-variables

Opción con Vercel CLI:

```bash
npm install
npm run build
npx vercel
```

Luego configura la variable `GOOGLE_SCRIPT_URL` en el panel de Vercel y redeploya.

## 6. Obtener el link final

Después del deploy, Vercel mostrará una URL similar a:

```txt
https://tu-proyecto.vercel.app
```

Abre ese enlace, envía una respuesta de prueba y confirma que llega al Google Sheet.

## 7. Crear QR para compartir en clase

Opción rápida con Chrome:

1. Abre el enlace final de Vercel en Google Chrome.
2. Haz clic derecho sobre la página.
3. Selecciona `Crear código QR para esta página`.
4. Descarga el QR.
5. Pruébalo con tu celular antes de la clase.

Google documenta esta función en Chrome como `Create QR code` dentro de las opciones para compartir páginas: https://support.google.com/chrome/answer/10051760

Opción alternativa:

1. Copia el enlace final de Vercel.
2. Usa un generador de QR confiable.
3. Descarga el PNG.
4. Prueba el QR con datos móviles y Wi-Fi.

## Campos del formulario

- Nombre o iniciales: opcional
- Relación con el sector público: opcional
- Centro de trabajo: opcional
- Tema que genera más dudas: obligatorio
- Principal duda o pregunta: obligatorio
- Herramienta o solución deseada: opcional
- Desea recibir contenido o recursos: opcional
- Correo electrónico: opcional

## Validaciones

El formulario valida en cliente y servidor:

- `tema` es obligatorio.
- `pregunta` es obligatoria.
- `correo` debe tener formato válido si se completa.

## Archivos principales

```txt
app/page.tsx                     Landing principal
components/question-form.tsx      Formulario y validaciones
app/api/submit/route.ts           Endpoint interno de Next.js
google-apps-script/Code.gs        Script para Google Sheets
app/globals.css                   Estilos Tailwind y tokens de marca
.env.example                      Variable requerida
```

## Notas para uso en clase

- Haz una prueba completa antes de compartir el QR.
- Mantén abierto el Google Sheet para verificar respuestas en tiempo real.
- Si cambias el Apps Script, vuelve a implementar una nueva versión y actualiza `GOOGLE_SCRIPT_URL` si Google entrega una URL distinta.
- Si cambias variables de entorno en Vercel, haz un nuevo deploy para que se apliquen.
