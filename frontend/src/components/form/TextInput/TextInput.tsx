import React, { useEffect, useRef } from "react";
import { TextInput as FBTextInput, HelperText, Label } from "flowbite-react";

interface TextInputProps {
    name: string;
    value: string;
    onChange: (s: string) => void
    label: string;
    placeholder?: string;
    error?: string
    focus?: boolean
    type?: string
}

function TextInput( {
    name, 
    value, 
    label, 
    onChange, 
    placeholder, 
    error,
    focus,
    type
} : TextInputProps ) {
    
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(focus) ref.current?.focus()
    },[focus])

    return (
        <div>
            <div className="mb-2 block">
            <Label htmlFor={name} color={error ? 'failure' : ''}>{label}</Label>
            </div>
            <FBTextInput 
            id={name}
            value={value}
            type={type ?? 'text'} 
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? ''}
            shadow 
            color={error ? 'failure' : ''}
            ref={ref}
            />
            { error && <HelperText> <span className="font-medium">{error}</span> </HelperText>}
        </div>
    )
}

export default TextInput;