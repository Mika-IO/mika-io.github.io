(function(){
  const passage="The ability to read quickly and comprehend information is an invaluable skill in today's information-rich world. Many people go through life reading at the same speed they learned as children, never realizing that reading speed and comprehension can both be dramatically improved with practice and the right techniques. Speed reading is not just about moving your eyes faster across the page — it involves training your brain to process groups of words rather than individual ones, eliminating the habit of silently pronouncing words as you read, and reducing the tendency to re-read sentences you have already covered. Research suggests that the average adult reads about 250 words per minute, while a college graduate typically reads between 300 and 350 words per minute. Elite readers, using trained techniques, can reach 700 words per minute while still maintaining adequate comprehension. However, extreme speed reading claims of 1,000 or more words per minute come with significant trade-offs in understanding and retention. The most effective approach is to gradually increase your reading speed through consistent practice, starting with easier material and working up to more complex texts. Just 15 minutes of deliberate practice each day can lead to significant improvements within a few weeks.";
  const wordCount=passage.split(/\s+/).length;
  let startTime;
  document.getElementById('rs-begin').onclick=function(){
    startTime=Date.now();
    document.getElementById('rs-start').style.display='none';
    document.getElementById('rs-reading').style.display='';
    document.getElementById('rs-text').textContent=passage;
  };
  document.getElementById('rs-done').onclick=function(){
    const elapsed=(Date.now()-startTime)/60000;
    const wpm=Math.round(wordCount/elapsed);
    const level=wpm<150?'Slow':wpm<250?'Average':wpm<350?'Good':wpm<500?'Fast':'Very fast';
    document.getElementById('rs-reading').style.display='none';
    document.getElementById('rs-result').style.display='';
    document.getElementById('rs-result').innerHTML=`<div style="font-size:3rem;font-weight:800;color:var(--accent,#6366f1)">${wpm}</div><p style="font-size:1rem;opacity:0.7">words per minute</p><p style="font-size:1.1rem;font-weight:600;margin-top:0.5rem">${level} reader</p><p style="opacity:0.5;font-size:0.85rem;margin-top:0.4rem">${wordCount} words in ${(elapsed*60).toFixed(0)} seconds</p><button class="btn" style="margin-top:0.75rem" onclick="location.reload()">Try again</button>`;
  };
})();