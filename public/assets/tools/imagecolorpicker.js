(function(){
  document.getElementById('icp-upload').onclick=function(){document.getElementById('icp-file').click();};
  document.getElementById('icp-file').addEventListener('change',function(){
    const file=this.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=function(e){
      const img=new Image();
      img.onload=function(){
        const wrap=document.getElementById('icp-canvas-wrap');wrap.style.display='';
        const canvas=document.getElementById('icp-canvas');
        const maxW=Math.min(img.width,600);const scale=maxW/img.width;
        canvas.width=maxW;canvas.height=img.height*scale;
        const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);
        canvas.onclick=function(ev){
          const rect=canvas.getBoundingClientRect();
          const sx=(ev.clientX-rect.left)*(canvas.width/rect.width);
          const sy=(ev.clientY-rect.top)*(canvas.height/rect.height);
          const[r,g,b]=ctx.getImageData(Math.floor(sx),Math.floor(sy),1,1).data;
          const hex='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
          const mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255,l=(mx+mn)/2;
          const d=mx-mn;const s=d===0?0:d/(1-Math.abs(2*l-1));
          let h=0;if(d){if(mx===r/255)h=((g-b)/255/d)%6;else if(mx===g/255)h=(b-r)/255/d+2;else h=(r-g)/255/d+4;h=Math.round(h*60+360)%360;}
          const picked=document.getElementById('icp-picked');
          const card=document.createElement('div');card.style.cssText='background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem;cursor:pointer';
          card.innerHTML='<div style="height:48px;background:'+hex+';border-radius:6px;margin-bottom:0.4rem"></div><div style="font-family:monospace;font-size:0.8rem">'+hex+'<br>rgb('+r+','+g+','+b+')<br>hsl('+h+','+Math.round(s*100)+'%,'+Math.round(l*100)+'%)</div>';
          card.onclick=function(){navigator.clipboard.writeText(hex);};
          picked.prepend(card);
        };
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
})();