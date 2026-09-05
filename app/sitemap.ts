import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { caseStudies } from "@/data/caseStudies";
import { guidePages, servicePages } from "@/data/seoContent";

const siteUrl = company.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2
    }
  ];

  const services: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${siteUrl}/solucoes/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const projects: MetadataRoute.Sitemap = caseStudies.map((project) => ({
    url: `${siteUrl}/projetos/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const guides: MetadataRoute.Sitemap = guidePages.map((page) => ({
    url: `${siteUrl}/guias/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.65
  }));

  return [...corePages, ...services, ...projects, ...guides];
}
