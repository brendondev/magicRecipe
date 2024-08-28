"use client";

import { DemoSection } from "./components/pages/home/demo";
import { HeroSection } from "./components/pages/home/hero-section";
import { HowWork } from "./components/pages/home/how-work";
import { LastRecipes } from "./components/pages/home/last-recipes";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <LastRecipes />
      <HowWork />
      <DemoSection />
    </>
  );
}
