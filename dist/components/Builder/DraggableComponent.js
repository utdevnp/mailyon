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
exports.DraggableComponent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dnd_1 = require("react-dnd");
var ComponentRenderer_1 = require("./ComponentRenderer");
var DraggableComponent = function (_a) {
    var component = _a.component, index = _a.index, onClick = _a.onClick, isSelected = _a.isSelected, onMove = _a.onMove, onDelete = _a.onDelete;
    var _b = (0, react_dnd_1.useDrag)({
        type: 'EXISTING_COMPONENT',
        item: { id: component.id, index: index },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
    }), isDragging = _b[0].isDragging, drag = _b[1];
    var _c = (0, react_dnd_1.useDrop)({
        accept: 'EXISTING_COMPONENT',
        hover: function (item, monitor) {
            if (!monitor.isOver()) {
                return;
            }
            if (item.index === index) {
                return;
            }
            onMove(item.id, index);
            item.index = index;
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
        }); },
    }), isOver = _c[0].isOver, drop = _c[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: function (node) { return drag(drop(node)); }, className: "relative group transition-all duration-200 ".concat(isDragging ? 'opacity-50 scale-95' : '', " ").concat(isOver ? 'border-l-4 border-primary-500' : '') }, { children: [(0, jsx_runtime_1.jsx)(ComponentRenderer_1.ComponentRenderer, { component: component, onClick: onClick, isSelected: isSelected }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute -top-3 left-1 opacity-0 group-hover:opacity-100 transition-opacity z-10" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center space-x-1" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap shadow-md" }, { children: component.type })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-1 bg-white rounded shadow-md border border-gray-200 cursor-move hover:bg-gray-50 transition-colors" }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-3 h-3 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 8h16M4 16h16" }) })) })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function (e) {
                                e.stopPropagation();
                                onDelete(component.id);
                            }, className: "p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-colors", title: "Delete component" }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })) }))] })) }))] })));
};
exports.DraggableComponent = DraggableComponent;
