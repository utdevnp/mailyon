import React from 'react';
import { ComponentType } from '../../types';
interface DropZoneProps {
    index: number;
    onDrop: (type: ComponentType, index: number) => void;
}
export declare const DropZone: React.FC<DropZoneProps>;
export {};
