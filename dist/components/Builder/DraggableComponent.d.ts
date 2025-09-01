import React from 'react';
import { EmailComponent } from '../../types';
interface DraggableComponentProps {
    component: EmailComponent;
    index: number;
    onClick: () => void;
    isSelected: boolean;
    onMove: (id: string, newIndex: number) => void;
    onDelete: (id: string) => void;
}
export declare const DraggableComponent: React.FC<DraggableComponentProps>;
export {};
