import React from "react";
import { EmailComponent, ComponentType } from "../../types";
import { useBuilderStore } from "../../store/builderStore";
import { DraggableComponent } from "./DraggableComponent";
import { DropZone } from "./DropZone";
import { getDefaultProps } from "../../utils/componentUtils";

interface ComponentListProps {
  components: EmailComponent[];
  parentId?: string;
  emptyText?: string;
}

export const ComponentList: React.FC<ComponentListProps> = ({ 
  components, 
  parentId,
  emptyText = "Drop components here" 
}) => {
  const {
    selectComponent,
    selectedComponent,
    moveComponent,
    deleteComponent,
    insertComponentAt,
  } = useBuilderStore();

  const handleComponentClick = (e: React.MouseEvent, component: EmailComponent) => {
    e.stopPropagation();
    console.log("Component clicked:", component);
    selectComponent(component);
  };

  const handleMove = (id: string, newIndex: number) => {
    moveComponent(id, newIndex, parentId);
  };

  const handleDrop = (type: ComponentType, index: number, defaultPropsOverride?: Record<string, any>) => {
    const defaultProps = { ...getDefaultProps(type), ...defaultPropsOverride };
    insertComponentAt(type, index, defaultProps, parentId);
  };

  if (components.length === 0) {
    return (
      <DropZone 
        index={0} 
        onDrop={handleDrop}
        className="py-8 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg m-2 transition-colors duration-200"
      >
        <p className="text-sm">{emptyText}</p>
      </DropZone>
    );
  }

  return (
    <div className="w-full">
      {components.map((component, index) => (
        <React.Fragment key={component.id}>
          {/* Drop zone above the first component */}
          {index === 0 && (
            <DropZone
              index={0}
              onDrop={handleDrop}
            />
          )}

          {/* The component itself */}
          <DraggableComponent
            component={component}
            index={index}
            onClick={(e) => handleComponentClick(e, component)}
            isSelected={selectedComponent?.id === component.id}
            onMove={handleMove}
            onDelete={deleteComponent}
          />

          {/* Drop zone below the component */}
          <DropZone
            index={index + 1}
            onDrop={handleDrop}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
