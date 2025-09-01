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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSettings = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ColorPicker_1 = require("./ColorPicker");
var TemplateSettings = function (_a) {
    var template = _a.template, updateTemplateSettings = _a.updateTemplateSettings;
    var _b = react_1.default.useState(true), isOpen = _b[0], setIsOpen = _b[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "card p-4" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ onClick: function () { return setIsOpen(!isOpen); }, className: "flex items-center justify-between w-full text-left" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-medium text-gray-700" }, { children: "Template Settings" })), (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 text-gray-500 transition-transform ".concat(isOpen ? 'rotate-180' : ''), fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] })), isOpen && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-4 grid grid-cols-3 gap-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs font-medium text-gray-500 mb-1" }, { children: "Width" })), (0, jsx_runtime_1.jsx)("input", { type: "text", value: template.settings.width, onChange: function (e) { return updateTemplateSettings({ width: e.target.value }); }, className: "input-field text-sm", placeholder: "600px" })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(ColorPicker_1.ColorPicker, { value: template.settings.backgroundColor, onChange: function (color) { return updateTemplateSettings({ backgroundColor: color }); }, label: "Background", placeholder: "Select background" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs font-medium text-gray-500 mb-1" }, { children: "Font Family" })), (0, jsx_runtime_1.jsxs)("select", __assign({ className: "input-field text-sm", value: template.settings.fontFamily, onChange: function (e) { return updateTemplateSettings({ fontFamily: e.target.value }); } }, { children: [(0, jsx_runtime_1.jsx)("option", __assign({ value: "Arial, sans-serif" }, { children: "Arial" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "Helvetica, sans-serif" }, { children: "Helvetica" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "Georgia, serif" }, { children: "Georgia" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "Times New Roman, serif" }, { children: "Times New Roman" }))] }))] })] })))] })));
};
exports.TemplateSettings = TemplateSettings;
