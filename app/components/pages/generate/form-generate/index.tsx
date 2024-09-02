"use client";

import { SelectForm } from "@/app/components/select-form"
import { ingredientOptions, utensilOptions } from "@/app/utils/constants";
import { Check, ChefHat, Control } from "@phosphor-icons/react/dist/ssr"
import React from "react";
import LevelButton from "@/app/components/button-form";
import { Aditional } from "@/app/components/button-form";
import { Button } from "@/app/components/button";
        
export const FormGenerate = () =>{
  return (
    <section className="container flex flex-col items-center justify-center border-gray-800 border-2 rounded-lg py-20 mb-10">
        <h1 className="font-flower font-semibold text-3xl mb-5 flex gap-1">Cozinha <ChefHat /></h1>
      <p>Selecione seus ingredientes!</p>
      <SelectForm
        className={"bg-gray-400 text-red-500 w-[400px] mb-5 rounded-lg"}
        options={ingredientOptions}
        placeholder={<div>Ingredientes</div>}
      />
      <p>Selecione os utensílios disponíveis! </p>
      <SelectForm
        className={"bg-gray-400 text-red-500 w-[400px] mb-5 rounded-lg"}
        options={utensilOptions}
        placeholder={<div>Utensílios</div>}
      />
      <p>Selecione seu nível de cozinha!</p>
      <LevelButton />
      <Aditional />Permitir indigredientes adicionais?
      <Button
      className="mt-5 py-1"
      >Gerar Receita <Check /></Button>
    </section>
  )
}