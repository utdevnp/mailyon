"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropZone = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dnd_1 = require("react-dnd");
var DropZone = function (_a) {
    var index = _a.index, onDrop = _a.onDrop;
    var _b = (0, react_dnd_1.useDrop)({
        accept: 'COMPONENT',
        drop: function (item, monitor) {
            if (!monitor.didDrop()) {
                onDrop(item.type, index);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver({ shallow: true }),
        }); },
    }), isOver = _b[0].isOver, drop = _b[1];
    return ((0, jsx_runtime_1.jsx)("div", { ref: drop, className: "transition-all duration-200 ".concat(isOver
            ? 'h-8 border-2 border-dashed border-blue-400'
            : 'h-3 bg-transparent') }));
};
exports.DropZone = DropZone;
