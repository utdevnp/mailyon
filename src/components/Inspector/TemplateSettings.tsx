import React from 'react';
import { ColorPicker } from './ColorPicker';
import { EmailTemplate } from '../../types';

interface TemplateSettingsProps {
  template: EmailTemplate;
  updateTemplateSettings: (settings: Partial<EmailTemplate['settings']>) => void;
}

export const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  template,
  updateTemplateSettings
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="card p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-700">Template Settings</h3>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Width
            </label>
            <input
              type="text"
              value={template.settings.width}
              onChange={(e) => updateTemplateSettings({ width: e.target.value })}
              className="input-field text-sm"
              placeholder="600px"
            />
          </div>
          <div>
            <ColorPicker
              value={template.settings.backgroundColor}
              onChange={(color) => updateTemplateSettings({ backgroundColor: color })}
              label="Background"
              placeholder="Select background"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Font Family
            </label>
            <select 
              className="input-field text-sm"
              value={template.settings.fontFamily}
              onChange={(e) => updateTemplateSettings({ fontFamily: e.target.value })}
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Times New Roman, serif">Times New Roman</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
