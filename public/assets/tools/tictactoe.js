(function(){
  let board,current,gameOver;
  const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function checkWin(b,p){return wins.some(([a,c,d])=>b[a]===p&&b[c]===p&&b[d]===p);}
  function minimax(b,isMax){
    if(checkWin(b,'O'))return 10;if(checkWin(b,'X'))return -10;
    if(!b.includes(null))return 0;
    const moves=b.map((v,i)=>v===null?i:-1).filter(i=>i>=0);
    if(isMax){let best=-Infinity;for(const m of moves){b[m]='O';best=Math.max(best,minimax(b,false));b[m]=null;}return best;}
    else{let best=Infinity;for(const m of moves){b[m]='X';best=Math.min(best,minimax(b,true));b[m]=null;}return best;}
  }
  function aiMove(){
    let best=-Infinity,move=0;
    board.forEach((v,i)=>{if(!v){board[i]='O';const s=minimax(board,false);board[i]=null;if(s>best){best=s;move=i;}}});
    makeMove(move,'O');
  }
  function render(){
    document.getElementById('ttt-board').innerHTML=board.map((v,i)=>`<button data-i="${i}" style="height:80px;font-size:2rem;font-weight:800;background:var(--surface);border:2px solid var(--line);border-radius:12px;cursor:pointer;color:${v==='X'?'var(--accent,#6366f1)':'var(--red,#ef4444)'}">${v||''}</button>`).join('');
    document.getElementById('ttt-board').querySelectorAll('button').forEach(btn=>{btn.onclick=function(){if(gameOver||board[this.dataset.i])return;makeMove(parseInt(this.dataset.i),current);if(!gameOver&&document.getElementById('ttt-ai').checked&&current==='O')setTimeout(aiMove,300);};});
  }
  function makeMove(i,p){
    board[i]=p;
    if(checkWin(board,p)){document.getElementById('ttt-status').textContent=p+' wins! 🎉';gameOver=true;}
    else if(!board.includes(null)){document.getElementById('ttt-status').textContent='Draw!';gameOver=true;}
    else{current=current==='X'?'O':'X';document.getElementById('ttt-status').textContent=current+"'s turn";}
    render();
  }
  function newGame(){board=Array(9).fill(null);current='X';gameOver=false;document.getElementById('ttt-status').textContent="X's turn";render();}
  document.getElementById('ttt-reset').onclick=newGame;
  newGame();
})();