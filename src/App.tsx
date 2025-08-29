import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Builder } from './components/Builder/Builder';
import { ComponentLibrary } from './components/ComponentLibrary/ComponentLibrary';
import { Inspector } from './components/Inspector/Inspector';
import { Toolbar } from './components/Toolbar/Toolbar';
import './index.css';

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Email Template Builder
                </h1>
              </div>
              <Toolbar />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Sidebar - Component Library */}
            <div className="col-span-3">
              <ComponentLibrary />
            </div>

            {/* Center - Builder Canvas */}
            <div className="col-span-6">
              <Builder />
            </div>

            {/* Right Sidebar - Inspector */}
            <div className="col-span-3">
              <Inspector />
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
