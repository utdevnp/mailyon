import { useBuilderStore } from '../store/builderStore';
import { EmailTemplate, EmailComponent, ComponentType } from '../types';

export const useEmailTemplateManager = () => {
  const store = useBuilderStore();
  
  // Load template from JSON string
  const loadTemplateFromJSON = (jsonString: string): boolean => {
    try {
      const template: EmailTemplate = JSON.parse(jsonString);
      store.loadTemplate(template);
      return true;
    } catch (error) {
      console.error('Failed to load template from JSON:', error);
      return false;
    }
  };
  
  // Load template from object
  const loadTemplateFromObject = (template: EmailTemplate): void => {
    store.loadTemplate(template);
  };
  
  // Create new empty template
  const createNewTemplate = (name: string = 'New Template'): void => {
    const newTemplate: EmailTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      name,
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
  const saveTemplateToStorage = (key: string = 'emailTemplate'): void => {
    store.saveTemplate();
  };
  
  // Load template from localStorage
  const loadTemplateFromStorage = (key: string = 'emailTemplate'): boolean => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return loadTemplateFromJSON(stored);
      }
      return false;
    } catch (error) {
      console.error('Failed to load template from storage:', error);
      return false;
    }
  };
  
  // Get template as JSON string
  const getTemplateAsJSON = (): string => {
    return store.exportJSON();
  };
  
  // Clone current template
  const cloneTemplate = (newName?: string): void => {
    const currentTemplate = store.template;
    const clonedTemplate: EmailTemplate = {
      ...currentTemplate,
      id: Math.random().toString(36).substr(2, 9),
      name: newName || `${currentTemplate.name} (Copy)`,
      metadata: {
        ...currentTemplate.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    store.loadTemplate(clonedTemplate);
  };
  
  // Reset template to default
  const resetTemplate = (): void => {
    createNewTemplate();
  };
  
  // Validate template structure
  const validateTemplate = (template: EmailTemplate): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!template.id) errors.push('Template ID is required');
    if (!template.name) errors.push('Template name is required');
    if (!template.components) errors.push('Template components array is required');
    if (!template.metadata) errors.push('Template metadata is required');
    if (!template.settings) errors.push('Template settings are required');
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  return {
    // Loading functions
    loadTemplateFromJSON,
    loadTemplateFromObject,
    loadTemplateFromStorage,
    
    // Creation functions
    createNewTemplate,
    cloneTemplate,
    resetTemplate,
    
    // Saving functions
    saveTemplateToStorage,
    getTemplateAsJSON,
    
    // Utility functions
    validateTemplate,
    
    // Current template
    template: store.template,
  };
};
