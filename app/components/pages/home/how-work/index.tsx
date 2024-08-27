import { SectionTitle } from "@/app/components/section-title";
import { CookingPot, HeadCircuit, Sparkle, Sliders, Footprints } from "@phosphor-icons/react";
import { ItemsHow } from "./items-how-works";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HowWork = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false
  };

  return (
    <section className="container py-16">
      <CookingPot />
      <SectionTitle title="Como funciona?" subtitle="na palma da mão!" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 slider-container">
        <Slider {...settings}>
          <ItemsHow
            items={{
              icon: <HeadCircuit size={120} />,
              title: `Tecnologia de última ponta!`,
              desc: "Nosso aplicativo utiliza inteligência artificial avançada para criar receitas personalizadas com base nos ingredientes que você tem em casa. Nunca foi tão fácil cozinhar pratos deliciosos e inovadores.",
            }}
          />
          <ItemsHow
            items={{
              icon: <Sparkle size={120} />,
              title: "Receitas únicas!",
              desc: "Descubra novas combinações de sabores e crie pratos que surpreenderão seu paladar. Com nossa IA, cada receita é uma experiência culinária única, feita sob medida para você.",
            }}
          />
          <ItemsHow
            items={{
              icon: <Sliders size={120} />,
              title: "Controle total",
              desc: "Personalize suas receitas ajustando os ingredientes, o tempo de preparo e as técnicas culinárias. Nosso app garante que você tenha controle total sobre suas criações na cozinha.",
            }}
          />
          <ItemsHow
            items={{
              icon: <Footprints size={120} />,
              title: "Passo a passo",
              desc: "Siga o passo a passo e tenha uma boa refeição!",
            }}
          />
        </Slider>
      </div>
    </section>
  );
};
