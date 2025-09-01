import React from 'react';
import { EmailTemplate } from '../../types';
interface CodeExportProps {
    template: EmailTemplate;
    exportJSON: () => string;
    exportMJML: () => string;
    generateHTML: () => string;
    copyToClipboard: (text: string, type: string) => void;
}
export declare const CodeExport: React.FC<CodeExportProps>;
export {};
