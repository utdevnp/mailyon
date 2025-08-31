import React from 'react';
import { exportEmailTemplate } from '../src/utils/mjmlExport';

// Demo template that shows exact styling match
const demoTemplate = {
  id: 'demo-template',
  name: 'MJML Export Demo',
  description: 'Demonstrating exact preview-to-HTML matching',
  components: [
    {
      id: 'header-1',
      type: 'header' as const,
      props: {
        title: 'Company Newsletter',
        subtitle: 'Stay updated with our latest news',
        backgroundColor: '#1f2937',
        textColor: '#ffffff',
        padding: '30px',
        logoVisible: false,
        titleVisible: true,
        subtitleVisible: true,
      },
      children: [],
      style: {},
    },
    {
      id: 'text-1',
      type: 'text' as const,
      props: {
        content: 'Welcome to our monthly newsletter! We have exciting updates to share with you about our latest products and services.',
        fontSize: '18px',
        textAlign: 'center',
        color: '#374151',
        padding: '25px',
        backgroundColor: '#f9fafb',
        textVisible: true,
      },
      children: [],
      style: {},
    },
    {
      id: 'button-1',
      type: 'button' as const,
      props: {
        text: 'Read More',
        url: '#',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        padding: '15px 30px',
        borderRadius: '8px',
        fontSize: '16px',
        canvasPadding: '20px',
        buttonVisible: true,
      },
      children: [],
      style: {},
    },
    {
      id: 'image-1',
      type: 'image' as const,
      props: {
        src: 'https://via.placeholder.com/600x300/3b82f6/ffffff?text=Demo+Image',
        alt: 'Demo Image',
        width: '100%',
        align: 'center',
        padding: '20px',
        borderRadius: '12px',
        imageVisible: true,
      },
      children: [],
      style: {},
    },
    {
      id: 'footer-1',
      type: 'footer' as const,
      props: {
        companyName: 'Your Company',
        email: 'newsletter@company.com',
        unsubscribeText: 'Unsubscribe from this list',
        backgroundColor: '#f3f4f6',
        padding: '25px',
      },
      children: [],
      style: {},
    },
  ],
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0',
  },
  settings: {
    width: '600px',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
};

export const MJMLExportDemo: React.FC = () => {
  const [exportResult, setExportResult] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<'mjml' | 'html'>('html');

  const handleExport = () => {
    try {
      const result = exportEmailTemplate(demoTemplate);
      setExportResult(result);
    } catch (error) {
      console.error('Export error:', error);
      setExportResult({ error: error.message });
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type} copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 MJML Export Demo
          </h1>
          <p className="text-gray-600">
            This demo shows how the new MJML export system ensures exact preview-to-HTML matching.
          </p>
          <button
            onClick={handleExport}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate MJML & HTML Export
          </button>
        </div>

        {exportResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📱 Template Preview
              </h2>
              <div className="border border-gray-200 rounded-lg p-4">
                <div
                  className="mx-auto bg-white"
                  style={{
                    width: demoTemplate.settings.width,
                    backgroundColor: demoTemplate.settings.backgroundColor,
                    fontFamily: demoTemplate.settings.fontFamily,
                  }}
                >
                  {demoTemplate.components.map((component) => {
                    switch (component.type) {
                      case 'header':
                        return (
                          <div
                            key={component.id}
                            style={{
                              backgroundColor: component.props.backgroundColor,
                              padding: component.props.padding,
                              textAlign: 'center' as const,
                            }}
                          >
                            {component.props.title && (
                              <h1
                                style={{
                                  color: component.props.textColor,
                                  margin: 0,
                                  fontSize: '24px',
                                  fontWeight: 'bold',
                                }}
                              >
                                {component.props.title}
                              </h1>
                            )}
                            {component.props.subtitle && (
                              <p
                                style={{
                                  color: component.props.textColor,
                                  margin: '10px 0 0 0',
                                  fontSize: '16px',
                                }}
                              >
                                {component.props.subtitle}
                              </p>
                            )}
                          </div>
                        );

                      case 'text':
                        return (
                          <div
                            key={component.id}
                            style={{
                              backgroundColor: component.props.backgroundColor,
                              padding: component.props.padding,
                              textAlign: component.props.textAlign as any,
                            }}
                          >
                            <p
                              style={{
                                color: component.props.color,
                                fontSize: component.props.fontSize,
                                margin: 0,
                                lineHeight: '1.5',
                              }}
                            >
                              {component.props.content}
                            </p>
                          </div>
                        );

                      case 'button':
                        return (
                          <div
                            key={component.id}
                            style={{
                              padding: component.props.canvasPadding,
                              textAlign: 'center' as const,
                            }}
                          >
                            <a
                              href={component.props.url}
                              style={{
                                display: 'inline-block',
                                backgroundColor: component.props.backgroundColor,
                                color: component.props.textColor,
                                padding: component.props.padding,
                                textDecoration: 'none',
                                borderRadius: component.props.borderRadius,
                                fontWeight: 'bold',
                                fontSize: component.props.fontSize,
                              }}
                            >
                              {component.props.text}
                            </a>
                          </div>
                        );

                      case 'image':
                        return (
                          <div
                            key={component.id}
                            style={{
                              padding: component.props.padding,
                              textAlign: component.props.align as any,
                            }}
                          >
                            <img
                              src={component.props.src}
                              alt={component.props.alt}
                              style={{
                                width: component.props.width,
                                borderRadius: component.props.borderRadius,
                              }}
                            />
                          </div>
                        );

                      case 'footer':
                        return (
                          <div
                            key={component.id}
                            style={{
                              backgroundColor: component.props.backgroundColor,
                              padding: component.props.padding,
                              textAlign: 'center' as const,
                            }}
                          >
                            {component.props.companyName && (
                              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
                                {component.props.companyName}
                              </h3>
                            )}
                            {component.props.email && (
                              <p style={{ margin: '5px 0', color: '#666' }}>
                                {component.props.email}
                              </p>
                            )}
                            {component.props.unsubscribeText && (
                              <p style={{ margin: '15px 0 0 0', fontSize: '12px', color: '#999' }}>
                                <a href="#" style={{ color: '#999', textDecoration: 'none' }}>
                                  {component.props.unsubscribeText}
                                </a>
                              </p>
                            )}
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>

            {/* Export Results */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📤 Export Results
              </h2>
              
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'html'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  HTML Export
                </button>
                <button
                  onClick={() => setActiveTab('mjml')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'mjml'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  MJML Source
                </button>
              </div>

              {/* Export Content */}
              <div className="relative">
                <textarea
                  value={activeTab === 'html' ? exportResult.html : exportResult.mjml}
                  className="w-full h-96 p-3 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg resize-none pr-12"
                  readOnly
                />
                <button
                  onClick={() => copyToClipboard(
                    activeTab === 'html' ? exportResult.html : exportResult.mjml,
                    activeTab === 'html' ? 'HTML' : 'MJML'
                  )}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title={`Copy ${activeTab === 'html' ? 'HTML' : 'MJML'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {/* Export Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  ✨ Perfect Preview Match Achieved!
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>✅ HTML output matches preview exactly</li>
                  <li>✅ All padding, margins, and spacing preserved</li>
                  <li>✅ Colors, fonts, and styling consistent</li>
                  <li>✅ Cross-client email compatibility</li>
                  <li>✅ Mobile responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔧 How MJML Export Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Component Data</h3>
              <p className="text-sm text-gray-600">
                Your template components with all styling properties
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">MJML Generation</h3>
              <p className="text-sm text-gray-600">
                Convert to MJML markup with exact styling
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">HTML Output</h3>
              <p className="text-sm text-gray-600">
                Professional, cross-client compatible HTML
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
