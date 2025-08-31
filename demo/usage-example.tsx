import React, { useState } from 'react';
import { 
  EmailTemplateBuilder
} from '../src/components/EmailTemplateBuilder';
import { useEmailTemplateBuilder } from '../src/hooks/useEmailTemplateBuilder';
import { useEmailExport } from '../src/hooks/useEmailExport';
import { useEmailTemplateManager } from '../src/hooks/useEmailTemplateManager';

// Example 1: Simple Headerless Integration
export const SimpleExample: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Email App</h1>
      <EmailTemplateBuilder />
    </div>
  );
};

// Example 2: Using All Hooks with Custom UI
export const HooksExample: React.FC = () => {
  const { template, selectedComponent, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML, exportAsJSON, downloadHTML, downloadJSON } = useEmailExport();
  const { loadTemplateFromJSON, createNewTemplate, resetTemplate } = useEmailTemplateManager();
  
  const [showBuilder, setShowBuilder] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  
  // Add a header component programmatically
  const handleAddHeader = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'My Company',
        subtitle: 'Professional Email Templates',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
      },
      children: [],
      style: {},
    });
  };
  
  // Export and download HTML
  const handleExportHTML = () => {
    const html = exportAsHTML();
    console.log('Generated HTML:', html);
    downloadHTML('my-template.html');
  };
  
  // Export and download JSON
  const handleExportJSON = () => {
    const json = exportAsJSON();
    console.log('Template JSON:', json);
    downloadJSON('my-template.json');
  };
  
  // Load template from JSON
  const handleLoadTemplate = () => {
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
      {/* Custom Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                My Company Email Builder
              </h1>
              <span className="text-sm text-gray-500">
                Powered by email-template-builder
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddHeader}
                className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
              >
                Add Header
              </button>
              
              <button
                onClick={handleExportHTML}
                className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
              >
                Export HTML
              </button>
              
              <button
                onClick={handleExportJSON}
                className="bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600"
              >
                Export JSON
              </button>
              
              <button
                onClick={() => setShowBuilder(!showBuilder)}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
              >
                {showBuilder ? 'Hide' : 'Show'} Builder
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {showBuilder ? (
          <EmailTemplateBuilder />
        ) : (
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
                  <h3 className="text-sm font-medium text-gray-500">Selected</h3>
                  <p className="text-lg font-semibold">
                    {selectedComponent ? selectedComponent.type : 'None'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Template Management */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Template Management
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => createNewTemplate()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create New Template
                </button>
                
                <button
                  onClick={resetTemplate}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reset Template
                </button>
                
                <button
                  onClick={() => setShowBuilder(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Open Builder
                </button>
              </div>
            </div>
            
            {/* Load Template */}
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
                    onClick={handleLoadTemplate}
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
            
            {/* Export Options */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Export Options
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">HTML Export</h3>
                  <p className="text-sm text-gray-600">
                    Generate HTML for email campaigns
                  </p>
                  <button
                    onClick={handleExportHTML}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Export & Download HTML
                  </button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">JSON Export</h3>
                  <p className="text-sm text-gray-600">
                    Save template data for later use
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  >
                    Export & Download JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Example 3: Minimal Integration
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

// Example 4: Conditional Builder
export const ConditionalExample: React.FC = () => {
  const { template } = useEmailTemplateBuilder();
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Conditional Builder</h1>
      
      {isEditing ? (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Exit Editor
            </button>
          </div>
          <EmailTemplateBuilder />
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Template Builder
          </h2>
          <p className="text-gray-600 mb-6">
            Click "Start Editing" to begin creating your email template
          </p>
          <div className="bg-white p-4 rounded-lg shadow max-w-md mx-auto text-left">
            <h3 className="font-semibold mb-2">Current Template Info:</h3>
            <p><strong>Name:</strong> {template.name}</p>
            <p><strong>Components:</strong> {template.components.length}</p>
            <p><strong>Last Updated:</strong> {new Date(template.metadata.updatedAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Start Editing
          </button>
        </div>
      )}
    </div>
  );
};

// Main demo component that shows all examples
export const CompleteDemo: React.FC = () => {
  const [activeExample, setActiveExample] = useState<'simple' | 'hooks' | 'minimal' | 'conditional'>('hooks');
  
  const examples = [
    { id: 'simple', name: 'Simple Integration', component: <SimpleExample /> },
    { id: 'hooks', name: 'Full Hooks Example', component: <HooksExample /> },
    { id: 'minimal', name: 'Minimal Integration', component: <MinimalExample /> },
    { id: 'conditional', name: 'Conditional Builder', component: <ConditionalExample /> },
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
