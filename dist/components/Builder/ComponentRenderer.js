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
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:shadow-sm transition-shadow", style: { backgroundColor: component.props.backgroundColor || '#ffffff' }, onClick: onClick }, { children: [component.props.logo && ((0, jsx_runtime_1.jsx)("img", { src: component.props.logo, alt: "Logo", className: "mx-auto mb-4 h-12 w-auto" })), (0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-2xl font-bold mb-2", style: { color: component.props.textColor || '#000000' } }, { children: component.props.title || 'Company Name' })), component.props.subtitle && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "text-lg", style: { color: component.props.textColor || '#000000' } }, { children: component.props.subtitle })))] })));
            case 'text':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "prose max-w-none", style: {
                            fontSize: component.props.fontSize || '16px',
                            fontWeight: component.props.fontWeight || 'normal',
                            textAlign: component.props.textAlign || 'left',
                            color: component.props.color || '#000000',
                            lineHeight: component.props.lineHeight || '1.5',
                        } }, { children: component.props.content || 'Enter your text content here...' })) })));
            case 'image':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "text-center", style: { textAlign: component.props.align || 'center' } }, { children: (0, jsx_runtime_1.jsx)("img", { src: component.props.src || 'https://via.placeholder.com/600x300', alt: component.props.alt || 'Description of the image', className: "max-w-full h-auto", style: {
                                width: component.props.width || '100%',
                                height: component.props.height || 'auto',
                                borderRadius: component.props.borderRadius || '0px',
                            } }) })) })));
            case 'button':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: component.props.url || '#', className: "inline-block px-6 py-3 rounded-lg font-medium text-center transition-colors", style: {
                            backgroundColor: component.props.backgroundColor || '#3b82f6',
                            color: component.props.textColor || '#ffffff',
                            borderRadius: component.props.borderRadius || '6px',
                            padding: component.props.padding || '12px 24px',
                            fontSize: component.props.fontSize || '16px',
                        } }, { children: component.props.text || 'Click me' })) })));
            case 'divider':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick }, { children: (0, jsx_runtime_1.jsx)("hr", { style: {
                            borderColor: component.props.color || '#e5e7eb',
                            borderWidth: component.props.height || '1px',
                            margin: component.props.margin || '20px 0',
                        } }) })));
            case 'columns':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick, style: { backgroundColor: component.props.backgroundColor || '#ffffff' } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "grid gap-4", style: {
                            gridTemplateColumns: "repeat(".concat(component.props.columns || 2, ", 1fr)"),
                            gap: component.props.gap || '20px',
                        } }, { children: Array.from({ length: component.props.columns || 2 }).map(function (_, index) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-gray-100 rounded-lg p-4 text-center text-gray-500" }, { children: ["Column ", index + 1] }), index)); }) })) })));
            case 'footer':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center mb-4" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-semibold text-gray-900 mb-2" }, { children: component.props.companyName || 'Company Name' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-2" }, { children: component.props.address || '123 Main St, City, State 12345' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-2" }, { children: component.props.phone || '+1 (555) 123-4567' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-4" }, { children: component.props.email || 'info@company.com' }))] })), component.props.socialLinks && component.props.socialLinks.length > 0 && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center space-x-4 mb-4" }, { children: component.props.socialLinks.map(function (link, index) { return ((0, jsx_runtime_1.jsx)("a", __assign({ href: link.url, className: "text-gray-400 hover:text-gray-600 transition-colors" }, { children: link.platform }), index)); }) }))), component.props.unsubscribeText && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-center" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "#", className: "text-sm text-gray-500 hover:text-gray-700 underline" }, { children: component.props.unsubscribeText })) })))] })));
            case 'spacer':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick, style: { height: component.props.height || '20px' } }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center text-gray-400 text-xs py-1" }, { children: ["Spacer (", component.props.height || '20px', ")"] })) })));
            default:
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow", onClick: onClick }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-gray-500 text-center" }, { children: ["Unknown component type: ", component.type] })) })));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative ".concat(isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : '') }, { children: [renderComponent(), (0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute top-2 left-2" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800" }, { children: component.type })) }))] })));
};
exports.ComponentRenderer = ComponentRenderer;
