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
exports.CodeExport = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ExportSection_1 = require("./ExportSection");
var CodeExport = function (_a) {
    var template = _a.template, exportJSON = _a.exportJSON, exportMJML = _a.exportMJML, generateHTML = _a.generateHTML, copyToClipboard = _a.copyToClipboard;
    var _b = react_1.default.useState({
        json: false,
        mjml: false,
        html: false
    }), codeAccordions = _b[0], setCodeAccordions = _b[1];
    var toggleAccordion = function (key) {
        setCodeAccordions(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = !prev[key], _a)));
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-4" }, { children: [(0, jsx_runtime_1.jsx)(ExportSection_1.ExportSection, { title: "JSON Export", content: exportJSON(), isExpanded: codeAccordions.json, onToggle: function () { return toggleAccordion('json'); }, onCopy: function () { return copyToClipboard(exportJSON(), 'JSON'); }, description: "Raw template data structure for developers and API integration" }), (0, jsx_runtime_1.jsx)(ExportSection_1.ExportSection, { title: "MJML Export", content: exportMJML(), isExpanded: codeAccordions.mjml, onToggle: function () { return toggleAccordion('mjml'); }, onCopy: function () { return copyToClipboard(exportMJML(), 'MJML'); }, description: "MJML markup for customization and advanced editing" }), (0, jsx_runtime_1.jsx)(ExportSection_1.ExportSection, { title: "HTML Export", content: generateHTML(), isExpanded: codeAccordions.html, onToggle: function () { return toggleAccordion('html'); }, onCopy: function () { return copyToClipboard(generateHTML(), 'HTML'); }, description: "Ready-to-use HTML that matches the preview exactly" })] })));
};
exports.CodeExport = CodeExport;
