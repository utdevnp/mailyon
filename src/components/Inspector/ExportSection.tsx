import React from 'react';

interface ExportSectionProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
  description?: string;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  title,
  content,
  isExpanded,
  onToggle,
  onCopy,
  description
}) => {
  return (
    <div className="card p-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <div>
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="relative">
          <textarea
            value={content}
            className="w-full h-32 p-3 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg resize-none pr-10"
            placeholder={`${title} content will appear here...`}
          />
          <button
            onClick={onCopy}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title={`Copy ${title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
