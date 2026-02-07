import { create } from 'zustand';
import { EmailComponent, EmailTemplate, BuilderState, BuilderActions, ComponentType } from '../types';

// Default template
const defaultTemplate: EmailTemplate = {
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
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Helper function to create component
export const createComponent = (type: ComponentType, props: Record<string, any> = {}): EmailComponent => {
  const component: EmailComponent = {
    id: generateId(),
    type,
    props,
    children: [],
    style: {},
  };

  // Initialize children for columns component
  if (type === 'columns') {
    const count = props.columns || 2;
    const width = `${100 / count}%`;

    // Create column children
    for (let i = 0; i < count; i++) {
      component.children!.push({
        id: generateId(),
        type: 'column',
        props: {
          width,
          padding: '5px',
          backgroundColor: 'transparent',
          verticalAlign: 'top',
        },
        children: [],
        style: {},
      });
    }
  }

  return component;
};

// Helper function to find component by ID
const findComponent = (components: EmailComponent[], id: string): EmailComponent | null => {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children) {
      const found = findComponent(component.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Helper function to remove component by ID
const removeComponent = (components: EmailComponent[], id: string): EmailComponent[] => {
  return components.filter(component => {
    if (component.id === id) return false;
    if (component.children) {
      component.children = removeComponent(component.children, id);
    }
    return true;
  });
};

// Helper function to duplicate component
const duplicateComponent = (component: EmailComponent): EmailComponent => {
  return {
    ...component,
    id: generateId(),
    children: component.children ? component.children.map(child => duplicateComponent(child)) : [],
  };
};

export const useBuilderStore = create<BuilderState & BuilderActions>((set, get) => ({
  // State
  template: defaultTemplate,
  selectedComponent: null,
  hoveredComponentId: null,
  isDragging: false,
  history: [defaultTemplate],
  historyIndex: 0,

  // Actions
  setHoveredComponentId: (id: string | null) => {
    set({ hoveredComponentId: id });
  },

  setFullTemplate: (newTemplate: EmailTemplate) => {
    set(state => {
      const updatedTemplate = {
        ...newTemplate,
        metadata: {
          ...newTemplate.metadata,
          updatedAt: new Date().toISOString()
        }
      };

      // Add to history
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), updatedTemplate];

      return {
        template: updatedTemplate,
        selectedComponent: null, // Reset selection when template is replaced
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  },

  // Other Actions
  addComponent: (component: EmailComponent, parentId?: string) => {
    set((state) => {
      const newTemplate = { ...state.template };

      if (parentId) {
        const parent = findComponent(newTemplate.components, parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(component);
        }
      } else {
        newTemplate.components.push(component);
      }

      newTemplate.metadata.updatedAt = new Date().toISOString();

      // Add to history
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

      return {
        template: newTemplate,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  updateComponent: (id: string, updates: Partial<EmailComponent>) => {
    set((state) => {
      const newTemplate = { ...state.template };
      const component = findComponent(newTemplate.components, id);

      if (component) {
        Object.assign(component, updates);
        newTemplate.metadata.updatedAt = new Date().toISOString();

        // Add to history
        const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

        return {
          template: newTemplate,
          history: newHistory,
          historyIndex: state.historyIndex + 1,
        };
      }

      return state;
    });
  },

  deleteComponent: (id: string) => {
    set((state) => {
      const newTemplate = { ...state.template };
      newTemplate.components = removeComponent(newTemplate.components, id);
      newTemplate.metadata.updatedAt = new Date().toISOString();

      // Clear selection if deleted component was selected
      let newSelectedComponent = state.selectedComponent;
      if (state.selectedComponent?.id === id) {
        newSelectedComponent = null;
      }

      // Add to history
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

      return {
        template: newTemplate,
        selectedComponent: newSelectedComponent,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  selectComponent: (component: EmailComponent | null) => {
    set({ selectedComponent: component });
  },

  moveComponent: (id: string, newIndex: number, newParentId?: string) => {
    set((state) => {
      const newTemplate = { ...state.template };

      // Helper to find parent of a component
      const findParent = (components: EmailComponent[], childId: string): EmailComponent | null => {
        for (const component of components) {
          if (component.children?.some(child => child.id === childId)) {
            return component;
          }
          if (component.children) {
            const found = findParent(component.children, childId);
            if (found) return found;
          }
        }
        return null;
      };

      // 1. Remove from old parent
      let component: EmailComponent | undefined;
      let oldParent = findParent(newTemplate.components, id);

      // If no parent found, check if it's in the root list
      if (!oldParent) {
        const index = newTemplate.components.findIndex(c => c.id === id);
        if (index !== -1) {
          [component] = newTemplate.components.splice(index, 1);
        }
      } else {
        const index = oldParent.children!.findIndex(c => c.id === id);
        if (index !== -1) {
          [component] = oldParent.children!.splice(index, 1);
        }
      }

      if (!component) return state;

      // 2. Insert into new parent
      if (newParentId) {
        const newParent = findComponent(newTemplate.components, newParentId);
        if (newParent) {
          newParent.children = newParent.children || [];
          // Ensure index is within bounds
          const safeIndex = Math.min(newIndex, newParent.children.length);
          newParent.children.splice(safeIndex, 0, component);
        }
      } else {
        // Insert into root
        const safeIndex = Math.min(newIndex, newTemplate.components.length);
        newTemplate.components.splice(safeIndex, 0, component);
      }

      newTemplate.metadata.updatedAt = new Date().toISOString();

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

      return {
        template: newTemplate,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  duplicateComponent: (id: string) => {
    set((state) => {
      const component = findComponent(state.template.components, id);
      if (component) {
        const duplicated = duplicateComponent(component);
        const newTemplate = { ...state.template };

        // Find parent to insert duplicate next to original
        // This is a simplified version, ideally we'd find the parent and insert there
        newTemplate.components.push(duplicated);

        newTemplate.metadata.updatedAt = new Date().toISOString();

        const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

        return {
          template: newTemplate,
          history: newHistory,
          historyIndex: state.historyIndex + 1,
        };
      }

      return state;
    });
  },

  insertComponentAt: (type: ComponentType, index: number, defaultProps?: Record<string, any>, parentId?: string) => {
    set((state) => {
      const newTemplate = { ...state.template };
      const newComponent = createComponent(type, defaultProps || {});

      if (parentId) {
        const parent = findComponent(newTemplate.components, parentId);
        if (parent) {
          parent.children = parent.children || [];
          // Ensure index is within bounds
          const safeIndex = Math.min(index, parent.children.length);
          parent.children.splice(safeIndex, 0, newComponent);
        }
      } else {
        // Insert at specific position in root
        const safeIndex = Math.min(index, newTemplate.components.length);
        newTemplate.components.splice(safeIndex, 0, newComponent);
      }

      newTemplate.metadata.updatedAt = new Date().toISOString();

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

      return {
        template: newTemplate,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        return {
          historyIndex: state.historyIndex - 1,
          template: state.history[state.historyIndex - 1],
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        return {
          historyIndex: state.historyIndex + 1,
          template: state.history[state.historyIndex + 1],
        };
      }
      return state;
    });
  },

  saveTemplate: () => {
    const { template } = get();
    localStorage.setItem('emailTemplate', JSON.stringify(template));
  },

  loadTemplate: (template: EmailTemplate) => {
    set((state) => {
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), template];
      return {
        template,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
        selectedComponent: null,
      };
    });
  },

  exportJSON: () => {
    const { template } = get();
    return JSON.stringify(template, null, 2);
  },

  exportMJML: () => {
    const { template } = get();
    try {
      const { generateMJML } = require('../utils/mjmlExport');
      return generateMJML(template);
    } catch (error) {
      console.error('MJML export error:', error);
      return `<!-- MJML export for template: ${template.name} -->`;
    }
  },

  updateTemplateSettings: (settings: Partial<EmailTemplate['settings']>) => {
    set((state) => {
      const newTemplate = { ...state.template };
      newTemplate.settings = { ...newTemplate.settings, ...settings };
      newTemplate.metadata.updatedAt = new Date().toISOString();

      // Add to history
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newTemplate];

      return {
        template: newTemplate,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
      };
    });
  },
}));
