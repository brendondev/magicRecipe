import { Planet, CookingPot } from "@phosphor-icons/react"

import Image from "next/image"



export const DemoSection = () => {
  return(
      <section className="w-full bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end sm:pb-5 pb-32 lg:pb-[50px]">
        <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
          <div className="w-full lg:max-w-[530px]">
            <p className="font-flower text-red-400 flex items-center gap-2">coisa de outro planeta <Planet /></p>
            <h2 className="text-4xl font-medium mt-2">Sobre nós </h2>

            <p className="text-gray-400 my-6 text-sm sm:text-base">
              🌟 Transforme sua cozinha em uma coisa de outro planeta! ✨<br></br><br></br>
              Com o <b>Receita Mágica</b>, cozinhar nunca foi tão fácil e divertido. Basta dizer o que você tem na dispensa, e nosso app faz toda a mágica! Em segundos, você terá uma receita personalizada, feita sob medida para os ingredientes que você tem em casa.<br></br>
              Não importa se você é um chef experiente ou está começando agora, o <b>Receita Mágica</b> está aqui para tornar suas refeições práticas e deliciosas. Explore novas possibilidades, surpreenda-se com combinações inusitadas e transforme qualquer momento na cozinha em uma experiência única e saborosa.<br></br>
              Deixe que o <b>Receita Mágica</b> faça o trabalho pesado para você e descubra receitas incríveis sem sair de casa. 🍽️
            </p>

          </div>

          <Image
            width={420}
            height={404}
            src={"/images/mockup.svg"}
            alt="mockup celular"
            className="w-[800px] h-[300px] lg:w-[620px] lg:h-[500px] mb-6 lg:mb-0 rounded-lg object-contain"
          />
        </div>
      </section>
  )
}