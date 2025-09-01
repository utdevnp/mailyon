import { EmailTemplate } from '../types';
export declare const useEmailTemplateManager: () => {
    loadTemplateFromJSON: (jsonString: string) => boolean;
    loadTemplateFromObject: (template: EmailTemplate) => void;
    loadTemplateFromStorage: (key?: string) => boolean;
    createNewTemplate: (name?: string) => void;
    cloneTemplate: (newName?: string) => void;
    resetTemplate: () => void;
    saveTemplateToStorage: (key?: string) => void;
    getTemplateAsJSON: () => string;
    validateTemplate: (template: EmailTemplate) => {
        isValid: boolean;
        errors: string[];
    };
    template: EmailTemplate;
};
