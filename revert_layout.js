const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/projects/[id]/page.tsx', 'utf-8');

const target = \`          </div>
        </div>
        
        {recordMap && (
          <div className="w-full mt-12">
            <NotionRenderer recordMap={recordMap} />
          </div>
        )}
      </div>
    </div>\`;

const replacement = \`            {recordMap && (
              <div className="mt-8 -mx-4 sm:mx-0">
                <NotionRenderer recordMap={recordMap} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>\`;

code = code.replace(target, replacement);
fs.writeFileSync('src/app/[locale]/projects/[id]/page.tsx', code);
