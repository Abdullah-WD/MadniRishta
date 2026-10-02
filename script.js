const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function route(){const h=(location.hash||'#home').slice(1);const id=document.getElementById(h)&&$('#'+h).classList.contains('pg')?h:'home';
$$('.pg').forEach(p=>p.classList.toggle('on',p.id===id));$$('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+id));$('#nv').classList.remove('open');scrollTo(0,0)}
addEventListener('hashchange',route);route();
$('#mb').onclick=()=>$('#nv').classList.toggle('open');
document.addEventListener('click',e=>{const nv=$('#nv');if(nv.classList.contains('open')&&!nv.contains(e.target)&&!$('#mb').contains(e.target))nv.classList.remove('open')});
addEventListener('keydown',e=>{if(e.key==='Escape')$('#nv').classList.remove('open')});
const isDark=()=>{const r=document.documentElement;return r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches};
const paintTheme=()=>$$('#thm button').forEach(b=>{const on=(b.dataset.m==='dark')===isDark();b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
$('#tt').onclick=()=>{document.documentElement.dataset.theme=isDark()?'light':'dark';paintTheme()};
$$('#thm button').forEach(b=>b.onclick=()=>{document.documentElement.dataset.theme=b.dataset.m;paintTheme()});paintTheme();
/* language icon: beside the hamburger on mobile, inside the nav (left of theme) on desktop */
const mqM=matchMedia('(max-width:900px)');
function placeLang(){const w=$('#lgw');if(mqM.matches){if(w.parentNode!==$('.nav'))$('.nav').insertBefore(w,$('#mb'))}else if(w.parentNode!==$('#nv'))$('#nv').insertBefore(w,$('#tt'))}
placeLang();mqM.addEventListener?mqM.addEventListener('change',placeLang):mqM.addListener(placeLang);
const P=[["Ayesha R.","Female",26,"Single","Masters","Rajput","Jhelum","Pakistan","MR-10482","Teacher"],["Hamza M.","Male",29,"Single","Engineer","Arain","Lahore","Pakistan","MR-10391","Software Engineer"],["Sana K.","Female",32,"Divorced","Alima","Sheikh","Manchester","United Kingdom","MR-10277","Homemaker"],["Bilal A.","Male",35,"Widow","Graduate","Jutt","Dubai","United Arab Emirates","MR-10120","Businessman"],["Maryam S.","Female",24,"Single","Doctor","Syed","Karachi","Pakistan","MR-10555","Doctor"],["Usman T.","Male",38,"Second Marriage","Engineer","Chaudhry","Gujrat","Pakistan","MR-10603","Civil Engineer"]];
const nm=en=>LANG==='ur'&&PL[en]?PL[en]:en,lc=x=>x.toLowerCase(),sep=()=>LANG==='ur'?'، ':', ';
const has=(v,en)=>{v=lc(v.trim());return !v||lc(en).includes(v)||(PL[en]||'').includes(v)};
function show(){const g=$('#fg').value,m=$('#fm').value,e=$('#fe').value.toLowerCase(),b=$('#fb').value.toLowerCase(),co=$('#fco').value,ci=$('#fc').value,a=+$('#a1').value||0,z=+$('#a2').value||99;
const r=P.filter(p=>(!g||p[1]===g)&&(!m||p[3]===m)&&p[2]>=a&&p[2]<=z&&(!e||p[4].toLowerCase().includes(e.split(' ')[0]))&&(!b||p[5].toLowerCase().includes(b))&&has(co,p[7])&&has(ci,p[6]));
$('#res').innerHTML=r.length?r.map(p=>`<div class="card prof"><div class="av">${t(p[0])[0]}</div><div style="flex:1"><h3 style="margin:0">${t(p[0])}, ${p[2]}<span class="vb">✔ ${t("Verified")}</span></h3><span class="tag">${t(p[3])}</span><span class="tag">${t(p[4])}</span><span class="tag">${t(p[5])}</span><span class="tag">${nm(p[6])}${sep()}${nm(p[7])}</span><div class="lock">${p[8]} · ${t(p[9])}</div></div><a class="btn sm" href="#plans">${t("Unlock contact")}</a></div>`).join(''):`<div class="card">${t('No profiles found. Try again with fewer filters.')}</div>`}
/* "Second Marriage" is offered in Marital status only when Gender = Male */
const fm=$('#fm');
function maritalOpts(){const male=$('#fg').value==='Male',o=fm.querySelector('[value="Second Marriage"]');
if(male&&!o)fm.add(new Option(t('Second Marriage'),'Second Marriage'));
if(!male&&o){if(fm.value==='Second Marriage')fm.value='';o.remove()}}
$('#fg').onchange=maritalOpts;maritalOpts();
/* country / city suggestions */
const cFind=v=>{v=lc((v||'').trim());return v&&CT.find(([e,u])=>lc(e)===v||u===v)};
const cityList=()=>{const c=cFind($('#fco').value);return c?(CI[c[0]]||[]).map(x=>[x[0],x[1],'']):Object.entries(CI).flatMap(([k,v])=>v.map(x=>[x[0],x[1],k]))};
const esc=x=>x.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const hl=(l,q)=>{q=q.trim();const i=q?lc(l).indexOf(lc(q)):-1;return i<0?esc(l):esc(l.slice(0,i))+'<b>'+esc(l.slice(i,i+q.length))+'</b>'+esc(l.slice(i+q.length))};
function suggest(items,q){q=lc(q.trim());if(!q)return items.slice(0,8);
const sc=([e,u])=>{e=lc(e);return e.startsWith(q)||u.startsWith(q)?0:e.split(/\s+/).some(w=>w.startsWith(q))?1:e.includes(q)||u.includes(q)?2:-1};
return items.map(it=>[it,sc(it)]).filter(x=>x[1]>=0).sort((a,b)=>a[1]-b[1]).slice(0,8).map(x=>x[0])}
function ac(inp,ul,src,pick){let idx=-1,cur=[];
const close=()=>{ul.classList.remove('on');idx=-1},mark=()=>[...ul.children].forEach((li,i)=>li.classList.toggle('act',i===idx));
const render=q=>{cur=suggest(src(),q);idx=-1;ul.innerHTML=cur.map((it,i)=>`<li role="option" data-i="${i}"><span>${hl(nm(it[0]),q)}</span>${it[2]?`<small>${esc(nm(it[2]))}</small>`:''}</li>`).join('');ul.classList.toggle('on',cur.length>0)};
const choose=i=>{pick(cur[i]);close()};
inp.addEventListener('focus',()=>render(''));inp.addEventListener('input',()=>render(inp.value));
inp.addEventListener('keydown',e=>{const open=ul.classList.contains('on');
if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!open)render('');idx=(idx+(e.key==='ArrowDown'?1:-1)+cur.length)%cur.length;mark();ul.children[idx]&&ul.children[idx].scrollIntoView({block:'nearest'})}
else if(e.key==='Enter'){if(open&&idx>=0){e.preventDefault();choose(idx)}else{close();show()}}
else if(e.key==='Escape'||e.key==='Tab')close()});
ul.addEventListener('click',e=>{const li=e.target.closest('li');if(li)choose(+li.dataset.i)});
document.addEventListener('click',e=>{if(!inp.parentNode.contains(e.target))close()});
return{close,refresh:()=>ul.classList.contains('on')&&render(inp.value)}}
const acCo=ac($('#fco'),$('#lco'),()=>CT.map(x=>[x[0],x[1],'']),it=>{const c=$('#fco');c.value=nm(it[0]);const ci=$('#fc'),f=ci.value.trim();if(f&&!(CI[it[0]]||[]).some(x=>lc(x[0])===lc(f)||x[1]===f))ci.value=''});
const acCi=ac($('#fc'),$('#lci'),cityList,it=>{$('#fc').value=nm(it[0]);if(it[2]&&!cFind($('#fco').value))$('#fco').value=nm(it[2])});
function relabel(){[['#fco',()=>CT],['#fc',()=>cityList()]].forEach(([id,L])=>{const i=$(id),v=lc(i.value.trim());if(!v)return;const f=L().find(x=>lc(x[0])===v||x[1]===i.value.trim());if(f)i.value=nm(f[0])});acCo.refresh();acCi.refresh()}
$('#go').onclick=show;show();
let s=0,done=false;const fs=$$('.fs'),tb=$$('.tabs span');
function step(){fs.forEach((f,i)=>f.classList.toggle('on',i===s));tb.forEach((t,i)=>t.classList.toggle('on',i<=s));$('#bk').style.visibility=s?'visible':'hidden';$('#nx').textContent=done?t('Submitted: Pending Approval'):(s===3?t('Submit'):t('Next'))}
$('#nx').onclick=()=>{if(s<3){s++;step()}else{done=true;$('#nx').disabled=true;step()}};$('#bk').onclick=()=>{s--;step()};step();
function cur(c){$$('[data-p]').forEach(e=>{const[k,u]=e.dataset.p.split('|');e.textContent=c==='PKR'?'Rs '+(+k).toLocaleString():'$'+u});$$('.tg button').forEach(b=>b.classList.toggle('on',b.dataset.c===c))}
$$('.tg button').forEach(b=>b.onclick=()=>cur(b.dataset.c));cur('PKR');

/* ===== PREMIUM EFFECTS ===== */
(()=>{const S='http://www.w3.org/2000/svg',m=$('#mand');
if(m){let x='';[[280,8,3,1],[220,8,3,.7],[150,12,5,.5]].forEach(([r,n,k,o],i)=>{let d='';for(let j=0;j<n;j++){const a=(j*k%n)*2*Math.PI/n-Math.PI/2;d+=(j?'L':'M')+(300+r*Math.cos(a)).toFixed(1)+' '+(300+r*Math.sin(a)).toFixed(1)}
x+=`<g><path d="${d}Z" fill="none" stroke="#efd995" stroke-width="1.2" opacity="${o}"/><circle cx="300" cy="300" r="${r}" fill="none" stroke="#c9a24b" stroke-width=".6" opacity=".5"/></g>`});m.innerHTML=x}
const hd=$('header'),pb=$('#pb');addEventListener('scroll',()=>{hd.classList.toggle('sc',scrollY>30);pb.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100||0)+'%'},{passive:true});
const hr=$('.hero');hr.addEventListener('pointermove',e=>{const r=hr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;hr.style.setProperty('--mx',x*100+'%');hr.style.setProperty('--my',y*100+'%');hr.style.setProperty('--px',(x-.5).toFixed(2));hr.style.setProperty('--py',(y-.5).toFixed(2))});
const cnt=el=>{const tx=el.textContent,k=tx.match(/^([\d,]+)(.*)$/);if(!k)return;const n=+k[1].replace(/,/g,''),t0=performance.now();(function f(now){const p=Math.min((now-t0)/1600,1),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString()+k[2].replace(/\S.*$/,m=>t(m));if(p<1)requestAnimationFrame(f)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.matches('.sts>div'))cnt(e.target.querySelector('b'));io.unobserve(e.target)}}),{threshold:.15});
$$('.grid3>.card,.bento>.bt,.sts>div,.mq').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%4)*90+'ms';io.observe(e)})})();

/* ===== LANGUAGE ===== */
window.onLang=()=>{relabel();maritalOpts();show();step()};
const lgw=$('#lgw'),lgb=$('#lgb'),lgOpen=o=>{lgw.classList.toggle('open',o);lgb.setAttribute('aria-expanded',o)};
lgb.onclick=e=>{e.stopPropagation();lgOpen(!lgw.classList.contains('open'))};
$$('#lgm [role=option]').forEach(li=>{const pick=()=>{applyLang(li.dataset.v);lgOpen(false);lgb.focus()};li.onclick=pick;li.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}}});
document.addEventListener('click',e=>{if(!lgw.contains(e.target))lgOpen(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')lgOpen(false)});
applyLang(LANG);
