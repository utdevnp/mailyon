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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBuilderStore = void 0;
var zustand_1 = require("zustand");
// Default template
var defaultTemplate = {
    id: 'default',
    name: 'New Template',
    description: 'Start building your email template',
    components: [],
    metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0',
    },
    settings: {
        width: '700px',
        backgroundColor: 'transparent',
        fontFamily: 'Arial, sans-serif',
    },
};
// Helper function to generate unique ID
var generateId = function () {
    return Math.random().toString(36).substr(2, 9);
};
// Helper function to create component
var createComponent = function (type, props) {
    if (props === void 0) { props = {}; }
    return {
        id: generateId(),
        type: type,
        props: props,
        children: [],
        style: {},
    };
};
// Helper function to find component by ID
var findComponent = function (components, id) {
    for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
        var component = components_1[_i];
        if (component.id === id)
            return component;
        if (component.children) {
            var found = findComponent(component.children, id);
            if (found)
                return found;
        }
    }
    return null;
};
// Helper function to remove component by ID
var removeComponent = function (components, id) {
    return components.filter(function (component) {
        if (component.id === id)
            return false;
        if (component.children) {
            component.children = removeComponent(component.children, id);
        }
        return true;
    });
};
// Helper function to duplicate component
var duplicateComponent = function (component) {
    return __assign(__assign({}, component), { id: generateId(), children: component.children ? component.children.map(function (child) { return duplicateComponent(child); }) : [] });
};
exports.useBuilderStore = (0, zustand_1.create)(function (set, get) { return ({
    // State
    template: defaultTemplate,
    selectedComponent: null,
    isDragging: false,
    history: [defaultTemplate],
    historyIndex: 0,
    // Actions
    addComponent: function (component, parentId) {
        set(function (state) {
            var newTemplate = __assign({}, state.template);
            if (parentId) {
                var parent_1 = findComponent(newTemplate.components, parentId);
                if (parent_1) {
                    parent_1.children = parent_1.children || [];
                    parent_1.children.push(component);
                }
            }
            else {
                newTemplate.components.push(component);
            }
            newTemplate.metadata.updatedAt = new Date().toISOString();
            // Add to history
            var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
            return {
                template: newTemplate,
                history: newHistory,
                historyIndex: state.historyIndex + 1,
            };
        });
    },
    updateComponent: function (id, updates) {
        set(function (state) {
            var newTemplate = __assign({}, state.template);
            var component = findComponent(newTemplate.components, id);
            if (component) {
                Object.assign(component, updates);
                newTemplate.metadata.updatedAt = new Date().toISOString();
                // Add to history
                var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
                return {
                    template: newTemplate,
                    history: newHistory,
                    historyIndex: state.historyIndex + 1,
                };
            }
            return state;
        });
    },
    deleteComponent: function (id) {
        set(function (state) {
            var _a;
            var newTemplate = __assign({}, state.template);
            newTemplate.components = removeComponent(newTemplate.components, id);
            newTemplate.metadata.updatedAt = new Date().toISOString();
            // Clear selection if deleted component was selected
            var newSelectedComponent = state.selectedComponent;
            if (((_a = state.selectedComponent) === null || _a === void 0 ? void 0 : _a.id) === id) {
                newSelectedComponent = null;
            }
            // Add to history
            var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
            return {
                template: newTemplate,
                selectedComponent: newSelectedComponent,
                history: newHistory,
                historyIndex: state.historyIndex + 1,
            };
        });
    },
    selectComponent: function (component) {
        set({ selectedComponent: component });
    },
    moveComponent: function (id, newIndex) {
        set(function (state) {
            var newTemplate = __assign({}, state.template);
            var componentIndex = newTemplate.components.findIndex(function (c) { return c.id === id; });
            if (componentIndex !== -1) {
                var component = newTemplate.components.splice(componentIndex, 1)[0];
                newTemplate.components.splice(newIndex, 0, component);
                newTemplate.metadata.updatedAt = new Date().toISOString();
                // Add to history
                var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
                return {
                    template: newTemplate,
                    history: newHistory,
                    historyIndex: state.historyIndex + 1,
                };
            }
            return state;
        });
    },
    duplicateComponent: function (id) {
        set(function (state) {
            var component = findComponent(state.template.components, id);
            if (component) {
                var duplicated = duplicateComponent(component);
                var newTemplate = __assign({}, state.template);
                newTemplate.components.push(duplicated);
                newTemplate.metadata.updatedAt = new Date().toISOString();
                // Add to history
                var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
                return {
                    template: newTemplate,
                    history: newHistory,
                    historyIndex: state.historyIndex + 1,
                };
            }
            return state;
        });
    },
    insertComponentAt: function (type, index, defaultProps) {
        set(function (state) {
            var newTemplate = __assign({}, state.template);
            var newComponent = createComponent(type, defaultProps || {});
            // Insert at specific position
            newTemplate.components.splice(index, 0, newComponent);
            newTemplate.metadata.updatedAt = new Date().toISOString();
            // Add to history
            var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
            return {
                template: newTemplate,
                history: newHistory,
                historyIndex: state.historyIndex + 1,
            };
        });
    },
    undo: function () {
        set(function (state) {
            if (state.historyIndex > 0) {
                return {
                    historyIndex: state.historyIndex - 1,
                    template: state.history[state.historyIndex - 1],
                };
            }
            return state;
        });
    },
    redo: function () {
        set(function (state) {
            if (state.historyIndex < state.history.length - 1) {
                return {
                    historyIndex: state.historyIndex + 1,
                    template: state.history[state.historyIndex + 1],
                };
            }
            return state;
        });
    },
    saveTemplate: function () {
        var template = get().template;
        localStorage.setItem('emailTemplate', JSON.stringify(template));
    },
    loadTemplate: function (template) {
        set(function (state) {
            var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [template], false);
            return {
                template: template,
                history: newHistory,
                historyIndex: state.historyIndex + 1,
                selectedComponent: null,
            };
        });
    },
    exportJSON: function () {
        var template = get().template;
        return JSON.stringify(template, null, 2);
    },
    exportMJML: function () {
        var template = get().template;
        try {
            var generateMJML = require('../utils/mjmlExport').generateMJML;
            return generateMJML(template);
        }
        catch (error) {
            console.error('MJML export error:', error);
            return "<!-- MJML export for template: ".concat(template.name, " -->");
        }
    },
    updateTemplateSettings: function (settings) {
        set(function (state) {
            var newTemplate = __assign({}, state.template);
            newTemplate.settings = __assign(__assign({}, newTemplate.settings), settings);
            newTemplate.metadata.updatedAt = new Date().toISOString();
            // Add to history
            var newHistory = __spreadArray(__spreadArray([], state.history.slice(0, state.historyIndex + 1), true), [newTemplate], false);
            return {
                template: newTemplate,
                history: newHistory,
                historyIndex: state.historyIndex + 1,
            };
        });
    },
}); });
