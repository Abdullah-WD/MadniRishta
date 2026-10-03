/* ===== ACCOUNT LAYER – login, dashboard, profile detail, checkout =====
   Front-end demo: everything is stored in this browser (localStorage) and payments are simulated.
   When the backend is ready, replace the functions marked  // BACKEND  with real API calls. */
const KEY='mr-demo-v1';
const PLAN={basic:{n:'Basic',pk:1500,us:6,c:5,mo:1,cl:'5 contacts',dl:'1 month'},standard:{n:'Standard',pk:4000,us:15,c:20,mo:3,cl:'20 contacts',dl:'3 months'},premium:{n:'Premium',pk:7500,us:28,c:-1,mo:6,cl:'Unlimited contacts',dl:'6 months'}};
const A1='Practising and family-oriented. Looking for a pious, understanding life partner from a Sunni Hanfi Barelvi family.',A2='Simple nikah according to the Sunnah, with no unnecessary demands.',A3='Settled in a good job. Wants a caring partner who values family and deen.',A4='Prefers a partner who is educated, religious and respectful of family traditions.';
const PX={ /* sample profile details – BACKEND: load from the profiles table */
'MR-10482':{h:[5,3],cx:'Fair',lg:'Urdu',fo:'Retired teacher',br:1,si:2,rs:'Own',fn:'Good',ab:A1,ph:'0300-1000482',pa:1},
'MR-10391':{h:[5,9],cx:'Wheatish',lg:'Punjabi',fo:'Businessman',br:2,si:1,rs:'Own',fn:'Very good',ab:A3,ph:'0301-1000391',pa:1},
'MR-10277':{h:[5,4],cx:'Fair',lg:'Urdu',fo:'Doctor',br:1,si:3,rs:'Rented',fn:'Good',ab:A2,ph:'0302-1000277',pa:0},
'MR-10120':{h:[5,10],cx:'Wheatish',lg:'Urdu',fo:'Govt Employee',br:3,si:2,rs:'Own',fn:'Very good',ab:A4,ph:'0303-1000120',pa:1},
'MR-10555':{h:[5,5],cx:'Fair',lg:'Urdu',fo:'Businessman',br:2,si:2,rs:'Own',fn:'Very good',ab:A4,ph:'0304-1000555',pa:0},
'MR-10603':{h:[5,8],cx:'Wheatish',lg:'Punjabi',fo:'Farmer',br:2,si:4,rs:'Own',fn:'Average',ab:A2,ph:'0305-1000603',pa:1}};
const METHODS={jazzcash:'JazzCash',easypaisa:'EasyPaisa',card:'Card (Visa / Mastercard)'};
let ST={user:null,on:false,pkg:null,unlocked:[],notes:[],orders:[],next:null},photoURL=null,flash='';
let CK={state:'form',m:null,v:{},err:'',order:null};
try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r&&typeof r==='object')ST=Object.assign(ST,r)}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}};
const logged=()=>!!(ST.user&&ST.on);
const paidMember=()=>!!(logged()&&ST.pkg&&ST.pkg.exp>Date.now());
const canUnlock=()=>paidMember()&&ST.pkg.left!==0;
const price=(p,c)=>c==='PKR'?'Rs '+p.pk.toLocaleString('en'):'$'+p.us;
const dfmt=ms=>new Date(ms).toLocaleDateString(LANG==='ur'?'ur-PK':'en-GB',{day:'numeric',month:'short',year:'numeric'});
const ht=h=>LANG==='ur'?`${h[0]} فٹ ${h[1]} انچ`:`${h[0]} ft ${h[1]} in`;
const setErr=(el,k)=>{if(typeof el==='string')el=$(el);if(!el)return;el.dataset.k=k||'';el.textContent=k?t(k):''};
const note=(k,v)=>{ST.notes.unshift({k,v,d:Date.now()});ST.notes=ST.notes.slice(0,20);save()};
const goNext=()=>{const n=ST.next||'dashboard';ST.next=null;save();location.hash='#'+n};

/* ---------- navigation state ---------- */
function updateNav(){const a=$('#nl'),r=$('nav .btn.sm[href="#signup"]');
a.textContent=logged()?t('Dashboard'):t('Login');a.setAttribute('href',logged()?'#dashboard':'#login');if(r)r.style.display=logged()?'none':''}
window.routeGuard=(id,arg)=>{
if(id==='dashboard'&&!logged()){ST.next='dashboard';save();return'#login'}
if(id==='login'&&logged())return'#dashboard';
if(id==='checkout'){if(!PLAN[arg])return'#plans';if(!logged()){ST.next='checkout/'+arg;save();return'#login'}}
return null};
window.onRoute=(id,arg)=>{updateNav();
if(id==='dashboard')renderDash();else if(id==='profile')renderProfile(arg);
else if(id==='checkout'){CK={state:'form',m:null,v:{},err:'',order:null};renderCheckout()}};

/* ---------- login ---------- */
$('#lgo').onclick=()=>{const e=$('#lie').value.trim().toLowerCase(),p=$('#lip').value;
if(!/^\S+@\S+\.\S+$/.test(e))return setErr('#lie-err','Please enter a valid email address.');
if(!p)return setErr('#lie-err','Please enter your password.');
if(!ST.user||ST.user.email!==e)return setErr('#lie-err','No account found with this email. Please register first.'); // BACKEND: POST /login
setErr('#lie-err','');ST.on=true;save();$('#lip').value='';updateNav();goNext()};
['#lie','#lip'].forEach(s=>$(s).addEventListener('keydown',e=>{if(e.key==='Enter')$('#lgo').click()}));

/* ---------- registration (called by the last step of the form) ---------- */
const okImg=f=>f&&/^image\/(png|jpeg)$/.test(f.type)&&f.size<3*1024*1024;
window.submitReg=()=>{const n=$('#sn').value.trim(),e=$('#se').value.trim().toLowerCase(),p=$('#sp').value,f=$('#sph').files[0],later=$('#spl').checked;
const fail=(k,st)=>{setErr('#serr',k);s=st;step();return false};
if(n.length<2)return fail('Please enter your full name.',0);
if(f&&!later&&!okImg(f))return fail(f.size>=3*1024*1024&&/^image\//.test(f.type)?'Photo must be smaller than 3 MB.':'Please choose an image file (JPG or PNG).',2);
if(!/^\S+@\S+\.\S+$/.test(e))return fail('Please enter a valid email address.',3);
if(p.length<6)return fail('Password must be at least 6 characters.',3);
if(!$('#sd').checked)return fail('Please confirm the Sunni Hanfi Barelvi declaration.',3);
if(!$('#sr').checked)return fail('Please tick \u201cI\'m not a robot\u201d.',3);
const hasPh=f&&!later;if(photoURL)URL.revokeObjectURL(photoURL);photoURL=hasPh?URL.createObjectURL(f):null;
ST={user:{name:n,email:e,reg:'MR-'+(10700+Math.floor(Math.random()*300)),status:'pending',photo:hasPh?'pending':'none'},on:true,pkg:null,unlocked:[],notes:[],orders:[],next:null}; // BACKEND: POST /register (never store the password in the browser)
note('sub');if(hasPh)note('photo');setErr('#serr','');updateNav();location.hash='#dashboard';return true};
window.resetSignup=()=>{$$('#signup input,#signup textarea').forEach(i=>{if(i.readOnly||i.id==='sco')return;if(i.type==='checkbox')i.checked=false;else i.value=''});
$$('#signup select').forEach(x=>x.selectedIndex=0);$('#sco').value=nm('Pakistan')};

/* ---------- dashboard ---------- */
function noteText(n){const m={sub:'Profile submitted – pending admin approval.',appr:'Your profile was approved by the admin.',photo:'Photo submitted for approval.',photoOk:'Your photo was approved by the admin.'};
if(m[n.k])return t(m[n.k]);if(n.k==='pay')return t('Package activated:')+' '+t(n.v);return t('Contact unlocked:')+' '+t(n.v)}
function renderDash(){const u=ST.user,box=$('#dbx');if(!u){box.innerHTML='';return}
const ap=u.status==='approved',steps=[['Submitted',0],['Pending',1],['Approved',2],['Live',3]],cur=ap?3:1;
const flow=steps.map(([k,i])=>`<span class="${i<cur||(ap&&i===3)?'done':''} ${i===cur&&!ap?'now':''}">${t(k)}</span>`).join('<i>›</i>');
const photo=u.photo==='none'?`<p class="mu">${t('No photo uploaded yet.')}</p>`:
`<div class="phb">${photoURL?`<img src="${photoURL}" alt="">`:''}<p class="mu" style="margin:0;flex:1">${t(u.photo==='approved'?'Photo approved and visible to paid members.':'Photo submitted – pending admin approval. Others cannot see it yet.')}</p></div>`;
const pk=ST.pkg&&ST.pkg.exp>Date.now()?`<div class="kv" style="grid-template-columns:auto 1fr"><dt>${t('Package')}</dt><dd>${t(ST.pkg.n)}</dd><dt>${t('Contacts left')}</dt><dd>${ST.pkg.left<0?t('Unlimited'):ST.pkg.left}</dd><dt>${t('Expires')}</dt><dd>${dfmt(ST.pkg.exp)}</dd></div><p style="margin:16px 0 0"><a class="btn ghost sm" href="#plans">${t('Upgrade package')}</a></p>`:
`<p class="mu">${t('No active package.')}</p><p style="margin:12px 0 0"><a class="btn sm" href="#plans">${t('Choose a package')}</a></p>`;
const unl=ST.unlocked.length?`<ul class="ntl">${ST.unlocked.map(r=>{const p=P.find(x=>x[8]===r);return p?`<li><a href="#profile/${r}" style="text-decoration:underline">${esc(t(p[0]))}, ${p[2]}</a><small>${r}</small></li>`:''}).join('')}</ul>`:`<p class="mu">${t("You haven't unlocked any contacts yet.")}</p>`;
const nts=ST.notes.length?`<ul class="ntl">${ST.notes.slice(0,6).map(n=>`<li><span>${esc(noteText(n))}</span><small>${dfmt(n.d)}</small></li>`).join('')}</ul>`:'';
box.innerHTML=`<div class="card dh"><div class="av big">${esc(u.name[0].toUpperCase())}</div><div class="dhi"><h2>${t('Welcome,')} ${esc(u.name)}</h2><div class="mu">${t('Reg. no.')}: <b>${u.reg}</b> · <span class="ltr" style="display:inline-block">${esc(u.email)}</span></div><span class="sb ${ap?'approved':'pending'}">${t(ap?'Approved':'Pending approval')}</span></div><button class="btn ghost sm" data-a="logout">${t('Logout')}</button></div>
<div class="pflow">${flow}</div>
<div class="dgrid">
<div class="card"><h3>${t('Profile status')}</h3><p class="mu">${t(ap?'Your profile is approved and visible to registered members.':'Your profile is waiting for admin approval. This usually takes up to 48 hours.')}</p></div>
<div class="card"><h3>${t('Profile photo')}</h3>${photo}<p style="margin:12px 0 0"><label class="btn ghost sm" for="dph">${t(u.photo==='none'?'Upload photo':'Change photo')}</label><input id="dph" type="file" accept="image/png,image/jpeg" hidden></p><p class="err" id="dph-err" data-k=""></p></div>
<div class="card"><h3>${t('My package')}</h3>${pk}</div>
<div class="card"><h3>${t('Unlocked contacts')}</h3>${unl}</div>
${nts?`<div class="card wide"><h3>${t('Notifications')}</h3>${nts}</div>`:''}
</div>
<div class="demo"><h4>${t('Demo controls')}</h4><p class="mu">${t('These simulate the Admin Panel and will be removed once the backend is connected.')}</p><div class="btns"><button class="btn d sm" data-a="appr" ${ap?'disabled':''}>${t('Approve my profile')}</button><button class="btn d sm" data-a="apprph" ${u.photo==='pending'?'':'disabled'}>${t('Approve my photo')}</button></div></div>`}
document.addEventListener('change',e=>{if(e.target.id!=='dph')return;const f=e.target.files[0];if(!f)return;
if(!okImg(f)){setErr('#dph-err',f.size>=3*1024*1024&&/^image\//.test(f.type)?'Photo must be smaller than 3 MB.':'Please choose an image file (JPG or PNG).');return}
if(photoURL)URL.revokeObjectURL(photoURL);photoURL=URL.createObjectURL(f);ST.user.photo='pending';note('photo');renderDash()}); // BACKEND: upload, then admin approves

/* ---------- profile detail ---------- */
function renderProfile(reg){const box=$('#pfx'),p=P.find(q=>q[8]===reg),x=PX[reg];
if(!p||!x){box.innerHTML=`<div class="card">${t('Profile not found.')}</div><p><a class="btn d" href="#search">${t('Back to search')}</a></p>`;return}
const ini=esc(t(p[0])[0]),un=logged()&&ST.unlocked.includes(reg);let av,cap;
if(!x.pa){av='<div class="bigav nop">👤</div>';cap='Photo not shared yet'}
else if(paidMember()){av=`<div class="bigav">${ini}</div>`;cap='Approved photo'}
else{av=`<div class="bigav lk"><span>${ini}</span></div>`;cap='Photo visible to paid members only'}
const dg=p[8].replace(/\D/g,''),ph=x.ph.replace(/\D/g,'');let cb;
if(un)cb=`<div class="cbx"><p class="mu" style="margin:0 0 6px">${t('Mobile / WhatsApp:')}</p><div class="cnum">${x.ph}</div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><a class="btn wa sm" target="_blank" rel="noopener" href="https://wa.me/92${ph.slice(1)}">${t('WhatsApp')}</a><a class="btn d sm" href="tel:+92${ph.slice(1)}">${t('Call')}</a></div><p class="lock">${t('Sample data – contact numbers are placeholders.')}</p></div>`;
else if(!logged())cb=`<div class="cbx"><p class="mu" style="margin:0 0 14px">${t('Contact details are hidden. Registered, paid members can unlock them.')}</p><button class="btn" data-a="needlogin" data-r="${reg}">${t('Login to unlock')}</button></div>`;
else if(!canUnlock())cb=`<div class="cbx"><p class="mu" style="margin:0 0 14px">${t(ST.pkg?'Your package has expired or has no contacts left.':'Contact details are hidden. Registered, paid members can unlock them.')}</p><a class="btn" href="#plans">${t('Choose a package')}</a></div>`;
else cb=`<div class="cbx"><p class="mu" style="margin:0 0 6px">${t('This uses 1 contact from your package.')} ${t('Contacts left')}: <b>${ST.pkg.left<0?t('Unlimited'):ST.pkg.left}</b></p><button class="btn" data-a="unlock" data-r="${reg}" style="margin-top:8px">${t('Unlock contact')}</button></div>`;
const kv=r=>`<dl class="kv">${r.map(([k,v])=>`<dt>${t(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;
const place=nm(p[6])+sep()+nm(p[7]);
box.innerHTML=`<p><a class="btn ghost sm" href="#search">${t('Back to search')}</a></p>${flash?`<div class="okmsg">✔ ${t(flash)}</div>`:''}
<div class="pl"><div><div class="card pside">${av}<div class="pcap">${t(cap)}</div><h2 style="margin:0 0 6px">${esc(t(p[0]))}, ${p[2]}</h2><span class="vb">✔ ${t('Verified')}</span><div style="margin:14px 0 8px"><span class="tag">${t(p[3])}</span><span class="tag">${t(p[4])}</span><span class="tag">${t(p[5])}</span></div><div class="lock">${p[8]}</div></div></div>
<div><div class="card sec"><h3>${t('Personal details')}</h3>${kv([['Age',p[2]],['Marital status',t(p[3])],['Height',ht(x.h)],['Complexion',t(x.cx)],['Language',t(x.lg)],['Sect (Maslak)',t('Sunni Hanfi Barelvi')],['Community (Biradari)',t(p[5])],['Country',nm(p[7])],['City',nm(p[6])]])}</div>
<div class="card sec"><h3>${t('Family details')}</h3>${kv([["Father's occupation",t(x.fo)],['Brothers',x.br],['Sisters',x.si],['Residence',t(x.rs)],['Financial status',t(x.fn)]])}</div>
<div class="card sec"><h3>${t('Education & profession')}</h3>${kv([['Education',t(p[4])],['Occupation',t(p[9])]])}</div>
<div class="card sec"><h3>${t('About & expectations')}</h3><p style="margin:0">${t(x.ab)}</p></div>
<div class="card sec"><h3>${t('Contact details')}</h3>${cb}</div></div></div>`;flash=''}
function unlock(reg){if(!canUnlock()||ST.unlocked.includes(reg))return;const p=P.find(q=>q[8]===reg);if(!p)return;
if(ST.pkg.left>0)ST.pkg.left--;ST.unlocked.push(reg);note('unl',p[0]);flash='Contact unlocked';save();renderProfile(reg)} // BACKEND: POST /contacts/unlock

/* ---------- checkout (simulated payment) ---------- */
const FIELDS=['ckname','cknum','ckexp','ckcvc','ckmob'];
const snapCK=()=>FIELDS.forEach(f=>{const e=document.getElementById(f);if(e)CK.v[f]=e.value});
const luhn=n=>{let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return s%10===0};
function validPay(){const v=CK.v;
if(CK.m==='card'){if((v.ckname||'').trim().length<2)return'Enter the name on the card.';const n=(v.cknum||'').replace(/\D/g,'');if(n.length<13||!luhn(n))return'Enter a valid card number.';
const m=(v.ckexp||'').match(/^(\d\d)\/(\d\d)$/),now=new Date();if(!m||+m[1]<1||+m[1]>12||(2000+ +m[2])*12+ +m[1]<now.getFullYear()*12+now.getMonth()+1)return'Enter a valid expiry date (MM/YY).';
if(!/^\d{3,4}$/.test(v.ckcvc||''))return'Enter a valid CVC.'}
else if(!/^03\d{9}$/.test((v.ckmob||'').replace(/\D/g,'')))return'Enter a valid mobile number (03XX-XXXXXXX).';
return null}
function renderCheckout(){const id=location.hash.slice(1).split('/')[1],p=PLAN[id],box=$('#ckx');if(!p||!logged()){box.innerHTML='';return}
const c=curC,ms=c==='PKR'?['jazzcash','easypaisa','card']:['card'];if(!ms.includes(CK.m))CK.m=ms[0];
if(CK.state==='proc'){box.innerHTML=`<div class="card state" aria-live="polite"><div class="spin"></div><h3>${t('Processing…')}</h3></div>`;return}
if(CK.state==='ok'){const o=CK.order;box.innerHTML=`<div class="card state"><div class="sic ok">✓</div><h2 style="margin:0 0 6px">${t('Payment successful')}</h2><p class="mu">${t('Your package is now active.')}</p><div class="card rc2" style="background:var(--iv)">${`<dl class="kv">${[['Order ID',`<span class="ltr" style="display:inline-block">${o.id}</span>`],['Package',t(o.plan)],['Method',t(METHODS[o.m])],['Amount',o.amount],['Date',dfmt(o.date)]].map(([k,v])=>`<dt>${t(k)}</dt><dd>${v}</dd>`).join('')}</dl>`}</div><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn" href="#dashboard">${t('Go to dashboard')}</a><a class="btn ghost" href="#search">${t('Search profiles')}</a></div></div>`;return}
if(CK.state==='fail'){box.innerHTML=`<div class="card state"><div class="sic bad">✕</div><h2 style="margin:0 0 6px">${t('Payment failed')}</h2><p class="mu" style="max-width:460px;margin:0 auto 20px">${t('Your payment was declined. No money was taken. Please try again or use another method.')}</p><button class="btn" data-a="retry">${t('Try again')}</button></div>`;return}
const v=CK.v,val=k=>esc(v[k]||'');
const fields=CK.m==='card'?`<div class="fg2"><div class="full"><label>${t('Name on card')}</label><input id="ckname" autocomplete="cc-name" value="${val('ckname')}"></div><div class="full"><label>${t('Card number')}</label><input id="cknum" class="ltr" inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" maxlength="23" value="${val('cknum')}"></div><div><label>${t('Expiry (MM/YY)')}</label><input id="ckexp" class="ltr" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5" value="${val('ckexp')}"></div><div><label>CVC</label><input id="ckcvc" class="ltr" type="password" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4" value="${val('ckcvc')}"></div></div>`
:`<div class="fg2"><div class="full"><label>${t('Mobile account number')}</label><input id="ckmob" class="ltr" inputmode="tel" autocomplete="tel" placeholder="03XX-XXXXXXX" maxlength="12" value="${val('ckmob')}"></div></div>`;
box.innerHTML=`<div class="cklay"><div class="card"><h3 style="margin-top:0">${t('Order summary')}</h3><div class="tg" style="margin:0 0 16px"><button data-a="cur" data-c="PKR" class="${c==='PKR'?'on':''}">PKR</button><button data-a="cur" data-c="USD" class="${c==='USD'?'on':''}">USD</button></div><dl class="kv"><dt>${t('Package')}</dt><dd>${t(p.n)}</dd><dt>${t('Contacts')}</dt><dd>${t(p.cl)}</dd><dt>${t('Duration')}</dt><dd>${t(p.dl)}</dd></dl><div class="tot"><span>${t('Total')}</span><b>${price(p,c)}</b></div></div>
<div class="card"><h3 style="margin-top:0">${t('Payment method')}</h3><div class="pmx">${ms.map(m=>`<label class="pmo ${CK.m===m?'on':''}"><input type="radio" name="pm" value="${m}" ${CK.m===m?'checked':''}><span>${t(METHODS[m])}</span></label>`).join('')}</div>${fields}<p class="err" id="ck-err" role="alert" data-k="${CK.err}">${CK.err?t(CK.err):''}</p><button class="btn" data-a="pay" style="width:100%;margin-top:10px">${t('Pay')} ${price(p,c)}</button><p class="lock">${t('Demo checkout – no real payment is taken. JazzCash, EasyPaisa and Stripe will be connected on the backend. Test: card 4242 4242 4242 4242 succeeds, 4000 0000 0000 0002 is declined; mobile numbers ending in 0000 are declined.')}</p></div></div>`}
function pay(){snapCK();const id=location.hash.slice(1).split('/')[1],p=PLAN[id];if(!p)return;
const er=validPay();if(er){CK.err=er;renderCheckout();return}
CK.err='';CK.state='proc';renderCheckout();
setTimeout(()=>{ // BACKEND: replace with the real JazzCash / EasyPaisa / Stripe flow
const v=CK.v,declined=CK.m==='card'?(v.cknum||'').replace(/\D/g,'')==='4000000000000002':(v.ckmob||'').replace(/\D/g,'').endsWith('0000');
CK.v={};if(declined){CK.state='fail'}else{const o={id:'MR-ORD-'+(100000+Math.floor(Math.random()*900000)),plan:p.n,m:CK.m,amount:price(p,curC),date:Date.now()};
ST.pkg={id,n:p.n,left:p.c,exp:Date.now()+p.mo*30*864e5};ST.orders.push(o);note('pay',p.n);CK.order=o;CK.state='ok'}
if(location.hash.startsWith('#checkout'))renderCheckout()},1400)}
document.addEventListener('input',e=>{const i=e.target;
if(i.id==='cknum')i.value=i.value.replace(/\D/g,'').slice(0,19).replace(/(.{4})/g,'$1 ').trim();
else if(i.id==='ckexp'){let d=i.value.replace(/\D/g,'').slice(0,4);i.value=d.length>2?d.slice(0,2)+'/'+d.slice(2):d}
else if(i.id==='ckmob'){const d=i.value.replace(/\D/g,'').slice(0,11);i.value=d.length>4?d.slice(0,4)+'-'+d.slice(4):d}});
document.addEventListener('change',e=>{if(e.target.name==='pm'){snapCK();CK.m=e.target.value;CK.err='';renderCheckout()}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&FIELDS.includes(e.target.id)){e.preventDefault();pay()}});

/* ---------- shared click actions ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const a=b.dataset.a;
if(a==='logout'){ST.on=false;save();updateNav();location.hash='#home'}
else if(a==='appr'){ST.user.status='approved';note('appr');renderDash()}
else if(a==='apprph'){if(ST.user.photo==='pending'){ST.user.photo='approved';note('photoOk')}renderDash()}
else if(a==='needlogin'){ST.next='profile/'+b.dataset.r;save();location.hash='#login'}
else if(a==='unlock')unlock(b.dataset.r);
else if(a==='cur'){snapCK();cur(b.dataset.c);renderCheckout()}
else if(a==='pay')pay();
else if(a==='retry'){CK.state='form';renderCheckout()}});

/* ---------- language switch ---------- */
const _ol=window.onLang;
window.onLang=()=>{_ol&&_ol();updateNav();$$('[data-k]').forEach(x=>{if(x.dataset.k)x.textContent=t(x.dataset.k)});
const[h,a]=(location.hash||'#home').slice(1).split('/');if(h==='dashboard')renderDash();else if(h==='profile')renderProfile(a);else if(h==='checkout'){snapCK();renderCheckout()}};
updateNav();route();
