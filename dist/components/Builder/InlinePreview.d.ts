import React from 'react';
import { EmailTemplate } from '../../types';
interface InlinePreviewProps {
    template: EmailTemplate;
    onBackToBuilder: () => void;
}
export declare const InlinePreview: React.FC<InlinePreviewProps>;
export {};
