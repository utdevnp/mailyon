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
exports.ComponentsSection = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ComponentItem_1 = require("./ComponentItem");
var ComponentsSection = function (_a) {
    var isExpanded = _a.isExpanded, onToggle = _a.onToggle;
    var components = [
        {
            type: 'header',
            label: 'Header',
            description: 'Company logo and navigation',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })))
        },
        {
            type: 'text',
            label: 'Text',
            description: 'Paragraphs and headings',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h7" }) })))
        },
        {
            type: 'image',
            label: 'Image',
            description: 'Single images and graphics',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) })))
        },
        {
            type: 'button',
            label: 'Button',
            description: 'Call-to-action buttons',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" }) })))
        },
        {
            type: 'divider',
            label: 'Divider',
            description: 'Horizontal lines and spacers',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })))
        },
        {
            type: 'spacer',
            label: 'Spacer',
            description: 'Vertical spacing element',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) })))
        },
        {
            type: 'footer',
            label: 'Footer',
            description: 'Contact info and social links',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) })))
        },
        {
            type: 'socialMedia',
            label: 'Social Media',
            description: 'Social media icons and links',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 4v2h6V4M9 4h6" }) })))
        }
    ];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "border border-gray-200 rounded-lg" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ onClick: onToggle, className: "flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 transition-colors" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-medium text-gray-700" }, { children: "Components" })), (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 text-gray-500 transition-transform ".concat(isExpanded ? 'rotate-180' : ''), fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] })), isExpanded && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "p-3 border-t border-gray-200 space-y-2" }, { children: components.map(function (component) { return ((0, jsx_runtime_1.jsx)(ComponentItem_1.ComponentItem, { type: component.type, label: component.label, icon: component.icon, description: component.description }, component.type)); }) })))] })));
};
exports.ComponentsSection = ComponentsSection;
