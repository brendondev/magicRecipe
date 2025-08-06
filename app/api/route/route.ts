import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

function buildFallback({
  MealType,
  ChefLevel,
  ingredientOptions,
  selectedUtensils,
  time,
  macros,
}: {
  MealType: string;
  ChefLevel: string;
  ingredientOptions: string[];
  selectedUtensils: string[];
  time: number;
  macros: { protein: number; carbs: number; fat: number };
}) {
  return `
        <div class="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
          <h2 class="text-3xl font-bold mb-4">Receita simples de ${MealType}</h2>
          <p class="text-lg mb-2"><strong>Nível do Chef:</strong> ${ChefLevel}</p>
          <p class="text-lg mb-2"><strong>Ingredientes:</strong></p>
          <ul class="list-disc list-inside pl-4 mb-2">
            ${ingredientOptions
              .map((ingredient: string) => `<li class="text-lg">${ingredient}</li>`)
              .join('')}
          </ul>
          <p class="text-lg mb-2"><strong>Utensílios:</strong></p>
          <ul class="list-disc list-inside pl-4 mb-2">
            ${selectedUtensils
              .map((utensil: string) => `<li class="text-lg">${utensil}</li>`)
              .join('')}
          </ul>
          <p class="text-lg mb-2"><strong>Tempo de Cozinha:</strong> ${time} minutos</p>
          <p class="text-lg mb-2"><strong>Macros:</strong> Proteína: ${macros.protein} g, Carboidratos: ${macros.carbs} g, Gordura: ${macros.fat} g</p>
          <h3 class="text-xl font-semibold mb-2">Modo de Preparo:</h3>
          <p class="text-lg">Combine os ingredientes e cozinhe usando os utensílios selecionados. Ajuste os temperos a gosto e aproveite!</p>
        </div>
      `;
}

export async function POST(request: Request) {
  try {
    const {
      ChefLevel,
      ingredientOptions,
      selectedUtensils,
      time,
      additional,
      MealType,
      notes,
      protein,
      carbs,
      fat,
    } = await request.json();

    if (
      !ChefLevel ||
      !ingredientOptions ||
      !selectedUtensils ||
      !time ||
      additional === undefined ||
      !MealType ||
      notes === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fat === undefined
    ) {
      return NextResponse.json(
        { error: 'Faltam parâmetros na solicitação' },
        { status: 400 }
      );
    }

    if ([protein, carbs, fat].some((m) => typeof m !== 'number' || Number.isNaN(m))) {
      return NextResponse.json(
        { error: 'Macros inválidas' },
        { status: 400 }
      );
    }

    // Read Gemini API key from server-side environment variable
    const { GEMINI_API_KEY: apiKey } = process.env;
    if (!apiKey) {
      const fallback = buildFallback({
        MealType,
        ChefLevel,
        ingredientOptions,
        selectedUtensils,
        time,
        macros: { protein, carbs, fat },
      });
      const fallbackTitle = `Receita simples de ${MealType}`;
      return NextResponse.json(
        { title: fallbackTitle, instructions: fallback },
        { status: 200 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Crie uma receita com base nas seguintes informações:
    Nível do Chef: ${ChefLevel}
    Ingredientes: ${ingredientOptions.join(', ')}
    Utensílios: ${selectedUtensils.join(', ')}
    Tempo de Cozinha: ${time} minutos
    ${additional ? 'Inclua ingredientes adicionais.' : 'Use apenas os ingredientes fornecidos.'}
    Tipo de Refeição: ${MealType}
    Macros desejadas (em gramas): Proteína: ${protein} g, Carboidratos: ${carbs} g, Gordura: ${fat} g
    ${notes ? `Notas adicionais: ${notes}` : ''}
    Retorne apenas o preparo e o título da receita, incluindo emojis se necessário.
  `;

    try {
      const timeoutMs = 15000;
      const result = await Promise.race([
        model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), timeoutMs)
        ),
      ]);
      const response = result.response.text();

      const [recipeTitleAndSteps, tipsText] = response.split('Dicas:');
      const [recipeTitle, ...stepsArray] = recipeTitleAndSteps
        .split('\n')
        .filter(Boolean);
      const formattedTitle = recipeTitle.trim();
      const formattedRecipe = stepsArray
        .join('<br>')
        .replace(/(\*|#)/g, '');
      const formattedTips = tipsText
        ? tipsText.trim().replace(/(\*|#)/g, '')
        : '';

      const htmlContent = `
        <div class="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
          <h2 class="text-3xl font-bold mb-4">${formattedTitle}</h2>
          <p class="text-lg mb-2"><strong>Tipo de Refeição:</strong> ${MealType}</p>
          <p class="text-lg mb-2"><strong>Nível do Chef:</strong> ${ChefLevel}</p>
          <p class="text-lg mb-2"><strong>Ingredientes:</strong></p>
          <ul class="list-disc list-inside pl-4 mb-2">
            ${ingredientOptions
              .map((ingredientOptions: string) => `<li class="text-lg">${ingredientOptions}</li>`)
              .join('')}
          </ul>
          ${additional ? `
            <p class="text-lg mb-2"><strong>Ingredientes Adicionais:</strong></p>
            <ul class="list-disc list-inside pl-4 mb-2">
              ${formattedTips ? `<li class="text-lg">${formattedTips}</li>` : ''}
            </ul>` : ''}
          <p class="text-lg mb-2"><strong>Utensílios:</strong></p>
          <ul class="list-disc list-inside pl-4 mb-2">
            ${selectedUtensils
              .map((utensil: string) => `<li class="text-lg">${utensil}</li>`)
              .join('')}
          </ul>
          <p class="text-lg mb-2"><strong>Tempo de Cozinha:</strong> ${time} minutos</p>
          <p class="text-lg mb-2"><strong>Macros:</strong> Proteína: ${protein} g, Carboidratos: ${carbs} g, Gordura: ${fat} g</p>
          <h3 class="text-xl font-semibold mb-2">Modo de Preparo:</h3>
          <p class="text-lg">${formattedRecipe}</p>
        </div>
      `;

      return NextResponse.json({
        title: formattedTitle,
        instructions: htmlContent,
      });
    } catch (error) {
      console.error('Falha ao gerar conteúdo com Gemini:', error);
      const fallback = buildFallback({
        MealType,
        ChefLevel,
        ingredientOptions,
        selectedUtensils,
        time,
        macros: { protein, carbs, fat },
      });
      const fallbackTitle = `Receita simples de ${MealType}`;
      return NextResponse.json(
        { title: fallbackTitle, instructions: fallback },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error('Erro ao processar a solicitação:', error);
    if (error instanceof Error && error.message === 'timeout') {
      return NextResponse.json(
        { error: 'Tempo excedido ao gerar receita' },
        { status: 504 }
      );
    }

    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
