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
            className="text-center hover:shadow-sm transition-shadow"
            style={{ 
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
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
            className="hover:shadow-sm transition-shadow"
            style={{ 
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
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
            className="hover:shadow-sm transition-shadow"
            style={{ 
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
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
            className="text-center hover:shadow-sm transition-shadow"
            style={{ padding: component.props.canvasPadding || '5px' }}
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
            className="hover:shadow-sm transition-shadow"
            style={{ 
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
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



      case 'footer':
        return (
          <div
            className="hover:shadow-sm transition-shadow"
            style={{ 
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
          >
            <div className={`mb-4 ${component.props.contentAlignment === 'left' ? 'text-left' : component.props.contentAlignment === 'right' ? 'text-right' : 'text-center'}`}>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ color: component.props.companyNameColor || '#111827' }}
              >
                {component.props.companyName ? component.props.companyName : ''}
              </h3>
              <p 
                className="text-sm mb-2"
                style={{ color: component.props.contactTextColor || '#6b7280' }}
              >
                {component.props.address ? component.props.address : ''}
              </p>
              <p 
                className="text-sm mb-2"
                style={{ color: component.props.contactTextColor || '#6b7280' }}
              >
                {component.props.phone ? component.props.phone : ''}
              </p>
              <p 
                className="text-sm mb-4"
                style={{ color: component.props.contactTextColor || '#6b7280' }}
              >
                {component.props.email ? component.props.email : ''}
              </p>
            </div>
            
            {component.props.socialLinks && component.props.socialLinks.length > 0 && (
              <div className={`flex space-x-4 mb-4 ${component.props.contentAlignment === 'left' ? 'justify-start' : component.props.contentAlignment === 'right' ? 'justify-end' : 'justify-center'}`}>
                {component.props.socialLinks.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.imageUrl && (
                      <img 
                        src={link.imageUrl}
                        alt={link.title || 'Social Icon'}
                        className="w-5 h-5"
                        style={{ 
                          filter: (link.imageUrl && link.imageUrl.includes('simple-icons')) 
                            ? `brightness(0) saturate(100%) invert(0.6) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.8) contrast(1)` 
                            : 'none'
                        }}
                      />
                    )}
                    <span 
                      className="text-sm font-medium"
                      style={{ color: component.props.socialTextColor || '#6b7280' }}
                    >
                      {link.title || ''}
                    </span>
                  </a>
                ))}
              </div>
            )}
            
            {component.props.unsubscribeText && (
              <div className={`${component.props.contentAlignment === 'left' ? 'text-left' : component.props.contentAlignment === 'right' ? 'text-right' : 'text-center'}`}>
                <a
                  href="#"
                  className="text-sm underline hover:opacity-80"
                  style={{ color: component.props.unsubscribeTextColor || '#9ca3af' }}
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
            className="hover:shadow-sm transition-shadow"
            style={{ 
              height: component.props.height || '20px',
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
          />
        );

      case 'socialMedia':
        return (
          <div
            className="w-full hover:shadow-sm transition-shadow"
            style={{ 
              backgroundColor: component.props.backgroundColor || 'transparent',
              padding: component.props.padding || '5px'
            }}
          >
            <div
              className="flex justify-center"
              style={{
                flexDirection: component.props.alignment === 'vertical' ? 'column' : 'row',
                gap: component.props.spacing || '16px',
                alignItems: 'center'
              }}
            >
              {component.props.platforms && component.props.platforms.map((platform: any, index: number) => {
                const displayType = component.props.type || 'icon';
                
                return (
                  <a
                    key={index}
                    href={platform.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center transition-transform hover:scale-110"
                    style={{
                      gap: displayType === 'iconText' ? '8px' : '0px'
                    }}
                  >
                    {/* Icon Display */}
                    {(displayType === 'icon' || displayType === 'iconText') && (
                      <div
                        style={{
                          width: component.props.iconSize || '24px',
                          height: component.props.iconSize || '24px'
                        }}
                      >
                        <img 
                          src={platform.imageUrl || '#'} 
                          alt={platform.title || 'Social Platform'} 
                          className="w-full h-full"
                        />
                      </div>
                    )}
                    
                    {/* Text Display */}
                    {(displayType === 'text' || displayType === 'iconText') && (
                      <span 
                        className="font-medium text-sm"
                        style={{ color: '#333333' }}
                      >
                        {platform.title || 'Social Platform'}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <div
            className="p-4 hover:shadow-sm transition-shadow"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
          >
            <div className="text-gray-500 text-center">
              Unknown component type: {component.type}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      <div 
        className={`border transition-colors ${
          isSelected 
            ? 'border-blue-500 hover:border-blue-700 hover:border-dashed' 
            : 'border-gray-300 hover:border-blue-600 hover:border-dashed'
        }`}
        onClick={onClick}
      >
        {renderComponent()}
      </div>
    </div>
  );
};
