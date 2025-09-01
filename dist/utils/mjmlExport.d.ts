import { EmailTemplate } from '../types';
export declare const generateMJML: (template: EmailTemplate) => string;
export declare const convertMJMLToHTML: (mjmlContent: string) => string;
export declare const exportEmailTemplate: (template: EmailTemplate) => {
    mjml: string;
    html: string;
    template: EmailTemplate;
};
