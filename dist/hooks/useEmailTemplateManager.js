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
exports.useEmailTemplateManager = void 0;
var builderStore_1 = require("../store/builderStore");
var useEmailTemplateManager = function () {
    var store = (0, builderStore_1.useBuilderStore)();
    // Load template from JSON string
    var loadTemplateFromJSON = function (jsonString) {
        try {
            var template = JSON.parse(jsonString);
            store.loadTemplate(template);
            return true;
        }
        catch (error) {
            console.error('Failed to load template from JSON:', error);
            return false;
        }
    };
    // Load template from object
    var loadTemplateFromObject = function (template) {
        store.loadTemplate(template);
    };
    // Create new empty template
    var createNewTemplate = function (name) {
        if (name === void 0) { name = 'New Template'; }
        var newTemplate = {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
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
        store.loadTemplate(newTemplate);
    };
    // Save template to localStorage
    var saveTemplateToStorage = function (key) {
        if (key === void 0) { key = 'emailTemplate'; }
        store.saveTemplate();
    };
    // Load template from localStorage
    var loadTemplateFromStorage = function (key) {
        if (key === void 0) { key = 'emailTemplate'; }
        try {
            var stored = localStorage.getItem(key);
            if (stored) {
                return loadTemplateFromJSON(stored);
            }
            return false;
        }
        catch (error) {
            console.error('Failed to load template from storage:', error);
            return false;
        }
    };
    // Get template as JSON string
    var getTemplateAsJSON = function () {
        return store.exportJSON();
    };
    // Clone current template
    var cloneTemplate = function (newName) {
        var currentTemplate = store.template;
        var clonedTemplate = __assign(__assign({}, currentTemplate), { id: Math.random().toString(36).substr(2, 9), name: newName || "".concat(currentTemplate.name, " (Copy)"), metadata: __assign(__assign({}, currentTemplate.metadata), { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }) });
        store.loadTemplate(clonedTemplate);
    };
    // Reset template to default
    var resetTemplate = function () {
        createNewTemplate();
    };
    // Validate template structure
    var validateTemplate = function (template) {
        var errors = [];
        if (!template.id)
            errors.push('Template ID is required');
        if (!template.name)
            errors.push('Template name is required');
        if (!template.components)
            errors.push('Template components array is required');
        if (!template.metadata)
            errors.push('Template metadata is required');
        if (!template.settings)
            errors.push('Template settings are required');
        return {
            isValid: errors.length === 0,
            errors: errors,
        };
    };
    return {
        // Loading functions
        loadTemplateFromJSON: loadTemplateFromJSON,
        loadTemplateFromObject: loadTemplateFromObject,
        loadTemplateFromStorage: loadTemplateFromStorage,
        // Creation functions
        createNewTemplate: createNewTemplate,
        cloneTemplate: cloneTemplate,
        resetTemplate: resetTemplate,
        // Saving functions
        saveTemplateToStorage: saveTemplateToStorage,
        getTemplateAsJSON: getTemplateAsJSON,
        // Utility functions
        validateTemplate: validateTemplate,
        // Current template
        template: store.template,
    };
};
exports.useEmailTemplateManager = useEmailTemplateManager;
