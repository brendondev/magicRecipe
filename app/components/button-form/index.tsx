import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Checkbox } from "primereact/checkbox";


interface Item {
    name: string;
    value: string;
}

export default function LevelButton() {
    const [value, setValue] = useState<Item | null>(null);
    const items: Item[] = [
        {name: 'Iniciante', value: 'Iniciante'},
        {name: 'Intermediário', value: 'Intermediário'},
        {name: 'Profissional', value: 'Profissional'}
    ];
    

    return (
            <SelectButton
            className=""
            value={value}
            onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
            optionLabel="name"
            options={items} />
    );
}
        
export function Aditional() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="mt-5">
            <Checkbox
            onChange={e => setChecked(e.checked ?? false)}
            checked={checked}></Checkbox>
        </div>
    )
}