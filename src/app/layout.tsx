import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { I18nProvider } from "@/i18n/i18n-context";
import { getLocale } from "@/i18n/get-locale";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-pp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cambio de perfil · Punto Pago",
  description:
    "Migración de número de app y verificación para cambio de perfil — Grupo Punto Pago Panamá",
  formatDetection: {
    telephone: false,
  },
};

/** Móvil: ancho correcto, notch/home indicator, color de barra de estado. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b13" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const htmlLang = locale === "ru" ? "ru" : locale === "en" ? "en" : "es";

  return (
    <html lang={htmlLang} className="h-full overflow-x-clip">
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} min-h-dvh overflow-x-clip bg-[var(--background)] font-sans text-[var(--foreground)] antialiased`}
      >
        <I18nProvider initialLocale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
