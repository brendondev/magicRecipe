"use client";

import { Header } from "./components/header"
import { HeroSection } from "./components/pages/home/hero-section"
import { LastRecipes } from "./components/pages/home/last-recipes";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <LastRecipes />
    </>
  )
}
