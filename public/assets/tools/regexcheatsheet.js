(function(){
  const items=[
    ['.','Any character (except newline)'],
    ['\\d','Digit [0-9]'],['\\D','Non-digit'],
    ['\\w','Word character [a-zA-Z0-9_]'],['\\W','Non-word character'],
    ['\\s','Whitespace'],['\\S','Non-whitespace'],
    ['\\b','Word boundary'],
    ['^','Start of string'],['$','End of string'],
    ['*','0 or more (greedy)'],['+','1 or more (greedy)'],
    ['?','0 or 1 (optional)'],['*?','0 or more (lazy)'],['+?','1 or more (lazy)'],
    ['{n}','Exactly n times'],['{n,m}','Between n and m times'],
    ['[abc]','Character class'],['^[abc]','Negated class'],
    ['[a-z]','Range a to z'],
    ['(abc)','Capture group'],['(?:abc)','Non-capture group'],
    ['a|b','Alternation: a or b'],
    ['(?=abc)','Lookahead'],['(?!abc)','Negative lookahead'],
    ['Email','[\\w.-]+@[\\w-]+\\.[a-z]{2,}'],
    ['URL','https?:\/\/[\\w./%-]+'],
    ['IPv4','(\\d{1,3}\\.){3}\\d{1,3}'],
    ['Date YYYY-MM-DD','\\d{4}-\\d{2}-\\d{2}'],
    ['Hex color','#[0-9a-fA-F]{3,6}'],
  ];
  function render(q){
    const f=q?items.filter(([t,d])=>(t+d).toLowerCase().includes(q.toLowerCase())):items;
    document.getElementById('rcs-list').innerHTML=f.map(([token,desc])=>'<div style="display:grid;grid-template-columns:180px 1fr;gap:0.5rem;padding:0.4rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem;align-items:center"><code style="font-family:monospace;font-size:0.85rem;color:var(--accent,#6366f1)">'+token+'</code><span>'+desc+'</span></div>').join('');
  }
  document.getElementById('rcs-search').addEventListener('input',function(){render(this.value);});render('');
})();