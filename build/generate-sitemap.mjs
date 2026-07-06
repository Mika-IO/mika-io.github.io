#!/usr/bin/env node
// build/generate-sitemap.mjs
// Generate sitemap.xml and sitemap.jsonld from data/content
import fs from 'fs/promises';
import path from 'path';

const SRC_CONTENT = path.resolve('src/content/tools');
const FALLBACK_CONTENT = path.resolve('data/content');
const CONTENT_DIR = await (async ()=>{ try{ await fs.access(SRC_CONTENT); return SRC_CONTENT }catch(e){ return FALLBACK_CONTENT } })();
const OUT_JSONLD = path.resolve('sitemap.jsonld');
const OUT_XML = path.resolve('sitemap.xml');
const BASE = process.env.BASE_URL || 'https://mikaio.dev';

function safeText(md){
  if(!md) return '';
  // strip markdown headings, bold, links roughly
  return md.replace(/\n+/g,' ').replace(/[#_*`\[\]]/g,'').trim();
}

async function readMeta(file){
  try{
    const s = await fs.readFile(file,'utf8');
    // title = first line starting with ##
    const titleMatch = s.match(/^##\s*(.+)/m);
    const paraMatch = s.split('\n\n').find(p=>p.trim().length>20);
    return {
      title: titleMatch ? titleMatch[1].trim() : '',
      description: safeText(paraMatch || '').slice(0,300)
    }
  } catch(e){
    return {title:'', description:''};
  }
}

async function main(){
  const tools = await fs.readdir(CONTENT_DIR);
  const items = [];
  for(const tool of tools){
    const dir = path.join(CONTENT_DIR,tool);
    const files = await fs.readdir(dir).catch(()=>[]);
    for(const f of files){
      if(!f.endsWith('.md')) continue;
      const lang = path.basename(f,'.md');
      const meta = await readMeta(path.join(dir,f));
      const url = `${BASE}/${lang}/${tool}/`;
      items.push({"@type": "WebPage", url, "inLanguage": lang, name: meta.title || tool, description: meta.description});
    }
  }
  // write JSON-LD ItemList wrapper
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((it,i)=>({"@type":"ListItem","position":i+1,"item":it}))
  };
  await fs.writeFile(OUT_JSONLD, JSON.stringify(jsonld,null,2),'utf8');

  // write sitemap.xml basic
  const urls = items.map(it=>`  <url>\n    <loc>${it.url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  await fs.writeFile(OUT_XML, xml,'utf8');
  console.log('sitemap generated:', OUT_JSONLD, OUT_XML);
}

main().catch(err=>{console.error(err); process.exit(1)});
