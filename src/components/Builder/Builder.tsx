import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useBuilderStore, createComponent } from "../../store/builderStore";
import { EmailComponent, ComponentType } from "../../types";
import { DraggableComponent } from "./DraggableComponent";
import { DropZone } from "./DropZone";
import { ComponentList } from "./ComponentList";
import { getDefaultProps } from "../../utils/componentUtils";

export const Builder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "pc" | "mobile">(
    "editor"
  );
  const [isCanvasSelected, setIsCanvasSelected] = useState(false);
  const {
    template,
    addComponent,
    selectComponent,
    selectedComponent,
    moveComponent,
    deleteComponent,
    insertComponentAt,
  } = useBuilderStore();

  // Main Builder drop zone for dropping anywhere in the canvas
  const [{ isOver }, drop] = useDrop({
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
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const handleComponentClick = (component: EmailComponent) => {
    console.log("Component clicked:", component);
    selectComponent(component);
    setIsCanvasSelected(false); // Deselect canvas when component is clicked
  };

  const handleCanvasClick = () => {
    setIsCanvasSelected(true);
    // Don't deselect component when clicking canvas - let user keep component selected
  };

  const renderPreviewComponent = (component: any) => {
    switch (component.type) {
      case "columns":
        return (
          <div
            className="w-full flex flex-wrap"
            style={{
              backgroundColor: component.props.backgroundColor || "transparent",
              padding: component.props.padding || "5px",
            }}
          >
            {component.children?.map((child: any, index: number) => (
              <React.Fragment key={`${child.id}-${index}`}>
                {renderPreviewComponent(child)}
              </React.Fragment>
            ))}
          </div>
        );

      case "column":
        return (
          <div
            className="flex flex-col min-w-0"
            style={{
              width: component.props.width || "100%",
              backgroundColor: component.props.backgroundColor || "transparent",
              padding: component.props.padding || "5px",
              verticalAlign: component.props.verticalAlign || "top",
            }}
          >
            {component.children?.map((child: any, index: number) => (
              <React.Fragment key={`${child.id}-${index}`}>
                {renderPreviewComponent(child)}
              </React.Fragment>
            ))}
          </div>
        );

      case "header":
        return (
          <div
            className="w-full text-center py-6"
            style={{
              backgroundColor: component.props.backgroundColor || "transparent",
            }}
          >
            {component.props.logo && component.props.logoVisible !== false && (
              <img
                src={component.props.logo}
                alt="Logo"
                className="mx-auto mb-4 logo-custom-size"
                style={
                  {
                    "--logo-width": component.props.logoWidth || "200px",
                    "--logo-height": component.props.logoHeight || "60px",
                  } as React.CSSProperties
                }
              />
            )}
            {component.props.titleVisible !== false && (
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: component.props.textColor || "#000000" }}
              >
                {component.props.title}
              </h1>
            )}
            {component.props.subtitle !== undefined &&
              component.props.subtitleVisible !== false && (
                <p
                  className="text-lg"
                  style={{ color: component.props.textColor || "#000000" }}
                >
                  {component.props.subtitle}
                </p>
              )}
          </div>
        );

      case "text":
        return (
          <div className="w-full py-4 px-6">
            {component.props.textVisible !== false && (
              <div
                className="prose max-w-none"
                style={{
                  fontSize: component.props.fontSize || "16px",
                  fontWeight: component.props.fontWeight || "normal",
                  textAlign: component.props.textAlign || "left",
                  color: component.props.color || "#000000",
                  lineHeight: component.props.lineHeight || "1.5",
                  backgroundColor:
                    component.props.backgroundColor || "transparent",
                }}
                dangerouslySetInnerHTML={{
                  __html: component.props.content || "",
                }}
              />
            )}
          </div>
        );

      case "image":
        return (
          <div className="w-full py-4 px-6">
            {component.props.imageVisible !== false && (
              <div
                className="flex"
                style={{
                  justifyContent:
                    component.props.align === "left"
                      ? "flex-start"
                      : component.props.align === "right"
                      ? "flex-end"
                      : "center",
                }}
              >
                <img
                  src={component.props.src}
                  alt={component.props.alt}
                  className="max-w-full h-auto"
                  style={{
                    width: component.props.width || "100%",
                    height: component.props.height || "auto",
                    borderRadius: component.props.borderRadius || "0px",
                  }}
                />
              </div>
            )}
          </div>
        );

      case "button":
        return (
          <div className="w-full py-4 px-6 text-center">
            {component.props.buttonVisible !== false && (
              <a
                href={component.props.url}
                className="inline-block px-6 py-3 rounded-lg font-medium text-center transition-colors"
                style={{
                  backgroundColor: component.props.backgroundColor || "#3b82f6",
                  color: component.props.textColor || "#ffffff",
                  borderRadius: component.props.borderRadius || "6px",
                  padding: component.props.padding || "12px 24px",
                  fontSize: component.props.fontSize || "16px",
                }}
              >
                {component.props.text}
              </a>
            )}
          </div>
        );

      case "divider":
        return (
          <div className="w-full py-2 px-6">
            <hr
              style={{
                borderColor: component.props.color || "#e5e7eb",
                borderWidth: component.props.height || "1px",
                margin: component.props.margin || "20px 0",
              }}
            />
          </div>
        );

      case "footer":
        return (
          <div
            className="w-full py-6 px-6"
            style={{
              backgroundColor: component.props.backgroundColor || "transparent",
            }}
          >
            <div
              className={`mb-4 ${
                component.props.contentAlignment === "left"
                  ? "text-left"
                  : component.props.contentAlignment === "right"
                  ? "text-right"
                  : "text-center"
              }`}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: component.props.companyNameColor || "#111827" }}
              >
                {component.props.companyName ? component.props.companyName : ""}
              </h3>
              <p
                className="text-sm mb-2"
                style={{ color: component.props.contactTextColor || "#6b7280" }}
              >
                {component.props.address ? component.props.address : ""}
              </p>
              <p
                className="text-sm mb-2"
                style={{ color: component.props.contactTextColor || "#6b7280" }}
              >
                {component.props.phone ? component.props.phone : ""}
              </p>
              <p
                className="text-sm mb-4"
                style={{ color: component.props.contactTextColor || "#6b7280" }}
              >
                {component.props.email ? component.props.email : ""}
              </p>
            </div>

            {component.props.socialLinks &&
              component.props.socialLinks.length > 0 && (
                <div
                  className={`flex space-x-4 mb-4 ${
                    component.props.contentAlignment === "left"
                      ? "justify-start"
                      : component.props.contentAlignment === "right"
                      ? "justify-end"
                      : "justify-center"
                  }`}
                >
                  {component.props.socialLinks.map(
                    (link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.imageUrl && (
                          <img
                            src={link.imageUrl}
                            alt={link.title || "Social Icon"}
                            className="w-5 h-5"
                            style={{
                              filter:
                                link.imageUrl &&
                                link.imageUrl.includes("simple-icons")
                                  ? `brightness(0) saturate(100%) invert(0.6) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.8) contrast(1)`
                                  : "none",
                            }}
                          />
                        )}
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: component.props.socialTextColor || "#6b7280",
                          }}
                        >
                          {link.title || ""}
                        </span>
                      </a>
                    )
                  )}
                </div>
              )}

            {component.props.unsubscribeText && (
              <div
                className={`${
                  component.props.contentAlignment === "left"
                    ? "text-left"
                    : component.props.contentAlignment === "right"
                    ? "text-right"
                    : "text-center"
                }`}
              >
                <a
                  href="#"
                  className="text-sm underline hover:opacity-80"
                  style={{
                    color: component.props.unsubscribeTextColor || "#9ca3af",
                  }}
                >
                  {component.props.unsubscribeText}
                </a>
              </div>
            )}
          </div>
        );

      case "spacer":
        return (
          <div
            className="w-full"
            style={{ height: component.props.height || "20px" }}
          />
        );

      case "socialMedia":
        return (
          <div
            className="w-full"
            style={{
              backgroundColor: component.props.backgroundColor || "transparent",
              padding: component.props.padding || "5px",
            }}
          >
            <div
              className="flex justify-center"
              style={{
                flexDirection:
                  component.props.alignment === "vertical" ? "column" : "row",
                gap: component.props.spacing || "16px",
                alignItems: "center",
              }}
            >
              {component.props.platforms &&
                component.props.platforms.map(
                  (platform: any, index: number) => (
                    <a
                      key={index}
                      href={platform.url}
                      className="inline-flex items-center justify-center transition-transform hover:scale-110"
                      style={{
                        color: platform.color,
                        width: component.props.iconSize || "24px",
                        height: component.props.iconSize || "24px",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.platform === "Facebook" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )}
                      {platform.platform === "Twitter" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      )}
                      {platform.platform === "Instagram" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" />
                        </svg>
                      )}
                      {platform.platform === "LinkedIn" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {platform.platform === "YouTube" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )}
                      {platform.platform === "TikTok" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      )}
                      {platform.platform === "Pinterest" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" />
                        </svg>
                      )}
                      {platform.platform === "Snapchat" && (
                        <svg
                          className="w-full h-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" />
                        </svg>
                      )}
                    </a>
                  )
                )}
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full py-4 px-6 text-center text-gray-500">
            Unknown component type: {component.type}
          </div>
        );
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex !== destinationIndex) {
      moveComponent(result.draggableId, destinationIndex);
    }
  };

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
            className={`min-h-[600px] border-2 border-dashed border-gray-300 w-[700px] cursor-pointer`}
            style={{
              backgroundColor:
                template.settings.backgroundColor || "transparent",
            }}
            onClick={handleCanvasClick}
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
            <div
              style={{
                width: template.settings.width || "600px",
                backgroundColor:
                  template.settings.backgroundColor || "transparent",
                fontFamily: template.settings.fontFamily || "Arial, sans-serif",
              }}
            >
              {template.components.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  Add components in the Editor tab to see preview
                </div>
              ) : (
                template.components.map((component, index) => (
                  <div key={`${component.id}-${index}`}>
                    {renderPreviewComponent(component)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "mobile" && (
        <div className="min-h-[600px]">
          <div className="flex justify-center">
            <div
              style={{
                maxWidth: "375px",
                backgroundColor:
                  template.settings.backgroundColor || "transparent",
                fontFamily: template.settings.fontFamily || "Arial, sans-serif",
              }}
            >
              {template.components.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  Add components in the Editor tab to see preview
                </div>
              ) : (
                template.components.map((component, index) => (
                  <div key={`${component.id}-${index}`}>
                    {renderPreviewComponent(component)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
