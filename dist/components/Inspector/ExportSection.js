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
exports.ExportSection = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ExportSection = function (_a) {
    var title = _a.title, content = _a.content, isExpanded = _a.isExpanded, onToggle = _a.onToggle, onCopy = _a.onCopy, description = _a.description;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "card p-4" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ onClick: onToggle, className: "flex items-center justify-between w-full text-left mb-3" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-medium text-gray-700" }, { children: title })), description && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "text-xs text-gray-500 mt-1" }, { children: description })))] }), (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 text-gray-500 transition-transform ".concat(isExpanded ? 'rotate-180' : ''), fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] })), isExpanded && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsx)("textarea", { value: content, className: "w-full h-32 p-3 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg resize-none pr-10", placeholder: "".concat(title, " content will appear here...") }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: onCopy, className: "absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "Copy ".concat(title) }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) })) }))] })))] })));
};
exports.ExportSection = ExportSection;
