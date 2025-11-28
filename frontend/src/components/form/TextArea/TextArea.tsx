import React from "react";
import { Label, Textarea as FBTextarea, HelperText } from "flowbite-react";

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (s: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  rows?: number;
}

function TextArea({
  name,
  value,
  label,
  onChange,
  placeholder,
  error,
  rows
}: TextAreaProps) {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor={name} color={error ? 'failure' : 'default'}>{label}</Label>
      </div>
      <FBTextarea
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ''}
        rows={rows ?? 4}
        color={error ? 'failure' : 'default'}
      />
      { error && <HelperText> <span className="font-medium">{error}</span> </HelperText> }
    </div>
  );
}

export default TextArea;;
