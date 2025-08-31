import { useBuilderStore } from '../store/builderStore';
import { EmailTemplate, EmailComponent, ComponentType } from '../types';

export const useEmailTemplateBuilder = () => {
  const store = useBuilderStore();
  
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
