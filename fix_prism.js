const fs = require('fs');
let code = fs.readFileSync('src/components/notion-renderer.tsx', 'utf-8');

// Insert explicit prismjs core import before languages
code = code.replace('import "prismjs/themes/prism-tomorrow.css";', 
\`import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
if (typeof window !== "undefined") {
  window.Prism = window.Prism || Prism;
}
import "prismjs/components/prism-clike.js";
\`);

fs.writeFileSync('src/components/notion-renderer.tsx', code);
