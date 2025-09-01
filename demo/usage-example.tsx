import React, { useState } from 'react';
import { 
  EmailTemplateBuilder
} from '../src/components/EmailTemplateBuilder';
import { useEmailTemplateBuilder } from '../src/hooks/useEmailTemplateBuilder';
import { useEmailExport } from '../src/hooks/useEmailExport';
import { useEmailTemplateManager } from '../src/hooks/useEmailTemplateManager';

// Example 1: Simple Integration
export const SimpleExample: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Email App</h1>
      <EmailTemplateBuilder />
    </div>
  );
};

// Example 2: Template Management with Local Storage
export const TemplateManagerExample: React.FC = () => {
  const { template } = useEmailTemplateBuilder();
  const { exportAsJSON, exportAsHTML, downloadHTML } = useEmailExport();
  const { createNewTemplate, loadTemplateFromJSON, saveTemplateToStorage, loadTemplateFromStorage } = useEmailTemplateManager();
  
  const [jsonInput, setJsonInput] = useState('');
  
  const saveTemplate = () => {
    saveTemplateToStorage('myTemplate');
    alert('Template saved to browser storage!');
  };

  const loadTemplate = () => {
    const success = loadTemplateFromStorage('myTemplate');
    if (success) {
      alert('Template loaded from browser storage!');
    } else {
      alert('No template found in storage.');
    }
  };

  const loadTemplateFromString = () => {
    if (jsonInput.trim()) {
      const success = loadTemplateFromJSON(jsonInput);
      if (success) {
        alert('Template loaded successfully!');
        setJsonInput('');
      } else {
        alert('Failed to load template. Check console for errors.');
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Template Manager
              </h1>
              <span className="text-sm text-gray-500">
                Save and load templates locally
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={saveTemplate}
                className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
              >
                Save Template
              </button>
              
              <button
                onClick={loadTemplate}
                className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
              >
                Load Template
              </button>
              
              <button
                onClick={() => downloadHTML('my-template.html')}
                className="bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600"
              >
                Download HTML
              </button>
              
              <button
                onClick={() => createNewTemplate()}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
              >
                New Template
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Template Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Template Information
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Template Name</h3>
                <p className="text-lg font-semibold">{template.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Components</h3>
                <p className="text-lg font-semibold">{template.components.length}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="text-lg font-semibold">
                  {new Date(template.metadata.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          {/* Load Template from JSON */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Load Template from JSON
            </h2>
            <div className="space-y-4">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste your JSON template here..."
              />
              
              <div className="flex space-x-2">
                <button
                  onClick={loadTemplateFromString}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Load Template
                </button>
                
                <button
                  onClick={() => setJsonInput(exportAsJSON())}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Get Current JSON
                </button>
              </div>
            </div>
          </div>
          
          {/* Email Builder */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Template Builder
            </h2>
            <EmailTemplateBuilder />
          </div>
        </div>
      </main>
    </div>
  );
};

// Example 3: Programmatic Component Addition
export const ProgrammaticExample: React.FC = () => {
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML, downloadHTML } = useEmailExport();
  const { createNewTemplate } = useEmailTemplateManager();
  
  const addHeader = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'My Company',
        subtitle: 'Professional Email Templates',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        padding: '20px'
      },
      children: [],
      style: {}
    });
  };

  const addTextBlock = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: 'This is a sample text block added programmatically. You can customize the content, styling, and formatting.',
        fontSize: '16px',
        textAlign: 'left',
        color: '#374151',
        padding: '15px'
      },
      children: [],
      style: {}
    });
  };

  const addButton = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'button',
      props: {
        text: 'Click Here',
        url: 'https://example.com',
        backgroundColor: '#059669',
        textColor: '#ffffff',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px'
      },
      children: [],
      style: {}
    });
  };

  const createNewsletterTemplate = () => {
    createNewTemplate('Newsletter Template');
    
    // Add components
    addHeader();
    addTextBlock();
    addButton();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-sm border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Programmatic Builder
              </h1>
              <span className="text-sm text-gray-500">
                Add components programmatically
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={addHeader}
                className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
              >
                Add Header
              </button>
              
              <button
                onClick={addTextBlock}
                className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
              >
                Add Text
              </button>
              
              <button
                onClick={addButton}
                className="bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600"
              >
                Add Button
              </button>
              
              <button
                onClick={createNewsletterTemplate}
                className="bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600"
              >
                Create Newsletter
              </button>
              
              <button
                onClick={() => downloadHTML('programmatic-template.html')}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Template Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Template Information
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Template Name</h3>
                <p className="text-lg font-semibold">{template.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Components</h3>
                <p className="text-lg font-semibold">{template.components.length}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="text-lg font-semibold">
                  {new Date(template.metadata.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          {/* Email Builder */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Template Builder
            </h2>
            <EmailTemplateBuilder />
          </div>
        </div>
      </main>
    </div>
  );
};

// Example 4: Minimal Integration
export const MinimalExample: React.FC = () => {
  const { template } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minimal Integration</h1>
      <p className="mb-4">Components: {template.components.length}</p>
      
      <EmailTemplateBuilder />
      
      <div className="mt-4">
        <button
          onClick={() => {
            const html = exportAsHTML();
            console.log('HTML:', html);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Log HTML to Console
        </button>
      </div>
    </div>
  );
};

// Main demo component that shows all examples
export const CompleteDemo: React.FC = () => {
  const [activeExample, setActiveExample] = useState<'simple' | 'template-manager' | 'programmatic' | 'minimal'>('template-manager');
  
  const examples = [
    { id: 'simple', name: 'Simple Integration', component: <SimpleExample /> },
    { id: 'template-manager', name: 'Template Manager', component: <TemplateManagerExample /> },
    { id: 'programmatic', name: 'Programmatic Builder', component: <ProgrammaticExample /> },
    { id: 'minimal', name: 'Minimal Integration', component: <MinimalExample /> },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {examples.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveExample(example.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeExample === example.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Example Content */}
      <div className="py-6">
        {examples.find(ex => ex.id === activeExample)?.component}
      </div>
    </div>
  );
};

export default CompleteDemo;
