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
exports.ComponentItem = void 0;
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
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: drag, className: "flex items-start p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 hover:border-gray-300 transition-colors ".concat(isDragging ? 'opacity-50' : '') }, { children: [icon && (0, jsx_runtime_1.jsx)("span", __assign({ className: "mr-2 text-gray-500 mt-0.5" }, { children: icon })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex-1 min-w-0" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "text-sm font-medium text-gray-700" }, { children: label })), description && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-xs text-gray-500 mt-0.5" }, { children: description })))] }))] })));
};
exports.ComponentItem = ComponentItem;
