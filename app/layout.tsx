import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpedienteCheck | Dudas sobre inversión pública",
  description:
    "Formulario para recopilar preguntas y dudas reales sobre inversión pública en Perú.",
  openGraph: {
    title: "ExpedienteCheck | Dudas sobre inversión pública",
    description:
      "Ayúdanos a entender dudas reales sobre Invierte.pe, ejecución, presupuesto, tesoro y seguimiento de inversiones públicas.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
