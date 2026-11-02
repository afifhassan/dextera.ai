import Link from "next/link";
import type { BlogCategory } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type PostSummary = {
  slug: string;
  title: string;
  intro: string;
  category: BlogCategory;
  date: string;
  readingMinutes: number;
  draft: boolean;
};

export function PostArt({
  category,
  className,
}: {
  category: BlogCategory;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[9px] border border-bench/10 bg-ink",
        className,
      )}
      aria-hidden="true"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-70" />
      <svg viewBox="0 0 480 280" className="relative h-full w-full">
        {category === "Simulation" ? <SimulationArt /> : null}
        {category === "Data" ? <DataArt /> : null}
        {category === "Testing" ? <TestingArt /> : null}
      </svg>
    </div>
  );
}

function SimulationArt() {
  return (
    <g fill="none">
      <path d="M52 224h376" stroke="#EEF1F4" strokeOpacity="0.3" />
      <path d="M52 224V54M52 224h376" stroke="#EEF1F4" strokeOpacity="0.18" />
      <path
        d="M76 188 C130 148 172 128 222 126 C280 124 322 148 380 88"
        stroke="#EEF1F4"
        strokeWidth="1.6"
        strokeOpacity="0.85"
      />
      <path
        d="M76 196 C134 166 174 143 224 140 C282 137 324 158 380 104"
        stroke="#EEF1F4"
        strokeWidth="1.1"
        strokeOpacity="0.34"
        strokeDasharray="3 5"
      />
      <path
        d="M76 188 C130 148 172 128 222 126 C280 124 322 148 380 88 L380 104 C324 158 282 137 224 140 C174 143 134 166 76 196 Z"
        fill="#EEF1F4"
        fillOpacity="0.06"
      />
      <circle cx="222" cy="126" r="3.5" fill="#F0A12B" />
      <circle cx="222" cy="126" r="13" stroke="#F0A12B" strokeOpacity="0.25" />
      <path
        d="M380 88v136M76 224h304"
        stroke="#EEF1F4"
        strokeOpacity="0.2"
        strokeDasharray="2 7"
      />
      <text
        x="70"
        y="38"
        fill="#EEF1F4"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.5"
      >
        MEASURED / SIMULATED
      </text>
    </g>
  );
}

function DataArt() {
  const dots = Array.from({ length: 90 }, (_, index) => ({
    x: 118 + ((index * 37) % 250),
    y: 68 + ((index * 61) % 148),
    o: 0.2 + (index % 5) * 0.12,
  }));

  return (
    <g fill="none">
      <path d="M58 232h364" stroke="#EEF1F4" strokeOpacity="0.28" />
      <path
        d="M78 208 L136 78 L260 92 L312 198 Z"
        stroke="#EEF1F4"
        strokeOpacity="0.22"
      />
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={index % 11 === 0 ? 2 : 1.2}
          fill="#EEF1F4"
          opacity={dot.o}
        />
      ))}
      <path
        d="M102 170 C150 152 186 174 226 148 C266 122 296 142 338 112"
        stroke="#EEF1F4"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <rect
        x="344"
        y="64"
        width="46"
        height="34"
        rx="4"
        stroke="#F0A12B"
        strokeOpacity="0.7"
      />
      <path d="M352 76h30M352 84h22" stroke="#F0A12B" strokeOpacity="0.45" />
      <path d="M334 54l5 10h-10z" fill="#F0A12B" />
      <text
        x="72"
        y="38"
        fill="#EEF1F4"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.5"
      >
        REAL WORK / VERIFIED
      </text>
    </g>
  );
}

function TestingArt() {
  return (
    <g fill="none">
      <path d="M58 228h364" stroke="#EEF1F4" strokeOpacity="0.26" />
      <path
        d="M120 202 A100 100 0 0 1 320 202"
        stroke="#EEF1F4"
        strokeOpacity="0.4"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M134 202 A86 86 0 0 1 306 202"
        stroke="#EEF1F4"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeDasharray="3 7"
      />
      <path d="M220 202l54-68" stroke="#EEF1F4" strokeOpacity="0.55" />
      <circle cx="220" cy="202" r="4.5" fill="#F0A12B" />
      <circle cx="220" cy="202" r="17" stroke="#F0A12B" strokeOpacity="0.25" />
      <path d="M118 230h204" stroke="#EEF1F4" strokeOpacity="0.25" />
      <path
        d="M166 176 C198 158 238 160 272 180"
        stroke="#EEF1F4"
        strokeOpacity="0.28"
      />
      <text
        x="72"
        y="38"
        fill="#EEF1F4"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.5"
      >
        REFERENCE / REPEATABLE
      </text>
    </g>
  );
}

export function PostCard({
  post,
  featured = false,
}: {
  post: PostSummary;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group grid grid-cols-1 overflow-hidden rounded-[12px] border border-steel/15 bg-ink/[0.015] transition-colors duration-500 hover:border-deep/35",
        featured ? "lg:grid-cols-12" : "",
      )}
    >
      <div
        className={cn(
          "overflow-hidden p-3",
          featured ? "lg:col-span-5 lg:p-4" : "",
        )}
      >
        <PostArt
          category={post.category}
          className={featured ? "h-full min-h-[220px]" : "aspect-[16/9]"}
        />
      </div>
      <div
        className={cn(
          "flex flex-col p-6 sm:p-7",
          featured ? "lg:col-span-7 lg:justify-center lg:p-10" : "",
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep">
            {post.category}
          </span>
          {post.draft ? (
            <span className="rounded-full border border-steel/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-steel">
              Draft
            </span>
          ) : null}
        </div>
        <h3
          className={cn(
            "mt-4 text-balance font-semibold leading-[1.08] tracking-[-0.035em] text-ink transition-colors duration-300 group-hover:text-deep",
            featured ? "text-[clamp(1.8rem,3.4vw,2.8rem)]" : "text-xl",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-[13px] leading-[1.7] text-steel",
            featured ? "max-w-xl text-sm" : "",
          )}
        >
          {post.intro}
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-steel">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
