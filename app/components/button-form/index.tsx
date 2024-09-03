import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Checkbox } from "primereact/checkbox";


interface Item {
    name: string;
    value: string;
}

interface ChefLevelProps {
    onChange: (value: string) => void;
}

export default function ChefLevel({ onChange }: ChefLevelProps) {
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

    const handleChange = (e: { checked: boolean }) => {
        setChecked(e.checked ?? false);
        onChange(e.checked ?? false);
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