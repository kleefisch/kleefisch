const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/projects/[id]/page.tsx', 'utf-8');

// The string we want to match:
const targetToReplace = `
            {recordMap && (
              <div className="mt-12 -mx-4 sm:mx-0">
                <NotionRenderer recordMap={recordMap} />
              </div>
            )}
`;

code = code.replace(targetToReplace, '');

// Now we inject it AFTER the max-w-4xl container closes.
// The container closes after the prose block and project details.
// So we want to find:
const targetEnd = `          </div>\n        </div>\n      </div>\n    </div>`;
const newLayout = `          </div>\n        </div>\n        \n        {recordMap && (\n          <div className="w-full mt-12">\n            <NotionRenderer recordMap={recordMap} />\n          </div>\n        )}\n      </div>\n    </div>`;

code = code.replace(targetEnd, newLayout);
fs.writeFileSync('src/app/[locale]/projects/[id]/page.tsx', code);
