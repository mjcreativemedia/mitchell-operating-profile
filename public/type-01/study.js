const canvas=document.querySelector('#stage'),ctx=canvas.getContext('2d'),play=document.querySelector('#play'),progress=document.querySelector('#progress'),clock=document.querySelector('#time');
const duration=7000,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let running=!reduced,elapsed=reduced?4500:0,last=performance.now(),recording=false;
const clamp=x=>Math.max(0,Math.min(1,x));const ease=x=>1-Math.pow(1-clamp(x),4);const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
function tracked(text,x,y,size,spacing,weight=600){ctx.font=`${weight} ${size}px Syne`;let total=[...text].reduce((n,c)=>n+ctx.measureText(c).width,0)+(text.length-1)*spacing;for(const c of text){ctx.fillText(c,x,y);x+=ctx.measureText(c).width+spacing}return total}
function draw(ms){const t=ms/1000,W=canvas.width,H=canvas.height;ctx.setTransform(W/1920,0,0,H/1080,0,0);ctx.fillStyle='#20231e';ctx.fillRect(0,0,1920,1080);
ctx.fillStyle='#8d9481';tracked('INDEPENDENT MOTION STUDY',108,83,18,3,400);tracked('001 / TYPE',1585,83,18,2,400);
const exit=smooth((t-5.95)/.65),alpha=1-exit;ctx.globalAlpha=alpha;
const words=[['LESS,',.25,385],['BUT',.85,635],['BETTER.',1.45,885]];
for(const [word,start,baseline] of words){const p=ease((t-start)/1.35),settle=ease((t-2.4)/1.3);ctx.save();ctx.beginPath();ctx.rect(100,baseline-235,1730,248);ctx.clip();ctx.fillStyle='#eeece5';const tracking=10*(1-settle)-5*settle;tracked(word,108+(1-p)*28,baseline+(1-p)*270-exit*70,245,tracking);ctx.restore()}
const resolve=ease((t-2.9)/1.2);ctx.fillStyle='#b7c694';ctx.beginPath();ctx.arc(1720,388,17*resolve,0,Math.PI*2);ctx.fill();ctx.globalAlpha=alpha*resolve;ctx.fillStyle='#a3ac95';tracked('LESS, BUT BETTER.',1310,668,20,2.5,400);tracked('NOTHING TO ADD.',1310,705,20,2.5,400);ctx.fillStyle='#b7c694';ctx.fillRect(1310,750,370*resolve,2);ctx.globalAlpha=1;
ctx.fillStyle='#8d9481';tracked('TYPOGRAPHY / TIMING / RESTRAINT',108,1006,16,2,400);tracked('MITCHELLARGAMASILLA.COM',1440,1006,14,1.2,400);
progress.style.width=(ms/duration*100)+'%';clock.textContent=`0${(ms/1000).toFixed(1)} / 07`;
}
function sync(){play.textContent=running?'Pause':'Play';play.setAttribute('aria-pressed',String(running))}
play.onclick=()=>{running=!running;last=performance.now();sync()};document.querySelector('#replay').onclick=()=>{elapsed=0;running=true;last=performance.now();sync()};
await Promise.all([document.fonts.load('600 245px Syne'),document.fonts.load('400 20px Syne')]);document.querySelector('#loading').remove();sync();
function frame(now){const dt=Math.min(now-last,100);last=now;if(running)elapsed=(elapsed+dt)%duration;draw(elapsed);requestAnimationFrame(frame)}requestAnimationFrame(frame);
// Capture uses the same canvas and timeline as the live study, keeping exports consistent.
if(new URLSearchParams(location.search).has('capture')){const button=document.querySelector('#record');button.style.display='block';button.onclick=()=>{if(recording)return;recording=true;button.disabled=true;button.textContent='Recording…';elapsed=0;running=true;last=performance.now();sync();const stream=canvas.captureStream(30);const rec=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:8000000});const chunks=[];rec.ondataavailable=e=>chunks.push(e.data);rec.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(chunks,{type:'video/webm'}));a.download='type-01-motion-study.webm';a.textContent='Download recording';document.querySelector('.controls').append(a);a.click();button.textContent='Recorded';running=false;elapsed=4500;sync()};rec.start();setTimeout(()=>rec.stop(),duration*2)}}
