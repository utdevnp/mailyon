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
exports.Builder = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dnd_1 = require("react-dnd");
var builderStore_1 = require("../../store/builderStore");
var ComponentRenderer_1 = require("./ComponentRenderer");
var Builder = function () {
    var _a = (0, builderStore_1.useBuilderStore)(), template = _a.template, addComponent = _a.addComponent, selectComponent = _a.selectComponent, selectedComponent = _a.selectedComponent, moveComponent = _a.moveComponent;
    var _b = (0, react_dnd_1.useDrop)({
        accept: 'COMPONENT',
        drop: function (item, monitor) {
            if (!monitor.didDrop()) {
                var newComponent = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: item.type,
                    props: getDefaultProps(item.type),
                    children: [],
                    style: {},
                };
                addComponent(newComponent);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver({ shallow: true }),
        }); },
    }), isOver = _b[0].isOver, drop = _b[1];
    var getDefaultProps = function (type) {
        switch (type) {
            case 'header':
                return {
                    logo: '',
                    title: 'Company Name',
                    subtitle: 'Your tagline here',
                    backgroundColor: '#ffffff',
                    textColor: '#000000',
                };
            case 'text':
                return {
                    content: 'Enter your text content here...',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    textAlign: 'left',
                    color: '#000000',
                    lineHeight: '1.5',
                };
            case 'image':
                return {
                    src: 'https://via.placeholder.com/600x300',
                    alt: 'Description of the image',
                    width: '100%',
                    height: 'auto',
                    align: 'center',
                    borderRadius: '0px',
                };
            case 'button':
                return {
                    text: 'Click me',
                    url: '#',
                    backgroundColor: '#3b82f6',
                    textColor: '#ffffff',
                    borderRadius: '6px',
                    padding: '12px 24px',
                    fontSize: '16px',
                };
            case 'divider':
                return {
                    color: '#e5e7eb',
                    height: '1px',
                    margin: '20px 0',
                };
            case 'columns':
                return {
                    columns: 2,
                    gap: '20px',
                    backgroundColor: '#ffffff',
                };
            case 'footer':
                return {
                    companyName: 'Company Name',
                    address: '123 Main St, City, State 12345',
                    phone: '+1 (555) 123-4567',
                    email: 'info@company.com',
                    socialLinks: [
                        { platform: 'Facebook', url: '#' },
                        { platform: 'Twitter', url: '#' },
                        { platform: 'LinkedIn', url: '#' },
                    ],
                    unsubscribeText: 'Unsubscribe',
                };
            case 'spacer':
                return {
                    height: '20px',
                };
            default:
                return {};
        }
    };
    var handleComponentClick = function (component) {
        selectComponent(component);
    };
    var handleDragEnd = function (result) {
        if (!result.destination)
            return;
        var sourceIndex = result.source.index;
        var destinationIndex = result.destination.index;
        if (sourceIndex !== destinationIndex) {
            moveComponent(result.draggableId, destinationIndex);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "card p-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between mb-6" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-xl font-semibold text-gray-900" }, { children: "Email Template Builder" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-sm text-gray-500" }, { children: [template.components.length, " components"] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ ref: drop, className: "min-h-[600px] border-2 border-dashed rounded-lg transition-colors ".concat(isOver
                    ? 'border-primary-400 bg-primary-50'
                    : 'border-gray-300 bg-gray-50') }, { children: template.components.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col items-center justify-center h-full py-20" }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-16 h-16 text-gray-300 mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" }) })), (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-medium text-gray-900 mb-2" }, { children: "Start building your email" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-500 text-center max-w-sm" }, { children: "Drag components from the left sidebar to start creating your email template" }))] }))) : ((0, jsx_runtime_1.jsx)("div", __assign({ className: "p-4 space-y-4" }, { children: template.components.map(function (component, index) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative group ".concat((selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.id) === component.id
                            ? 'ring-2 ring-primary-500 ring-offset-2'
                            : '') }, { children: [(0, jsx_runtime_1.jsx)(ComponentRenderer_1.ComponentRenderer, { component: component, onClick: function () { return handleComponentClick(component); }, isSelected: (selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.id) === component.id }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex space-x-1" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ className: "p-1 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50", title: "Move up", onClick: function () {
                                                if (index > 0) {
                                                    moveComponent(component.id, index - 1);
                                                }
                                            }, disabled: index === 0 }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-3 h-3 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" }) })) })), (0, jsx_runtime_1.jsx)("button", __assign({ className: "p-1 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50", title: "Move down", onClick: function () {
                                                if (index < template.components.length - 1) {
                                                    moveComponent(component.id, index + 1);
                                                }
                                            }, disabled: index === template.components.length - 1 }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-3 h-3 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })) }))] })) }))] }), component.id)); }) }))) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-6 pt-6 border-t border-gray-200" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-medium text-gray-700 mb-3" }, { children: "Template Settings" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-3 gap-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs font-medium text-gray-500 mb-1" }, { children: "Width" })), (0, jsx_runtime_1.jsx)("input", { type: "text", value: template.settings.width, className: "input-field text-sm", placeholder: "600px" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs font-medium text-gray-500 mb-1" }, { children: "Background" })), (0, jsx_runtime_1.jsx)("input", { type: "color", value: template.settings.backgroundColor, className: "w-full h-8 rounded border border-gray-300" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-xs font-medium text-gray-500 mb-1" }, { children: "Font Family" })), (0, jsx_runtime_1.jsxs)("select", __assign({ className: "input-field text-sm" }, { children: [(0, jsx_runtime_1.jsx)("option", __assign({ value: "Arial, sans-serif" }, { children: "Arial" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "Helvetica, sans-serif" }, { children: "Helvetica" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "Georgia, serif" }, { children: "Georgia" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "Times New Roman, serif" }, { children: "Times New Roman" }))] }))] })] }))] }))] })));
};
exports.Builder = Builder;
