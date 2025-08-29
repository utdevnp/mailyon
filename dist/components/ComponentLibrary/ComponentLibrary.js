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
exports.ComponentLibrary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dnd_1 = require("react-dnd");
var ComponentItem = function (_a) {
    var type = _a.type, label = _a.label, icon = _a.icon, description = _a.description;
    var _b = (0, react_dnd_1.useDrag)({
        type: 'COMPONENT',
        item: { type: type },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
    }), isDragging = _b[0].isDragging, drag = _b[1];
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: drag, className: "card p-4 cursor-move transition-all duration-200 ".concat(isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md'), draggable: true }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center space-x-3" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex-shrink-0 text-primary-600" }, { children: icon })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex-1 min-w-0" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-medium text-gray-900 truncate" }, { children: label })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-xs text-gray-500 mt-1" }, { children: description }))] }))] })) })));
};
var ComponentLibrary = function () {
    var components = [
        {
            type: 'header',
            label: 'Header',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }))),
            description: 'Company logo and navigation',
        },
        {
            type: 'text',
            label: 'Text Block',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h7" }) }))),
            description: 'Paragraphs and headings',
        },
        {
            type: 'image',
            label: 'Image',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }))),
            description: 'Single images and graphics',
        },
        {
            type: 'button',
            label: 'Button',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" }) }))),
            description: 'Call-to-action buttons',
        },
        {
            type: 'divider',
            label: 'Divider',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))),
            description: 'Horizontal lines and spacers',
        },
        {
            type: 'columns',
            label: 'Columns',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) }))),
            description: 'Multi-column layouts',
        },
        {
            type: 'footer',
            label: 'Footer',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) }))),
            description: 'Contact info and social links',
        },
        {
            type: 'spacer',
            label: 'Spacer',
            icon: ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }))),
            description: 'Vertical spacing element',
        },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "card p-4" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-lg font-semibold text-gray-900 mb-4" }, { children: "Components" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "space-y-3" }, { children: components.map(function (component) { return ((0, jsx_runtime_1.jsx)(ComponentItem, { type: component.type, label: component.label, icon: component.icon, description: component.description }, component.type)); }) }))] })));
};
exports.ComponentLibrary = ComponentLibrary;
