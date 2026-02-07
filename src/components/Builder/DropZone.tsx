import React from "react";
import { useDrop } from "react-dnd";
import { ComponentType } from "../../types";

interface DropZoneProps {
  index: number;
  onDrop: (type: ComponentType, index: number) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ index, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item: { type: ComponentType }, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item.type, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`transition-all duration-200 ${
        isOver
          ? "h-8 border-2 border-dashed border-blue-400"
          : "h-3 bg-transparent"
      }`}
    />
  );
};
