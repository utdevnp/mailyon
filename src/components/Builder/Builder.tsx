import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useBuilderStore, createComponent } from "../../store/builderStore";
import { ComponentType } from "../../types";
import { DraggableComponent } from "./DraggableComponent";
import { DropZone } from "./DropZone";
import { ComponentList } from "./ComponentList";
import { EmailPreview } from "./EmailPreview";
import { getDefaultProps } from "../../utils/componentUtils";

export const Builder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "pc" | "mobile">(
    "editor"
  );
  const {
    template,
    addComponent,
    deleteComponent,
    insertComponentAt,
  } = useBuilderStore();

  // Main Builder drop zone for dropping anywhere in the canvas
  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item: { type: ComponentType; defaultProps?: Record<string, any> }, monitor) => {
      // Only handle drops when not over individual drop zones
      if (!monitor.didDrop()) {
        const newComponent = createComponent(
          item.type,
          { ...getDefaultProps(item.type), ...item.defaultProps }
        );
        addComponent(newComponent);
      }
    },
  });

  return (
    <div className="p-6 pt-2">
      {/* Tab Navigation */}
      <div className="mb-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("editor")}
              className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "editor"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 bg-white"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Editor
            </button>
            <button
              onClick={() => setActiveTab("pc")}
              disabled={template.components.length === 0}
              className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "pc"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Desktop
            </button>
            <button
              onClick={() => setActiveTab("mobile")}
              disabled={template.components.length === 0}
              className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "mobile"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Mobile
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "editor" && (
        <div className="flex justify-center">
          <div
            ref={drop as unknown as React.Ref<HTMLDivElement>}
            className={`min-h-[600px] border-2 border-dashed border-gray-300 w-[700px]`}
            style={{
              backgroundColor:
                template.settings.backgroundColor || "transparent",
            }}
          >
            <ComponentList 
              components={template.components}
              emptyText="Drag components from the left sidebar to start creating your email template"
            />
          </div>
        </div>
      )}

      {activeTab === "pc" && (
        <div className="min-h-[600px]">
          <div className="flex justify-center">
            <EmailPreview
              template={template}
              width={template.settings.width || "600px"}
            />
          </div>
        </div>
      )}

      {activeTab === "mobile" && (
        <div className="min-h-[600px]">
          <div className="flex justify-center">
            <EmailPreview template={template} width={375} />
          </div>
        </div>
      )}
    </div>
  );
};
