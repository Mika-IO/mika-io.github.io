(function(){
  var shortcuts=[
    {app:"windows",key:"Ctrl+C",desc:T('copy','Copy')},{app:"windows",key:"Ctrl+X",desc:T('cut','Cut')},{app:"windows",key:"Ctrl+V",desc:T('paste','Paste')},
    {app:"windows",key:"Ctrl+Z",desc:T('undo','Undo')},{app:"windows",key:"Ctrl+Y",desc:T('redo','Redo')},{app:"windows",key:"Ctrl+S",desc:T('save','Save')},
    {app:"windows",key:"Ctrl+A",desc:T('selectall','Select all')},{app:"windows",key:"Ctrl+F",desc:T('find','Find')},{app:"windows",key:"Alt+F4",desc:T('closewindow','Close window')},
    {app:"windows",key:"Win+D",desc:T('showdesktop','Show desktop')},{app:"windows",key:"Win+E",desc:T('fileexplorer','File Explorer')},{app:"windows",key:"Win+L",desc:T('lockscreen','Lock screen')},
    {app:"windows",key:"Alt+Tab",desc:T('switchwindows','Switch windows')},{app:"windows",key:"Ctrl+Shift+Esc",desc:T('taskmanager','Task Manager')},
    {app:"mac",key:"Cmd+C",desc:T('copy','Copy')},{app:"mac",key:"Cmd+X",desc:T('cut','Cut')},{app:"mac",key:"Cmd+V",desc:T('paste','Paste')},
    {app:"mac",key:"Cmd+Z",desc:T('undo','Undo')},{app:"mac",key:"Cmd+Shift+Z",desc:T('redo','Redo')},{app:"mac",key:"Cmd+S",desc:T('save','Save')},
    {app:"mac",key:"Cmd+A",desc:T('selectall','Select all')},{app:"mac",key:"Cmd+Space",desc:T('spotlightsearch','Spotlight search')},{app:"mac",key:"Cmd+Q",desc:T('quitapp','Quit app')},
    {app:"mac",key:"Cmd+Tab",desc:T('switchapps','Switch apps')},{app:"mac",key:"Cmd+Shift+3",desc:T('screenshot','Screenshot')},
    {app:"excel",key:"Ctrl+;",desc:T('insertdate','Insert date')},{app:"excel",key:"Ctrl+Home",desc:T('gotoa1','Go to A1')},
    {app:"excel",key:"F2",desc:T('editcell','Edit cell')},{app:"excel",key:"Alt+=",desc:T('autosum','AutoSum')},{app:"excel",key:"Ctrl+1",desc:T('formatcells','Format Cells')},
    {app:"excel",key:"Ctrl+Shift+L",desc:T('togglefilters','Toggle filters')},{app:"excel",key:"F4",desc:T('toggleinformula','Toggle $ in formula')},
    {app:"vscode",key:"Ctrl+P",desc:T('quickopenfile','Quick open file')},{app:"vscode",key:"Ctrl+Shift+P",desc:T('commandpalette','Command palette')},
    {app:"vscode",key:"Ctrl+/",desc:T('togglecomment','Toggle comment')},{app:"vscode",key:"Alt+Up",desc:T('movelineup','Move line up')},
    {app:"vscode",key:"Ctrl+D",desc:T('multicursoronword','Multi-cursor on word')},{app:"vscode",key:"F12",desc:T('gotodefinition','Go to definition')},
    {app:"chrome",key:"Ctrl+T",desc:T('newtab','New tab')},{app:"chrome",key:"Ctrl+W",desc:T('closetab','Close tab')},
    {app:"chrome",key:"Ctrl+L",desc:T('focusaddressbar','Focus address bar')},{app:"chrome",key:"Ctrl+Shift+T",desc:T('reopenclosedtab','Reopen closed tab')},
    {app:"chrome",key:"Ctrl+R",desc:T('reload','Reload')},{app:"chrome",key:"F12",desc:T('devtools','DevTools')}
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