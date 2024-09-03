import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Checkbox } from "primereact/checkbox";


interface Item {
    name: string;
    value: string;
}

export default function ChefLevel() {
    const [value, setValue] = useState<Item | null>(null);
    const items: Item[] = [
        {name: 'Iniciante', value: 'Iniciante'},
        {name: 'Intermediário', value: 'Intermediário'},
        {name: 'Profissional', value: 'Profissional'}
    ];
    

    return (
            <SelectButton
            className="w-[390px] mb-5"
            value={value}
            onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
            optionLabel="name"
            options={items} />
    );
}

export function MealType() {
    const [value, setValue] = useState<Item | null>(null);
    const items: Item[] = [
        {name: 'Café', value: 'Café'},
        {name: 'Almoço', value: 'Almoço'},
        {name: 'Janta', value: 'Janta'}
    ];
    

    return (
            <SelectButton
            className="w-[390px] flex items-center justify-center"
            value={value}
            onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
            optionLabel="name"
            options={items} />
    );
}


export function Aditional() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="">
            <Checkbox
            onChange={e => setChecked(e.checked ?? false)}
            checked={checked}></Checkbox>
        </div>
    )
}