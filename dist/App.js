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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var Builder_1 = require("./components/Builder/Builder");
var ComponentLibrary_1 = require("./components/ComponentLibrary/ComponentLibrary");
var Inspector_1 = require("./components/Inspector/Inspector");
var Toolbar_1 = require("./components/Toolbar/Toolbar");
require("./index.css");
function App() {
    return ((0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, __assign({ backend: react_dnd_html5_backend_1.HTML5Backend }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "min-h-screen bg-gray-50" }, { children: [(0, jsx_runtime_1.jsx)("header", __assign({ className: "bg-white shadow-sm border-b border-gray-200" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between items-center h-16" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center" }, { children: (0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-xl font-semibold text-gray-900" }, { children: "Email Template Builder" })) })), (0, jsx_runtime_1.jsx)(Toolbar_1.Toolbar, {})] })) })) })), (0, jsx_runtime_1.jsx)("main", __assign({ className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-12 gap-6" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "col-span-3" }, { children: (0, jsx_runtime_1.jsx)(ComponentLibrary_1.ComponentLibrary, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-span-6" }, { children: (0, jsx_runtime_1.jsx)(Builder_1.Builder, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-span-3" }, { children: (0, jsx_runtime_1.jsx)(Inspector_1.Inspector, {}) }))] })) }))] })) })));
}
exports.default = App;
