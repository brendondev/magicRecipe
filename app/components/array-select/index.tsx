import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import Select, { ActionMeta, MultiValue } from 'react-select';

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

interface AditionalProps {
    onChange: (checked: boolean) => void;
}

export function Aditional({ onChange }: AditionalProps) {
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
      />
    );
  }

  interface IngredientsItemProps {
    onChange: (selectedOptions: MultiValue<{ value: string; label: string }>) => void;
  }
  
  export function IngredientsItem({ onChange }: IngredientsItemProps) {
    const [selectedOption, setSelectedOption] = useState<MultiValue<{ value: string; label: string }>>([]);
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
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
      />
    );
  }