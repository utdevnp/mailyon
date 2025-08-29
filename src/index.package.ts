// Main package exports
export { useBuilderStore } from './store/builderStore';
export * from './types';

// Component exports
export { Builder } from './components/Builder/Builder';
export { ComponentLibrary } from './components/ComponentLibrary/ComponentLibrary';
export { Inspector } from './components/Inspector/Inspector';
export { Toolbar } from './components/Toolbar/Toolbar';
export { ComponentRenderer } from './components/Builder/ComponentRenderer';
export { DraggableComponent } from './components/Builder/DraggableComponent';

// Default export for the main app
export { default as EmailTemplateBuilder } from './App';
