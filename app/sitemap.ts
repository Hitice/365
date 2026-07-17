import type { MetadataRoute } from "next";

// Troque pelo domínio definitivo quando ele existir (ou defina
// NEXT_PUBLIC_SITE_URL no ambiente de deploy).
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://catech360.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/produtos", "/servicos", "/maquinas"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
