import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  placeholder?: string;
}

const primaryColors = [
  { name: 'Blue', value: '#3b82f6', label: 'Blue' },
  { name: 'Green', value: '#10b981', label: 'Green' },
  { name: 'Red', value: '#ef4444', label: 'Red' },
  { name: 'Purple', value: '#8b5cf6', label: 'Purple' },
  { name: 'Orange', value: '#f97316', label: 'Orange' },
  { name: 'Yellow', value: '#eab308', label: 'Yellow' },
  { name: 'Gray', value: '#6b7280', label: 'Gray' },
  { name: 'Black', value: '#000000', label: 'Black' },
  { name: 'Transparent', value: 'transparent', label: 'Transparent' },
  { name: 'White', value: '#ffffff', label: 'White' },
  { name: 'Pink', value: '#ec4899', label: 'Pink' },
  { name: 'Teal', value: '#14b8a6', label: 'Teal' },
  { name: 'Indigo', value: '#6366f1', label: 'Indigo' },
  { name: 'Lime', value: '#84cc16', label: 'Lime' },
  { name: 'Cyan', value: '#06b6d4', label: 'Cyan' },
  { name: 'Rose', value: '#f43f5e', label: 'Rose' },
  { name: 'Amber', value: '#f59e0b', label: 'Amber' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  value, 
  onChange, 
  label = 'Color',
  placeholder = 'Select color'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    onChange(color);
  };

  const getDisplayColor = () => {
    if (value === 'transparent') return 'transparent';
    if (value === '' || !value) return '#e5e7eb';
    return value;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      
      {/* Color Display Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-2 p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
      >
        <div 
          className={`w-6 h-6 rounded relative ${
            value === '#ffffff' || value === 'transparent' 
              ? 'border border-gray-300' 
              : 'border border-gray-300'
          }`}
          style={{ backgroundColor: getDisplayColor() }}
        >
          {value === 'transparent' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M3 21L21 3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3L21 12L12 21L3 12L12 3" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1"></div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Color Grid Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
          {/* Primary Colors Grid */}
          <div className="grid grid-cols-4 mb-3" style={{ gap: '6px' }}>
            {primaryColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`p-0 rounded transition-all hover:scale-110`}
                title={color.label}
              >
                <div 
                  className={`w-9 h-9 rounded relative ${
                    color.value === '#ffffff' || color.value === 'transparent' 
                      ? 'border border-gray-300' 
                      : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {color.value === 'transparent' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M3 21L21 3" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3L21 12L12 21L3 12L12 3" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Color Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => handleCustomColorChange(e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Custom Color</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Click the color box above to pick any custom color
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
