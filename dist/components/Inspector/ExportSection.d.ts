import React from 'react';
interface ExportSectionProps {
    title: string;
    content: string;
    isExpanded: boolean;
    onToggle: () => void;
    onCopy: () => void;
    description?: string;
}
export declare const ExportSection: React.FC<ExportSectionProps>;
export {};
