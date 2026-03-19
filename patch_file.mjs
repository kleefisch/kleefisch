import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/[locale]/projects/[id]/page.tsx");
let content = fs.readFileSync(filePath, "utf8");

const oldStr = `          <div className="prose prose-invert max-w-none pb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Projeto</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>
            
            {project.content && (
              <div className="mt-8 prose-img:rounded-xl prose-img:shadow-lg focus:outline-none text-muted-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: project.content }}>                                                                
              </div>
            )}
          </div>`;

const newStr = `          <div className="prose prose-invert max-w-none pb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Projeto</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>
            
            {recordMap && (
              <div className="mt-12 -mx-4 sm:mx-0">
                <NotionRenderer recordMap={recordMap} />
              </div>
            )}

            {!recordMap && project.content && !notionError && (
               <div className="mt-8 prose-img:rounded-xl prose-img:shadow-lg focus:outline-none text-muted-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: project.content }}>                                                                
               </div>
            )}
            
            {notionError && (
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                Não foi possível carregar o conteúdo detalhado deste projeto no momento.
              </div>
            )}
          </div>`;

content = content.replace(oldStr, newStr);
fs.writeFileSync(filePath, content);
console.log("Patch applied!");
