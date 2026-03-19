const fs = require('fs');
let code = fs.readFileSync('src/components/notion-renderer.tsx', 'utf-8');

// Insert after the Prism core import
const hook = 'if (typeof window !== "undefined") { window.Prism = window.Prism || Prism; }';
const inject = `
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/show-language/prism-show-language.js";
`;

if (!code.includes("prism-show-language")) {
  code = code.replace(hook, hook + '\\n' + inject);
  fs.writeFileSync('src/components/notion-renderer.tsx', code);
}
