import { Button } from "@/app/components/Button";
import { getRelativeTimeString } from "@/app/utils/get-relative-time";
import Image from "next/image";
import { ReactNode } from "react";
import { ForkKnife } from "@phosphor-icons/react";
import Slider from "react-slick"

type RecipeProps = {
  recipe: {
    icon: ReactNode;
    name: string;
    image: string;
    startDate: string;
  };
};

export const Recipe = ({ recipe }: RecipeProps) => {
  const relativeTime = getRelativeTimeString(
    new Date(recipe.startDate),
    "pt-BR"
  ).replace("há", "Gerado há");
  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col  hover:text-red-500 hover:bg-gray-600/30 transition-all">
      <div className="flex items-center justify-between">
        <p className="font-medium mr-1">{recipe.name}</p>
        {recipe.icon}
      </div>
      <Image
        width={250}
        height={150}
        src={"/images/macarrao.webp"}
        alt={"abc"}
        className="rounded-lg my-3"
      ></Image>
      <Button className="mt-3">
        Abrir <ForkKnife />
      </Button>
      <span className="text-[10px]">{relativeTime}</span>
    </div>
  );
};
