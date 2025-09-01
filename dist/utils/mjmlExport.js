"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportEmailTemplate = exports.convertMJMLToHTML = exports.generateMJML = void 0;
var mjml_browser_1 = __importDefault(require("mjml-browser"));
// MJML Component Templates - Each matches the preview styling exactly
var generateMJML = function (template) {
    var generateComponentMJML = function (component) {
        var props = component.props;
        switch (component.type) {
            case 'header':
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              ").concat(props.logo && props.logoVisible !== false ? "\n                <mj-image \n                  src=\"".concat(props.logo, "\" \n                  alt=\"Logo\" \n                  width=\"").concat(props.logoWidth || '200px', "\" \n                  height=\"").concat(props.logoHeight || '60px', "\"\n                  padding=\"0 0 10px 0\"\n                  border-radius=\"0\"\n                />\n              ") : '', "\n              ").concat(props.title && props.titleVisible !== false ? "\n                <mj-text \n                  font-size=\"24px\" \n                  font-weight=\"bold\" \n                  color=\"".concat(props.textColor || '#000000', "\"\n                  align=\"center\"\n                  padding=\"0\"\n                  line-height=\"1.2\"\n                >\n                  ").concat(props.title, "\n                </mj-text>\n              ") : '', "\n              ").concat(props.subtitle && props.subtitleVisible !== false ? "\n                <mj-text \n                  font-size=\"16px\" \n                  color=\"".concat(props.textColor || '#000000', "\"\n                  align=\"center\"\n                  padding=\"10px 0 0 0\"\n                  line-height=\"1.4\"\n                >\n                  ").concat(props.subtitle, "\n                </mj-text>\n              ") : '', "\n            </mj-column>\n          </mj-section>\n        ");
            case 'text':
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              ").concat(props.textVisible !== false ? "\n                <mj-text \n                  font-size=\"".concat(props.fontSize || '16px', "\"\n                  font-weight=\"").concat(props.fontWeight || 'normal', "\"\n                  color=\"").concat(props.color || '#000000', "\"\n                  align=\"").concat(props.textAlign || 'left', "\"\n                  line-height=\"").concat(props.lineHeight || '1.5', "\"\n                  padding=\"0\"\n                >\n                  ").concat(props.content || '', "\n                </mj-text>\n              ") : '', "\n            </mj-column>\n          </mj-section>\n        ");
            case 'image':
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              ").concat(props.imageVisible !== false ? "\n                <mj-image \n                  src=\"".concat(props.src || '', "\" \n                  alt=\"").concat(props.alt || '', "\"\n                  width=\"").concat(props.width || '100%', "\"\n                  height=\"auto\"\n                  border-radius=\"").concat(props.borderRadius || '0px', "\"\n                  align=\"").concat(props.align || 'center', "\"\n                  padding=\"0\"\n                  border=\"0\"\n                  style=\"display: block; max-width: 100%;\"\n                />\n              ") : '', "\n            </mj-column>\n          </mj-section>\n        ");
            case 'button':
                return "\n          <mj-section padding=\"".concat(props.canvasPadding || '0px', "\">\n            <mj-column>\n              ").concat(props.buttonVisible !== false ? "\n                <mj-button \n                  href=\"".concat(props.url || '#', "\"\n                  background-color=\"").concat(props.backgroundColor || '#3b82f6', "\"\n                  color=\"").concat(props.textColor || '#ffffff', "\"\n                  border-radius=\"").concat(props.borderRadius || '6px', "\"\n                  font-weight=\"bold\"\n                  font-size=\"").concat(props.fontSize || '16px', "\"\n                  padding=\"").concat(props.padding || '12px 24px', "\"\n                  text-align=\"center\"\n                >\n                  ").concat(props.text || 'Click me', "\n                </mj-button>\n              ") : '', "\n            </mj-column>\n          </mj-section>\n        ");
            case 'divider':
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              <mj-divider \n                border-color=\"").concat(props.color || '#e5e7eb', "\" \n                border-width=\"").concat(props.height || '1px', "\"\n                padding=\"20px 0\"\n              />\n            </mj-column>\n          </mj-section>\n        ");
            case 'spacer':
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              <mj-spacer height=\"").concat(props.height || '20px', "\" />\n            </mj-column>\n          </mj-section>\n        ");
            case 'footer':
                // Debug: Log footer alignment
                console.log('🔍 Footer component alignment:', props.contentAlignment);
                console.log('🔍 Footer props:', props);
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              ").concat(props.companyName ? "\n                <mj-text \n                  font-size=\"18px\" \n                  font-weight=\"bold\" \n                  color=\"#333\"\n                  align=\"".concat(props.contentAlignment || 'center', "\"\n                  padding=\"0 0 15px 0\"\n                >\n                  ").concat(props.companyName, "\n                </mj-text>\n              ") : '', "\n              ").concat(props.address ? "\n                <mj-text \n                  font-size=\"14px\" \n                  color=\"#666\"\n                  align=\"".concat(props.contentAlignment || 'center', "\"\n                  padding=\"5px 0\"\n                >\n                  ").concat(props.address, "\n                </mj-text>\n              ") : '', "\n              ").concat(props.phone ? "\n                <mj-text \n                  font-size=\"14px\" \n                  color=\"#666\"\n                  align=\"".concat(props.contentAlignment || 'center', "\"\n                  padding=\"5px 0\"\n                >\n                  ").concat(props.phone, "\n                </mj-text>\n              ") : '', "\n              ").concat(props.email ? "\n                <mj-text \n                  font-size=\"14px\" \n                  color=\"#666\"\n                  align=\"".concat(props.contentAlignment || 'center', "\"\n                  padding=\"5px 0\"\n                >\n                  ").concat(props.email, "\n                </mj-text>\n              ") : '', "\n              ").concat(props.socialLinks && props.socialLinks.length > 0 ? "\n                <mj-text \n                  font-size=\"14px\" \n                  align=\"".concat(props.contentAlignment || 'center', "\"\n                  padding=\"15px 0\"\n                >\n                  ").concat(props.socialLinks.map(function (link) {
                    return "<a href=\"".concat(link.url, "\" style=\"margin: 0 10px; color: #3b82f6; text-decoration: none; display: inline-block; vertical-align: middle;\">\n                      <img src=\"").concat(link.imageUrl, "\" alt=\"").concat(link.title, "\" width=\"16\" height=\"16\" style=\"display: inline-block; vertical-align: middle; margin-right: 5px;\">\n                      ").concat(link.title, "\n                    </a>");
                }).join(''), "\n                </mj-text>\n              ") : '', "\n              ").concat(props.unsubscribeText ? "\n                <mj-text \n                  font-size=\"12px\" \n                  color=\"#999\"\n                  align=\"".concat(props.contentAlignment || 'center', "\"\n                  padding=\"15px 0 0 0\"\n                >\n                  <a href=\"").concat(props.unsubscribeUrl || '#', "\" style=\"color: #999; text-decoration: none;\">").concat(props.unsubscribeText, "</a>\n                </mj-text>\n              ") : '', "\n            </mj-column>\n          </mj-section>\n        ");
            case 'socialMedia':
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\" background-color=\"").concat(props.backgroundColor || 'transparent', "\">\n            <mj-column>\n              <mj-text \n                align=\"center\"\n                padding=\"0\"\n              >\n                ").concat(props.platforms && props.platforms.map(function (platform) { return "\n                  <a href=\"".concat(platform.url || '#', "\" style=\"\n                    display: inline-block;\n                    width: ").concat(props.iconSize || '24px', "; \n                    height: ").concat(props.iconSize || '24px', ";\n                    margin: 0 ").concat(parseInt(props.spacing || '16px') / 2, "px;\n                    text-decoration: none;\n                  \">\n                    <img src=\"").concat(platform.imageUrl || '#', "\" alt=\"").concat(platform.title || 'Social Platform', "\" width=\"").concat(props.iconSize || '24px', "\" height=\"").concat(props.iconSize || '24px', "\" style=\"display: inline-block; vertical-align: middle;\">\n                  </a>\n                "); }).join(''), "\n              </mj-text>\n            </mj-column>\n          </mj-section>\n        ");
            default:
                return "\n          <mj-section padding=\"".concat(props.padding || '0px', "\">\n            <mj-column>\n              <mj-text color=\"#666\" text-align=\"center\">\n                Component type: ").concat(component.type, "\n              </mj-text>\n            </mj-column>\n          </mj-section>\n        ");
        }
    };
    // Generate complete MJML document
    var mjmlTemplate = "\n    <mjml>\n      <mj-head>\n        <mj-title>".concat(template.name, "</mj-title>\n        <mj-font name=\"Arial\" href=\"https://fonts.googleapis.com/css?family=Arial\" />\n        <mj-attributes>\n          <mj-all font-family=\"Arial, sans-serif\" />\n        </mj-attributes>\n        <mj-style>\n          .email-container {\n            max-width: ").concat(template.settings.width || '600px', ";\n            margin: 0 auto;\n          }\n        </mj-style>\n      </mj-head>\n      <mj-body background-color=\"").concat(template.settings.backgroundColor || '#ffffff', "\">\n        ").concat(template.components.map(generateComponentMJML).join(''), "\n      </mj-body>\n    </mjml>\n  ");
    return mjmlTemplate.trim();
};
exports.generateMJML = generateMJML;
// Convert MJML to HTML with perfect styling
var convertMJMLToHTML = function (mjmlContent) {
    try {
        console.log('Converting MJML to HTML:', mjmlContent);
        var result = (0, mjml_browser_1.default)(mjmlContent, {
            keepComments: false,
            beautify: true,
            minify: false,
            validationLevel: 'soft'
        });
        if (result.errors && result.errors.length > 0) {
            console.warn('MJML conversion warnings:', result.errors);
        }
        console.log('Generated HTML:', result.html);
        // Check if center alignment is preserved
        var hasCenterAlign = result.html.includes('text-align: center') ||
            result.html.includes('text-align:center') ||
            result.html.includes('align="center"');
        if (!hasCenterAlign) {
            console.warn('⚠️ Center alignment NOT found in generated HTML!');
        }
        else {
            console.log('✅ Center alignment found in generated HTML');
        }
        // Ensure center alignment is preserved for header components
        var finalHtml = result.html;
        // If center alignment is missing, add it manually
        if (!hasCenterAlign) {
            console.warn('⚠️ Adding center alignment manually to HTML');
            // This is a fallback - ideally MJML should handle this
            finalHtml = finalHtml.replace(/<mj-text[^>]*>/g, function (match) {
                if (match.includes('font-size="24px"') || match.includes('font-size="16px"')) {
                    return match.replace('>', ' style="text-align: center;">');
                }
                return match;
            });
        }
        return finalHtml;
    }
    catch (error) {
        console.error('MJML conversion error:', error);
        // Fallback to basic HTML if MJML fails
        return "<div style=\"color: red; padding: 20px;\">Error generating HTML. Please check your template.</div>";
    }
};
exports.convertMJMLToHTML = convertMJMLToHTML;
// Main export function - generates both MJML and HTML
var exportEmailTemplate = function (template) {
    var mjml = (0, exports.generateMJML)(template);
    var html = (0, exports.convertMJMLToHTML)(mjml);
    return {
        mjml: mjml,
        html: html,
        template: template
    };
};
exports.exportEmailTemplate = exportEmailTemplate;
