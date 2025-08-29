import React from 'react';
import { ComponentType } from '../../types';
import { ComponentItem } from './ComponentItem';

interface ComponentsSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const ComponentsSection: React.FC<ComponentsSectionProps> = ({
  isExpanded,
  onToggle
}) => {
  const components = [
    { 
      type: 'header' as ComponentType, 
      label: 'Header', 
      description: 'Company logo and navigation',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    },
    { 
      type: 'text' as ComponentType, 
      label: 'Text', 
      description: 'Paragraphs and headings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    },
    { 
      type: 'image' as ComponentType, 
      label: 'Image', 
      description: 'Single images and graphics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      type: 'button' as ComponentType, 
      label: 'Button', 
      description: 'Call-to-action buttons',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
        </svg>
      )
    },
    { 
      type: 'divider' as ComponentType, 
      label: 'Divider', 
      description: 'Horizontal lines and spacers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )
    },
    { 
      type: 'spacer' as ComponentType, 
      label: 'Spacer', 
      description: 'Vertical spacing element',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      type: 'footer' as ComponentType, 
      label: 'Footer', 
      description: 'Contact info and social links',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )
    }
  ];

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-sm font-medium text-gray-700">Components</h3>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="p-3 border-t border-gray-200 space-y-2">
          {components.map((component) => (
            <ComponentItem
              key={component.type}
              type={component.type}
              label={component.label}
              icon={component.icon}
              description={component.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};
