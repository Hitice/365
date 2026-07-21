import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://catech.ind.br";

const PATHS = [
  "",
  "/produtos",
  "/usinagem",
  "/maquinas",
  "/assistencia-tecnica",
  "/portfolio",
  "/sobre",
  "/contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
