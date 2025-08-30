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

  // Generate HTML from template
  const generateHTML = (): string => {
    const generateComponentHTML = (component: EmailComponent): string => {
      const props = component.props;
      
      switch (component.type) {
        case 'header':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'}; text-align: center;">
              ${props.logo && props.logoVisible !== false ? `<img src="${props.logo}" alt="Logo" style="max-height: 60px; margin-bottom: 10px; width: ${props.logoWidth || '200px'}; height: ${props.logoHeight || '60px'};" />` : ''}
              ${props.title && props.titleVisible !== false ? `<h1 style="color: ${props.textColor || '#000000'}; margin: 0; font-size: 24px; font-weight: bold;">${props.title}</h1>` : ''}
              ${props.subtitle && props.subtitleVisible !== false ? `<p style="color: ${props.textColor || '#000000'}; margin: 10px 0 0 0; font-size: 16px;">${props.subtitle}</p>` : ''}
            </div>
          `;
        
        case 'text':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'}; text-align: ${props.textAlign || 'left'};">
              ${props.textVisible !== false ? `<p style="color: ${props.color || '#000000'}; font-size: ${props.fontSize || '16px'}; margin: 0; line-height: ${props.lineHeight || '1.5'}; font-weight: ${props.fontWeight || 'normal'};">
                ${props.content || ''}
              </p>` : ''}
            </div>
          `;
        
        case 'image':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'}; text-align: ${props.align || 'center'};">
              ${props.imageVisible !== false ? `<img src="${props.src || ''}" alt="${props.alt || ''}" style="max-width: ${props.width || '100%'}; height: auto; border-radius: ${props.borderRadius || '0px'};" />` : ''}
            </div>
          `;
        
        case 'button':
          return `
            <div style="padding: ${props.canvasPadding || '5px'}; text-align: center;">
              ${props.buttonVisible !== false ? `<a href="${props.url || '#'}" style="
                display: inline-block;
                background-color: ${props.backgroundColor || '#3b82f6'};
                color: ${props.textColor || '#ffffff'};
                padding: ${props.padding || '12px 24px'};
                text-decoration: none;
                border-radius: ${props.borderRadius || '6px'};
                font-weight: bold;
                font-size: ${props.fontSize || '16px'};
              ">${props.text || 'Click me'}</a>` : ''}
            </div>
          `;
        
        case 'footer':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'}; text-align: center;">
              ${props.companyName ? `<h3 style="margin: 0 0 15px 0; color: #333;">${props.companyName}</h3>` : ''}
              ${props.address ? `<p style="margin: 5px 0; color: #666;">${props.address}</p>` : ''}
              ${props.phone ? `<p style="margin: 5px 0; color: #666;">${props.phone}</p>` : ''}
              ${props.email ? `<p style="margin: 5px 0; color: #666;">${props.email}</p>` : ''}
              ${props.socialLinks && props.socialLinks.length > 0 ? `
                <div style="margin: 15px 0;">
                  ${props.socialLinks.map((link: { platform: string; url: string }) => `<a href="${link.url}" style="margin: 0 10px; color: #3b82f6; text-decoration: none;">${link.platform}</a>`).join('')}
                </div>
              ` : ''}
              ${props.unsubscribeText ? `
                <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">
                  <a href="${props.unsubscribeUrl || '#'}" style="color: #999; text-decoration: none;">${props.unsubscribeText}</a>
                </p>
              ` : ''}
            </div>
          `;
        
        case 'socialMedia':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'}; text-align: center;">
              <div style="display: flex; justify-content: center; flex-direction: ${props.alignment === 'vertical' ? 'column' : 'row'}; gap: ${props.spacing || '16px'}; align-items: center;">
                ${props.platforms && props.platforms.map((platform: any) => `
                  <a href="${platform.url}" style="color: ${platform.color}; text-decoration: none; width: ${props.iconSize || '24px'}; height: ${props.iconSize || '24px'};">
                    ${platform.platform === 'Facebook' ? '📘' : platform.platform === 'Twitter' ? '🐦' : platform.platform === 'Instagram' ? '📷' : platform.platform === 'LinkedIn' ? '💼' : platform.platform === 'YouTube' ? '📺' : platform.platform === 'TikTok' ? '🎵' : platform.platform === 'Pinterest' ? '📌' : platform.platform === 'Snapchat' ? '👻' : platform.platform}
                  </a>
                `).join('')}
              </div>
            </div>
          `;

        case 'columns':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'};">
              <div style="display: grid; grid-template-columns: repeat(${props.columns || 2}, 1fr); gap: ${props.gap || '20px'};">
                ${Array.from({ length: props.columns || 2 }).map((_, index) => `
                  <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; border-radius: 8px;">
                    Column ${index + 1}
                  </div>
                `).join('')}
              </div>
            </div>
          `;

        case 'spacer':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'}; height: ${props.height || '20px'};"></div>
          `;

        case 'divider':
          return `
            <div style="background-color: ${props.backgroundColor || 'transparent'}; padding: ${props.padding || '5px'};">
              <hr style="border-color: ${props.color || '#e5e7eb'}; border-width: ${props.height || '1px'}; margin: 20px 0; border-style: solid;" />
            </div>
          `;

        default:
          return `<div style="padding: ${props.padding || '5px'}; color: #666;">Component type: ${component.type}</div>`;
      }
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${template.name}</title>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            font-family: ${template.settings.fontFamily}; 
            background-color: ${template.settings.backgroundColor}; 
          }
          .email-container { 
            max-width: ${template.settings.width}; 
            margin: 0 auto; 
            background-color: #ffffff; 
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          ${template.components.map(generateComponentHTML).join('')}
        </div>
      </body>
      </html>
    `;
    
    return html.trim();
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
    <div className="space-y-4">
      <TemplateSettings 
        template={template}
        updateTemplateSettings={updateTemplateSettings}
      />
      
      <div className="card p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Inspector</h3>
        <div className="mt-4">
          {!selectedComponent ? (
            <p className="text-gray-500 text-sm">
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
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('template')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'template'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Template & Inspector
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'code'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Code Export
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
