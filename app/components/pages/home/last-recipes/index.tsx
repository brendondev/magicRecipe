import { SectionTitle } from "@/app/components/section-title"
import { CookingPot, ForkKnife } from "@phosphor-icons/react"
import { Recipe } from "./recipe"

export const LastRecipes = () => {
  return (
    <section className="container py-16">
      <CookingPot /> <SectionTitle title="Receitas recentes" subtitle="últimas receitas" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3">
        {Array.from({length: 4}).map((_, index) => (
            <Recipe key={index} recipe={{
            icon: <CookingPot />,
            name: "Macarrão com Sasicha",
            image: "",
            startDate: '2024/08/26'
           }} />
        ))}
      </div> 
    </section>
  )
}