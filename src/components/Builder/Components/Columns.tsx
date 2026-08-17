import React from "react";
import { EmailComponent } from "../../../types";
import { useBuilderStore } from "../../../store/builderStore";
import { ComponentList } from "../ComponentList";

interface ColumnsProps {
  component: EmailComponent;
}

export const Columns: React.FC<ColumnsProps> = ({ component }) => {
  const { selectComponent, selectedComponentId } = useBuilderStore();
  const columnsCount = component.props.columns || 2;
  const padding = component.props.padding || "5px";
  const backgroundColor = component.props.backgroundColor || "transparent";

  return (
    <div
      className="w-full flex flex-wrap"
      style={{
        padding,
        backgroundColor,
        border: component.props.border || undefined,
        borderRadius: component.props.borderRadius || "0px",
      }}
    >
      {component.children?.map((column: EmailComponent, index: number) => {
        const isSelected = selectedComponentId === column.id;

        return (
          <div
            key={column.id}
            className="flex flex-col min-w-0"
            onClick={(e) => {
              e.stopPropagation();
              selectComponent(column);
            }}
            style={{
              width: column.props.width || `${100 / columnsCount}%`,
              padding: column.props.padding || "5px",
              backgroundColor: column.props.backgroundColor || "transparent",
              verticalAlign: column.props.verticalAlign || "top",
              border: column.props.border || undefined,
              borderRadius: column.props.borderRadius || "0px",
              boxShadow: isSelected
                ? "0 0 0 2px #3b82f6 inset"
                : undefined,
              cursor: "pointer",
            }}
          >
            <ComponentList
              components={column.children || []}
              parentId={column.id}
              emptyText="Drop here"
            />
          </div>
        );
      })}
    </div>
  );
};
