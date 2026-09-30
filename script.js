const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function route(){const h=(location.hash||'#home').slice(1);const id=document.getElementById(h)&&$('#'+h).classList.contains('pg')?h:'home';
$$('.pg').forEach(p=>p.classList.toggle('on',p.id===id));$$('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+id));$('#nv').classList.remove('open');scrollTo(0,0)}
addEventListener('hashchange',route);route();
$('#mb').onclick=()=>$('#nv').classList.toggle('open');
$('#tt').onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=d?'light':'dark'};
const P=[["Ayesha R.","Female",26,"Single","Masters","Rajput","Jhelum, PK","MR-10482","Teacher"],["Hamza M.","Male",29,"Single","Engineer","Arain","Lahore, PK","MR-10391","Software Engineer"],["Sana K.","Female",32,"Divorced","Alima","Sheikh","Manchester, UK","MR-10277","Homemaker"],["Bilal A.","Male",35,"Widow","Graduate","Jutt","Dubai, UAE","MR-10120","Businessman"],["Maryam S.","Female",24,"Single","Doctor","Syed","Karachi, PK","MR-10555","Doctor"]];
function show(){const g=$('#fg').value,m=$('#fm').value,e=$('#fe').value.toLowerCase(),b=$('#fb').value.toLowerCase(),c=$('#fc').value.toLowerCase(),a=+$('#a1').value||0,z=+$('#a2').value||99;
const r=P.filter(p=>(!g||p[1]===g)&&(!m||p[3]===m)&&p[2]>=a&&p[2]<=z&&(!e||p[4].toLowerCase().includes(e.split(' ')[0]))&&(!b||p[5].toLowerCase().includes(b))&&(!c||p[6].toLowerCase().includes(c)));
$('#res').innerHTML=r.length?r.map(p=>`<div class="card prof"><div class="av">${p[0][0]}</div><div style="flex:1"><h3 style="margin:0">${p[0]}, ${p[2]}<span class="vb">✔ Verified</span></h3><span class="tag">${p[3]}</span><span class="tag">${p[4]}</span><span class="tag">${p[5]}</span><span class="tag">${p[6]}</span><div class="lock">${p[7]} · ${p[8]}</div></div><a class="btn sm" href="#plans">Rabta unlock</a></div>`).join(''):'<div class="card">Koi profile nahi mili. Filters kam karke dobara koshish karein.</div>'}
$('#go').onclick=show;show();
let s=0;const fs=$$('.fs'),tb=$$('.tabs span');
function step(){fs.forEach((f,i)=>f.classList.toggle('on',i===s));tb.forEach((t,i)=>t.classList.toggle('on',i<=s));$('#bk').style.visibility=s?'visible':'hidden';$('#nx').textContent=s===3?'Submit karein':'Agla'}
$('#nx').onclick=()=>{if(s<3){s++;step()}else{$('#nx').textContent='Submit ho gaya: Pending Approval';$('#nx').disabled=true}};$('#bk').onclick=()=>{s--;step()};step();
function cur(c){$$('[data-p]').forEach(e=>{const[k,u]=e.dataset.p.split('|');e.textContent=c==='PKR'?'Rs '+(+k).toLocaleString():'$'+u});$$('.tg button').forEach(b=>b.classList.toggle('on',b.dataset.c===c))}
$$('.tg button').forEach(b=>b.onclick=()=>cur(b.dataset.c));cur('PKR');
const Q=[["MR-10611","Zainab F.","Ready","p"],["MR-10612","Usman T.","Baad mein","p"],["MR-10613","Hina B.","Ready","p"]];
function aq(){$('#aq').innerHTML=Q.map((q,i)=>`<tr><td>${q[0]}</td><td>${q[1]}</td><td>${q[2]}</td><td><span class="st ${q[3]}">${{p:'Pending',a:'Approved',r:'Rejected'}[q[3]]}</span></td><td>${q[3]==='p'?`<button class="btn sm" onclick="Q[${i}][3]='a';aq()">Approve</button> <button class="btn sm o d" style="color:var(--tx)" onclick="Q[${i}][3]='r';aq()">Reject</button>`:''}</td></tr>`).join('');$('#pc').textContent=Q.filter(q=>q[3]==='p').length}aq();

/* ===== PREMIUM EFFECTS ===== */
(()=>{const S='http://www.w3.org/2000/svg',m=$('#mand');
if(m){let x='';[[280,8,3,1],[220,8,3,.7],[150,12,5,.5]].forEach(([r,n,k,o],i)=>{let d='';for(let j=0;j<n;j++){const a=(j*k%n)*2*Math.PI/n-Math.PI/2;d+=(j?'L':'M')+(300+r*Math.cos(a)).toFixed(1)+' '+(300+r*Math.sin(a)).toFixed(1)}
x+=`<g><path d="${d}Z" fill="none" stroke="#efd995" stroke-width="1.2" opacity="${o}"/><circle cx="300" cy="300" r="${r}" fill="none" stroke="#c9a24b" stroke-width=".6" opacity=".5"/></g>`});m.innerHTML=x}
const hd=$('header'),pb=$('#pb');addEventListener('scroll',()=>{hd.classList.toggle('sc',scrollY>30);pb.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100||0)+'%'},{passive:true});
const hr=$('.hero');hr.addEventListener('pointermove',e=>{const r=hr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;hr.style.setProperty('--mx',x*100+'%');hr.style.setProperty('--my',y*100+'%');hr.style.setProperty('--px',(x-.5).toFixed(2));hr.style.setProperty('--py',(y-.5).toFixed(2))});
const cnt=el=>{const t=el.textContent,k=t.match(/^([\d,]+)(.*)$/);if(!k)return;const n=+k[1].replace(/,/g,''),t0=performance.now();(function f(now){const p=Math.min((now-t0)/1600,1),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString()+k[2];if(p<1)requestAnimationFrame(f)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.matches('.sts>div'))cnt(e.target.querySelector('b'));io.unobserve(e.target)}}),{threshold:.15});
$$('.grid3>.card,.bento>.bt,.sts>div,.stats>.card,.mq').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%4)*90+'ms';io.observe(e)})})();
