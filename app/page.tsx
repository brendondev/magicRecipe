"use client";

import { Header } from "./components/header"
import { HeroSection } from "./components/pages/home/hero-section"
import { HowWork } from "./components/pages/home/how-work";
import { LastRecipes } from "./components/pages/home/last-recipes";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <LastRecipes />
      <HowWork />
    </>
  )
}
