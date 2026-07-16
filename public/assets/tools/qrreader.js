(function(){
  document.getElementById('qrr-btn').onclick=()=>document.getElementById('qrr-file').click();
  document.getElementById('qrr-file').addEventListener('change',function(){
    const file=this.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=function(e){
      const img=new Image();
      img.onload=function(){
        const canvas=document.getElementById('qrr-canvas');canvas.style.display='block';
        canvas.width=img.width;canvas.height=img.height;
        const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
        const imgData=ctx.getImageData(0,0,img.width,img.height);
        const out=document.getElementById('qrr-out');
        // Use jsQR if available, otherwise show instruction
        if(typeof jsQR!=='undefined'){
          const result=jsQR(imgData.data,img.width,img.height);
          if(result){out.innerHTML='<div style="padding:0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px"><strong>Decoded:</strong><br>'+result.data+'</div>';}
          else{out.innerHTML='<p style="color:var(--red,#ef4444)">No QR code detected. Ensure the code is clear and well-lit.</p>';}
        }else{out.innerHTML='<p style="opacity:0.6">Image loaded. For full QR decoding, this tool needs jsQR library. Use your phone camera for reliable scanning.</p>';}
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
})();