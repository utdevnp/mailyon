import React from 'react';
import { ComponentType } from '../../types';
interface ComponentItemProps {
    type: ComponentType;
    label: string;
    icon?: React.ReactNode;
    description?: string;
}
export declare const ComponentItem: React.FC<ComponentItemProps>;
export {};
