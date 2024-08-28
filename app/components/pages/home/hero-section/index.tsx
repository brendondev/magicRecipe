import { Button } from "@/app/components/button";
import { TagsBadge } from "@/app/components/tags-badge";
import Image from "next/image";
import {
  ChefHat,
  GithubLogo,
  LinkedinLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

const MOCK_CONTACTS = [
  {
    url: "#",
    icon: <GithubLogo />,
  },
  {
    url: "#",
    icon: <LinkedinLogo />,
  },
  {
    url: "#",
    icon: <YoutubeLogo />,
  },
  {
    url: "#",
    icon: <WhatsappLogo />,
  },
];

export const HeroSection = () => {
  return (
    <>
      <section className="w-full lg:h-[755px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end sm:pb-5 py-32 lg:pb-[50px]">
        <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
          <div className="w-full lg:max-w-[530px]">
            <p className="font-flower text-red-400">Descubra o poder do</p>
            <h2 className="text-4xl font-medium mt-2">Chefe Mágico</h2>

            <p className="text-gray-400 my-6 text-sm sm:text-base">
              🌟 Transforme sua cozinha em uma coisa de outro Planeta! ✨<br />
              Diga o que tem na dispensa e deixe que o <b>Receita Mágica</b>
              crie a receita perfeita para surpreender seu paladar.
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
              {Array.from({ length: 7 }).map((_, index) => (
                <TagsBadge name="#saudavel" key={index} />
              ))}
            </div>

            <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
              <Button className="w-max shadow-button">
                Entre em Contato
                <ChefHat size={22} />
              </Button>

              <div className="text-2xl text-gray-600 flex items-center h-20 gap-3">
                {MOCK_CONTACTS.map((contact, index) => (
                  <a
                    href={contact.url}
                    key={`contact-${index}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-100 transition-colors"
                  >
                    {contact.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Image
            width={420}
            height={404}
            src={"/images/profilesvg.svg"}
            alt="astronauta chef"
            className="w-[200px] h-[300px] lg:w-[320px] lg:h-[400px] mb-6 lg:mb-0 rounded-lg object-cover"
          />
        </div>
      </section>
    </>
  );
};
