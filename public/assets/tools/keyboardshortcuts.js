(function(){
  var shortcuts=[
    {app:"windows",key:"Ctrl+C",desc:"Copy"},{app:"windows",key:"Ctrl+X",desc:"Cut"},{app:"windows",key:"Ctrl+V",desc:"Paste"},
    {app:"windows",key:"Ctrl+Z",desc:"Undo"},{app:"windows",key:"Ctrl+Y",desc:"Redo"},{app:"windows",key:"Ctrl+S",desc:"Save"},
    {app:"windows",key:"Ctrl+A",desc:"Select all"},{app:"windows",key:"Ctrl+F",desc:"Find"},{app:"windows",key:"Alt+F4",desc:"Close window"},
    {app:"windows",key:"Win+D",desc:"Show desktop"},{app:"windows",key:"Win+E",desc:"File Explorer"},{app:"windows",key:"Win+L",desc:"Lock screen"},
    {app:"windows",key:"Alt+Tab",desc:"Switch windows"},{app:"windows",key:"Ctrl+Shift+Esc",desc:"Task Manager"},
    {app:"mac",key:"Cmd+C",desc:"Copy"},{app:"mac",key:"Cmd+X",desc:"Cut"},{app:"mac",key:"Cmd+V",desc:"Paste"},
    {app:"mac",key:"Cmd+Z",desc:"Undo"},{app:"mac",key:"Cmd+Shift+Z",desc:"Redo"},{app:"mac",key:"Cmd+S",desc:"Save"},
    {app:"mac",key:"Cmd+A",desc:"Select all"},{app:"mac",key:"Cmd+Space",desc:"Spotlight search"},{app:"mac",key:"Cmd+Q",desc:"Quit app"},
    {app:"mac",key:"Cmd+Tab",desc:"Switch apps"},{app:"mac",key:"Cmd+Shift+3",desc:"Screenshot"},
    {app:"excel",key:"Ctrl+;",desc:"Insert date"},{app:"excel",key:"Ctrl+Home",desc:"Go to A1"},
    {app:"excel",key:"F2",desc:"Edit cell"},{app:"excel",key:"Alt+=",desc:"AutoSum"},{app:"excel",key:"Ctrl+1",desc:"Format Cells"},
    {app:"excel",key:"Ctrl+Shift+L",desc:"Toggle filters"},{app:"excel",key:"F4",desc:"Toggle $ in formula"},
    {app:"vscode",key:"Ctrl+P",desc:"Quick open file"},{app:"vscode",key:"Ctrl+Shift+P",desc:"Command palette"},
    {app:"vscode",key:"Ctrl+/",desc:"Toggle comment"},{app:"vscode",key:"Alt+Up",desc:"Move line up"},
    {app:"vscode",key:"Ctrl+D",desc:"Multi-cursor on word"},{app:"vscode",key:"F12",desc:"Go to definition"},
    {app:"chrome",key:"Ctrl+T",desc:"New tab"},{app:"chrome",key:"Ctrl+W",desc:"Close tab"},
    {app:"chrome",key:"Ctrl+L",desc:"Focus address bar"},{app:"chrome",key:"Ctrl+Shift+T",desc:"Reopen closed tab"},
    {app:"chrome",key:"Ctrl+R",desc:"Reload"},{app:"chrome",key:"F12",desc:"DevTools"}
  ];
  function render(){
    var q=document.getElementById("ks-search").value.toLowerCase();
    var app=document.getElementById("ks-app-sel").value;
    var f=shortcuts.filter(function(s){return (app==="all"||s.app===app)&&(!q||(s.key+s.desc).toLowerCase().indexOf(q)>=0);});
    document.getElementById("ks-list").innerHTML=f.map(function(s){
      return "<div style=\"display:grid;grid-template-columns:160px 1fr auto;gap:0.5rem;align-items:center;padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem\"><code style=\"font-family:monospace;color:var(--accent,#6366f1)\">"+s.key+"</code><span>"+s.desc+"</span><span style=\"opacity:0.4;font-size:0.75rem\">"+s.app+"</span></div>";
    }).join("");
  }
  document.getElementById("ks-search").addEventListener("input",render);
  document.getElementById("ks-app-sel").addEventListener("change",render);
  render();
})();