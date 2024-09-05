import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import Select, { ActionMeta, MultiValue, GroupBase } from 'react-select';

interface Item {
    name: string;
    value: string;
}

interface ChefLevelProps {
    onChange: (value: string) => void;
}

export function ChefLevel({ onChange }: ChefLevelProps) {
    const [value, setValue] = useState<string | null>(null);
    const items: Item[] = [
        { name: 'Iniciante', value: 'Iniciante' },
        { name: 'Intermediário', value: 'Intermediário' },
        { name: 'Profissional', value: 'Profissional' }
    ];

    const handleChange = (e: SelectButtonChangeEvent) => {
        setValue(e.value);
        onChange(e.value);
    };

    return (
        <SelectButton
            className="w-[390px] mb-5"
            value={value}
            onChange={handleChange}
            optionLabel="name"
            options={items}
        />
    );
}

interface MealTypeProps {
    onChange: (value: string) => void;
}

export function MealType({ onChange }: MealTypeProps) {
    const [value, setValue] = useState<string | null>(null);
    const items: Item[] = [
        {name: 'Café', value: 'Café'},
        {name: 'Almoço', value: 'Almoço'},
        {name: 'Janta', value: 'Janta'}
    ];

    const handleChange = (e: SelectButtonChangeEvent) => {
        const selectedValue = e.value as string;
        setValue(selectedValue);
        onChange(selectedValue);
    };

    return (
        <SelectButton
            className="w-[390px] flex items-center justify-center"
            value={value}
            onChange={handleChange}
            optionLabel="name"
            options={items}
        />
    );
}

interface additionalProps {
    onChange: (checked: boolean) => void;
}

export function Additional({ onChange }: additionalProps) {
    const [checked, setChecked] = useState(false);

    const handleChange = (e: CheckboxChangeEvent) => {
        const isChecked = e.checked ?? false;
        setChecked(isChecked);
        onChange(isChecked);
    };

    return (
        <div>
            <Checkbox
                onChange={handleChange}
                checked={checked}
            />
        </div>
    );
}

interface UtensilsItemProps {
    onChange: (selectedOptions: MultiValue<{ value: string; label: string }>) => void;
  }
  
  export function UtensilsItem({ onChange }: UtensilsItemProps) {
    const [selectedOption, setSelectedOption] = useState<MultiValue<{ value: string; label: string }>>([]);
    const options = [
      { value: 'Forno', label: 'Forno' },
      { value: 'Fogão', label: 'Fogão' },
      { value: 'Microondas', label: 'Microondas' },
    ];
  
    const handleChange = (selectedOptions: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
      setSelectedOption(selectedOptions);
      onChange(selectedOptions);
    };
  
    return (
      <Select
        className="bg-gray-400 text-gray-600 w-[400px] mb-5 rounded-lg"
        isMulti
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={"Selecione seus utensílios..."}
      />
    );
  }

  interface IngredientsItemProps {
    onChange: (selectedOptions: MultiValue<{ value: string; label: string }>) => void;
  }
  
  export function IngredientsItem({ onChange }: IngredientsItemProps) {
    const [selectedOption, setSelectedOption] = useState<MultiValue<{ value: string; label: string }>>([]);

    const options: GroupBase<{ value: string; label: string }>[] = [
 {
    label: 'Grãos e Leguminosas 🌾',
    options: [
      { value: 'arroz-branco', label: '🍚 Arroz branco' },
      { value: 'arroz-integral', label: '🍚 Arroz integral' },
      { value: 'feijao-carioca', label: 'Feijão carioca' },
      { value: 'feijao-preto', label: 'Feijão preto' },
      { value: 'lentilha', label: '🍛 Lentilha' },
      { value: 'grao-de-bico', label: '🥙 Grão de bico' },
      { value: 'milho', label: '🌽 Milho' },
      { value: 'quinoa', label: '🍲 Quinoa' },
      { value: 'aveia', label: '🥣 Aveia' },
      { value: 'trigo', label: '🍞 Trigo para preparo de massas e pães' },
      { value: 'cevada', label: '🌾 Cevada' },
      { value: 'trigo-sarraceno', label: '🌾 Trigo sarraceno' },
    ],
  },
  {
    label: 'Legumes e Verduras 🥦',
    options: [
      { value: 'batata', label: '🥔 Batata' },
      { value: 'cebola', label: '🧅 Cebola' },
      { value: 'tomate', label: '🍅 Tomate' },
      { value: 'alho', label: '🧄 Alho' },
      { value: 'cenoura', label: '🥕 Cenoura' },
      { value: 'abobrinha', label: '🥒 Abobrinha' },
      { value: 'chuchu', label: '🍠 Chuchu' },
      { value: 'repolho', label: '🥬 Repolho' },
      { value: 'espinafre', label: '🥗 Espinafre' },
      { value: 'alface', label: '🥬 Alface' },
      { value: 'brocolis', label: '🥦 Brócolis' },
      { value: 'couve-flor', label: '🥬 Couve-flor' },
      { value: 'pepino', label: '🥒 Pepino' },
      { value: 'mandioca', label: '🍠 Mandioca' },
      { value: 'abobora', label: '🎃 Abóbora' },
      { value: 'pimentao', label: '🌶️ Pimentão (verde, vermelho e amarelo)' },
      { value: 'abacate', label: '🥑 Abacate' },
      { value: 'couve', label: '🥦 Couve' },
      { value: 'batata-doce', label: '🥔 Batata-doce' },
    ],
  },
  {
    label: 'Frutas 🍉',
    options: [
      { value: 'banana', label: '🍌 Banana' },
      { value: 'maca', label: '🍎 Maçã' },
      { value: 'laranja', label: '🍊 Laranja' },
      { value: 'pera', label: '🍐 Pera' },
      { value: 'morango', label: '🍓 Morango' },
      { value: 'uva', label: '🍇 Uva' },
      { value: 'manga', label: '🥭 Manga' },
      { value: 'abacaxi', label: '🍍 Abacaxi' },
      { value: 'limao', label: '🍋 Limão' },
      { value: 'pessego', label: '🍑 Pêssego' },
      { value: 'kiwi', label: '🥝 Kiwi' },
      { value: 'cereja', label: '🍒 Cereja' },
      { value: 'melancia', label: '🍉 Melancia' },
    ],
  },
  {
    label: 'Carnes e Proteínas 🥩',
    options: [
      { value: 'frango', label: '🍗 Frango' },
      { value: 'carne-bovina', label: '🥩 Carne bovina' },
      { value: 'peixe', label: '🐟 Peixe' },
      { value: 'ovos', label: '🥚 Ovos' },
      { value: 'queijo', label: '🧀 Queijo (diversos tipos)' },
      { value: 'iogurte', label: '🥛 Iogurte' },
      { value: 'leite', label: '🥛 Leite' },
      { value: 'carne-suina', label: '🍖 Carne suína' },
      { value: 'camarao', label: '🦐 Camarão' },
    ],
  },
  {
    label: 'Óleos e Gorduras 🧈',
    options: [
      { value: 'azeite-de-oliva', label: '🫒 Azeite de oliva' },
      { value: 'oleo-vegetal', label: '🌻 Óleo vegetal (soja, milho, girassol)' },
      { value: 'manteiga', label: '🧈 Manteiga' },
      { value: 'margarina', label: '🧂 Margarina' },
      { value: 'oleo-de-coco', label: '🥥 Óleo de coco' },
    ],
  },
  {
    label: 'Temperos e Condimentos 🌶️',
    options: [
      { value: 'sal', label: '🧂 Sal' },
      { value: 'pimenta-do-reino', label: '🌶️ Pimenta do reino' },
      { value: 'cominho', label: '🌿 Cominho' },
      { value: 'paprica-doce', label: '🌶️ Páprica doce' },
      { value: 'paprica-picante', label: '🌶️ Páprica picante' },
      { value: 'oregano', label: '🍕 Orégano' },
      { value: 'manjericao', label: '🌿 Manjericão' },
      { value: 'cebolinha', label: '🌱 Cebolinha' },
      { value: 'louro', label: '🍃 Louro' },
      { value: 'alho-em-po', label: '🧄 Alho em pó' },
      { value: 'cebola-em-po', label: '🧅 Cebola em pó' },
      { value: 'mostarda', label: '🌭 Mostarda' },
      { value: 'molho-shoyu', label: '🥢 Molho shoyu' },
      { value: 'molho-de-tomate', label: '🍝 Molho de tomate' },
      { value: 'acucar', label: '🍬 Açúcar' },
      { value: 'fermento-em-po', label: '🥄 Fermento em pó' },
      { value: 'fermento-biologico', label: '🍞 Fermento biológico' },
    ],
  },
  {
    label: 'Outros 🍫',
    options: [
      { value: 'macarrao', label: '🍝 Macarrão' },
      { value: 'arroz-instantaneo', label: '🍚 Arroz instantâneo' },
      { value: 'sopa-em-po', label: '🍜 Sopa em pó' },
      { value: 'biscoitos', label: '🍪 Biscoitos' },
      { value: 'chocolate-em-po', label: '🍫 Chocolate em pó' },
      { value: 'cafe', label: '☕ Café' },
      { value: 'chas-variados', label: '🍵 Chás variados' },
    ],
  },
];
  
    const handleChange = (selectedOptions: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
      setSelectedOption(selectedOptions);
      onChange(selectedOptions);
    };
  
    return (
      <Select
        className="bg-gray-400 text-gray-600 w-[400px] mb-5 rounded-lg"
        isMulti
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={"Selecione seus Ingredientes..."}
      />
    );
  }