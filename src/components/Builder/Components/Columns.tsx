import React from "react";
import { EmailComponent } from "../../../types";
import { ComponentList } from "../ComponentList";

interface ColumnsProps {
  component: EmailComponent;
}

export const Columns: React.FC<ColumnsProps> = ({ component }) => {
  const columnsCount = component.props.columns || 2;
  const padding = component.props.padding || "5px";
  const backgroundColor = component.props.backgroundColor || "transparent";

  // Ensure children exist for each column
  // In a real app, we might want to initialize these in the store, 
  // but for rendering we can filter/map the children we have.
  // Actually, the Store should initialize the 'column' children.
  // But if they are not there, we should probably render empty slots?
  // Our implementation plan said "Columns component will act as a wrapper. When created, it will automatically initialize with 2 or 3 child components".
  // So we need to ensure the store creates them. 
  // For now, let's assume the children are the columns.

  return (
    <div 
      className="w-full flex flex-wrap"
      style={{
        padding,
        backgroundColor,
      }}
    >
      {component.children?.map((column: EmailComponent, index: number) => (
        <div 
          key={column.id} 
          className="flex flex-col min-w-0"
          style={{
            width: column.props.width || `${100 / columnsCount}%`,
            padding: column.props.padding || "5px",
            backgroundColor: column.props.backgroundColor || "transparent",
            verticalAlign: column.props.verticalAlign || "top",
          }}
        >
          <ComponentList 
            components={column.children || []} 
            parentId={column.id}
            emptyText="Drop here"
          />
        </div>
      ))}
    </div>
  );
};
