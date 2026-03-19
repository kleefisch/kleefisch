const fs = require('fs');

const customToc = `
/* Hack para transformar o Sumário numa barra lateral de tracinhos igual do Notion nativo */

/* A barra lateral aparece fixa à direita nas telas grandes */
@media (min-width: 1300px) {
  .notion-page-content-has-aside {
    display: flex;
    flex-direction: row;
  }
  
  .notion-app .notion-aside {
    display: flex;
    position: fixed;
    right: 32px;
    top: 30%;
    z-index: 50;
    width: 250px; 
    transform: translateX(230px);
    transition: transform 0.3s ease;
  }

  .notion-app .notion-aside:hover {
    transform: translateX(0);
  }

  .notion-app .notion-aside-table-of-contents {
    background: transparent !important;
  }

  .notion-aside-table-of-contents .notion-table-of-contents-item {
    position: relative;
    color: transparent !important;
    white-space: nowrap;
    overflow: visible;
  }
  
  .notion-aside-table-of-contents .notion-table-of-contents-item::before {
    content: "";
    position: absolute;
 const fs = require('fs');
50
const customToc = `
/* ate/* Hack para trans: 
/* A barra lateral aparece fixa à direita nas telas grandes */
@media (min-width: 1300px) x;
@media (min-width: 1300px) {
  .notion-page-content-has-aside ti  .notion-page-content-has--i    display: flex;
    flex-direce-    flex-directioon  }
  
  .notion-app .n:h  er :b    display: flex;
    posit:     position: fixcy    right: 32px;
   h    top: 30%;
 po    z-index:      width: 250pov    transform: trof    transition: transform 0.3s e--  }

  .notion-app .notion-aside:hoio
 asi    transform: translateX(0);
  }
di  }

  .notion-app .notion-a}

 

l    background: transparent !important;
  }

 ,   }

 ');

if (!css.includes('/* Hack pa
  tr    position: relative;
    color: transparent !important;
    wh',    color: transparentc)   
