"use client";

import { KeyboardEvent, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const projects = [caseStudies[3], caseStudies[0], caseStudies[1], caseStudies[2]];
const accentColors = ["#e6b329", "#35b957", "#1479d8", "#f06a18"];

export function ProjectExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const active = projects[activeIndex];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = activeIndex;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = caseStudies.length - 1;
    else if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (activeIndex + 1) % projects.length;
    else next = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="project-explorer grid overflow-hidden border border-white/14 bg-[#071421] lg:grid-cols-[1.48fr_.72fr]">
      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${activeIndex}`} className="relative min-h-[430px] overflow-hidden sm:min-h-[560px]">
        <div key={active.slug} className="project-media-enter absolute inset-0">
          <Image src={active.image} alt={`${active.title} em ${active.location}`} fill sizes="(min-width:1024px) 70vw, 100vw" className="object-cover" style={{ objectPosition: active.objectPosition }} priority={activeIndex === 3} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,18,.05),rgba(2,8,18,.08)_45%,rgba(2,8,18,.94))]" />
        <div className="absolute left-5 top-5 flex items-center gap-2 bg-[#020812]/78 px-3 py-2 text-[0.64rem] font-black uppercase tracking-[0.16em] text-white/78 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColors[activeIndex] }} /> {active.category} · {active.status}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: accentColors[activeIndex] }}>Projeto 0{activeIndex + 1}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5 border-t border-white/18 pt-5">
            <div>
              <h3 className="max-w-2xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-4xl">{active.title}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/65"><MapPin aria-hidden className="h-4 w-4 text-solar-gold" />{active.location}</p>
            </div>
            <div className="sm:text-right">
              <p className="tabular-nums text-3xl font-black">{active.power}</p>
              <Link href={`/projetos/${active.slug}`} className="mt-3 inline-flex items-center gap-2 border-b border-white/35 pb-1 text-sm font-black hover:border-solar-gold hover:text-solar-gold">Abrir estudo de caso <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div role="tablist" aria-label="Selecionar projeto" onKeyDown={onKeyDown} className="grid border-t border-white/14 lg:border-l lg:border-t-0">
        {projects.map((project, index) => {
          const selected = index === activeIndex;
          return (
            <button key={project.slug} id={`${baseId}-tab-${index}`} type="button" role="tab" aria-selected={selected} aria-controls={`${baseId}-panel`} tabIndex={selected ? 0 : -1} onClick={() => setActiveIndex(index)} className="project-tab group relative grid min-h-[118px] w-full grid-cols-[36px_1fr_auto] items-center gap-4 border-b border-white/12 px-5 py-5 text-left last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-solar-gold lg:min-h-0">
              <span className="text-[0.65rem] font-black tracking-[0.14em] text-white/35">0{index + 1}</span>
              <span>
                <strong className={`block text-base font-black transition-colors ${selected ? "text-white" : "text-white/62 group-hover:text-white"}`}>{project.title}</strong>
                <small className="mt-2 block text-xs text-white/42">{project.location}</small>
              </span>
              <span className="h-8 w-1 origin-bottom transition-transform duration-200" style={{ backgroundColor: accentColors[index], transform: selected ? "scaleY(1)" : "scaleY(.25)" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
