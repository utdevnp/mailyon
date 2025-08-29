import React from 'react';
import { ComponentsSection } from './ComponentsSection';
import { ColumnsSection } from './ColumnsSection';

export const ComponentLibrary: React.FC = () => {
  const [accordionState, setAccordionState] = React.useState({
    components: true,  // Open by default
    columns: false     // Closed by default
  });

  const toggleAccordion = (key: keyof typeof accordionState) => {
    setAccordionState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Component Library
      </h2>
      <div className="space-y-4">
        <ComponentsSection
          isExpanded={accordionState.components}
          onToggle={() => toggleAccordion('components')}
        />
        
        <ColumnsSection
          isExpanded={accordionState.columns}
          onToggle={() => toggleAccordion('columns')}
        />
      </div>
    </div>
  );
};
