import React from 'react';
import { useBuilderStore } from '../../store/builderStore';



export const Toolbar: React.FC = () => {
  const { 
    undo, 
    redo, 
    saveTemplate, 
    exportJSON, 
    exportMJML,
    history,
    historyIndex 
  } = useBuilderStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleExportJSON = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMJML = () => {
    const mjml = exportMJML();
    const blob = new Blob([mjml], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.mjml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Undo/Redo */}
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`p-2 rounded-lg transition-colors ${
          canUndo 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        title="Undo"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>

      <button
        onClick={redo}
        disabled={!canRedo}
        className={`p-2 rounded-lg transition-colors ${
          canRedo 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        title="Redo"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
        </svg>
      </button>

      <div className="w-px h-6 bg-gray-300"></div>



      {/* Save */}
      <button
        onClick={saveTemplate}
        className="btn-primary text-sm px-3 py-2"
        title="Save Template"
      >
        Save
      </button>

      {/* Export */}
      <div className="relative group">
        <button className="btn-secondary text-sm px-3 py-2">
          Export
          <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-1">
            <button
              onClick={handleExportJSON}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as JSON
            </button>
            <button
              onClick={handleExportMJML}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as MJML
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
