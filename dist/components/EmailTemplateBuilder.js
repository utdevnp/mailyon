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
exports.EmailTemplateBuilder = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var Builder_1 = require("./Builder/Builder");
var ComponentLibrary_1 = require("./ComponentLibrary/ComponentLibrary");
var Inspector_1 = require("./Inspector/Inspector");
var EmailTemplateBuilder = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.style, style = _c === void 0 ? {} : _c;
    return ((0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, __assign({ backend: react_dnd_html5_backend_1.HTML5Backend }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-gray-50 ".concat(className), style: style }, { children: (0, jsx_runtime_1.jsx)("main", __assign({ className: "w-full px-4 sm:px-6 lg:px-8 py-6" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-12 gap-6 h-full" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "col-span-3" }, { children: (0, jsx_runtime_1.jsx)(ComponentLibrary_1.ComponentLibrary, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-span-6" }, { children: (0, jsx_runtime_1.jsx)(Builder_1.Builder, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-span-3" }, { children: (0, jsx_runtime_1.jsx)(Inspector_1.Inspector, {}) }))] })) })) })) })));
};
exports.EmailTemplateBuilder = EmailTemplateBuilder;
exports.default = exports.EmailTemplateBuilder;
