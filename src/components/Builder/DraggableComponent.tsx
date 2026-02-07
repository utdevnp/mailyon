import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { EmailComponent } from "../../types";
import { ComponentRenderer } from "./ComponentRenderer";

interface DraggableComponentProps {
  component: EmailComponent;
  index: number;
  onClick: () => void;
  isSelected: boolean;
  onMove: (id: string, newIndex: number) => void;
  onDelete: (id: string) => void;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  index,
  onClick,
  isSelected,
  onMove,
  onDelete,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "EXISTING_COMPONENT",
    item: { id: component.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "EXISTING_COMPONENT",
    hover: (item: { id: string; index: number }, monitor) => {
      if (!monitor.isOver()) {
        return;
      }

      if (item.index === index) {
        return;
      }

      onMove(item.id, index);
      item.index = index;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node)) as any}
      className={`relative group transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : ""
      } ${isOver ? "border-l-4 border-primary-500" : ""}`}
    >
      <ComponentRenderer
        component={component}
        onClick={onClick}
        isSelected={isSelected}
      />

      {/* Top Overlay Controls - Floating above the border */}
      <div className="absolute -top-3 left-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="flex items-center space-x-1">
          {/* Component Type Badge */}
          <div className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap shadow-md">
            {component.type}
          </div>

          {/* Drag Handle */}
          <div className="p-1 bg-white rounded shadow-md border border-gray-200 cursor-move hover:bg-gray-50 transition-colors">
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </div>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(component.id);
            }}
            className="p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-colors"
            title="Delete component"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
