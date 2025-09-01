import React from 'react';
import { EmailTemplate } from '../../types';
interface PreviewProps {
    template: EmailTemplate;
    isPreviewMode: boolean;
    onTogglePreview: () => void;
}
export declare const Preview: React.FC<PreviewProps>;
export {};
