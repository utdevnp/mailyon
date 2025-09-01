import React from 'react';
import { EmailComponent } from '../../types';
interface ComponentInspectorProps {
    selectedComponent: EmailComponent;
    updateComponent: (id: string, updates: Partial<EmailComponent>) => void;
    deleteComponent: (id: string) => void;
    duplicateComponent: (id: string) => void;
}
export declare const ComponentInspector: React.FC<ComponentInspectorProps>;
export {};
