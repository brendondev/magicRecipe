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
              🌟 Transforme sua cozinha em uma coisa de outro Planeta! ✨<br />
              Diga o que tem na dispensa e deixe que o <b>Receita Mágica</b>
              crie a receita perfeita para surpreender seu paladar.
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