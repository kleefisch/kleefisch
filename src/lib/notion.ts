import { NotionAPI } from 'notion-client';
import { type ExtendedRecordMap } from 'notion-types';

const notion = new NotionAPI();

export async function getNotionPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId);
  return recordMap;
}
