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
exports.ComponentLibrary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ComponentsSection_1 = require("./ComponentsSection");
var ComponentLibrary = function () {
    var _a = react_1.default.useState({
        components: true, // Open by default
    }), accordionState = _a[0], setAccordionState = _a[1];
    var toggleAccordion = function (key) {
        setAccordionState(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = !prev[key], _a)));
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "card p-4" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-lg font-semibold text-gray-900 mb-4" }, { children: "Component Library" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "space-y-4" }, { children: (0, jsx_runtime_1.jsx)(ComponentsSection_1.ComponentsSection, { isExpanded: accordionState.components, onToggle: function () { return toggleAccordion('components'); } }) }))] })));
};
exports.ComponentLibrary = ComponentLibrary;
