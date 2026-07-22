import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://catech.ind.br"),
  title: {
    default: "Catech 360 | Usinagem CNC, Plásticos Industriais e Máquinas",
    template: "%s | Catech 360",
  },
  description:
    "Peças sob desenho, engenharia reversa, plásticos industriais e máquinas CNC de fabricação própria. Assistência técnica e retrofit em Uberlândia MG.",
  openGraph: {
    siteName: "Catech 360",
    type: "website",
    locale: "pt_BR",
    title: "Catech 360 | Usinagem CNC, Plásticos Industriais e Máquinas",
    description:
      "Peças sob desenho, engenharia reversa, plásticos industriais e máquinas CNC de fabricação própria. Assistência técnica e retrofit em Uberlândia MG.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060d17" },
  ],
};

const THEME_INIT_SCRIPT = `
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Aplica o tema salvo antes da primeira pintura, evitando flash do tema errado. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
