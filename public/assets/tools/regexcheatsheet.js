(function(){
  const items=[
    ['.',T('anycharacterexceptnewl','Any character (except newline)')],
    ['\\d',T('digit09','Digit [0-9]')],['\\D',T('nondigit','Non-digit')],
    ['\\w',T('wordcharacterazaz09','Word character [a-zA-Z0-9_]')],['\\W',T('nonwordcharacter','Non-word character')],
    ['\\s',T('whitespace','Whitespace')],['\\S',T('nonwhitespace','Non-whitespace')],
    ['\\b',T('wordboundary','Word boundary')],
    ['^',T('startofstring','Start of string')],['$',T('endofstring','End of string')],
    ['*',T('d0ormoregreedy','0 or more (greedy)')],['+',T('d1ormoregreedy','1 or more (greedy)')],
    ['?',T('d0or1optional','0 or 1 (optional)')],['*?',T('d0ormorelazy','0 or more (lazy)')],['+?',T('d1ormorelazy','1 or more (lazy)')],
    ['{n}',T('exactlyntimes','Exactly n times')],['{n,m}',T('betweennandmtimes','Between n and m times')],
    ['[abc]',T('characterclass','Character class')],['^[abc]',T('negatedclass','Negated class')],
    ['[a-z]',T('rangeatoz','Range a to z')],
    ['(abc)',T('capturegroup','Capture group')],['(?:abc)',T('noncapturegroup','Non-capture group')],
    ['a|b',T('alternationaorb','Alternation: a or b')],
    ['(?=abc)',T('lookahead','Lookahead')],['(?!abc)',T('negativelookahead','Negative lookahead')],
    ['Email',T('wwaz2','[\\\\w.-]+@[\\\\w-]+\\\\.[a-z]{2,}')],
    ['URL',T('httpsw','https?:\\/\\/[\\\\w./%-]+')],
    ['IPv4',T('d133d13','(\\\\d{1,3}\\\\.){3}\\\\d{1,3}')],
    ['Date YYYY-MM-DD',T('d4d2d2','\\\\d{4}-\\\\d{2}-\\\\d{2}')],
    ['Hex color',T('d09afaf36','#[0-9a-fA-F]{3,6}')],
  ];
  function render(q){
    const f=q?items.filter(([t,d])=>(t+d).toLowerCase().includes(q.toLowerCase())):items;
    document.getElementById('rcs-list').innerHTML=f.map(([token,desc])=>'<div style="display:grid;grid-template-columns:180px 1fr;gap:0.5rem;padding:0.4rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem;align-items:center"><code style="font-family:monospace;font-size:0.85rem;color:var(--accent,#6366f1)">'+token+'</code><span>'+desc+'</span></div>').join('');
  }
  document.getElementById('rcs-search').addEventListener('input',function(){render(this.value);});render('');
})();