(function(){
  function md(src){
    return src
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h1>$1</h1>')
      .replace(/**(.+?)**/g,'<strong>$1</strong>')
      .replace(/*(.+?)*/g,'<em>$1</em>')
      .replace(/_(.+?)_/g,'<em>$1</em>')
      .replace(/```([sS]*?)```/g,'<pre style="background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:0.75rem;overflow-x:auto"><code>$1</code></pre>')
      .replace(/`(.+?)`/g,'<code style="background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:0 4px">$1</code>')
      .replace(/^> (.+)$/gm,'<blockquote style="border-left:4px solid var(--accent,#6366f1);margin:0;padding:0.4rem 0.75rem;opacity:0.8">$1</blockquote>')
      .replace(/^- (.+)$/gm,'<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs,'<ul>$1</ul>')
      .replace(/^---+$/gm,'<hr>')
      .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^(?!<[a-z]).+$/gm,s=>s?'<p>'+s+'</p>':s);
  }
  const input=document.getElementById('mp-in');
  function update(){document.getElementById('mp-out').innerHTML=md(input.value);}
  input.addEventListener('input',update);update();
})();