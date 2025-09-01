"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmailTemplateBuilder = void 0;
var builderStore_1 = require("../store/builderStore");
var useEmailTemplateBuilder = function () {
    var store = (0, builderStore_1.useBuilderStore)();
    return {
        // Template state
        template: store.template,
        selectedComponent: store.selectedComponent,
        isDragging: store.isDragging,
        // Template actions
        addComponent: store.addComponent,
        updateComponent: store.updateComponent,
        deleteComponent: store.deleteComponent,
        selectComponent: store.selectComponent,
        moveComponent: store.moveComponent,
        duplicateComponent: store.duplicateComponent,
        insertComponentAt: store.insertComponentAt,
        // History management
        history: store.history,
        historyIndex: store.historyIndex,
        undo: store.undo,
        redo: store.redo,
        // Template management
        saveTemplate: store.saveTemplate,
        loadTemplate: store.loadTemplate,
        updateTemplateSettings: store.updateTemplateSettings,
        // Export functions
        exportJSON: store.exportJSON,
        exportMJML: store.exportMJML,
    };
};
exports.useEmailTemplateBuilder = useEmailTemplateBuilder;
