import { useBuilderStore } from '../store/builderStore';
import { exportEmailTemplate, generateMJML, convertMJMLToHTML } from '../utils/mjmlExport';
import { EmailTemplate } from '../types';

export const useEmailExport = () => {
  const { template, exportJSON, exportMJML } = useBuilderStore();
  
  // Export as JSON string
  const exportAsJSON = (): string => {
    return exportJSON();
  };
  
  // Export as MJML string
  const exportAsMJML = (): string => {
    return exportMJML();
  };
  
  // Export as HTML string
  const exportAsHTML = (): string => {
    try {
      const mjml = exportMJML();
      const html = convertMJMLToHTML(mjml);
      return html;
    } catch (error) {
      console.error('HTML export error:', error);
      return `<div style="color: red; padding: 20px;">Error generating HTML. Please check your template.</div>`;
    }
  };
  
  // Export complete template with all formats
  const exportComplete = () => {
    return exportEmailTemplate(template);
  };
  
  // Download functions
  const downloadJSON = (filename: string = 'email-template.json') => {
    const json = exportAsJSON();
    downloadFile(json, filename, 'application/json');
  };
  
  const downloadHTML = (filename: string = 'email-template.html') => {
    const html = exportAsHTML();
    downloadFile(html, filename, 'text/html');
  };
  
  const downloadMJML = (filename: string = 'email-template.mjml') => {
    const mjml = exportAsMJML();
    downloadFile(mjml, filename, 'text/plain');
  };
  
  return {
    // Export functions
    exportAsJSON,
    exportAsMJML,
    exportAsHTML,
    exportComplete,
    
    // Download functions
    downloadJSON,
    downloadHTML,
    downloadMJML,
    
    // Current template
    template,
  };
};

// Helper function to download files
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
