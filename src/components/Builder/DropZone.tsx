import React from "react";
import { useDrop } from "react-dnd";
import { ComponentType } from "../../types";

interface DropZoneProps {
  index: number;
  onDrop: (type: ComponentType, index: number, defaultProps?: Record<string, any>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const DropZone: React.FC<DropZoneProps> = ({ index, onDrop, className, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item: { type: ComponentType; defaultProps?: Record<string, any> }, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item.type, index, item.defaultProps);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  if (children) {
    return (
      <div
        ref={drop as unknown as React.Ref<HTMLDivElement>}
        className={`${className} ${isOver ? "bg-blue-50 border-blue-400" : ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`transition-all duration-200 ${
        isOver
          ? "h-8 border-2 border-dashed border-blue-400"
          : "h-3 bg-transparent"
      } ${className || ""}`}
    />
  );
};
