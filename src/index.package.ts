// Main package exports
export { useBuilderStore } from './store/builderStore';
export * from './types';

// Component exports (headerless)
export { Builder } from './components/Builder/Builder';
export { ComponentLibrary } from './components/ComponentLibrary/ComponentLibrary';
export { Inspector } from './components/Inspector/Inspector';
export { Toolbar } from './components/Toolbar/Toolbar';
export { ComponentRenderer } from './components/Builder/ComponentRenderer';
export { DraggableComponent } from './components/Builder/DraggableComponent';

// Custom hooks for package users
export { useEmailTemplateBuilder } from './hooks/useEmailTemplateBuilder';
export { useEmailExport } from './hooks/useEmailExport';
export { useEmailTemplateManager } from './hooks/useEmailTemplateManager';

// Utility functions
export { exportEmailTemplate, generateMJML, convertMJMLToHTML } from './utils/mjmlExport';

// Headerless main component
export { default as EmailTemplateBuilder } from './components/EmailTemplateBuilder';
