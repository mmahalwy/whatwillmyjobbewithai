"use client";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/types";

interface CategoryFilterProps {
  selected: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(null)}
      >
        All
      </Button>
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
