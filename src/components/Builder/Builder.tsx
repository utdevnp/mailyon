import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useBuilderStore } from '../../store/builderStore';
import { EmailComponent, ComponentType } from '../../types';
import { DraggableComponent } from './DraggableComponent';
import { DropZone } from './DropZone';

export const Builder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'pc' | 'mobile'>('editor');
  const { 
    template, 
    addComponent, 
    selectComponent, 
    selectedComponent,
    moveComponent,
    deleteComponent,
    insertComponentAt
  } = useBuilderStore();

  // Main Builder drop zone for dropping anywhere in the canvas
  const [{ isOver }, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item: { type: ComponentType }, monitor) => {
      // Only handle drops when not over individual drop zones
      if (!monitor.didDrop()) {
        const newComponent: EmailComponent = {
          id: Math.random().toString(36).substr(2, 9),
          type: item.type,
          props: getDefaultProps(item.type),
          children: [],
          style: {},
        };
        addComponent(newComponent);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });





  const getDefaultProps = (type: ComponentType): Record<string, any> => {
    switch (type) {
      case 'header':
        return {
          logo: '',
          logoWidth: '200px',
          logoHeight: '60px',
          title: 'Company Name',
          subtitle: 'Your tagline here',
          backgroundColor: 'transparent',
          textColor: '#000000',
          logoVisible: true,
          titleVisible: true,
          subtitleVisible: true,
        };
      case 'text':
        return {
          content: 'Welcome to templify! This is a sample text block where you can add your content. You can customize the font size, weight, alignment, and colors to match your brand.',
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'left',
          color: '#000000',
          lineHeight: '1.5',
          backgroundColor: 'transparent',
          textVisible: true,
        };
      case 'image':
        return {
          src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop&crop=center',
          alt: 'Professional business image - perfect for your email content',
          width: '100%',
          height: 'auto',
          align: 'center',
          borderRadius: '0px',
          imageVisible: true,
        };
      case 'button':
        return {
          text: 'Click Here',
          url: '#',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          borderRadius: '6px',
          padding: '12px 24px',
          fontSize: '16px',
          buttonVisible: true,
        };
      case 'divider':
        return {
          color: '#e5e7eb',
          height: '1px',
          margin: '2px 2px',
        };
      case 'columns':
        return {
          columns: 2,
          gap: '20px',
          backgroundColor: 'transparent',
        };
      case 'footer':
        return {
          companyName: 'Company Name',
          address: '123 Main St, City, State 12345',
          phone: '+1 (555) 123-4567',
          email: 'info@company.com',
          socialLinks: [
            { platform: 'Facebook', url: '#' },
            { platform: 'Twitter', url: '#' },
            { platform: 'LinkedIn', url: '#' },
          ],
          unsubscribeText: 'Click here to unsubscribe',
          unsubscribeUrl: 'https://company.com/unsubscribe',
          backgroundColor: 'transparent',
        };
      case 'spacer':
        return {
          height: '20px',
        };
      default:
        return {};
    }
  };

  const handleComponentClick = (component: EmailComponent) => {
    selectComponent(component);
  };

  const renderPreviewComponent = (component: any) => {
    switch (component.type) {
      case 'header':
        return (
          <div
            className="w-full text-center py-6"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
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
              backgroundColor: component.props.backgroundColor || 'transparent',
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
            className="w-full py-6 px-6"
            style={{ backgroundColor: component.props.backgroundColor || 'transparent' }}
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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex !== destinationIndex) {
      moveComponent(result.draggableId, destinationIndex);
    }
  };

  return (
    <div className="p-6 pt-2">
              {/* Tab Navigation */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'editor'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editor
              </button>
              <button
                onClick={() => setActiveTab('pc')}
                disabled={template.components.length === 0}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'pc'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Desktop
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                disabled={template.components.length === 0}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'mobile'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile
              </button>
            </nav>
          </div>
        </div>

      {/* Tab Content */}
      {activeTab === 'editor' && (
        <div className="flex justify-center">
          <div
            ref={drop}
            className={`min-h-[600px] border-2 border-dotted rounded-lg w-[700px] transition-colors ${
              isOver 
                ? 'border-blue-400' 
                : 'border-gray-300'
            }`}
          >
          {template.components.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start building your email
              </h3>
              <p className="text-gray-500 text-center max-w-sm">
                Drag components from the left sidebar to start creating your email template
              </p>
              
              {/* Drop zone for the first component */}
              <div className="mt-8">
                <DropZone
                  index={0}
                  onDrop={(type, index) => {
                    const defaultProps = getDefaultProps(type);
                    insertComponentAt(type, index, defaultProps);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-1">
              {template.components.map((component, index) => (
                <React.Fragment key={component.id}>
                  {/* Drop zone above the first component */}
                  {index === 0 && (
                    <DropZone
                      index={0}
                      onDrop={(type, index) => {
                        const defaultProps = getDefaultProps(type);
                        insertComponentAt(type, index, defaultProps);
                      }}
                    />
                  )}
                  
                  {/* The component itself */}
                  <DraggableComponent
                    component={component}
                    index={index}
                    onClick={() => handleComponentClick(component)}
                    isSelected={selectedComponent?.id === component.id}
                    onMove={moveComponent}
                    onDelete={deleteComponent}
                  />
                  
                  {/* Drop zone below the component */}
                  <DropZone
                    index={index + 1}
                    onDrop={(type, index) => {
                      const defaultProps = getDefaultProps(type);
                      insertComponentAt(type, index, defaultProps);
                    }}
                  />
                </React.Fragment>
              ))}
              
              {/* Additional drop zone at the very end for appending */}
              <DropZone
                index={template.components.length}
                onDrop={(type, index) => {
                  const defaultProps = getDefaultProps(type);
                  insertComponentAt(type, index, defaultProps);
                }}
              />
            </div>
          )}
          </div>
        </div>
      )}

      {activeTab === 'pc' && (
        <div className="min-h-[600px]">
          <div className="flex justify-center">
            <div
              style={{
                width: template.settings.width || '600px',
                backgroundColor: template.settings.backgroundColor || 'transparent',
                fontFamily: template.settings.fontFamily || 'Arial, sans-serif',
              }}
            >
              {template.components.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  Add components in the Editor tab to see preview
                </div>
              ) : (
                template.components.map((component, index) => (
                  <div key={`${component.id}-${index}`}>
                    {renderPreviewComponent(component)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mobile' && (
        <div className="min-h-[600px]">
          <div className="flex justify-center">
            <div style={{ maxWidth: '375px' }}>
              {template.components.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  Add components in the Editor tab to see preview
                </div>
              ) : (
                template.components.map((component, index) => (
                  <div key={`${component.id}-${index}`}>
                    {renderPreviewComponent(component)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}



    </div>
  );
};
