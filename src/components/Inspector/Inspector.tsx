import React from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { EmailComponent, ComponentType } from '../../types';
import { TemplateSettings } from './TemplateSettings';
import { ComponentInspector } from './ComponentInspector';
import { CodeExport } from './CodeExport';

export const Inspector: React.FC = () => {
  const { selectedComponent, updateComponent, deleteComponent, duplicateComponent, template, updateTemplateSettings, exportJSON, exportMJML } = useBuilderStore();
  const [activeTab, setActiveTab] = React.useState<'template' | 'code'>('template');
  
  // Debug logging
  React.useEffect(() => {
    console.log('Inspector selectedComponent changed:', selectedComponent);
  }, [selectedComponent]);

  // Generate HTML from MJML for perfect styling match
  const generateHTML = (): string => {
    try {
      const { generateMJML, convertMJMLToHTML } = require('../../utils/mjmlExport');
      const mjml = generateMJML(template);
      const html = convertMJMLToHTML(mjml);
      return html;
    } catch (error) {
      console.error('HTML generation error:', error);
      return `<div style="color: red; padding: 20px;">Error generating HTML. Please check your template.</div>`;
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`${type} copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Tab content for Template & Inspector
  const renderTemplateAndInspector = () => (
    <div className="space-y-2">
      <TemplateSettings 
        template={template}
        updateTemplateSettings={updateTemplateSettings}
      />
      
      <div className="card p-2">
        <div>
          {!selectedComponent ? (
            <p className="text-gray-500 text-xs">
              Select a component to edit its properties
            </p>
          ) : (
            <ComponentInspector
              selectedComponent={selectedComponent}
              updateComponent={updateComponent}
              deleteComponent={deleteComponent}
              duplicateComponent={duplicateComponent}
            />
          )}
        </div>
      </div>
    </div>
  );

  // Main render function with tabs
  return (
    <div className="space-y-2">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('template')}
          className={`px-3 py-1.5 text-sm font-medium border-b-2 transition-colors bg-white ${
            activeTab === 'template'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Inspector
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1.5 text-sm font-medium border-b-2 transition-colors bg-white ${
            activeTab === 'code'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Export
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'template' ? (
        renderTemplateAndInspector()
      ) : (
        <CodeExport
          template={template}
          exportJSON={exportJSON}
          exportMJML={exportMJML}
          generateHTML={generateHTML}
          copyToClipboard={copyToClipboard}
        />
      )}
    </div>
  );
};
