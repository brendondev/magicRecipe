"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "@/app/components/section-title";
import { CookingPot } from "@phosphor-icons/react";
import { Recipe } from "./recipe";

type StoredRecipe = {
  title: string;
  createdAt: number;
};

export const LastRecipes = () => {
  const [recipes, setRecipes] = useState<StoredRecipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recent-recipes");
    if (stored) {
      const parsed: StoredRecipe[] = JSON.parse(stored);
      parsed.sort((a, b) => b.createdAt - a.createdAt);
      setRecipes(parsed);
    }
  }, []);

  return (
    <section className="container py-16">
      <CookingPot />
      <SectionTitle title="Receitas recentes" subtitle="últimas receitas" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3">
        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            recipe={{
              icon: <CookingPot />,
              name: recipe.title,
              image: "",
              startDate: new Date(recipe.createdAt).toISOString(),
            }}
          />
        ))}
      </div>
    </section>
  );
};
