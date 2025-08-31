import React from 'react';
import EmailTemplateBuilder from './components/EmailTemplateBuilder';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header for Development */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                🧪 Development Mode - Headerless Email Template Builder
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              This header is for development only. Package users get headerless component.
            </div>
          </div>
        </div>
      </header>

      {/* Headerless EmailTemplateBuilder Component */}
      <EmailTemplateBuilder />
    </div>
  );
}

export default App;
