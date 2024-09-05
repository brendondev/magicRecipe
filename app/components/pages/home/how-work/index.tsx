import { SectionTitle } from "@/app/components/SectionTitle";
import { CookingPot, HeadCircuit, Sparkle, Sliders, Footprints } from "@phosphor-icons/react";
import { ItemsHow } from "./items-how-works";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import React, { Component } from "react";

export const HowWork = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <section className="container py-16">
      <CookingPot />
      <SectionTitle title="Como funciona?" subtitle="na palma da mão!" />
      <div className="slider-container">
        <Slider {...settings}>
          <ItemsHow
            items={{
              icon: <HeadCircuit size={100} />,
              title: `Inteligência Artificial!`,
              desc: "Nosso aplicativo utiliza inteligência artificial avançada para criar receitas personalizadas com base nos ingredientes que você tem em casa. Nunca foi tão fácil cozinhar pratos deliciosos e inovadores.",
            }}
          />
          <ItemsHow
            items={{
              icon: <Sparkle size={100} />,
              title: "Receitas únicas!",
              desc: "Descubra novas combinações de sabores e crie pratos que surpreenderão seu paladar. Com nossa IA, cada receita é uma experiência culinária única, feita sob medida para você.",
            }}
          />
          <ItemsHow
            items={{
              icon: <Sliders size={100} />,
              title: "Controle total",
              desc: "Personalize suas receitas ajustando os ingredientes, o tempo de preparo e as técnicas culinárias. Nosso app garante que você tenha controle total sobre suas criações na cozinha.",
            }}
          />
          <ItemsHow
            items={{
              icon: <Footprints size={100} />,
              title: "Passo a passo",
              desc: "Siga o passo a passo e tenha uma boa refeição!",
            }}
          />
        </Slider>
      </div>
    </section>
  );
};
