import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { ChefLevel, ingredientOptions, selectedUtensils, time, additional, MealType, notes } = await request.json();

    if (!ChefLevel || !ingredientOptions || !selectedUtensils || !time || additional === undefined || !MealType || notes === undefined) {
      return NextResponse.json({ error: 'Faltam parâmetros na solicitação' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API não configurada' }, { status: 500 });
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
    ${notes ? `Notas adicionais: ${notes}` : ''}
    Retorne apenas o preparo e o título da receita, incluindo emojis se necessário.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    const [recipeTitleAndSteps, tipsText] = response.split('Dicas:');
    const [recipeTitle, ...stepsArray] = recipeTitleAndSteps.split('\n').filter(Boolean);
    const formattedTitle = recipeTitle.trim();
    const formattedRecipe = stepsArray.join('<br>').replace(/(\*|#)/g, '');
    const formattedTips = tipsText ? tipsText.trim().replace(/(\*|#)/g, '') : '';

    const htmlContent = `
      <div class="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        <h2 class="text-3xl font-bold mb-4">${formattedTitle}</h2>
        <p class="text-lg mb-2"><strong>Tipo de Refeição:</strong> ${MealType}</p>
        <p class="text-lg mb-2"><strong>Nível do Chef:</strong> ${ChefLevel}</p>
        <p class="text-lg mb-2"><strong>Ingredientes:</strong></p>
        <ul class="list-disc list-inside pl-4 mb-2">
          ${ingredientOptions.map((ingredientOptions: string) => `<li class="text-lg">${ingredientOptions}</li>`).join('')}
        </ul>
        ${additional ? `
          <p class="text-lg mb-2"><strong>Ingredientes Adicionais:</strong></p>
          <ul class="list-disc list-inside pl-4 mb-2">
            ${formattedTips ? `<li class="text-lg">${formattedTips}</li>` : ''}
          </ul>` : ''}
        <p class="text-lg mb-2"><strong>Utensílios:</strong></p>
        <ul class="list-disc list-inside pl-4 mb-2">
          ${selectedUtensils.map((utensil: string) => `<li class="text-lg">${utensil}</li>`).join('')}
        </ul>
        <p class="text-lg mb-2"><strong>Tempo de Cozinha:</strong> ${time} minutos</p>
        <h3 class="text-xl font-semibold mb-2">Modo de Preparo:</h3>
        <p class="text-lg">${formattedRecipe}</p>
      </div>
    `;

    return NextResponse.json({ instructions: htmlContent });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}