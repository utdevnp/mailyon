import { EmailTemplate } from '../types';
export declare const useEmailExport: () => {
    exportAsJSON: () => string;
    exportAsMJML: () => string;
    exportAsHTML: () => string;
    exportComplete: () => {
        mjml: string;
        html: string;
        template: EmailTemplate;
    };
    downloadJSON: (filename?: string) => void;
    downloadHTML: (filename?: string) => void;
    downloadMJML: (filename?: string) => void;
    template: EmailTemplate;
};
