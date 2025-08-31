// Test MJML Engine Output
const mjml2html = require('mjml-browser');

// Test header component MJML
const testMjml = `
<mjml>
  <mj-head>
    <mj-title>Test Header</mj-title>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#ffffff">
    <mj-section padding="30px" background-color="#1f2937">
      <mj-column>
        <mj-text 
          font-size="24px" 
          font-weight="bold" 
          color="#ffffff"
          text-align="center"
          padding="0"
          line-height="1.2"
        >
          Company Newsletter
        </mj-text>
        <mj-text 
          font-size="16px" 
          color="#ffffff"
          text-align="center"
          padding="10px 0 0 0"
          line-height="1.4"
        >
          Stay updated with our latest news
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

try {
  console.log('=== MJML Input ===');
  console.log(testMjml);
  
  console.log('\n=== Converting MJML to HTML ===');
  const result = mjml2html(testMjml, {
    keepComments: false,
    beautify: true,
    minify: false,
    validationLevel: 'soft'
  });
  
  console.log('\n=== Generated HTML ===');
  console.log(result.html);
  
  console.log('\n=== Analysis ===');
  
  // Check for alignment
  const hasCenterAlign = result.html.includes('text-align: center') || 
                        result.html.includes('text-align:center') ||
                        result.html.includes('align="center"');
  
  const hasLeftAlign = result.html.includes('text-align: left') || 
                      result.html.includes('text-align:left') ||
                      result.html.includes('align="left"');
  
  console.log('Center alignment found:', hasCenterAlign ? '✅ YES' : '❌ NO');
  console.log('Left alignment found:', hasLeftAlign ? '⚠️ YES' : '✅ NO');
  
  if (result.errors && result.errors.length > 0) {
    console.log('\n=== MJML Warnings/Errors ===');
    console.log(result.errors);
  }
  
} catch (error) {
  console.error('Error:', error);
}
