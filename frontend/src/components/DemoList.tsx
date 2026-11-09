




"use client";

import { useState } from "react";
import { type DemoItem, getAvailableCategories } from "@/content/demos";
import DemoCard from "./DemoCard";

interface DemoListProps {
  initialDemos: DemoItem[];
}

export default function DemoList({ initialDemos }: DemoListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = getAvailableCategories();

  const filteredDemos =
    activeCategory === "All"
      ? initialDemos
      : initialDemos.filter((d) => d.category === activeCategory);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Category Filter Tabs (Only shown if categories exist beyond 'All') */}
      {categories.length > 1 && (
        <div className="flex items-center justify-center">
          <div
            role="tablist"
            aria-label="Filter software demos by category"
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#E0D9CA] bg-[#FAF8F5]/90 p-1.5 shadow-2xs backdrop-blur-xs"
          >
            {categories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-4 py-2 font-headline text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border border-[#141413] bg-[#141413] text-[#FAF7E8] shadow-xs"
                      : "border border-transparent bg-transparent text-[#555047] hover:border-[#DDD6C5] hover:bg-white hover:text-[#141413]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Demos Showcase Grid */}
      <div className="space-y-8 sm:space-y-12" role="region" aria-label="Software Demos List">
        {filteredDemos.map((demo) => (
          <DemoCard key={demo.id} demo={demo} />
        ))}

        {filteredDemos.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#DDD6C5] bg-white p-12 text-center">
            <h3 className="font-serif text-xl font-normal text-[#141413]">
              No active demos in this category yet
            </h3>
            <p className="mt-2 font-body text-sm text-[#7A756D]">
              New interactive systems are currently being built and tested. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
