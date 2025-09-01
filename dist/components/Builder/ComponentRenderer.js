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
exports.ComponentRenderer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ComponentRenderer = function (_a) {
    var component = _a.component, onClick = _a.onClick, isSelected = _a.isSelected;
    var renderComponent = function () {
        switch (component.type) {
            case 'header':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center hover:shadow-sm transition-shadow", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: [component.props.logo && component.props.logoVisible !== false && ((0, jsx_runtime_1.jsx)("img", { src: component.props.logo, alt: "Logo", className: "mx-auto mb-4 logo-custom-size", style: {
                                '--logo-width': component.props.logoWidth || '200px',
                                '--logo-height': component.props.logoHeight || '60px',
                            } })), component.props.titleVisible !== false && ((0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-2xl font-bold mb-2", style: { color: component.props.textColor || '#000000' } }, { children: component.props.title }))), component.props.subtitle !== undefined && component.props.subtitleVisible !== false && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "text-lg", style: { color: component.props.textColor || '#000000' } }, { children: component.props.subtitle })))] })));
            case 'text':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "hover:shadow-sm transition-shadow", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: component.props.textVisible !== false && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "prose max-w-none", style: {
                            fontSize: component.props.fontSize || '16px',
                            fontWeight: component.props.fontWeight || 'normal',
                            textAlign: component.props.textAlign || 'left',
                            color: component.props.color || '#000000',
                            lineHeight: component.props.lineHeight || '1.5',
                        } }, { children: component.props.content }))) })));
            case 'image':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "hover:shadow-sm transition-shadow", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: component.props.imageVisible !== false && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex", style: {
                            justifyContent: component.props.align === 'left' ? 'flex-start' :
                                component.props.align === 'right' ? 'flex-end' : 'center'
                        } }, { children: (0, jsx_runtime_1.jsx)("img", { src: component.props.src, alt: component.props.alt, className: "max-w-full h-auto", style: {
                                width: component.props.width || '100%',
                                height: component.props.height || 'auto',
                                borderRadius: component.props.borderRadius || '0px',
                            } }) }))) })));
            case 'button':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-center hover:shadow-sm transition-shadow", style: { padding: component.props.canvasPadding || '5px' } }, { children: component.props.buttonVisible !== false && ((0, jsx_runtime_1.jsx)("a", __assign({ href: component.props.url, className: "inline-block px-6 py-3 rounded-lg font-medium text-center transition-colors", style: {
                            backgroundColor: component.props.backgroundColor || '#3b82f6',
                            color: component.props.textColor || '#ffffff',
                            borderRadius: component.props.borderRadius || '6px',
                            padding: component.props.padding || '12px 24px',
                            fontSize: component.props.fontSize || '16px',
                        } }, { children: component.props.text }))) })));
            case 'divider':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "hover:shadow-sm transition-shadow", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: (0, jsx_runtime_1.jsx)("hr", { style: {
                            borderColor: component.props.color || '#e5e7eb',
                            borderWidth: component.props.height || '1px',
                            margin: component.props.margin || '20px 0',
                        } }) })));
            case 'footer':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "hover:shadow-sm transition-shadow", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "mb-4 ".concat(component.props.contentAlignment === 'left' ? 'text-left' : component.props.contentAlignment === 'right' ? 'text-right' : 'text-center') }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-semibold text-gray-900 mb-2" }, { children: component.props.companyName || 'Company Name' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-2" }, { children: component.props.address || '123 Main St, City, State 12345' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-2" }, { children: component.props.phone || '+1 (555) 123-4567' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-4" }, { children: component.props.email || 'info@company.com' }))] })), component.props.socialLinks && component.props.socialLinks.length > 0 && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex space-x-4 mb-4 ".concat(component.props.contentAlignment === 'left' ? 'justify-start' : component.props.contentAlignment === 'right' ? 'justify-end' : 'justify-center') }, { children: component.props.socialLinks.map(function (link, index) { return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: link.url, className: "inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors", target: "_blank", rel: "noopener noreferrer" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: link.imageUrl || '#', alt: link.title || link.platform || 'Social Link', className: "w-5 h-5", style: {
                                            filter: (link.imageUrl && link.imageUrl.includes('simple-icons'))
                                                ? "brightness(0) saturate(100%) invert(0.6) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.8) contrast(1)"
                                                : 'none'
                                        } }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-sm font-medium" }, { children: link.title || link.platform || 'Social Link' }))] }), index)); }) }))), component.props.unsubscribeText && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "".concat(component.props.contentAlignment === 'left' ? 'text-left' : component.props.contentAlignment === 'right' ? 'text-right' : 'text-center') }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "#", className: "text-sm text-gray-500 hover:text-gray-700 underline" }, { children: component.props.unsubscribeText })) })))] })));
            case 'spacer':
                return ((0, jsx_runtime_1.jsx)("div", { className: "hover:shadow-sm transition-shadow", style: {
                        height: component.props.height || '20px',
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }));
            case 'socialMedia':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full hover:shadow-sm transition-shadow", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center", style: {
                            flexDirection: component.props.alignment === 'vertical' ? 'column' : 'row',
                            gap: component.props.spacing || '16px',
                            alignItems: 'center'
                        } }, { children: component.props.platforms && component.props.platforms.map(function (platform, index) {
                            var displayType = component.props.type || 'icon';
                            return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: platform.url || '#', target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center transition-transform hover:scale-110", style: {
                                    gap: displayType === 'iconText' ? '8px' : '0px'
                                } }, { children: [(displayType === 'icon' || displayType === 'iconText') && ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
                                            width: component.props.iconSize || '24px',
                                            height: component.props.iconSize || '24px'
                                        } }, { children: (0, jsx_runtime_1.jsx)("img", { src: platform.imageUrl || '#', alt: platform.title || 'Social Platform', className: "w-full h-full" }) }))), (displayType === 'text' || displayType === 'iconText') && ((0, jsx_runtime_1.jsx)("span", __assign({ className: "font-medium text-sm", style: { color: '#333333' } }, { children: platform.title || 'Social Platform' })))] }), index));
                        }) })) })));
            default:
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "p-4 hover:shadow-sm transition-shadow", style: { backgroundColor: component.props.backgroundColor || 'transparent' } }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-gray-500 text-center" }, { children: ["Unknown component type: ", component.type] })) })));
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "relative" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "border transition-colors ".concat(isSelected
                ? 'border-blue-500 hover:border-blue-700 hover:border-dashed'
                : 'border-gray-300 hover:border-blue-600 hover:border-dashed'), onClick: onClick }, { children: renderComponent() })) })));
};
exports.ComponentRenderer = ComponentRenderer;
