(function(){
  const db={John:'June 24',Mary:'September 8',Peter:'June 29',Paul:'June 29',James:'July 25',Andrew:'November 30',Philip:'May 3',Thomas:'July 3',Matthew:'September 21',Mark:'April 25',Luke:'October 18',Stephen:'December 26',Joseph:'March 19',Michael:'September 29',Gabriel:'September 29',Elizabeth:'November 5',Anna:'July 26',Catherine:'November 25',Barbara:'December 4',Nicholas:'December 6',Anthony:'June 13',Francis:'October 4',George:'April 23',Christopher:'July 25',Sebastian:'January 20',Valentine:'February 14',Patrick:'March 17',David:'March 1',Martin:'November 11',Benedict:'July 11',Gregory:'September 3',Teresa:'October 15',Agnes:'January 21',Rose:'August 23',Monica:'August 27',Helen:'August 18',Lucia:'December 13',Cecilia:'November 22'};
  document.getElementById('nd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const name=document.getElementById('nd-name').value.trim();
    const out=document.getElementById('nd-out');out.hidden=false;
    const match=Object.entries(db).find(function([k]){return k.toLowerCase()===name.toLowerCase();});
    if(match){out.innerHTML='<div style="font-size:1.5rem;font-weight:700">'+match[0]+'</div><div style="font-size:1.1rem;color:var(--accent,#6366f1);margin-top:0.3rem">'+match[1]+'</div>';}
    else{out.innerHTML='<p>Name day not found for "'+name+'". Try common Western/Catholic names.</p>';}
  });
})();