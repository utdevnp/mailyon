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
exports.Toolbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var builderStore_1 = require("../../store/builderStore");
var Toolbar = function () {
    var _a = (0, builderStore_1.useBuilderStore)(), undo = _a.undo, redo = _a.redo, saveTemplate = _a.saveTemplate, exportJSON = _a.exportJSON, exportMJML = _a.exportMJML, history = _a.history, historyIndex = _a.historyIndex;
    var canUndo = historyIndex > 0;
    var canRedo = historyIndex < history.length - 1;
    var handleExportJSON = function () {
        var json = exportJSON();
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'email-template.json';
        a.click();
        URL.revokeObjectURL(url);
    };
    var handleExportMJML = function () {
        var mjml = exportMJML();
        var blob = new Blob([mjml], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'email-template.mjml';
        a.click();
        URL.revokeObjectURL(url);
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center space-x-2" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: undo, disabled: !canUndo, className: "p-2 rounded-lg transition-colors ".concat(canUndo
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'), title: "Undo" }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" }) })) })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: redo, disabled: !canRedo, className: "p-2 rounded-lg transition-colors ".concat(canRedo
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'), title: "Redo" }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" }) })) })), (0, jsx_runtime_1.jsx)("div", { className: "w-px h-6 bg-gray-300" }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: saveTemplate, className: "btn-primary text-sm px-3 py-2", title: "Save Template" }, { children: "Save" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative group" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ className: "btn-secondary text-sm px-3 py-2" }, { children: ["Export", (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 ml-1 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "py-1" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleExportJSON, className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" }, { children: "Export as JSON" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleExportMJML, className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" }, { children: "Export as MJML" }))] })) }))] }))] })));
};
exports.Toolbar = Toolbar;
