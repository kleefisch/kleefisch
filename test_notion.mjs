const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function extractNotionId(content) {
  try {
    const cleanId = content.replace(/-/g, "");
    const match = cleanId.match(/[a-f0-9]{32}/);
    if (match) return match[0];
    
    const url = new URL(content);
    const pathParts = url.pathname.split("-");
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart.length >= 32) return lastPart;
    return null;
  } catch {
    const cleanId = content.replace(/-/g, "");
    if (cleanId.length === 32) return cleanId;
    
    const match = cleanId.match(/[a-f0-9]{32}/);
    if (match) return match[0];
    return null;
  }
}

async function test() {
  const p = await prisma.project.findFirst({ orderBy: { createdAt: "desc" } });
  console.log("Extracted:", extractNotionId(p.content));
}
test();
