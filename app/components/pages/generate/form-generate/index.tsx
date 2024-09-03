import React, { useState } from "react";
import { SelectForm } from "@/app/components/select-form";
import { ingredientOptions, utensilOptions } from "@/app/utils/constants";
import { Check, ChefHat } from "@phosphor-icons/react/dist/ssr";
import ChefLevel from "@/app/components/button-form";
import { Aditional, MealType } from "@/app/components/button-form";
import { Button } from "@/app/components/button";

export const FormGenerate = () => {
  const [time, setTime] = useState<number>(10);
  const [selectedIngredients, setIngredients] = useState<string[]>([]);
  const [selectedAdditionalAllowed, setIsAdditionalAllowed] = useState<boolean>(false);
  const [selectedChefLevel, setChefLevel] = useState<string>('');
  const [selectedUtensils, setSelectedUtensils] = useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string>(''); // Corrigir nome do estado
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/route', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ChefLevel: selectedChefLevel,
          ingredientOptions: selectedIngredients,
          selectedUtensils: selectedUtensils,
          time: time,
          Aditional: selectedAdditionalAllowed,
          MealType: selectedMealType, 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`);
      }
  
      const text = await response.text();
      console.log('Resposta do fetch:', text); // Log para depuração
  
      const result = JSON.parse(text); // Tenta analisar o JSON
  
      if (result.instructions) {
        setResponse(result.instructions);
        console.log('Instruções recebidas:', result.instructions); // Verifique se o conteúdo está correto
      } else {
        setErrorMessage("Erro ao encontrar uma resposta.");
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error('Erro ao gerar a receita:', error);
      setErrorMessage(error.message || 'Erro desconhecido. Tente novamente.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container flex flex-col items-center justify-center border-gray-800 border-2 rounded-lg py-20 mb-10">
      <h1 className="font-flower font-semibold text-3xl mb-5 flex gap-1">
        Cozinha <ChefHat />
      </h1>
      <p>Selecione seus ingredientes!</p>
      <SelectForm
        className="bg-gray-400 text-gray-600 w-[400px] mb-5 rounded-lg"
        options={ingredientOptions}
        placeholder="Ingredientes"
        onChange={(options) => setIngredients(options.map((option: any) => option.value))}
      />
      <p>Selecione os utensílios disponíveis!</p>
      <SelectForm
        className="bg-gray-400 text-gray-600 w-[400px] mb-5 rounded-lg"
        options={utensilOptions}
        onChange={(options) => setSelectedUtensils(options.map((option: any) => option.value))}
        placeholder="Utensílios"
      />
      <p>Quanto tempo para cozinhar? (Minutos)</p>
      <input
        type="range"
        min={5}
        max={120}
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
        className="bg-gray-400 text-gray-600 w-[400px] rounded-lg"
      />
      <span className="mb-5">{time} minutos</span>
      <p>Selecione seu nível de cozinha!</p>
      <ChefLevel
        onChange={(value) => setChefLevel(value)}
      />
      <p>Escolha o tipo de refeição!</p>
      <MealType
        onChange={(value) => setSelectedMealType(value)}
      />
      <div className="flex justify-center items-center mt-5 gap-2">
        <Aditional
        onChange={(checked) => setIsAdditionalAllowed(checked)}
        />
        <p>Permitir ingredientes adicionais?</p>
      </div>
      <Button
        className="mt-5 py-1"
        onClick={handleGenerateRecipe}
        disabled={isLoading}
      >
        {isLoading ? 'Gerando...' : 'Gerar Receita'} <Check />
      </Button>
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Erro</h2>
            <p className="text-black">{errorMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setShowErrorModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <div className="text-black"> {response && <div dangerouslySetInnerHTML={{ __html: response }} />}</div>
   
    </section>
  );
};
