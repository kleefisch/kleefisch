import { NotionAPI } from "notion-client";
import { type ExtendedRecordMap } from "notion-types";
import { unstable_cache } from "next/cache";

const notion = new NotionAPI();

export const getNotionPage = unstable_cache(
  async (pageId: string): Promise<ExtendedRecordMap> => {
    const recordMap = await notion.getPage(pageId);
    return recordMap;
  },
  ["notion-page-cache"],
  {
    revalidate: 3600, // Armazena em cache por 1 hora (3600 segundos) para evitar lentidão
    tags: ["notion"],
  },
);
