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
exports.ColorPicker = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var primaryColors = [
    { name: 'Blue', value: '#3b82f6', label: 'Blue' },
    { name: 'Green', value: '#10b981', label: 'Green' },
    { name: 'Red', value: '#ef4444', label: 'Red' },
    { name: 'Purple', value: '#8b5cf6', label: 'Purple' },
    { name: 'Orange', value: '#f97316', label: 'Orange' },
    { name: 'Yellow', value: '#eab308', label: 'Yellow' },
    { name: 'Gray', value: '#6b7280', label: 'Gray' },
    { name: 'Black', value: '#000000', label: 'Black' },
    { name: 'Transparent', value: 'transparent', label: 'Transparent' },
    { name: 'White', value: '#ffffff', label: 'White' },
    { name: 'Pink', value: '#ec4899', label: 'Pink' },
    { name: 'Teal', value: '#14b8a6', label: 'Teal' },
    { name: 'Indigo', value: '#6366f1', label: 'Indigo' },
    { name: 'Lime', value: '#84cc16', label: 'Lime' },
    { name: 'Cyan', value: '#06b6d4', label: 'Cyan' },
    { name: 'Rose', value: '#f43f5e', label: 'Rose' },
    { name: 'Amber', value: '#f59e0b', label: 'Amber' },
];
var ColorPicker = function (_a) {
    var value = _a.value, onChange = _a.onChange, _b = _a.label, label = _b === void 0 ? 'Color' : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Select color' : _c;
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, react_1.useState)('#000000'), customColor = _e[0], setCustomColor = _e[1];
    var dropdownRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    var handleColorSelect = function (color) {
        onChange(color);
        setIsOpen(false);
    };
    var handleCustomColorChange = function (color) {
        setCustomColor(color);
        onChange(color);
    };
    var getDisplayColor = function () {
        if (value === 'transparent')
            return 'transparent';
        if (value === '' || !value)
            return '#e5e7eb';
        return value;
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative", ref: dropdownRef }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs font-medium text-gray-500 mb-1" }, { children: label })), (0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", onClick: function () { return setIsOpen(!isOpen); }, className: "w-full flex items-center space-x-2 p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "w-6 h-6 rounded relative ".concat(value === '#ffffff' || value === 'transparent'
                            ? 'border border-gray-300'
                            : 'border border-gray-300'), style: { backgroundColor: getDisplayColor() } }, { children: value === 'transparent' && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute inset-0 flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsxs)("svg", __assign({ className: "w-3 h-3 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: [(0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3l18 18M3 21L21 3" }), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3L21 12L12 21L3 12L12 3" })] })) }))) })), (0, jsx_runtime_1.jsx)("div", { className: "flex-1" }), (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] })), isOpen && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "absolute z-50 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "grid grid-cols-4 mb-3", style: { gap: '6px' } }, { children: primaryColors.map(function (color) { return ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleColorSelect(color.value); }, className: "p-0 rounded transition-all hover:scale-110", title: color.label }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "w-9 h-9 rounded relative ".concat(color.value === '#ffffff' || color.value === 'transparent'
                                    ? 'border border-gray-300'
                                    : ''), style: { backgroundColor: color.value } }, { children: color.value === 'transparent' && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute inset-0 flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsxs)("svg", __assign({ className: "w-4 h-4 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: [(0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3l18 18M3 21L21 3" }), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3L21 12L12 21L3 12L12 3" })] })) }))) })) }), color.value)); }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "border-t border-gray-200 pt-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center space-x-2" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "color", value: customColor, onChange: function (e) { return handleCustomColorChange(e.target.value); }, className: "w-8 h-8 rounded border border-gray-300 cursor-pointer" }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-sm text-gray-700" }, { children: "Custom Color" }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-2 text-xs text-gray-500" }, { children: "Click the color box above to pick any custom color" }))] }))] })))] })));
};
exports.ColorPicker = ColorPicker;
