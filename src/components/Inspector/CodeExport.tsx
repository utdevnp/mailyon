import React from 'react';
import { ExportSection } from './ExportSection';
import { EmailTemplate } from '../../types';

interface CodeExportProps {
  template: EmailTemplate;
  exportJSON: () => string;
  exportMJML: () => string;
  generateHTML: () => string;
  copyToClipboard: (text: string, type: string) => void;
  onJSONUpdate?: (json: string) => void;
}

export const CodeExport: React.FC<CodeExportProps> = ({
  template,
  exportJSON,
  exportMJML,
  generateHTML,
  copyToClipboard,
  onJSONUpdate
}) => {
  const [codeAccordions, setCodeAccordions] = React.useState({
    json: false,
    mjml: false,
    html: false
  });

  const toggleAccordion = (key: keyof typeof codeAccordions) => {
    setCodeAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      <ExportSection
        title="JSON Export"
        content={(() => {
          try {
            // Pretty print the JSON for better readability
            return JSON.stringify(JSON.parse(exportJSON()), null, 2);
          } catch {
            return exportJSON();
          }
        })()}
        isExpanded={codeAccordions.json}
        onToggle={() => toggleAccordion('json')}
        onCopy={() => copyToClipboard(exportJSON(), 'JSON')}
        description="Raw template data structure for developers and API integration"
        isEditable={true}
        onChange={(value) => {
          try {
            const parsedJson = JSON.parse(value);
            if (onJSONUpdate) {
              onJSONUpdate(value);
            }
          } catch (error) {
            // We still allow editing even if JSON is invalid
            console.warn('Invalid JSON:', error);
          }
        }}
      />

      <ExportSection
        title="MJML Export"
        content={exportMJML()}
        isExpanded={codeAccordions.mjml}
        onToggle={() => toggleAccordion('mjml')}
        onCopy={() => copyToClipboard(exportMJML(), 'MJML')}
        description="MJML markup for customization and advanced editing"
      />

      <ExportSection
        title="HTML Export"
        content={generateHTML()}
        isExpanded={codeAccordions.html}
        onToggle={() => toggleAccordion('html')}
        onCopy={() => copyToClipboard(generateHTML(), 'HTML')}
        description="Ready-to-use HTML that matches the preview exactly"
      />
    </div>
  );
};
