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

// Maximum number of undo/redo snapshots to retain
const MAX_HISTORY = 100;

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

// Helper function to find the parent of a component (null means it's at root level)
const findParentComponent = (components: EmailComponent[], childId: string): EmailComponent | null => {
  for (const component of components) {
    if (component.children?.some(child => child.id === childId)) {
      return component;
    }
    if (component.children) {
      const found = findParentComponent(component.children, childId);
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

// Deep-clone the template so history snapshots and current state never share
// nested references. The template is JSON-serializable by design (see exportJSON).
const cloneTemplate = (template: EmailTemplate): EmailTemplate =>
  JSON.parse(JSON.stringify(template));

// Append a snapshot to history, capping its length and returning the new index.
const pushHistory = (
  history: EmailTemplate[],
  historyIndex: number,
  template: EmailTemplate
): { history: EmailTemplate[]; historyIndex: number } => {
  const next = [...history.slice(0, historyIndex + 1), template];
  const trimmed = next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
  return { history: trimmed, historyIndex: trimmed.length - 1 };
};

// Resolve the currently selected component from store state by its id.
// Selection is stored as an id so it survives undo/redo and template replacement.
export const selectSelectedComponent = (state: BuilderState): EmailComponent | null =>
  state.selectedComponentId
    ? findComponent(state.template.components, state.selectedComponentId)
    : null;

export const useBuilderStore = create<BuilderState & BuilderActions>((set, get) => ({
  // State
  template: defaultTemplate,
  selectedComponentId: null,
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
      const updatedTemplate = cloneTemplate(newTemplate);
      updatedTemplate.metadata.updatedAt = new Date().toISOString();

      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, updatedTemplate);

      return {
        template: updatedTemplate,
        selectedComponentId: null, // Reset selection when template is replaced
        history,
        historyIndex,
      };
    });
  },

  addComponent: (component: EmailComponent, parentId?: string) => {
    set(state => {
      const newTemplate = cloneTemplate(state.template);

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
      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return { template: newTemplate, history, historyIndex };
    });
  },

  updateComponent: (id: string, updates: Partial<EmailComponent>) => {
    set(state => {
      const newTemplate = cloneTemplate(state.template);
      const component = findComponent(newTemplate.components, id);

      if (!component) return state;

      Object.assign(component, updates);
      newTemplate.metadata.updatedAt = new Date().toISOString();
      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return { template: newTemplate, history, historyIndex };
    });
  },

  deleteComponent: (id: string) => {
    set(state => {
      const newTemplate = cloneTemplate(state.template);
      newTemplate.components = removeComponent(newTemplate.components, id);
      newTemplate.metadata.updatedAt = new Date().toISOString();

      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return {
        template: newTemplate,
        selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
        history,
        historyIndex,
      };
    });
  },

  selectComponent: (component: EmailComponent | null) => {
    set({ selectedComponentId: component ? component.id : null });
  },

  moveComponent: (id: string, newIndex: number, newParentId?: string) => {
    set(state => {
      const newTemplate = cloneTemplate(state.template);

      // 1. Remove from old parent
      let component: EmailComponent | undefined;
      const oldParent = findParentComponent(newTemplate.components, id);

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
      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return { template: newTemplate, history, historyIndex };
    });
  },

  duplicateComponent: (id: string) => {
    set(state => {
      const component = findComponent(state.template.components, id);
      if (!component) return state;

      const duplicated = duplicateComponent(component);
      const newTemplate = cloneTemplate(state.template);

      // Insert the duplicate right after the original, at the same level
      const parent = findParentComponent(newTemplate.components, id);
      if (parent) {
        parent.children = parent.children || [];
        const index = parent.children.findIndex((c) => c.id === id);
        parent.children.splice(index + 1, 0, duplicated);
      } else {
        const index = newTemplate.components.findIndex((c) => c.id === id);
        newTemplate.components.splice(index + 1, 0, duplicated);
      }

      newTemplate.metadata.updatedAt = new Date().toISOString();
      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return { template: newTemplate, history, historyIndex };
    });
  },

  insertComponentAt: (type: ComponentType, index: number, defaultProps?: Record<string, any>, parentId?: string) => {
    set(state => {
      const newTemplate = cloneTemplate(state.template);
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
      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return { template: newTemplate, history, historyIndex };
    });
  },

  undo: () => {
    set(state => {
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
    set(state => {
      if (state.historyIndex < state.history.length - 1) {
        return {
          historyIndex: state.historyIndex + 1,
          template: state.history[state.historyIndex + 1],
        };
      }
      return state;
    });
  },

  saveTemplate: (key = 'emailTemplate') => {
    const { template } = get();
    localStorage.setItem(key, JSON.stringify(template));
  },

  loadTemplate: (template: EmailTemplate) => {
    set(state => {
      const cloned = cloneTemplate(template);
      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, cloned);
      return {
        template: cloned,
        history,
        historyIndex,
        selectedComponentId: null,
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
    set(state => {
      const newTemplate = cloneTemplate(state.template);
      newTemplate.settings = { ...newTemplate.settings, ...settings };
      newTemplate.metadata.updatedAt = new Date().toISOString();

      const { history, historyIndex } = pushHistory(state.history, state.historyIndex, newTemplate);

      return { template: newTemplate, history, historyIndex };
    });
  },
}));
