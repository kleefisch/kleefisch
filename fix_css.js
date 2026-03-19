const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf-8');

const newCSS = `

/* Customizações do Notion limitadas - Preserva estilos de padding nativos */
.notion-custom-wrapper .notion {
  width: 100%;
}

.notion-custom-wrapper .notion-page {
  width: 100%;
}

/* Ocultar elementos se quiser usar APENAS o conteúdo e manter o TOC na direita */
.notion-custom-wrapper .notion-title,
.notion-custom-wrapper .notion-page-icon-hero,
.notion-custom-wrapper .notion-page-cover,
.notion-custom-wrapper .notion-page-cover-wrapper {
  display: none !important;
}

/* Remover espaço em branco residual do título escondido */
.notion-custom-wrapper .notion-page-has-cover {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

.notion-custom-wrapper .notion-page-no-cover {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
`;

fs.writeFileSync('src/app/globals.css', css + newCSS);
