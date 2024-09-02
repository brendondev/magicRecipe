import { SectionTitle } from "@/app/components/section-title"
import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export const PageIntroduction = () => {
  return (
    <section className="w-full h-[450px] lg:[640px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-2">
      <SectionTitle
      subtitle=""
      title="Gerador de Receitas"
      className="text-center items-center [&>h3]:text-4xl"
      />
      <div className="flex flex-col items-center">
        <p className="text-gray-400 text-center max-w-[640px] my-6 text-sm sm:text-base">
          Aqui você irá gerar as melhores receitas! Criadas exclusivamente para você em tempo real. Aproveite a experiência e bom apetite!!!
        </p>
        <Link href="./" className="flex items-center gap-2 text-center text-red-400 hover:text-red-600 transition-all">
          <ArrowLeft />
          Voltar para home
        </Link>
      </div>
    </section>
  )
}