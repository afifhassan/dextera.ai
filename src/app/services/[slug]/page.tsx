import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import {
  getRelatedServices,
  getService,
  services,
} from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} — Daxtera`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      images: [
        {
          url: `/og/services/${service.slug}.png`,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.related);
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://daxtera.example"
  ).replace(/\/$/, "");
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    serviceType: service.name,
    provider: { "@id": `${base}/#organization` },
    url: `${base}/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicePage service={service} related={related} />
    </>
  );
}
