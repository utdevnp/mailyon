declare module 'mjml-browser' {
  interface MJMLResult {
    html: string;
    errors?: string[];
  }

  interface MJMLOptions {
    keepComments?: boolean;
    beautify?: boolean;
    minify?: boolean;
    validationLevel?: 'strict' | 'soft' | 'skip';
  }

  function mjml2html(mjmlContent: string, options?: MJMLOptions): MJMLResult;
  
  export = mjml2html;
}
