import type { Metadata } from "next";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { Section01Hero } from "@/components/home/Section01Hero";
import { Section02Challenge } from "@/components/home/Section02Challenge";
import { Section03Loop } from "@/components/home/Section03Loop";
import { Section04Primitives } from "@/components/home/Section04Primitives";
import { Section05Services } from "@/components/home/Section05Services";
import { Section06Contact } from "@/components/home/Section06Contact";
import { Section07Faq } from "@/components/home/Section07Faq";
import { Section08Careers } from "@/components/home/Section08Careers";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Ground truth for physical AI",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <ProgressRail />
      <Section01Hero />
      <Section02Challenge />
      <Section03Loop />
      <Section04Primitives />
      <Section05Services />
      <Section06Contact />
      <Section07Faq />
      <Section08Careers />
    </>
  );
}
