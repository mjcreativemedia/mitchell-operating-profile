import * as T from './three.module.js';
const scene=new T.Scene();scene.background=new T.Color('#e9e4d9');scene.fog=new T.Fog('#e9e4d9',25,65);
const renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;document.body.prepend(renderer.domElement);
const camera=new T.PerspectiveCamera(innerWidth<700?56:39,innerWidth/innerHeight,.1,100);const materials={};const mat=(c,rough=.85)=>materials[c]??=new T.MeshStandardMaterial({color:c,roughness:rough});
function box(w,h,d,x,y,z,c,group=scene){let o=new T.Mesh(new T.BoxGeometry(w,h,d),typeof c==='string'?mat(c):c);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;group.add(o);return o}function cyl(r,h,x,y,z,c,r2=r){let o=new T.Mesh(new T.CylinderGeometry(r2,r,h,32),mat(c));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o}
function sphere(r,x,y,z,c,s=[1,1,1]){let o=new T.Mesh(new T.SphereGeometry(r,20,16),mat(c));o.position.set(x,y,z);o.scale.set(...s);o.castShadow=true;scene.add(o);return o}
const oak='#aa7c50',dark='#413a2e',wall='#e9e3d6',cream='#ece5d4',olive='#75775d';
box(12.5,.3,8,1.25,-.2,0,'#b49168');for(let i=0;i<25;i++)box(.014,.005,8,-4.75+i*.5,-.043,0,'#9f805d');for(let i=0;i<10;i++)box(.48,.006,.013,-4.75+i, -.04,(i%3-1)*2,'#9f805d');
box(.18,4.8,8,-5,2.3,0,wall);box(12.5,4.8,.18,1.25,2.3,-4,wall);box(12.5,.12,.09,1.25,.05,-3.86,cream);box(.09,.12,8,-4.86,.05,0,cream);
// A framed city window, set into the rear wall.
box(4.75,2.9,.12,1.75,2.65,-3.86,'#768c91');const sky=new T.MeshBasicMaterial({color:'#b8c1bb'});box(4.5,2.65,.13,1.75,2.65,-3.77,sky);
for(let i=0;i<8;i++){const x=-.4+i*.58,h=.65+(Math.sin(i*9)+1)*.5;box(.48,h,.06,x,1.32+h/2,-3.68,i%2?'#87938e':'#97a19a');for(let j=0;j<3;j++)for(let k=0;k<4;k++)box(.055,.1,.01,x-.14+j*.14,1.5+k*.24,-3.635,'#c5c7ab')}
for(let i=0;i<5;i++){let x=-.3+i*.85;box(.04,1.35,.04,x,1.85,-3.57,'#736b53');sphere(.45,x,2.6+(i%2)*.2,-3.54,['#ab7b42','#bd9351','#a2864e'][i%3],[1,1.1,.09]);sphere(.3,x+.22,2.4,-3.52,'#c29a57',[1,1,.1])}
for(const x of [-.65,1.75,4.15])box(.085,2.85,.15,x,2.65,-3.47,'#e8e0cf');for(const y of [1.2,4.1])box(4.9,.1,.24,1.75,y,-3.46,cream);box(4.95,.12,.5,1.75,1.15,-3.4,cream);box(4.75,.065,.1,1.75,2.25,-3.46,cream);
// Linen curtains.
for(let side of [-.9,4.4])for(let i=0;i<7;i++)cyl(.06,3.5,side+i*.045,2.1,-3.22,'#d7d1be');
// Low bed and layered linen.
box(2.8,.35,3.6,-3.05,.25,-1.25,oak);box(2.65,.35,3.4,-3.05,.58,-1.25,cream);box(2.72,.16,2.5,-3.05,.83,-.85,'#ded5bf');box(2.7,.09,.95,-3.05,.96,.05,olive);box(2.85,1.05,.15,-3.05,.65,-3.15,oak);
for(let x of [-3.68,-2.4]){let p=box(1.05,.19,.67,x,.88,-2.5,'#f5eddb');p.rotation.y=.04;p.rotation.z=.03}for(let i=0;i<14;i++)box(.015,.01,.9,-4.3+i*.19,1.01,.05,'#858770');
box(.8,.65,.8,-1.1,.33,-2.4,oak);box(.75,.025,.72,-1.1,.68,-2.4,'#b58a5d');
// Practical lamp.
cyl(.16,.04,-1.1,.73,-2.4,dark);cyl(.025,.48,-1.1,.98,-2.4,dark);const shade=cyl(.3,.38,-1.1,1.28,-2.4,'#e8c98d',.19);const bulb=new T.PointLight('#ffd298',4,6,2);bulb.position.set(-1.1,1.2,-2.4);scene.add(bulb);
// Desk overlooking the trees.
box(2.55,.13,1.05,2.45,1.3,-2.25,oak);for(let x of [1.35,3.55])for(let z of [-2.65,-1.85])box(.055,1.3,.055,x,.63,z,dark);
box(.83,.045,.58,2.35,1.4,-2.3,'#5e6258');let screen=box(.83,.56,.045,2.35,1.7,-2.56,dark);screen.rotation.x=-.12;const display=new T.MeshBasicMaterial({color:'#b3c0af'});box(.74,.45,.012,2.35,1.7,-2.522,display);for(let i=0;i<5;i++)box(.3-i*.035,.012,.015,2.26,1.84-i*.065,-2.51,'#dee4d4');
box(.43,.045,.54,3.1,1.4,-2.07,'#d9d2b9').rotation.y=.17;cyl(.095,.17,1.65,1.45,-2.02,'#e7ddc7');let handle=new T.Mesh(new T.TorusGeometry(.065,.017,8,16),mat('#e7ddc7'));handle.position.set(1.77,1.46,-2.02);scene.add(handle);
const speaker=box(.23,.34,.23,3.43,1.51,-2.4,dark);let cone=cyl(.075,.02,3.43,1.53,-2.27,'#161e1b');cone.rotation.x=Math.PI/2;
box(.73,.11,.7,2.4,.8,-.85,olive);box(.73,.7,.1,2.4,1.08,-.52,olive);for(let x of [2.1,2.7])for(let z of [-1.1,-.6])box(.04,.75,.04,x,.38,z,dark);
// Small library along the side wall.
box(.65,2.45,1.75,-4.48,1.23,1.75,oak);box(.08,2.35,1.62,-4.1,1.24,1.75,oak);for(let y of [.12,.72,1.32,1.92,2.45])box(.8,.07,1.8,-4.4,y,1.75,oak);
const bookColors=['#738078','#c2ad89','#8c6150','#d4c8aa','#555f58'];for(let j=0;j<3;j++)for(let i=0;i<9;i++){let h=.28+(Math.sin(i*7+j)+1)*.1;box(.42,h,.09,-4.22,.76+j*.6+h/2,1.05+i*.155,bookColors[(i+j)%5])}
function plant(x,y,z,size=1){cyl(.19*size,.35*size,x,y+.17*size,z,'#a97250',.24*size);for(let i=0;i<9;i++){let a=i*2.4;let leaf=sphere(.18*size,x+Math.cos(a)*.18*size,y+(.55+i*.035)*size,z+Math.sin(a)*.18*size,'#576c49',[.55,1.7,.5]);leaf.rotation.z=Math.cos(a)*.5}}
plant(1.65,0,3.25,1.3);plant(-4.36,2.5,1.75,.7);
// Woven rug, quiet art, and a round pouf.
box(4.9,.035,3,0,.015,1.2,'#c5b398');for(let i=0;i<36;i++)box(4.8,.005,.009,0,.036,-.25+i*.081,'#d4c4ac');cyl(.52,.44,.7,.24,2.45,'#a99d7d');
box(.07,1.3,1.02,-4.85,2.85,-1,'#6e5a40');box(.08,1.17,.89,-4.79,2.85,-1,'#eee5cd');sphere(.33,-4.73,2.93,-1,'#b78960',[.03,1,1]);box(.09,.16,.6,-4.72,2.52,-1,'#7d886e');
// Kitchen occupies the new rear-right bay, facing the open room.
let zoneStart=scene.children.length;
const tile='#dedfd3',stone='#eee8da',sage='#7e8971';
box(.88,1.12,2.2,4.43,.56,-.05,sage);
box(.98,.09,2.3,4.4,1.16,-.05,stone);
for(const z of [-.76,-.05,.66]){box(.025,.93,.65,3.975,.59,z,sage);box(.035,.035,.24,3.94,.9,z,dark)}
box(.08,.58,2.3,4.87,1.5,-.05,tile);
for(let z=-1.1;z<1.1;z+=.23)box(.01,.56,.009,4.82,1.5,z,'#c5c9bb');
// Recessed sink, a simple gooseneck faucet, and a two-ring cooktop.
box(.61,.028,.58,4.38,1.219,-.62,'#a9ada5');box(.49,.029,.46,4.38,1.237,-.62,'#717c77');
cyl(.024,.29,4.7,1.36,-.61,dark);box(.23,.045,.045,4.6,1.5,-.61,dark);cyl(.025,.1,4.5,1.46,-.61,dark);
box(.62,.035,.65,4.36,1.235,.4,'#323933');
for(const z of [.24,.57]){const ring=new T.Mesh(new T.TorusGeometry(.105,.009,8,32),mat('#aeb4a6'));ring.rotation.x=Math.PI/2;ring.position.set(4.36,1.259,z);scene.add(ring)}
box(.07,.46,1.2,3.94,.56,.3,dark);box(.024,.33,.95,3.895,.55,.3,'#505b50');box(.04,.035,.72,3.87,.78,.3,'#a6ab9e');
box(.7,.65,1.3,4.48,2.36,-.28,oak);for(let z of [-.61,.05])box(.024,.56,.6,4.1,2.36,z,oak);
box(.55,.055,.65,4.53,1.92,.72,oak);cyl(.085,.16,4.48,2.025,.74,cream);
// Turn the cabinet fronts toward the hero camera and clear the desk.
const kitchen=new T.Group();scene.add(kitchen);
for(const o of scene.children.slice(zoneStart,-1)){scene.remove(o);o.position.x-=4.4;kitchen.add(o)}
kitchen.rotation.y=Math.PI/2;kitchen.position.set(5.85,0,-3.32);
// Bathroom is a separate wing beyond the main floor's right boundary.
zoneStart=scene.children.length;
box(2.5,.3,2.8,3.75,-.2,2.7,'#b49168');
box(2.3,.045,2.55,3.75,.025,2.7,tile);
for(let x=2.65;x<4.9;x+=.3)box(.008,.006,2.5,x,.053,2.7,'#bec5b8');
for(let z=1.45;z<4;z+=.3)box(2.25,.006,.008,3.75,.053,z,'#bec5b8');
box(2.4,2.9,.12,3.75,1.45,1.39,wall);// Shared wall has a real doorway and an open oak door.
box(.12,2.9,1.2,2.55,1.45,2.02,wall);
box(.12,.4,1.3,2.55,2.7,3.27,wall);
box(.12,2.9,.15,2.55,1.45,3.98,wall);
for(const z of [2.65,3.89])box(.17,2.5,.065,2.55,1.25,z,oak);
box(.17,.065,1.3,2.55,2.49,3.27,oak);
box(1.16,2.36,.065,3.15,1.18,3.87,oak);
box(.11,.045,.1,3.64,1.12,3.8,dark);
box(2.25,1.35,.035,3.75,.75,1.48,tile);
// Walk-in shower: low tray, clear panel, rain head.
box(.95,.11,1.05,3.15,.1,2.02,stone);
const glass=new T.MeshPhysicalMaterial({color:'#ccddd6',transparent:true,opacity:.17,roughness:.08,side:T.DoubleSide,depthWrite:false});
box(.018,2.1,1,3.68,1.13,2.02,glass);box(.024,2.1,.024,3.68,1.13,2.5,dark);
cyl(.018,1.65,3.08,1.48,1.54,dark);box(.31,.035,.04,3.23,2.29,1.54,dark);cyl(.12,.03,3.37,2.26,1.54,dark);
box(.1,.16,.065,3.08,1.13,1.55,dark);
// Floating vanity, ceramic basin, and warm round mirror.
box(.8,.48,.52,4.34,.82,1.8,oak);box(.88,.075,.58,4.34,1.09,1.8,stone);
sphere(.25,4.34,1.16,1.79,'#f1eee3',[1.25,.3,.85]);cyl(.018,.2,4.34,1.25,1.57,dark);
const mirror=new T.Mesh(new T.CircleGeometry(.36,48),new T.MeshStandardMaterial({color:'#abc0b9',metalness:.8,roughness:.15}));mirror.position.set(4.34,1.96,1.49);scene.add(mirror);
const frame=new T.Mesh(new T.TorusGeometry(.38,.018,8,48),mat(oak));frame.position.copy(mirror.position);scene.add(frame);
box(.52,.04,.055,4.34,2.47,1.58,new T.MeshBasicMaterial({color:'#ffe4b2'}));
const bathLight=new T.PointLight('#ffe3b3',1.2,3);bathLight.position.set(4.3,2.35,1.85);scene.add(bathLight);
// Toilet and a neatly folded towel.
box(.52,.65,.22,4.32,.48,3.02,'#eceee6');sphere(.29,4.32,.43,3.37,'#eceee6',[.85,.65,1.2]);sphere(.27,4.32,.57,3.37,cream,[.85,.16,1.22]);cyl(.15,.36,4.32,.22,3.29,'#eceee6');
box(.05,.045,.57,2.65,1.3,3.15,dark);box(.075,.55,.41,2.68,1.02,3.15,'#b6bba4');
box(.76,.025,.48,3.53,.066,3.35,'#ccc1a8');
const bathroom=new T.Group();scene.add(bathroom);
for(const o of scene.children.slice(zoneStart,-1)){scene.remove(o);bathroom.add(o)}
bathroom.position.set(5,0,-5.3);
scene.add(new T.HemisphereLight('#f1e8d8','#8d8270',2.5));const sun=new T.DirectionalLight('#ffe2ad',4);sun.position.set(5,8,-2);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-14,right:14,top:12,bottom:-12});sun.shadow.bias=-.0005;sun.shadow.normalBias=.025;scene.add(sun);
// Late-afternoon shafts across the floor.
const lightMat=new T.MeshBasicMaterial({color:'#f7dfa6',transparent:true,opacity:.16,depthWrite:false});for(let i=0;i<3;i++){let beam=box(1.05,.009,4.7,.5+i*1.25,.045,-.5,lightMat);beam.rotation.y=-.48}
const presets=[[[16,12,19],[2,1,-.2]],[[7,4,5],[2.25,1.3,-2]],[[3,4,7],[-4,1.35,1.7]],[[3,5,8],[-2.9,.8,-1]],[[3.3,3.2,3.8],[1.8,2.5,-3.5]],[[8,5,3],[5.85,1.35,-3.25]],[[14,6,4],[8.75,1.15,-2.6]]];const target=new T.Vector3(),desired=new T.Vector3(),look=new T.Vector3();let view=0,pointer=new T.Vector2(),audio=null,musicOn=false,lampOn=true;
const titles=['Make yourself at home.','A little space for big ideas.','Good company, on every shelf.','Let the day soften.','The city can wait.','Small kitchen. Daily rituals.','A quiet place to refresh.'];const copies=['Explore the room. Find your favorite corner.<br>Click the lamp, speaker, or window to settle in.','A notebook, a warm cup, and nowhere else to be.','A few favorites. Always within reach.','Neutral linen. Warm light. Nothing more needed.','Golden leaves, distant traffic, a slower afternoon.','A warm countertop, a simple cooktop, and space for your morning cup.','A walk-in shower, floating vanity, and soft warm light.'];
function setView(i){view=i;desired.fromArray(presets[i][0]);target.fromArray(presets[i][1]);document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',+b.dataset.view===i));document.querySelector('#viewTitle').textContent=titles[i];document.querySelector('#viewCopy').innerHTML=copies[i];if(audio)audio.mix()}
setView(0);camera.position.copy(desired);look.copy(target);document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(+b.dataset.view));
function toggleLamp(){lampOn=!lampOn;bulb.intensity=lampOn?4:0;shade.material=mat(lampOn?'#e8c98d':'#c2bba8');let b=document.querySelector('#lamp');b.textContent=lampOn?'Lamp on':'Lamp off';b.setAttribute('aria-pressed',lampOn)}document.querySelector('#lamp').onclick=toggleLamp;
// Original procedural audio: a looping warm chord progression and filtered street texture.
function createAudio(){const ctx=new AudioContext(),master=ctx.createGain(),music=ctx.createGain(),city=ctx.createGain();master.gain.value=.5;master.connect(ctx.destination);music.connect(master);city.connect(master);let buffer=ctx.createBuffer(1,ctx.sampleRate*8,ctx.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(.65+.35*Math.sin(i/ctx.sampleRate*.8));let noise=ctx.createBufferSource();noise.buffer=buffer;noise.loop=true;let filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=450;noise.connect(filter);filter.connect(city);noise.start();let next=ctx.currentTime;const chords=[[130.81,164.81,196,246.94],[110,130.81,164.81,196],[87.31,110,130.81,164.81],[98,123.47,146.83,196]];let step=0;function schedule(){while(next<ctx.currentTime+.4){let chord=chords[Math.floor(step/16)%4];if(step%4===0)chord.forEach((f,i)=>{let o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.frequency.value=900;g.gain.setValueAtTime(0,next);g.gain.linearRampToValueAtTime(.035,next+.08);g.gain.exponentialRampToValueAtTime(.0001,next+1.7);o.connect(lp);lp.connect(g);g.connect(music);o.start(next);o.stop(next+1.8)});if(step%4===0){let o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(100,next);o.frequency.exponentialRampToValueAtTime(42,next+.15);g.gain.setValueAtTime(.08,next);g.gain.exponentialRampToValueAtTime(.001,next+.2);o.connect(g);g.connect(music);o.start(next);o.stop(next+.22)}next+=.22;step++}}const timer=setInterval(schedule,100);schedule();return{ctx,timer,mix(){music.gain.setTargetAtTime(musicOn?(view===1?.8:view===3?.3:.5):0,ctx.currentTime,.4);city.gain.setTargetAtTime(musicOn?(view===4?.12:.035):0,ctx.currentTime,.4)}}}
async function toggleSound(){try{if(!audio)audio=createAudio();await audio.ctx.resume();musicOn=!musicOn;audio.mix();document.querySelector('#sound').innerHTML=musicOn?'♫ &nbsp; Sound on':'♫ &nbsp; Sound off';document.querySelector('#sound').setAttribute('aria-pressed',musicOn)}catch{document.querySelector('#status').textContent='Audio unavailable'}}document.querySelector('#sound').onclick=toggleSound;
const windowHit=box(4.7,2.8,.2,1.75,2.65,-3.3,new T.MeshBasicMaterial({visible:false}));const hitObjects=[shade,speaker,windowHit];const ray=new T.Raycaster();let hover=null;const hint=document.querySelector('#hint');renderer.domElement.addEventListener('pointermove',e=>{pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(pointer,camera);hover=ray.intersectObjects(hitObjects)[0]?.object;renderer.domElement.style.cursor=hover?'pointer':'default';hint.style.display=hover?'block':'none';hint.style.left=e.clientX+14+'px';hint.style.top=e.clientY-35+'px';hint.textContent=hover===shade?'Toggle warm lamp':hover===speaker?'Play / pause lo-fi':'Watch the city'});renderer.domElement.addEventListener('pointerleave',()=>{pointer.set(0,0);hint.style.display='none';hover=null});renderer.domElement.addEventListener('click',()=>{if(hover===shade)toggleLamp();if(hover===speaker)toggleSound();if(hover===windowHit)setView(4)});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let last=performance.now();function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;const ease=reduced?1:1-Math.exp(-dt*3);const pos=desired.clone();if(!reduced){pos.x+=pointer.x*.13;pos.y+=pointer.y*.07}camera.position.lerp(pos,ease);look.lerp(target,ease);camera.lookAt(look);renderer.render(scene,camera)}requestAnimationFrame(animate);addEventListener('resize',()=>{camera.fov=innerWidth<700?56:39;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});document.querySelector('#loading').remove();
