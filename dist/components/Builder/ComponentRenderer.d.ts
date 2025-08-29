import React from 'react';
import { EmailComponent } from '../../types';
interface ComponentRendererProps {
    component: EmailComponent;
    onClick: () => void;
    isSelected: boolean;
}
export declare const ComponentRenderer: React.FC<ComponentRendererProps>;
export {};
