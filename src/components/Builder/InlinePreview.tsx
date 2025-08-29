import React from 'react';
import { EmailTemplate } from '../../types';

interface InlinePreviewProps {
  template: EmailTemplate;
  onBackToBuilder: () => void;
}

export const InlinePreview: React.FC<InlinePreviewProps> = ({
  template,
  onBackToBuilder,
}) => {
  const renderPreviewComponent = (component: any) => {
    switch (component.type) {
      case 'header':
        return (
          <div
            className="w-full text-center py-6"
            style={{ backgroundColor: component.props.backgroundColor || '#ffffff' }}
          >
            {component.props.logo && component.props.logoVisible !== false && (
              <img
                src={component.props.logo}
                alt="Logo"
                className="mx-auto mb-4 logo-custom-size"
                style={{
                  '--logo-width': component.props.logoWidth || '200px',
                  '--logo-height': component.props.logoHeight || '60px',
                } as React.CSSProperties}
              />
            )}
            {component.props.titleVisible !== false && (
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: component.props.textColor || '#000000' }}
              >
                {component.props.title}
              </h1>
            )}
            {component.props.subtitle !== undefined && component.props.subtitleVisible !== false && (
              <p
                className="text-lg"
                style={{ color: component.props.textColor || '#000000' }}
              >
                {component.props.subtitle}
              </p>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="w-full py-4 px-6">
            {component.props.textVisible !== false && (
              <div
                className="prose max-w-none"
                style={{
                  fontSize: component.props.fontSize || '16px',
                  fontWeight: component.props.fontWeight || 'normal',
                  textAlign: component.props.textAlign || 'left',
                  color: component.props.color || '#000000',
                  lineHeight: component.props.lineHeight || '1.5',
                  backgroundColor: component.props.backgroundColor || 'transparent',
                }}
              >
                {component.props.content}
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="w-full py-4 px-6">
            {component.props.imageVisible !== false && (
              <div
                className="flex"
                style={{
                  justifyContent: component.props.align === 'left' ? 'flex-start' : 
                                component.props.align === 'right' ? 'flex-end' : 'center'
                }}
              >
                <img
                  src={component.props.src}
                  alt={component.props.alt}
                  className="max-w-full h-auto"
                  style={{
                    width: component.props.width || '100%',
                    height: component.props.height || 'auto',
                    borderRadius: component.props.borderRadius || '0px',
                  }}
                />
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <div className="w-full py-4 px-6 text-center">
            {component.props.buttonVisible !== false && (
              <a
                href={component.props.url}
                className="inline-block px-6 py-3 rounded-lg font-medium text-center transition-colors"
                style={{
                  backgroundColor: component.props.backgroundColor || '#3b82f6',
                  color: component.props.textColor || '#ffffff',
                  borderRadius: component.props.borderRadius || '6px',
                  padding: component.props.padding || '12px 24px',
                  fontSize: component.props.fontSize || '16px',
                }}
              >
                {component.props.text}
              </a>
            )}
          </div>
        );

      case 'divider':
        return (
          <div className="w-full py-2 px-6">
            <hr
              style={{
                borderColor: component.props.color || '#e5e7eb',
                borderWidth: component.props.height || '1px',
                margin: component.props.margin || '20px 0',
              }}
            />
          </div>
        );

      case 'columns':
        return (
          <div className="w-full py-4 px-6">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${component.props.columns || 2}, 1fr)`,
                gap: component.props.gap || '20px',
                backgroundColor: component.props.backgroundColor || '#ffffff',
              }}
            >
              {Array.from({ length: component.props.columns || 2 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 text-center text-gray-500"
                >
                  Column {index + 1}
                </div>
              ))}
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="w-full py-6 px-6 bg-gray-50">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {component.props.companyName || 'Company Name'}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {component.props.address || '123 Main St, City, State 12345'}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {component.props.phone || '+1 (555) 123-4567'}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {component.props.email || 'info@company.com'}
              </p>
            </div>
            
            {component.props.socialLinks && component.props.socialLinks.length > 0 && (
              <div className="flex justify-center space-x-4 mb-4">
                {component.props.socialLinks.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
            
            {component.props.unsubscribeText && (
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  {component.props.unsubscribeText}
                </a>
              </div>
            )}
          </div>
        );

      case 'spacer':
        return (
          <div
            className="w-full"
            style={{ height: component.props.height || '20px' }}
          />
        );

      default:
        return (
          <div className="w-full py-4 px-6 text-center text-gray-500">
            Unknown component type: {component.type}
          </div>
        );
    }
  };

  return (
    <div className="min-h-[600px] bg-white border border-gray-200 rounded-lg">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Email Preview
          </h3>
          <span className="text-sm text-gray-500">
            {template.settings.width} width
          </span>
        </div>
        <button
          onClick={onBackToBuilder}
          className="btn-secondary text-sm px-4 py-2"
        >
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Builder
        </button>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        <div
          className="mx-auto bg-white shadow-sm border border-gray-200"
          style={{
            width: template.settings.width || '600px',
            backgroundColor: template.settings.backgroundColor || '#ffffff',
            fontFamily: template.settings.fontFamily || 'Arial, sans-serif',
          }}
        >
          {template.components.map((component, index) => (
            <div key={`${component.id}-${index}`}>
              {renderPreviewComponent(component)}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Preview Mode - This is how your email will look when sent</span>
          <span>Template: {template.name}</span>
        </div>
      </div>
    </div>
  );
};
