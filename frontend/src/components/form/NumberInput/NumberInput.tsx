import React from "react";
import { TextInput as FBTextInput, HelperText, Label } from "flowbite-react";

interface TextInputProps {
    name: string;
    value: number;
    onChange: (s: number) => void;
    label: string;
    placeholder?: string;
    error?: string
}

function NumberInput( {
    name, 
    value, 
    label, 
    onChange, 
    placeholder, 
    error
} : TextInputProps ) {

    return (
        <div>
            <div className="mb-2 block">
            <Label htmlFor={name} color={error ? 'failure' : 'default'}>{label}</Label>
            </div>
            <FBTextInput 
            id={name}
            value={isNaN(value) ? '' : value}
            type="number" 
            onChange={(e) => onChange(parseInt(e.target.value))}
            placeholder={placeholder ?? ''}
            color={error ? 'failure' : 'default'}
            shadow 
            />
            { error && <HelperText> <span className="font-medium">{error}</span> </HelperText> }
        </div>
    )
}

export default NumberInput;