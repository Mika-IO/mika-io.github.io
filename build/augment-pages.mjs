#!/usr/bin/env node
// build/augment-pages.mjs
// Inject SEO metadata into generated HTML pages based on src/content MD files.
import fs from 'fs/promises';
import path from 'path';

const SITE_ROOT = process.env.BASE_URL || 'https://mikaio.dev';

async function readMeta(mdFile){
  try{
    const s = await fs.readFile(mdFile,'utf8');
    const titleMatch = s.match(/^##\s*(.+)/m);
    const para = s.split('\n\n').find(p=>p.trim().length>20) || '';
    const desc = para.replace(/[#_*`\[\]]/g,'').replace(/\n+/g,' ').trim().slice(0,300);
    return {title: titleMatch? titleMatch[1].trim(): '', description: desc};
  }catch(e){
    return {title:'', description:''};
  }
}

async function chooseContentDir(){
  const SRC = path.resolve('src/content/tools');
  const FALLBACK = path.resolve('data/content');
  try{ await fs.access(SRC); return SRC }catch(e){ return FALLBACK }
}

function escapeHtml(s){
  return s ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';
}

async function main(){
  const CONTENT_DIR = await chooseContentDir();
  const tools = await fs.readdir(CONTENT_DIR).catch(()=>[]);
  for(const tool of tools){
    const dir = path.join(CONTENT_DIR,tool);
    const files = await fs.readdir(dir).catch(()=>[]);
    const langs = files.filter(f=>f.endsWith('.md')).map(f=>path.basename(f,'.md'));
    for(const lang of langs){
      const htmlPath = path.join('public', lang, tool, 'index.html');
      try{
        let html = await fs.readFile(htmlPath, 'utf8');
        const mdFile = path.join(dir, `${lang}.md`);
        const meta = await readMeta(mdFile);
        const canonical = `<link rel="canonical" href="${SITE_ROOT}/${lang}/${tool}/">`;
        const alternates = langs.map(l=>`<link rel="alternate" hreflang="${l}" href="${SITE_ROOT}/${l}/${tool}/">`).join('\n');
        const og = `<!-- SEO injected -->\n<meta property="og:title" content="${escapeHtml(meta.title || tool)}" />\n<meta property="og:description" content="${escapeHtml(meta.description || '')}" />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="${SITE_ROOT}/${lang}/${tool}/" />`;
        const jsonld = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": meta.title || tool,
          "description": meta.description || '',
          "url": `${SITE_ROOT}/${lang}/${tool}/`,
          "inLanguage": lang
        };
        const jsonldTag = `<script type=\"application/ld+json\">${JSON.stringify(jsonld)}</script>`;
        if(html.includes('<!-- SEO injected -->')) continue;
        const inject = `\n  <!-- SEO injected -->\n  ${canonical}\n  ${alternates}\n  ${og}\n  ${jsonldTag}\n  <!-- end SEO injected -->\n`;
        if(html.includes('</head>')){
          html = html.replace('</head>', inject + '</head>');
          await fs.copyFile(htmlPath, htmlPath + '.bak').catch(()=>{});
          await fs.writeFile(htmlPath, html,'utf8');
          console.log('Injected:', htmlPath);
        }
      }catch(err){
        // missing html or read error, skip
      }
    }
  }
}

main().catch(err=>{console.error(err); process.exit(1)});
