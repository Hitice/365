import type { Metadata, Viewport } from "next";
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
  title: {
    default: "Catech 360 | Produtos, Serviços e Máquinas CNC em Uberlândia",
    template: "%s | Catech 360",
  },
  description:
    "Produtos, serviços e máquinas: plásticos industriais em estoque, usinagem de precisão, moldes injetáveis e CNCs de fabricação própria em Uberlândia MG.",
  openGraph: {
    siteName: "Catech 360",
    type: "website",
    locale: "pt_BR",
    title: "Catech 360 | Produtos, Serviços e Máquinas CNC em Uberlândia",
    description:
      "Produtos, serviços e máquinas: plásticos industriais em estoque, usinagem de precisão, moldes injetáveis e CNCs de fabricação própria em Uberlândia MG.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
