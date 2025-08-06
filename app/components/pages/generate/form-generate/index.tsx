import React, { useState, useRef, useEffect } from "react";
import { Basket, Check, ChefHat, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import  {ChefLevel, IngredientsItem, UtensilsItem } from "@/app/components/array-select";
import { Additional, MealType } from "@/app/components/array-select";
import { Button } from "@/app/components/button";

type RecipeModalProps = {
  isOpen: boolean;
  content: string | null;
  onClose: () => void;
};

const RecipeModal = ({ isOpen, content, onClose }: RecipeModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    closeRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          ref={closeRef}
          className="absolute top-2 right-2 text-black"
          onClick={onClose}
          aria-label="Close"
        >
          X
        </button>
        <div
          className="text-black"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export const FormGenerate = () => {
  const [time, setTime] = useState<number>(10);
  const [selectedIngredients, setIngredients] = useState<string[]>([]);
  const [selectedAdditionalAllowed, setIsAdditionalAllowed] = useState<boolean>(false);
  const [selectedChefLevel, setChefLevel] = useState<string>('');
  const [selectedUtensils, setSelectedUtensils] = useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showRecipeModal, setShowRecipeModal] = useState<boolean>(false);
  const [notes, setNotes] = useState('');

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
          additional: selectedAdditionalAllowed,
          MealType: selectedMealType, 
          notes,
        }),
      });
  
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json().catch(() => null)
        : await response.text().catch(() => null);

      if (!response.ok || !data) {
        setErrorMessage('Serviço temporariamente indisponível');
        setShowErrorModal(true);
        return;
      }

      const result =
        typeof data === 'string' ? { instructions: data, title: '' } : data;

      if (result.instructions) {
        setResponse(result.instructions);
        setShowRecipeModal(true);
        if (result.title) {
          const stored = localStorage.getItem('recent-recipes');
          const recent = stored ? JSON.parse(stored) : [];
          recent.push({ title: result.title, createdAt: Date.now() });
          localStorage.setItem('recent-recipes', JSON.stringify(recent));
        }
        console.log('Instruções recebidas:', result.instructions);
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
      <Basket size={40} className="text-red-400"/>
      <IngredientsItem
        onChange={(selectedOptions) => setIngredients(selectedOptions?.map(option => option.value) || [])}
        />
      <ForkKnife size={40} className="text-red-400"/>
      <UtensilsItem
        onChange={(selectedOptions) => setSelectedUtensils(selectedOptions?.map(option => option.value) || [])}
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
        <Additional
          onChange={(checked) => setIsAdditionalAllowed(checked)}
        />
        <p>Permitir ingredientes adicionais?</p>
      </div>

      <div className="rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none flex flex-col items-center focus:ring-2 ring-red-500">
      <textarea 
            placeholder="Deseja especificar algo? Digite aqui..."
            maxLength={50}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            className="resize-none w-full h-[100px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
          />

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
      <RecipeModal
        isOpen={showRecipeModal}
        content={response}
        onClose={() => setShowRecipeModal(false)}
      />
   
    </section>
  );
};
