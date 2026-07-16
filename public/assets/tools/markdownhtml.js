(function(){
  function mdToHtml(md){
    return md
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h1>$1</h1>')
      .replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>')
      .replace(/^---+$/gm,'<hr>')
      .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g,'<em>$1</em>')
      .replace(/```([\s\S]*?)```/g,'<pre><code>$1</code></pre>')
      .replace(/`([^\n`]+)`/g,'<code>$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>')
      .replace(/^\d+\. (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\/li>)/s,m=>'<ol>'+m+'</ol>')
      .replace(/^[-*] (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\/li>)/s,m=>'<ul>'+m+'</ul>')
      .replace(/^(?!<[a-z]).+$/gm,'<p>$&</p>')
      .replace(/<\/p>\n<p>/g,'</p><p>');
  }
  let lastHtml='';
  function update(){
    const md=document.getElementById('md-in').value;
    lastHtml=mdToHtml(md);
    document.getElementById('md-preview').innerHTML=lastHtml;
  }
  document.getElementById('md-in').addEventListener('input',update);
  document.getElementById('md-copy-html').onclick=function(){navigator.clipboard.writeText(lastHtml);};
  update();
})();