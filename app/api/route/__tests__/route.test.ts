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
  };

  beforeEach(() => {
    mockGenerateContent.mockReset();
  });

  it('returns generated instructions when API succeeds', async () => {
    process.env.GEMINI_API_KEY = 'test';
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'Recipe Title\nStep 1\nDicas: Tip 1' },
    });

    const request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(baseBody),
    });

    const res = await POST(request);
    const json = await res.json();

    expect(mockGenerateContent).toHaveBeenCalled();
    expect(json.instructions).toContain('Recipe Title');
    expect(json.instructions).toContain('Step 1');
  });

  it('returns fallback instructions when generation fails', async () => {
    process.env.GEMINI_API_KEY = 'test';
    mockGenerateContent.mockRejectedValue(new Error('fail'));

    const request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(baseBody),
    });

    const res = await POST(request);
    const json = await res.json();

    expect(mockGenerateContent).toHaveBeenCalled();
    expect(json.instructions).toContain('Receita simples de Breakfast');
  });

  it('returns fallback instructions when API key is missing', async () => {
    delete process.env.GEMINI_API_KEY;

    const request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(baseBody),
    });

    const res = await POST(request);
    const json = await res.json();

    expect(mockGenerateContent).not.toHaveBeenCalled();
    expect(json.instructions).toContain('Receita simples de Breakfast');
  });
});
