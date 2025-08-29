import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  EmailTemplateBuilder, 
  useBuilderStore, 
  Builder, 
  ComponentLibrary, 
  Inspector, 
  Toolbar 
} from 'email-template-builder';

// Example 1: Using the complete app
export const CompleteAppExample: React.FC = () => {
  return (
    <EmailTemplateBuilder />
  );
};

// Example 2: Using individual components
export const CustomLayoutExample: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Custom Email Builder
                </h1>
              </div>
              <Toolbar />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-3">
              <ComponentLibrary />
            </div>

            {/* Center Canvas */}
            <div className="col-span-6">
              <Builder />
            </div>

            {/* Right Sidebar */}
            <div className="col-span-3">
              <Inspector />
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

// Example 3: Using the store directly
export const StoreExample: React.FC = () => {
  const { template, addComponent, exportJSON } = useBuilderStore();

  const handleAddHeader = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'My Company',
        subtitle: 'Welcome to our newsletter',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
      },
      children: [],
      style: {},
    });
  };

  const handleExport = () => {
    const json = exportJSON();
    console.log('Template JSON:', json);
    // You can save this to a file or send to an API
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Store Example</h2>
      
      <div className="space-y-4">
        <button
          onClick={handleAddHeader}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Header Component
        </button>
        
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
        >
          Export JSON
        </button>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Current Template:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(template, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Example 4: Custom component integration
export const CustomIntegrationExample: React.FC = () => {
  const { template, updateComponent } = useBuilderStore();

  const handleTemplateRename = (newName: string) => {
    updateComponent(template.id, { name: newName });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Custom Integration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Name
          </label>
          <input
            type="text"
            value={template.name}
            onChange={(e) => handleTemplateRename(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Template Info:</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>ID: {template.id}</li>
            <li>Components: {template.components.length}</li>
            <li>Created: {new Date(template.metadata.createdAt).toLocaleDateString()}</li>
            <li>Updated: {new Date(template.metadata.updatedAt).toLocaleDateString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Example 5: Programmatic template creation
export const ProgrammaticTemplateExample: React.FC = () => {
  const { loadTemplate } = useBuilderStore();

  const createNewsletterTemplate = () => {
    const newsletterTemplate = {
      id: 'newsletter-template',
      name: 'Newsletter Template',
      description: 'A professional newsletter template',
      components: [
        {
          id: 'header-1',
          type: 'header' as const,
          props: {
            title: 'Company Newsletter',
            subtitle: 'Stay updated with our latest news',
            backgroundColor: '#1f2937',
            textColor: '#ffffff',
          },
          children: [],
          style: {},
        },
        {
          id: 'text-1',
          type: 'text' as const,
          props: {
            content: 'Welcome to our monthly newsletter! We have exciting updates to share with you.',
            fontSize: '16px',
            textAlign: 'center',
            color: '#374151',
          },
          children: [],
          style: {},
        },
        {
          id: 'button-1',
          type: 'button' as const,
          props: {
            text: 'Read More',
            url: '#',
            backgroundColor: '#3b82f6',
            textColor: '#ffffff',
          },
          children: [],
          style: {},
        },
        {
          id: 'footer-1',
          type: 'footer' as const,
          props: {
            companyName: 'Your Company',
            email: 'newsletter@company.com',
            unsubscribeText: 'Unsubscribe from this list',
          },
          children: [],
          style: {},
        },
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0',
      },
      settings: {
        width: '600px',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      },
    };

    loadTemplate(newsletterTemplate);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Programmatic Template Creation</h2>
      
      <button
        onClick={createNewsletterTemplate}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Load Newsletter Template
      </button>
      
      <p className="mt-4 text-gray-600">
        Click the button above to programmatically load a pre-built newsletter template.
        This demonstrates how you can create templates in code and load them into the builder.
      </p>
    </div>
  );
};
