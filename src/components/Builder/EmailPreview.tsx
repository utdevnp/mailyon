import React, { useMemo } from "react";
import { EmailTemplate } from "../../types";
import { generateMJML, convertMJMLToHTML } from "../../utils/mjmlExport";

interface EmailPreviewProps {
  template: EmailTemplate;
  width?: string | number;
}

// Preview height: at least 1000px; taller email content scrolls within the iframe.
const PREVIEW_MIN_HEIGHT = 1000;

/**
 * True-to-export preview: renders the exact HTML produced by the MJML export
 * pipeline (generateMJML -> convertMJMLToHTML), so the preview always matches
 * what the exported email will look like.
 */
export const EmailPreview: React.FC<EmailPreviewProps> = ({ template, width }) => {
  // Regenerate the exported HTML whenever the template changes.
  const html = useMemo(() => {
    if (!template.components || template.components.length === 0) return "";
    try {
      return convertMJMLToHTML(generateMJML(template));
    } catch (error) {
      console.error("Preview generation error:", error);
      return "";
    }
  }, [template]);

  // Use the editor/template background if one is set; otherwise leave it transparent.
  const backgroundColor =
    template.settings.backgroundColor && template.settings.backgroundColor !== "transparent"
      ? template.settings.backgroundColor
      : undefined;

  return (
    <div className="w-full">
      {html ? (
        <iframe
          title="Email preview"
          sandbox="allow-same-origin"
          srcDoc={html}
          style={{
            width: typeof width === "number" ? `${width}px` : width || "100%",
            minHeight: PREVIEW_MIN_HEIGHT,
            height: PREVIEW_MIN_HEIGHT,
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
            background: backgroundColor,
          }}
        />
      ) : (
        <div className="py-20 text-center text-gray-500">
          Add components in the Editor tab to see preview
        </div>
      )}
    </div>
  );
};
