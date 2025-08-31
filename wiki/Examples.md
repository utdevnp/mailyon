# 💡 Examples

This page contains real-world examples and use cases for the Email Template Builder.

## 🚀 Basic Examples

### **1. Simple Integration**
Basic integration with custom header.

```tsx
import React from 'react';
import { EmailTemplateBuilder } from 'email-template-builder';

function MyEmailApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              My Email Marketing Platform
            </h1>
            <div className="text-sm text-gray-500">
              Professional Email Builder
            </div>
          </div>
        </div>
      </header>

      {/* Email Template Builder */}
      <EmailTemplateBuilder />
    </div>
  );
}

export default MyEmailApp;
```

### **2. Using Custom Hooks**
Programmatic control over the template builder.

```tsx
import React, { useState } from 'react';
import { EmailTemplateBuilder, useEmailTemplateBuilder, useEmailExport } from 'email-template-builder';

function EmailBuilderWithControls() {
  const [showBuilder, setShowBuilder] = useState(true);
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML, downloadHTML } = useEmailExport();

  const handleAddHeader = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'My Company',
        subtitle: 'Professional Solutions',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        logoVisible: false,
        titleVisible: true,
        subtitleVisible: true,
        padding: '20px'
      },
      children: [],
      style: {},
    });
  };

  const handleExport = () => {
    const html = exportAsHTML();
    console.log('Generated HTML:', html);
  };

  const handleDownload = () => {
    downloadHTML('email-template.html');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Control Panel */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Email Template Builder
          </h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddHeader}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Header
            </button>
            
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Export HTML
            </button>
            
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Download HTML
            </button>
            
            <button
              onClick={() => setShowBuilder(!showBuilder)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              {showBuilder ? 'Hide Builder' : 'Show Builder'}
            </button>
          </div>
        </div>
        
        {/* Template Info */}
        <div className="mt-4 text-sm text-gray-600">
          Components: {template.components.length} | 
          Last Updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Conditional Builder */}
      {showBuilder && <EmailTemplateBuilder />}
    </div>
  );
}

export default EmailBuilderWithControls;
```

## 🔧 Advanced Usage

### **3. Template Management System**
Complete template management with save/load functionality.

```tsx
import React, { useState, useEffect } from 'react';
import { EmailTemplateBuilder, useEmailTemplateManager, useEmailExport } from 'email-template-builder';

function TemplateManagementSystem() {
  const [templates, setTemplates] = useState([]);
  const [currentTemplateName, setCurrentTemplateName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  const { 
    template, 
    loadTemplateFromJSON, 
    createNewTemplate, 
    cloneTemplate,
    validateTemplate 
  } = useEmailTemplateManager();
  
  const { exportAsJSON, exportAsHTML } = useEmailExport();

  // Load saved templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('emailTemplates');
    if (saved) {
      try {
        setTemplates(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved templates:', error);
      }
    }
  }, []);

  const handleSaveTemplate = () => {
    if (!currentTemplateName.trim()) return;

    const templateData = {
      id: Math.random().toString(36).substr(2, 9),
      name: currentTemplateName,
      data: exportAsJSON(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTemplates = [...templates, templateData];
    setTemplates(updatedTemplates);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
    
    setCurrentTemplateName('');
    setShowSaveModal(false);
  };

  const handleLoadTemplate = (templateData) => {
    const success = loadTemplateFromJSON(templateData.data);
    if (success) {
      console.log(`Template "${templateData.name}" loaded successfully!`);
    }
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
  };

  const handleValidateCurrent = () => {
    const result = validateTemplate(template);
    if (result.isValid) {
      alert('Template is valid! ✅');
    } else {
      alert(`Template has errors:\n${result.errors.join('\n')}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Template Management Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Template Management System
            </h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => createNewTemplate()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                New Template
              </button>
              
              <button
                onClick={() => cloneTemplate()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Clone Current
              </button>
              
              <button
                onClick={handleValidateCurrent}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Validate
              </button>
              
              <button
                onClick={() => setShowSaveModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save Template
              </button>
            </div>
          </div>
          
          {/* Template Stats */}
          <div className="mt-4 text-sm text-gray-600">
            Current Template: {template.name || 'Untitled'} | 
            Components: {template.components.length} | 
            Last Updated: {template.metadata?.updatedAt ? new Date(template.metadata.updatedAt).toLocaleString() : 'Never'}
          </div>
        </div>
      </div>

      {/* Template List */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {templates.map((t) => (
            <div key={t.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-500">
                Created: {new Date(t.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => handleLoadTemplate(t)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDeleteTemplate(t.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Template Builder */}
      <EmailTemplateBuilder />

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Save Template</h3>
            <input
              type="text"
              placeholder="Template name"
              value={currentTemplateName}
              onChange={(e) => setCurrentTemplateName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateManagementSystem;
```

## 🎨 Real-world Scenarios

### **4. Marketing Campaign Builder**
Email marketing campaign with conditional content.

```tsx
import React, { useState } from 'react';
import { EmailTemplateBuilder, useEmailTemplateBuilder, useEmailExport } from 'email-template-builder';

function MarketingCampaignBuilder() {
  const [campaignType, setCampaignType] = useState('newsletter');
  const [targetAudience, setTargetAudience] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();

  const createNewsletterTemplate = () => {
    // Clear existing components
    template.components.forEach(component => {
      // This would need a clear function in the store
    });

    // Add newsletter components
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'Weekly Newsletter',
        subtitle: 'Stay updated with our latest news',
        backgroundColor: '#1f2937',
        textColor: '#ffffff',
        logoVisible: false,
        titleVisible: true,
        subtitleVisible: true,
        padding: '30px'
      },
      children: [],
      style: {},
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: 'Welcome to our weekly newsletter! Here\'s what\'s new this week.',
        fontSize: '18px',
        textAlign: 'center',
        color: '#374151',
        padding: '20px'
      },
      children: [],
      style: {},
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'button',
      props: {
        text: 'Read More',
        url: 'https://example.com/newsletter',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        padding: '12px 24px',
        fontSize: '16px'
      },
      children: [],
      style: {},
    });
  };

  const createPromotionalTemplate = () => {
    // Add promotional components
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'Special Offer!',
        subtitle: 'Limited time only',
        backgroundColor: '#dc2626',
        textColor: '#ffffff',
        logoVisible: false,
        titleVisible: true,
        subtitleVisible: true,
        padding: '30px'
      },
      children: [],
      style: {},
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: 'Don\'t miss out on our exclusive offer! Use code SAVE20 for 20% off.',
        fontSize: '20px',
        textAlign: 'center',
        color: '#dc2626',
        fontWeight: 'bold',
        padding: '20px'
      },
      children: [],
      style: {},
    });
  };

  const handleCampaignTypeChange = (type) => {
    setCampaignType(type);
    if (type === 'newsletter') {
      createNewsletterTemplate();
    } else if (type === 'promotional') {
      createPromotionalTemplate();
    }
  };

  const handleExportCampaign = () => {
    const html = exportAsHTML();
    
    // In a real app, you might send this to an email service
    console.log('Campaign HTML:', html);
    
    // Or save to a campaign management system
    const campaignData = {
      type: campaignType,
      targetAudience,
      template: html,
      createdAt: new Date().toISOString(),
    };
    
    console.log('Campaign Data:', campaignData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Campaign Controls */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Marketing Campaign Builder
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Campaign Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Type
              </label>
              <select
                value={campaignType}
                onChange={(e) => handleCampaignTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="newsletter">Newsletter</option>
                <option value="promotional">Promotional</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            
            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Subscribers</option>
                <option value="new">New Subscribers</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
              </select>
            </div>
            
            {/* Actions */}
            <div className="flex items-end space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              
              <button
                onClick={handleExportCampaign}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Export Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Template Builder */}
      <EmailTemplateBuilder />
    </div>
  );
}

export default MarketingCampaignBuilder;
```

## 🔗 Next Steps

- **[Integration](Integration)** - Learn how to integrate these examples into your app
- **[API Reference](API-Reference)** - Complete function documentation
- **[Components](Components)** - Understand available components

---

**Need help with examples?** Check the [Issues](https://github.com/utdevnp/mailyon/issues) page.
