import React from 'react';
import { EmailComponent } from '../../types';

interface ComponentRendererProps {
  component: EmailComponent;
  onClick: () => void;
  isSelected: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  onClick,
  isSelected,
}) => {
  const renderComponent = () => {
    switch (component.type) {
      case 'header':
        return (
          <div
            className="border border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
            onClick={onClick}
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
          <div
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
            onClick={onClick}
          >
            {component.props.textVisible !== false && (
              <div
                className="prose max-w-none"
                style={{
                  fontSize: component.props.fontSize || '16px',
                  fontWeight: component.props.fontWeight || 'normal',
                  textAlign: component.props.textAlign || 'left',
                  color: component.props.color || '#000000',
                  lineHeight: component.props.lineHeight || '1.5',
                }}
              >
                {component.props.content}
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
            onClick={onClick}
          >
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
          <div
            className="border border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:shadow-sm transition-shadow"
            onClick={onClick}
          >
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
          <div
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
            onClick={onClick}
          >
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
          <div
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={onClick}
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
          >
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${component.props.columns || 2}, 1fr)`,
                gap: component.props.gap || '20px',
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
          <div
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
            onClick={onClick}
          >
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
                {component.props.socialLinks.map((link: { platform: string; url: string }, index: number) => (
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
            className="border border-gray-200 rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
            onClick={onClick}
            style={{ 
              height: component.props.height || '20px',
              backgroundColor: component.props.backgroundColor || 'transparent'
            }}
          >
            <div className="text-center text-gray-400 text-xs py-1">
              Spacer ({component.props.height || '20px'})
            </div>
          </div>
        );

      default:
        return (
          <div
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
            onClick={onClick}
          >
            <div className="text-gray-500 text-center">
              Unknown component type: {component.type}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2 rounded-lg' : ''}`}>
      {renderComponent()}
    </div>
  );
};
