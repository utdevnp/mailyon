import React from "react";
import { EmailComponent, ComponentType } from "../../types";
import { ColorPicker } from "./ColorPicker";
import ReactQuill from "react-quill";

interface ComponentInspectorProps {
  selectedComponent: EmailComponent;
  updateComponent: (id: string, updates: Partial<EmailComponent>) => void;
  deleteComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
}

export const ComponentInspector: React.FC<ComponentInspectorProps> = ({
  selectedComponent,
  updateComponent,
  deleteComponent,
  duplicateComponent,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [footerPanels, setFooterPanels] = React.useState({
    header: true,
    address: true,
    social: true,
    unsubscribe: true,
  });

  const [expandedSocialLinks, setExpandedSocialLinks] = React.useState<
    number[]
  >([]);

  // Track visibility states for header, text, image, and button fields
  const [fieldVisibility, setFieldVisibility] = React.useState({
    title: true,
    subtitle: true,
    logo: true,
    text: true,
    image: true,
    button: true,
  });

  // Track spacer height mode
  const [spacerHeightMode, setSpacerHeightMode] = React.useState<
    "small" | "medium" | "large" | "custom"
  >("medium");

  // Initialize spacer height mode when component changes
  React.useEffect(() => {
    if (selectedComponent.type === "spacer") {
      const currentHeight = selectedComponent.props.height || "20px";
      if (currentHeight === "10px") setSpacerHeightMode("small");
      else if (currentHeight === "20px") setSpacerHeightMode("medium");
      else if (currentHeight === "40px") setSpacerHeightMode("large");
      else setSpacerHeightMode("custom");
    }
  }, [selectedComponent]);

  const handlePropertyChange = (key: string, value: any) => {
    updateComponent(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [key]: value,
      },
    });
  };

  const toggleFieldVisibility = (
    field: "title" | "subtitle" | "logo" | "text" | "image" | "button"
  ) => {
    setFieldVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    // Update component with visibility state
    updateComponent(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [`${field}Visible`]: !fieldVisibility[field],
      },
    });
  };

  // Helper function to determine padding preset based on current value
  const getPaddingPreset = (padding: string): string => {
    if (padding === "8px 16px") return "small";
    if (padding === "12px 24px") return "medium";
    if (padding === "16px 32px") return "large";
    return "custom";
  };

  // Handler for padding preset changes
  const handlePaddingPresetChange = (preset: string) => {
    let newPadding: string;
    switch (preset) {
      case "small":
        newPadding = "8px 16px";
        break;
      case "medium":
        newPadding = "12px 24px";
        break;
      case "large":
        newPadding = "16px 32px";
        break;
      case "custom":
        newPadding = "12px 16px 12px 16px";
        break;
      default:
        newPadding = selectedComponent.props.padding || "12px 24px";
    }
    handlePropertyChange("padding", newPadding);
  };

  // Helper function to get individual padding value by index
  const getPaddingValue = (padding: string, index: number): string => {
    const values = padding.split(" ");
    return values[index] || "";
  };

  // Helper function to update individual padding side
  const updatePaddingSide = (index: number, value: string) => {
    const currentPadding = selectedComponent.props.padding || "12px 24px";
    const values = currentPadding.split(" ");

    // Ensure we have 4 values for custom padding
    while (values.length < 4) {
      values.push("12px");
    }

    // Update the specific side
    values[index] = value;

    // Join back into padding string
    const newPadding = values.join(" ");
    handlePropertyChange("padding", newPadding);
  };

  // Helper function to get individual margin value by index
  const getMarginValue = (margin: string, index: number): string => {
    const values = margin.split(" ");
    return values[index] || "";
  };

  // Helper function to update individual margin side
  const updateMarginSide = (index: number, value: string) => {
    const currentMargin = selectedComponent.props.margin || "2px 2px";
    const values = currentMargin.split(" ");

    // Ensure we have 2 values for margin (top bottom)
    while (values.length < 2) {
      values.push("2px");
    }

    // Update the specific side
    values[index] = value;

    // Join back into margin string
    const newMargin = values.join(" ");
    handlePropertyChange("margin", newMargin);
  };

  // Helper function to determine height preset based on current value
  const getHeightPreset = (height: string): string => {
    if (height === "10px") return "small";
    if (height === "20px") return "medium";
    if (height === "40px") return "large";
    // If it's not one of the presets, it's custom
    return "custom";
  };

  // Handler for height preset changes
  const handleHeightPresetChange = (preset: string) => {
    // Update the spacer height mode state
    setSpacerHeightMode(preset as "small" | "medium" | "large" | "custom");

    let newHeight: string;
    switch (preset) {
      case "small":
        newHeight = "10px";
        break;
      case "medium":
        newHeight = "20px";
        break;
      case "large":
        newHeight = "40px";
        break;
      case "custom":
        // When custom is selected, keep the current height value
        // This ensures the custom input field shows up with the current value
        newHeight = selectedComponent.props.height || "20px";
        break;
      default:
        newHeight = selectedComponent.props.height || "20px";
    }
    handlePropertyChange("height", newHeight);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteComponent(selectedComponent.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleDuplicate = () => {
    duplicateComponent(selectedComponent.id);
  };

  const renderPropertyEditor = () => {
    switch (selectedComponent.type) {
      case "header":
        return (
          <div className="space-y-2">
            {/* 1. Title */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.title || ""}
                  onChange={(e) =>
                    handlePropertyChange("title", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="Company Name"
                />
                <button
                  onClick={() => toggleFieldVisibility("title")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title={fieldVisibility.title ? "Hide title" : "Show title"}
                >
                  {fieldVisibility.title ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Subtitle */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Subtitle
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.subtitle || ""}
                  placeholder="Tagline or description"
                  onChange={(e) =>
                    handlePropertyChange("subtitle", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                />
                <button
                  onClick={() => toggleFieldVisibility("subtitle")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title={
                    fieldVisibility.subtitle ? "Hide subtitle" : "Show subtitle"
                  }
                >
                  {fieldVisibility.subtitle ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Colors in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ColorPicker
                  value={selectedComponent.props.backgroundColor || "#ffffff"}
                  onChange={(color) =>
                    handlePropertyChange("backgroundColor", color)
                  }
                  label="Background Color"
                  placeholder="Select background color"
                />
              </div>
              <div>
                <ColorPicker
                  value={selectedComponent.props.textColor || "#000000"}
                  onChange={(color) => handlePropertyChange("textColor", color)}
                  label="Text Color"
                  placeholder="Select text color"
                />
              </div>
            </div>

            {/* 4. Logo URL */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Logo URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.logo || ""}
                  onChange={(e) => handlePropertyChange("logo", e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="https://example.com/logo.png"
                />
                <button
                  onClick={() => toggleFieldVisibility("logo")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title={fieldVisibility.logo ? "Hide logo" : "Show logo"}
                >
                  {fieldVisibility.logo ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 5. Logo Dimensions in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Logo Width
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.logoWidth || "200px"}
                    onChange={(e) =>
                      handlePropertyChange("logoWidth", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="200px, 100%, auto"
                  />
                  <button
                    onClick={() => handlePropertyChange("logoWidth", "200px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (200px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Logo Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.logoHeight || "60px"}
                    onChange={(e) =>
                      handlePropertyChange("logoHeight", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="60px, 80px, auto"
                  />
                  <button
                    onClick={() => handlePropertyChange("logoHeight", "60px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (60px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Padding
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.padding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("padding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="5px, 10px, 20px"
                />
                <button
                  onClick={() => handlePropertyChange("padding", "5px")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset to default (5px)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-2">
            {/* 1. Rich Text Editor with Quill */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Content (Rich Text)
              </label>
              <div className="border border-gray-300 rounded overflow-hidden">
                <ReactQuill
                  value={selectedComponent.props.content || ""}
                  onChange={(value) => handlePropertyChange("content", value)}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      ["link"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  theme="snow"
                  placeholder="Enter your text content here..."
                  style={{ minHeight: "200px" }}
                />
              </div>
              <div className="mt-1 flex items-center gap-2">
                <button
                  onClick={() => toggleFieldVisibility("text")}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title={fieldVisibility.text ? "Hide text" : "Show text"}
                >
                  {fieldVisibility.text ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-xs text-gray-500">
                  Rich text editor (Bold, Italic, Underline, Links)
                </span>
              </div>
            </div>

            {/* 2. Typography Controls in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Font Size
                </label>
                <select
                  value={selectedComponent.props.fontSize || "16px"}
                  onChange={(e) =>
                    handlePropertyChange("fontSize", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Font Weight
                </label>
                <select
                  value={selectedComponent.props.fontWeight || "normal"}
                  onChange={(e) =>
                    handlePropertyChange("fontWeight", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="semibold">Semibold</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>

            {/* 3. Layout Controls in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Text Align
                </label>
                <select
                  value={selectedComponent.props.textAlign || "left"}
                  onChange={(e) =>
                    handlePropertyChange("textAlign", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Line Height
                </label>
                <select
                  value={selectedComponent.props.lineHeight || "1.5"}
                  onChange={(e) =>
                    handlePropertyChange("lineHeight", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1.2">1.2 (Tight)</option>
                  <option value="1.4">1.4 (Compact)</option>
                  <option value="1.5">1.5 (Normal)</option>
                  <option value="1.6">1.6 (Relaxed)</option>
                  <option value="1.8">1.8 (Loose)</option>
                </select>
              </div>
            </div>

            {/* 4. Colors in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ColorPicker
                  value={selectedComponent.props.color || "#000000"}
                  onChange={(color) => handlePropertyChange("color", color)}
                  label="Text Color"
                  placeholder="Select text color"
                />
              </div>
              <div>
                <ColorPicker
                  value={
                    selectedComponent.props.backgroundColor || "transparent"
                  }
                  onChange={(color) =>
                    handlePropertyChange("backgroundColor", color)
                  }
                  label="Background Color"
                  placeholder="Select background color"
                />
              </div>
            </div>

            {/* 5. Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Padding
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.padding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("padding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="5px, 10px, 20px"
                />
                <button
                  onClick={() => handlePropertyChange("padding", "5px")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset to default (5px)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.001 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-2">
            {/* 1. Image URL with Show/Hide Toggle */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.src || ""}
                  onChange={(e) => handlePropertyChange("src", e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  onClick={() => toggleFieldVisibility("image")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title={fieldVisibility.image ? "Hide image" : "Show image"}
                >
                  {fieldVisibility.image ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Alt Text */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Alt Text
              </label>
              <input
                type="text"
                value={selectedComponent.props.alt || ""}
                onChange={(e) => handlePropertyChange("alt", e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description of the image"
              />
            </div>

            {/* 3. Dimensions in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Width
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.width || "100%"}
                    onChange={(e) =>
                      handlePropertyChange("width", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="100% or 300px"
                  />
                  <button
                    onClick={() => handlePropertyChange("width", "100%")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (100%)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.height || "auto"}
                    onChange={(e) =>
                      handlePropertyChange("height", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="auto or 200px"
                  />
                  <button
                    onClick={() => handlePropertyChange("height", "auto")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (auto)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Layout Controls in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Alignment
                </label>
                <select
                  value={selectedComponent.props.align || "center"}
                  onChange={(e) =>
                    handlePropertyChange("align", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Border Radius
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.borderRadius || "0px"}
                    onChange={(e) =>
                      handlePropertyChange("borderRadius", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="0px, 8px, 50%"
                  />
                  <button
                    onClick={() => handlePropertyChange("borderRadius", "0px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (0px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Padding
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.padding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("padding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="5px, 10px, 20px"
                />
                <button
                  onClick={() => handlePropertyChange("padding", "5px")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset to default (5px)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case "button":
        return (
          <div className="space-y-2">
            {/* 1. Button Text with Show/Hide Toggle */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Button Text
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.text || "Click Here"}
                  onChange={(e) => handlePropertyChange("text", e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="Click Here"
                />
                <button
                  onClick={() => toggleFieldVisibility("button")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title={fieldVisibility.button ? "Hide button" : "Show button"}
                >
                  {fieldVisibility.button ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 2. URL */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                URL
              </label>
              <input
                type="text"
                value={selectedComponent.props.url || ""}
                onChange={(e) => handlePropertyChange("url", e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>

            {/* 3. Colors in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ColorPicker
                  value={selectedComponent.props.backgroundColor || "#3b82f6"}
                  onChange={(color) =>
                    handlePropertyChange("backgroundColor", color)
                  }
                  label="Background Color"
                  placeholder="Select background color"
                />
              </div>
              <div>
                <ColorPicker
                  value={selectedComponent.props.textColor || "#ffffff"}
                  onChange={(color) => handlePropertyChange("textColor", color)}
                  label="Text Color"
                  placeholder="Select text color"
                />
              </div>
            </div>

            {/* 4. Styling Controls in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Border Radius
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.borderRadius || "6px"}
                    onChange={(e) =>
                      handlePropertyChange("borderRadius", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="6px, 12px, 50%"
                  />
                  <button
                    onClick={() => handlePropertyChange("borderRadius", "6px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (6px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Font Size
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.fontSize || "16px"}
                    onChange={(e) =>
                      handlePropertyChange("fontSize", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="14px, 16px, 18px"
                  />
                  <button
                    onClick={() => handlePropertyChange("fontSize", "16px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (16px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Button Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Button Padding
              </label>
              <div className="space-y-2">
                {/* Padding Preset Selector */}
                <select
                  value={getPaddingPreset(
                    selectedComponent.props.padding || "12px 24px"
                  )}
                  onChange={(e) => handlePaddingPresetChange(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium (Default)</option>
                  <option value="large">Large</option>
                  <option value="custom">Custom</option>
                </select>

                {/* Custom Padding Input (shown when Custom is selected) */}
                {getPaddingPreset(
                  selectedComponent.props.padding || "12px 24px"
                ) === "custom" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Top Padding */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Top
                        </label>
                        <input
                          type="text"
                          value={
                            getPaddingValue(
                              selectedComponent.props.padding || "12px 24px",
                              0
                            ) || "12px"
                          }
                          onChange={(e) => updatePaddingSide(0, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="12px"
                        />
                      </div>

                      {/* Right Padding */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Right
                        </label>
                        <input
                          type="text"
                          value={
                            getPaddingValue(
                              selectedComponent.props.padding || "12px 24px",
                              1
                            ) || "16px"
                          }
                          onChange={(e) => updatePaddingSide(1, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="16px"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Bottom Padding */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Bottom
                        </label>
                        <input
                          type="text"
                          value={
                            getPaddingValue(
                              selectedComponent.props.padding || "12px 24px",
                              2
                            ) || "12px"
                          }
                          onChange={(e) => updatePaddingSide(2, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="12px"
                        />
                      </div>

                      {/* Left Padding */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Left
                        </label>
                        <input
                          type="text"
                          value={
                            getPaddingValue(
                              selectedComponent.props.padding || "12px 24px",
                              3
                            ) || "16px"
                          }
                          onChange={(e) => updatePaddingSide(3, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="16px"
                        />
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          handlePropertyChange("padding", "12px 24px")
                        }
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                        title="Reset to default (12px 24px)"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Reset to Default
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 6. Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Padding
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.canvasPadding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("canvasPadding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="5px, 10px, 20px (Container spacing)"
                />
                <button
                  onClick={() => handlePropertyChange("canvasPadding", "5px")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset to default (5px)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case "divider":
        return (
          <div className="space-y-2">
            {/* 1. Line Color and Thickness Controls in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Line Color
                </label>
                <ColorPicker
                  value={selectedComponent.props.color || "#e5e7eb"}
                  onChange={(color) => handlePropertyChange("color", color)}
                  label=""
                  placeholder="Select line color"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Thickness
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedComponent.props.height || "1px"}
                    onChange={(e) =>
                      handlePropertyChange("height", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="1px, 2px, 3px"
                  />
                  <button
                    onClick={() => handlePropertyChange("height", "1px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (1px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Margin Top and Bottom Controls in Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Margin Top
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      getMarginValue(
                        selectedComponent.props.margin || "2px 2px",
                        0
                      ) || "2px"
                    }
                    onChange={(e) => updateMarginSide(0, e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="2px, 5px"
                  />
                  <button
                    onClick={() => updateMarginSide(0, "2px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (2px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Margin Bottom
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      getMarginValue(
                        selectedComponent.props.margin || "2px 2px",
                        1
                      ) || "2px"
                    }
                    onChange={(e) => updateMarginSide(1, e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    placeholder="2px, 5px"
                  />
                  <button
                    onClick={() => updateMarginSide(1, "2px")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset to default (2px)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "spacer":
        return (
          <div className="space-y-2">
            {/* Height Control with Presets */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Height
              </label>
              <div className="space-y-2">
                {/* Height Preset Selector */}
                <select
                  value={spacerHeightMode}
                  onChange={(e) => handleHeightPresetChange(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="small">Small (10px)</option>
                  <option value="medium">Medium (20px)</option>
                  <option value="large">Large (40px)</option>
                  <option value="custom">Custom</option>
                </select>

                {/* Custom Height Input (shown when Custom is selected) */}
                {spacerHeightMode === "custom" && (
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedComponent.props.height || "20px"}
                      onChange={(e) =>
                        handlePropertyChange("height", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                      placeholder="20px, 50px, 100px"
                    />
                    <button
                      onClick={() => handlePropertyChange("height", "20px")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Reset to default (20px)"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Padding
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.padding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("padding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  placeholder="5px, 10px, 20px"
                />
                <button
                  onClick={() => handlePropertyChange("padding", "5px")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset to default (5px)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-2">
            {/* Header Panel */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  setFooterPanels((prev) => ({ ...prev, header: !prev.header }))
                }
                className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="text-sm font-medium text-gray-700">Header</h4>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    footerPanels.header ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {footerPanels.header && (
                <div className="p-2 border-t border-gray-200 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.props.companyName || ""}
                      onChange={(e) =>
                        handlePropertyChange("companyName", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Content Alignment
                    </label>
                    <select
                      value={
                        selectedComponent.props.contentAlignment || "center"
                      }
                      onChange={(e) =>
                        handlePropertyChange("contentAlignment", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <ColorPicker
                      value={
                        selectedComponent.props.backgroundColor || "transparent"
                      }
                      onChange={(color) =>
                        handlePropertyChange("backgroundColor", color)
                      }
                      label="Background Color"
                      placeholder="Select background color"
                    />
                    <ColorPicker
                      value={
                        selectedComponent.props.companyNameColor || "#111827"
                      }
                      onChange={(color) =>
                        handlePropertyChange("companyNameColor", color)
                      }
                      label="Company Name Color"
                      placeholder="Select company name color"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Address Panel */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  setFooterPanels((prev) => ({
                    ...prev,
                    address: !prev.address,
                  }))
                }
                className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="text-sm font-medium text-gray-700">Address</h4>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    footerPanels.address ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {footerPanels.address && (
                <div className="p-2 border-t border-gray-200 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Address
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.props.address || ""}
                      onChange={(e) =>
                        handlePropertyChange("address", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.props.phone || ""}
                      onChange={(e) =>
                        handlePropertyChange("phone", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Email
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.props.email || ""}
                      onChange={(e) =>
                        handlePropertyChange("email", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      placeholder="info@company.com"
                    />
                  </div>
                  <div className="mt-2">
                    <ColorPicker
                      value={
                        selectedComponent.props.contactTextColor || "#6b7280"
                      }
                      onChange={(color) =>
                        handlePropertyChange("contactTextColor", color)
                      }
                      label="Contact Info Color"
                      placeholder="Select contact info color"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Social Links Panel */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  setFooterPanels((prev) => ({ ...prev, social: !prev.social }))
                }
                className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="text-sm font-medium text-gray-700">
                  Social Links
                </h4>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    footerPanels.social ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {footerPanels.social && (
                <div className="p-2 border-t border-gray-200 space-y-2">
                  <div className="space-y-4">
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => {
                          const newSocialLinks = [
                            ...(selectedComponent.props.socialLinks || []),
                          ];
                          newSocialLinks.push({
                            title: "Facebook",
                            imageUrl:
                              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg",
                            url: "#",
                          });
                          handlePropertyChange("socialLinks", newSocialLinks);
                        }}
                        className="px-2 py-1 text-sm text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 rounded transition-colors"
                      >
                        Add Social Link
                      </button>
                    </div>

                    {(selectedComponent.props.socialLinks || []).map(
                      (
                        link: { title: string; imageUrl: string; url: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg"
                        >
                          <button
                            onClick={() => {
                              setExpandedSocialLinks((prev) =>
                                prev.includes(index)
                                  ? prev.filter((i) => i !== index)
                                  : [...prev, index]
                              );
                            }}
                            className="flex items-center justify-between w-full px-2 py-1.5 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-700">
                                {link.title || `Link ${index + 1}`}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newSocialLinks = [
                                    ...(selectedComponent.props.socialLinks ||
                                      []),
                                  ];
                                  newSocialLinks.splice(index, 1);
                                  handlePropertyChange(
                                    "socialLinks",
                                    newSocialLinks
                                  );
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove social link"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                              <svg
                                className={`w-4 h-4 text-gray-500 transition-transform ${
                                  expandedSocialLinks.includes(index)
                                    ? "rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </button>

                          {expandedSocialLinks.includes(index) && (
                            <div className="p-2 border-t border-gray-200 space-y-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={link.title || ""}
                                  onChange={(e) => {
                                    const newSocialLinks = [
                                      ...(selectedComponent.props.socialLinks ||
                                        []),
                                    ];
                                    newSocialLinks[index] = {
                                      ...link,
                                      title: e.target.value,
                                    };
                                    handlePropertyChange(
                                      "socialLinks",
                                      newSocialLinks
                                    );
                                  }}
                                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                  placeholder="Social Platform Name"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                  Icon URL
                                </label>
                                <input
                                  type="text"
                                  value={link.imageUrl || ""}
                                  onChange={(e) => {
                                    const newSocialLinks = [
                                      ...(selectedComponent.props.socialLinks ||
                                        []),
                                    ];
                                    newSocialLinks[index] = {
                                      ...link,
                                      imageUrl: e.target.value,
                                    };
                                    handlePropertyChange(
                                      "socialLinks",
                                      newSocialLinks
                                    );
                                  }}
                                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                  placeholder="https://example.com/icon.svg"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                                  Profile URL
                                </label>
                                <input
                                  type="text"
                                  value={link.url || ""}
                                  onChange={(e) => {
                                    const newSocialLinks = [
                                      ...(selectedComponent.props.socialLinks ||
                                        []),
                                    ];
                                    newSocialLinks[index] = {
                                      ...link,
                                      url: e.target.value,
                                    };
                                    handlePropertyChange(
                                      "socialLinks",
                                      newSocialLinks
                                    );
                                  }}
                                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                  placeholder="https://platform.com/profile"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2">
                    <ColorPicker
                      value={
                        selectedComponent.props.socialTextColor || "#6b7280"
                      }
                      onChange={(color) =>
                        handlePropertyChange("socialTextColor", color)
                      }
                      label="Social Links Text Color"
                      placeholder="Select social links text color"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Unsubscribe Panel */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  setFooterPanels((prev) => ({
                    ...prev,
                    unsubscribe: !prev.unsubscribe,
                  }))
                }
                className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="text-sm font-medium text-gray-700">
                  Unsubscribe
                </h4>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    footerPanels.unsubscribe ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {footerPanels.unsubscribe && (
                <div className="p-2 border-t border-gray-200 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Unsubscribe Text
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.props.unsubscribeText || ""}
                      onChange={(e) =>
                        handlePropertyChange("unsubscribeText", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Click here to unsubscribe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">
                      Unsubscribe URL
                    </label>
                    <input
                      type="text"
                      value={selectedComponent.props.unsubscribeUrl || ""}
                      onChange={(e) =>
                        handlePropertyChange("unsubscribeUrl", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://company.com/unsubscribe"
                    />
                  </div>
                  <div className="mt-2">
                    <ColorPicker
                      value={
                        selectedComponent.props.unsubscribeTextColor ||
                        "#9ca3af"
                      }
                      onChange={(color) =>
                        handlePropertyChange("unsubscribeTextColor", color)
                      }
                      label="Unsubscribe Text Color"
                      placeholder="Select unsubscribe text color"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Padding Control */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                Padding
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedComponent.props.padding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("padding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent pr-8"
                  placeholder="5px, 10px, 20px"
                />
                <button
                  onClick={() => handlePropertyChange("padding", "5px")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Reset to default (5px)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );

      case "socialMedia":
        return (
          <div className="space-y-2">
            {/* Layout Controls - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Alignment
                </label>
                <select
                  value={selectedComponent.props.alignment || "horizontal"}
                  onChange={(e) =>
                    handlePropertyChange("alignment", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Type
                </label>
                <select
                  value={selectedComponent.props.type || "icon"}
                  onChange={(e) => handlePropertyChange("type", e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="icon">Icon Only</option>
                  <option value="text">Text Only</option>
                  <option value="iconText">Icon + Text</option>
                </select>
              </div>
            </div>

            {/* Size and Spacing - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Icon Size
                </label>
                <input
                  type="text"
                  value={selectedComponent.props.iconSize || "24px"}
                  onChange={(e) =>
                    handlePropertyChange("iconSize", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="24px, 32px, 48px"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Spacing
                </label>
                <input
                  type="text"
                  value={selectedComponent.props.spacing || "16px"}
                  onChange={(e) =>
                    handlePropertyChange("spacing", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="16px, 24px, 32px"
                />
              </div>
            </div>

            {/* Background and Padding - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ColorPicker
                  value={
                    selectedComponent.props.backgroundColor || "transparent"
                  }
                  onChange={(color) =>
                    handlePropertyChange("backgroundColor", color)
                  }
                  label="Background Color"
                  placeholder="Select background color"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Padding
                </label>
                <input
                  type="text"
                  value={selectedComponent.props.padding || "5px"}
                  onChange={(e) =>
                    handlePropertyChange("padding", e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5px, 10px, 20px"
                />
              </div>
            </div>

            {/* Social Media Platforms */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Social Media Platforms
                </label>
                <button
                  onClick={() => {
                    const newPlatform = {
                      platform: "Facebook",
                      title: "Facebook",
                      imageUrl:
                        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg",
                      url: "#",
                    };
                    const currentPlatforms =
                      selectedComponent.props.platforms || [];
                    handlePropertyChange("platforms", [
                      ...currentPlatforms,
                      newPlatform,
                    ]);
                  }}
                  className="px-3 py-1 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  + Add Platform
                </button>
              </div>

              <div className="space-y-3">
                {(selectedComponent.props.platforms || []).map(
                  (platform: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-3 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Platform {index + 1}
                        </span>
                        <button
                          onClick={() => {
                            const currentPlatforms = [
                              ...(selectedComponent.props.platforms || []),
                            ];
                            currentPlatforms.splice(index, 1);
                            handlePropertyChange("platforms", currentPlatforms);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Remove platform"
                        >
                          <svg
                            className="w-4 h-4"
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

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={platform.title}
                            onChange={(e) => {
                              const currentPlatforms = [
                                ...(selectedComponent.props.platforms || []),
                              ];
                              currentPlatforms[index] = {
                                ...platform,
                                title: e.target.value,
                              };
                              handlePropertyChange(
                                "platforms",
                                currentPlatforms
                              );
                            }}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Facebook, Twitter, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Icon Image URL
                          </label>
                          <input
                            type="text"
                            value={platform.imageUrl}
                            onChange={(e) => {
                              const currentPlatforms = [
                                ...(selectedComponent.props.platforms || []),
                              ];
                              currentPlatforms[index] = {
                                ...platform,
                                imageUrl: e.target.value,
                              };
                              handlePropertyChange(
                                "platforms",
                                currentPlatforms
                              );
                            }}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            placeholder="https://example.com/icon.svg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Profile URL
                        </label>
                        <input
                          type="text"
                          value={platform.url || ""}
                          onChange={(e) => {
                            const currentPlatforms = [
                              ...(selectedComponent.props.platforms || []),
                            ];
                            currentPlatforms[index] = {
                              ...platform,
                              url: e.target.value,
                            };
                            handlePropertyChange("platforms", currentPlatforms);
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                          placeholder="https://facebook.com/company"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 text-sm">
            Properties for this component type are not yet implemented.
          </div>
        );
    }
  };

  if (showDeleteConfirm) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Are you sure you want to delete{" "}
          <span className="text-primary-600 font-semibold capitalize">
            {selectedComponent.type}
          </span>{" "}
          Component?
        </h3>
        <div className="flex justify-center space-x-3">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Component Type</div>
          <div className="flex space-x-1">
            <button
              onClick={handleDuplicate}
              className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title="Duplicate"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Delete"
            >
              <svg
                className="w-3.5 h-3.5"
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
        <div className="text-sm font-medium text-gray-900 capitalize mt-1">
          {selectedComponent.type}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Properties</h3>
        {renderPropertyEditor()}
      </div>
    </>
  );
};
