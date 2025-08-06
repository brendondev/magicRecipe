import { POST } from '../route';

const mockGenerateContent = jest.fn();

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: () => ({
      generateContent: mockGenerateContent,
    }),
  })),
}));

describe('POST /api/route', () => {
  const baseBody = {
    ChefLevel: 'Beginner',
    ingredientOptions: ['Egg', 'Flour'],
    selectedUtensils: ['Pan'],
    time: 30,
    additional: true,
    MealType: 'Breakfast',
    notes: 'note',
    protein: 30,
    carbs: 40,
    fat: 20,
  };

  const bodyWithoutMacros = { ...baseBody } as any;
  delete bodyWithoutMacros.protein;
  delete bodyWithoutMacros.carbs;
  delete bodyWithoutMacros.fat;

  const cases = [
    ['with macros', baseBody, true],
    ['without macros', bodyWithoutMacros, false],
  ] as const;

  beforeEach(() => {
    mockGenerateContent.mockReset();
  });

  it.each(cases)(
    'returns generated instructions when API succeeds %s',
    async (_label, body, hasMacros) => {
      process.env.GEMINI_API_KEY = 'test';
      mockGenerateContent.mockResolvedValue({
        response: { text: () => 'Recipe Title\nStep 1\nDicas: Tip 1' },
      });

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const res = await POST(request);
      const json = await res.json();

      expect(mockGenerateContent).toHaveBeenCalled();
      expect(json.instructions).toContain('Recipe Title');
      expect(json.instructions).toContain('Step 1');
      expect(json.title).toBe('Recipe Title');
      if (hasMacros) {
        expect(json.instructions).toContain('Proteína: 30 g');
      } else {
        expect(json.instructions).not.toContain('Macros');
        expect(json.instructions).not.toContain('Proteína');
      }
    }
  );

  it.each(cases)(
    'returns fallback instructions when generation fails %s',
    async (_label, body, hasMacros) => {
      process.env.GEMINI_API_KEY = 'test';
      mockGenerateContent.mockRejectedValue(new Error('fail'));

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const res = await POST(request);
      const json = await res.json();

      expect(mockGenerateContent).toHaveBeenCalled();
      expect(json.instructions).toContain('Receita simples de Breakfast');
      if (hasMacros) {
        expect(json.instructions).toContain('Proteína: 30 g');
      } else {
        expect(json.instructions).not.toContain('Macros');
        expect(json.instructions).not.toContain('Proteína');
      }
      expect(json.title).toBe('Receita simples de Breakfast');
    }
  );

  it.each(cases)(
    'returns fallback instructions when API key is missing %s',
    async (_label, body, hasMacros) => {
      delete process.env.GEMINI_API_KEY;

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const res = await POST(request);
      const json = await res.json();

      expect(mockGenerateContent).not.toHaveBeenCalled();
      expect(json.instructions).toContain('Receita simples de Breakfast');
      if (hasMacros) {
        expect(json.instructions).toContain('Proteína: 30 g');
      } else {
        expect(json.instructions).not.toContain('Macros');
        expect(json.instructions).not.toContain('Proteína');
      }
      expect(json.title).toBe('Receita simples de Breakfast');
    }
  );
});
