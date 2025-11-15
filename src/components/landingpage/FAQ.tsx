import { useId, useRef, useState, useEffect } from "react";

// Accordéon accessible, sans dépendances externes (React + Tailwind uniquement)
function AccordionItem({ id, question, answer, open, onToggle }: {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    // Calcule la hauteur du contenu pour une animation fluide
    const contentHeight = el.scrollHeight;
    setHeight(open ? contentHeight : 0);
  }, [open, question, answer]);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="group w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-lg font-semibold text-white">
          {question}
        </span>
        <svg
          className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 12.5a1 1 0 0 1-.7-.3l-5-5a1 1 0 1 1 1.4-1.4L10 10.1l4.3-4.3a1 1 0 0 1 1.4 1.4l-5 5a1 1 0 0 1-.7.3Z" />
        </svg>
      </button>

      <div
        id={id}
        role="region"
        ref={panelRef}
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300"
      >
        <div className="px-6 pb-5 text-zinc-300">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      q: "How do you score feasibility?",
      a: "We combine idea type, market size, niche and industry signals to produce a clear success score.",
    },
    {
      q: "Where does the data come from?",
      a: "We aggregate publicly available signals and up-to-date market references. No sensitive data required.",
    },
    {
      q: "Is my data private?",
      a: "Yes. Your inputs are kept private and used only to generate your analyses.",
    },
  ] as const;

  // Une seule ligne ouverte à la fois (comportement d'accordéon classique)
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectId = useId();

  return (
    <section id="faq" className="bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          FAQ
        </h2>

        {/* Lignes avec dropdown - une par question */}
        <div className="space-y-3 md:space-y-4 md:w-3/4 mx-auto">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              id={`${sectId}-item-${i}`}
              question={f.q}
              answer={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />)
          )}
        </div>
      </div>
    </section>
  );
}
