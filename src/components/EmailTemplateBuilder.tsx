import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Builder } from './Builder/Builder';
import { ComponentLibrary } from './ComponentLibrary/ComponentLibrary';
import { Inspector } from './Inspector/Inspector';
import { Toolbar } from './Toolbar/Toolbar';

interface EmailTemplateBuilderProps {
  className?: string;
  style?: React.CSSProperties;
}

export const EmailTemplateBuilder: React.FC<EmailTemplateBuilderProps> = ({ 
  className = '', 
  style = {} 
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`bg-gray-50 ${className}`} style={style}>
        {/* Main Content - No Header */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Sidebar - Component Library */}
            <div className="col-span-3">
              <ComponentLibrary />
            </div>

            {/* Center - Builder Canvas */}
            <div className="col-span-6">
              <Builder />
            </div>

            {/* Right Sidebar - Inspector */}
            <div className="col-span-3">
              <Inspector />
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default EmailTemplateBuilder;
