import React from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../../types';

interface ComponentItemProps {
  type: ComponentType;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

export const ComponentItem: React.FC<ComponentItemProps> = ({
  type,
  label,
  icon,
  description
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`flex items-start p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 hover:border-gray-300 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {icon && <span className="mr-2 text-gray-500 mt-0.5">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-700">{label}</div>
        {description && (
          <div className="text-xs text-gray-500 mt-0.5">{description}</div>
        )}
      </div>
    </div>
  );
};
