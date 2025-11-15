// src/components/HeroGlow.tsx
import React from "react";

export const HeroGlow: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-slate-50">
      {/* Calque de glow derrière le contenu */}
      <div className="hero-glow-bg pointer-events-none absolute inset-0 -z-10 blur-3xl" />


      {/* Contenu hero exemple */}
      <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-start justify-center px-6 py-16 md:px-10">
        <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/70">
          Beta • Produit AI
        </span>

        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Un hero avec arrière-plan lumineux
          <span className="block text-sky-300/90">à la Lovable.dev</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm text-slate-200/70 md:text-base">
          Calque de glow en absolu, dégradés radiaux, blur massif et animation
          combinée pour un fondu propre + une légère respiration visuelle.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button className="rounded-full bg-sky-400 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-lg shadow-sky-500/40 transition hover:bg-sky-300">
            Call to action
          </button>
          <button className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-50/80 hover:bg-white/10">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};
