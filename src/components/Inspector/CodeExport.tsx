import React from 'react';
import { ExportSection } from './ExportSection';
import { EmailTemplate } from '../../types';

interface CodeExportProps {
  template: EmailTemplate;
  exportJSON: () => string;
  exportMJML: () => string;
  generateHTML: () => string;
  copyToClipboard: (text: string, type: string) => void;
}

export const CodeExport: React.FC<CodeExportProps> = ({
  template,
  exportJSON,
  exportMJML,
  generateHTML,
  copyToClipboard
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
        content={exportJSON()}
        isExpanded={codeAccordions.json}
        onToggle={() => toggleAccordion('json')}
        onCopy={() => copyToClipboard(exportJSON(), 'JSON')}
        description="Raw template data structure for developers and API integration"
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
