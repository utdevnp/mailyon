"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlinePreview = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var InlinePreview = function (_a) {
    var template = _a.template, onBackToBuilder = _a.onBackToBuilder;
    var renderPreviewComponent = function (component) {
        switch (component.type) {
            case 'header':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full text-center py-6", style: { backgroundColor: component.props.backgroundColor || '#ffffff' } }, { children: [component.props.logo && component.props.logoVisible !== false && ((0, jsx_runtime_1.jsx)("img", { src: component.props.logo, alt: "Logo", className: "mx-auto mb-4 logo-custom-size", style: {
                                '--logo-width': component.props.logoWidth || '200px',
                                '--logo-height': component.props.logoHeight || '60px',
                            } })), component.props.titleVisible !== false && ((0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-2xl font-bold mb-2", style: { color: component.props.textColor || '#000000' } }, { children: component.props.title }))), component.props.subtitle !== undefined && component.props.subtitleVisible !== false && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "text-lg", style: { color: component.props.textColor || '#000000' } }, { children: component.props.subtitle })))] })));
            case 'text':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6" }, { children: component.props.textVisible !== false && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "prose max-w-none", style: {
                            fontSize: component.props.fontSize || '16px',
                            fontWeight: component.props.fontWeight || 'normal',
                            textAlign: component.props.textAlign || 'left',
                            color: component.props.color || '#000000',
                            lineHeight: component.props.lineHeight || '1.5',
                            backgroundColor: component.props.backgroundColor || 'transparent',
                        } }, { children: component.props.content }))) })));
            case 'image':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6" }, { children: component.props.imageVisible !== false && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex", style: {
                            justifyContent: component.props.align === 'left' ? 'flex-start' :
                                component.props.align === 'right' ? 'flex-end' : 'center'
                        } }, { children: (0, jsx_runtime_1.jsx)("img", { src: component.props.src, alt: component.props.alt, className: "max-w-full h-auto", style: {
                                width: component.props.width || '100%',
                                height: component.props.height || 'auto',
                                borderRadius: component.props.borderRadius || '0px',
                            } }) }))) })));
            case 'button':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6 text-center" }, { children: component.props.buttonVisible !== false && ((0, jsx_runtime_1.jsx)("a", __assign({ href: component.props.url, className: "inline-block px-6 py-3 rounded-lg font-medium text-center transition-colors", style: {
                            backgroundColor: component.props.backgroundColor || '#3b82f6',
                            color: component.props.textColor || '#ffffff',
                            borderRadius: component.props.borderRadius || '6px',
                            padding: component.props.padding || '12px 24px',
                            fontSize: component.props.fontSize || '16px',
                        } }, { children: component.props.text }))) })));
            case 'divider':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-2 px-6" }, { children: (0, jsx_runtime_1.jsx)("hr", { style: {
                            borderColor: component.props.color || '#e5e7eb',
                            borderWidth: component.props.height || '1px',
                            margin: component.props.margin || '20px 0',
                        } }) })));
            case 'footer':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full py-6 px-6 bg-gray-50" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center mb-4" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-semibold mb-2", style: { color: component.props.companyNameColor || '#111827' } }, { children: component.props.companyName ? component.props.companyName : '' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm mb-2", style: { color: component.props.contactTextColor || '#6b7280' } }, { children: component.props.address ? component.props.address : '' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm mb-2", style: { color: component.props.contactTextColor || '#6b7280' } }, { children: component.props.phone ? component.props.phone : '' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm mb-4", style: { color: component.props.contactTextColor || '#6b7280' } }, { children: component.props.email ? component.props.email : '' }))] })), component.props.socialLinks && component.props.socialLinks.length > 0 && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center space-x-4 mb-4" }, { children: component.props.socialLinks.map(function (link, index) { return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: link.url, className: "hover:opacity-80 transition-colors", style: { color: component.props.socialTextColor || '#6b7280' } }, { children: [link.imageUrl && ((0, jsx_runtime_1.jsx)("img", { src: link.imageUrl, alt: link.title || 'Social Icon', className: "w-5 h-5" })), link.title || ''] }), index)); }) }))), component.props.unsubscribeText && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-center" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "#", className: "text-sm underline hover:opacity-80", style: { color: component.props.unsubscribeTextColor || '#9ca3af' } }, { children: component.props.unsubscribeText })) })))] })));
            case 'spacer':
                return ((0, jsx_runtime_1.jsx)("div", { className: "w-full", style: { height: component.props.height || '20px' } }));
            case 'socialMedia':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '20px'
                    } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center", style: {
                            flexDirection: component.props.alignment === 'vertical' ? 'column' : 'row',
                            gap: component.props.spacing || '16px',
                            alignItems: 'center'
                        } }, { children: component.props.platforms && component.props.platforms.map(function (platform, index) { return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: platform.url, className: "inline-flex items-center justify-center transition-transform hover:scale-110", style: {
                                color: platform.color,
                                width: component.props.iconSize || '24px',
                                height: component.props.iconSize || '24px'
                            }, target: "_blank", rel: "noopener noreferrer" }, { children: [platform.platform === 'Facebook' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }))), platform.platform === 'Twitter' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }) }))), platform.platform === 'Instagram' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" }) }))), platform.platform === 'LinkedIn' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }))), platform.platform === 'YouTube' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }))), platform.platform === 'TikTok' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" }) }))), platform.platform === 'Pinterest' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" }) }))), platform.platform === 'Snapchat' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" }) })))] }), index)); }) })) })));
            default:
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full py-4 px-6 text-center text-gray-500" }, { children: ["Unknown component type: ", component.type] })));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "min-h-[600px] bg-white border border-gray-200 rounded-lg" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center space-x-3" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-semibold text-gray-900" }, { children: "Email Preview" })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "text-sm text-gray-500" }, { children: [template.settings.width, " width"] }))] })), (0, jsx_runtime_1.jsxs)("button", __assign({ onClick: onBackToBuilder, className: "btn-secondary text-sm px-4 py-2" }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 mr-2 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) })), "Back to Builder"] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-4" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "mx-auto bg-white shadow-sm border border-gray-200", style: {
                        width: template.settings.width || '600px',
                        backgroundColor: template.settings.backgroundColor || '#ffffff',
                        fontFamily: template.settings.fontFamily || 'Arial, sans-serif',
                    } }, { children: template.components.map(function (component, index) { return ((0, jsx_runtime_1.jsx)("div", { children: renderPreviewComponent(component) }, "".concat(component.id, "-").concat(index))); }) })) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-4 border-t border-gray-200 bg-gray-50" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between text-sm text-gray-500" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Preview Mode - This is how your email will look when sent" }), (0, jsx_runtime_1.jsxs)("span", { children: ["Template: ", template.name] })] })) }))] })));
};
exports.InlinePreview = InlinePreview;
