import React from 'react';
interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    label?: string;
    placeholder?: string;
}
export declare const ColorPicker: React.FC<ColorPickerProps>;
export {};
