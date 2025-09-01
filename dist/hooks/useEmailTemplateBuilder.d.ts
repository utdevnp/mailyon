import { EmailTemplate, EmailComponent, ComponentType } from '../types';
export declare const useEmailTemplateBuilder: () => {
    template: EmailTemplate;
    selectedComponent: EmailComponent | null;
    isDragging: boolean;
    addComponent: (component: EmailComponent, parentId?: string | undefined) => void;
    updateComponent: (id: string, updates: Partial<EmailComponent>) => void;
    deleteComponent: (id: string) => void;
    selectComponent: (component: EmailComponent | null) => void;
    moveComponent: (id: string, newIndex: number) => void;
    duplicateComponent: (id: string) => void;
    insertComponentAt: (type: ComponentType, index: number, defaultProps?: Record<string, any> | undefined) => void;
    history: EmailTemplate[];
    historyIndex: number;
    undo: () => void;
    redo: () => void;
    saveTemplate: () => void;
    loadTemplate: (template: EmailTemplate) => void;
    updateTemplateSettings: (settings: Partial<{
        width: string;
        backgroundColor: string;
        fontFamily: string;
    }>) => void;
    exportJSON: () => string;
    exportMJML: () => string;
};
