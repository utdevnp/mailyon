import React from 'react';
import { EmailTemplate } from '../../types';
interface TemplateSettingsProps {
    template: EmailTemplate;
    updateTemplateSettings: (settings: Partial<EmailTemplate['settings']>) => void;
}
export declare const TemplateSettings: React.FC<TemplateSettingsProps>;
export {};
