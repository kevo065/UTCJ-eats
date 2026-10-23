// ====== CONFIGURA ESTO ======
// Tu WhatsApp: código de país 52 + lada + número, sin + ni espacios
var WHATSAPP="526562730967";
// Zonas sobre el croquis (croquis.jpg mide 880x810): x,y esquina superior izquierda; w,h tamaño.
// Las zonas con s:1 van en la franja de abajo.
var Z={
A:{n:"Edificio A",x:624,y:432,w:96,h:60},
B:{n:"Edificio B",x:738,y:345,w:70,h:84},
C:{n:"Edificio C",x:620,y:285,w:100,h:56},
D:{n:"Edificio D",x:536,y:331,w:70,h:84},
E:{n:"Edificio E",x:513,y:431,w:88,h:62},
F:{n:"Edificio F",x:344,y:312,w:88,h:80},
G:{n:"Edificio G",x:452,y:431,w:40,h:40},
H:{n:"Edificio H",x:151,y:300,w:96,h:56},
I:{n:"Edificio I",x:147,y:391,w:96,h:56},
J:{n:"Edificio J",x:37,y:329,w:96,h:68},
K:{n:"Edificio K",x:597,y:660,w:100,h:70},
L:{n:"Edificio L",x:490,y:542,w:92,h:66},
M:{n:"Edificio M",x:797,y:441,w:56,h:62},
N:{n:"Edificio N",x:397,y:537,w:80,h:66},
O:{n:"Edificio O",x:176,y:104,w:96,h:62},
P:{n:"Edificio P",x:380,y:650,w:96,h:56},
Q:{n:"Edificio Q",x:418,y:727,w:96,h:56},
gim:{n:"Gimnasio",x:390,y:15,w:100,h:66},
caf:{n:"Cafetería",x:10,y:822,w:420,h:54,s:1},
ent:{n:"Entrada",x:450,y:822,w:420,h:54,s:1}};
var CATS=["Comida","Bebidas","Postres","Artículos"];
// ============================

var S=[],filtro="Todos",selz=null,$=function(i){return document.getElementById(i)};

function cargar(){
fetch("puestos.json?t="+Date.now(),{cache:"no-store"}).then(function(r){return r.json()}).then(function(d){
S=d;lista();if($("mapa").classList.contains("on"))mapa()}).catch(function(){
if(!S.length)$("lista").innerHTML='<p class="empty">No se pudieron cargar los puestos. Intenta de nuevo en un momento.</p>'})}

function chips(){var h="";["Todos","Abiertos"].concat(CATS).forEach(function(c){
h+='<button class="chip" aria-pressed="'+(c===filtro)+'" data-c="'+c+'">'+c+'</button>'});$("chips").innerHTML=h}

function vis(){return S.filter(function(s){return filtro==="Todos"||(filtro==="Abiertos"?s.o:s.c===filtro)})}

function card(s,btn){return '<div class="row"><h3>'+s.n+'</h3><span class="st '+(s.o?'o':'c')+'">'+(s.o?'Abierto':'Cerrado')+'</span></div>'+
'<p class="meta">'+s.f+' · '+(Z[s.z]?Z[s.z].n:"")+'</p>'+(btn?'<button class="b g" data-m="'+s.id+'">Ver en el mapa</button>':'')}

function lista(){var v=vis();$("lista").innerHTML=v.length?v.map(function(s){return '<article class="stand">'+card(s,1)+'</article>'}).join(""):
'<p class="empty">'+(S.length?'No hay puestos con este filtro. Prueba con «Todos».':'Aún no hay puestos. Si quieres vender, ve a «Quiero vender».')+'</p>'}

function mapa(){var h='<image href="croquis.jpg" x="0" y="0" width="880" height="810"/>';
for(var k in Z){var z=Z[k],a=S.filter(function(s){return s.z===k}),ab=a.filter(function(s){return s.o}).length,
cl=!a.length?"":(ab?"o":"c");
h+='<g class="zn '+(z.s?'zs ':'')+cl+(selz===k?' sel':'')+'" tabindex="0" role="button" aria-label="'+z.n+': '+a.length+' puestos" data-z="'+k+'">'+
'<rect x="'+z.x+'" y="'+z.y+'" width="'+z.w+'" height="'+z.h+'" rx="10"/>'+
(z.s?'<text class="zt" x="'+(z.x+z.w/2)+'" y="'+(z.y+z.h/2+10)+'" text-anchor="middle">'+z.n+'</text>':'')+
(a.length?'<circle class="bd" cx="'+(z.x+z.w-4)+'" cy="'+(z.y+4)+'" r="16"/><text class="bn" x="'+(z.x+z.w-4)+'" y="'+(z.y+11)+'" text-anchor="middle">'+a.length+'</text>':'')+'</g>'}
$("svg").innerHTML=h;
var q=selz&&Z[selz]?S.filter(function(s){return s.z===selz}):null;
$("info").innerHTML=q?'<h3 style="margin:0 0 6px">'+Z[selz].n+'</h3>'+(q.length?q.map(function(s){return '<div style="padding:8px 0;border-top:1px solid var(--line)">'+card(s,0)+'</div>'}).join(""):'<span class="meta">Aún no hay puestos aquí.</span>'):
'<span class="meta">Toca un edificio para ver sus puestos. Verde: hay puestos abiertos. Rojo: todos cerrados. El número indica cuántos puestos hay.</span>'}

function ir(t){["puestos","mapa","panel","ajustes"].forEach(function(i){$(i).classList.toggle("on",i===t)});
document.querySelectorAll("nav button").forEach(function(b){if(b.dataset.t===t)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
if(t==="mapa")mapa();window.scrollTo(0,0)}

function toast(m){var t=$("toast");t.textContent=m;t.classList.add("show");setTimeout(function(){t.classList.remove("show")},1800)}

$("nav").onclick=function(e){var b=e.target.closest("button");if(b)ir(b.dataset.t)};
$("chips").onclick=function(e){var b=e.target.closest("button");if(b){filtro=b.dataset.c;chips();lista()}};
$("lista").onclick=function(e){var b=e.target.closest("[data-m]");if(b){var s=S.filter(function(x){return x.id===+b.dataset.m})[0];selz=s?s.z:null;ir("mapa");if(selz)enfocar(selz)}};
$("svg").onkeydown=function(e){if(e.key==="Enter"){var p=e.target.closest("[data-z]");if(p){selz=p.dataset.z;mapa()}}};

// ---- Mapa interactivo: arrastrar, pellizcar, rueda del mouse y botones ----
var VW=880,VH=886,MAXZ=3.5,vb={x:0,y:0,w:VW,h:VH},sv=$("svg"),P={},drag=false;
function setVB(){var w=Math.min(VW,Math.max(VW/MAXZ,vb.w)),h=w*VH/VW;
vb.w=w;vb.h=h;vb.x=Math.max(0,Math.min(VW-w,vb.x));vb.y=Math.max(0,Math.min(VH-h,vb.y));
sv.setAttribute("viewBox",vb.x+" "+vb.y+" "+vb.w+" "+vb.h)}
function zoomAt(cx,cy,f){var r=sv.getBoundingClientRect(),fx=(cx-r.left)/r.width,fy=(cy-r.top)/r.height,
ux=vb.x+fx*vb.w,uy=vb.y+fy*vb.h,nw=Math.min(VW,Math.max(VW/MAXZ,vb.w/f));
vb.x=ux-fx*nw;vb.y=uy-fy*(nw*VH/VW);vb.w=nw;setVB()}
function enfocar(k){var z=Z[k];if(!z)return;vb.w=VW/2;vb.x=z.x+z.w/2-vb.w/2;vb.y=z.y+z.h/2-(vb.w*VH/VW)/2;setVB()}
sv.addEventListener("pointerdown",function(e){try{sv.setPointerCapture(e.pointerId)}catch(x){}
P[e.pointerId]={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY};drag=false});
sv.addEventListener("pointermove",function(e){var p=P[e.pointerId];if(!p)return;var ids=Object.keys(P),r=sv.getBoundingClientRect();
if(ids.length===1){if(Math.abs(e.clientX-p.sx)+Math.abs(e.clientY-p.sy)>8)drag=true;
if(drag){vb.x-=(e.clientX-p.x)*vb.w/r.width;vb.y-=(e.clientY-p.y)*vb.h/r.height;setVB()}
p.x=e.clientX;p.y=e.clientY}
else if(ids.length===2){var o=P[ids[0]===String(e.pointerId)?ids[1]:ids[0]],d0=Math.hypot(p.x-o.x,p.y-o.y);
p.x=e.clientX;p.y=e.clientY;drag=true;var d1=Math.hypot(p.x-o.x,p.y-o.y);if(d0>0)zoomAt((p.x+o.x)/2,(p.y+o.y)/2,d1/d0)}});
function soltar(e){var p=P[e.pointerId];if(!p)return;delete P[e.pointerId];
if(!drag&&e.type==="pointerup"&&!Object.keys(P).length){var el=document.elementFromPoint(e.clientX,e.clientY),z=el&&el.closest("[data-z]");if(z){selz=z.dataset.z;mapa()}}}
sv.addEventListener("pointerup",soltar);sv.addEventListener("pointercancel",soltar);
sv.addEventListener("wheel",function(e){e.preventDefault();zoomAt(e.clientX,e.clientY,e.deltaY<0?1.25:0.8)},{passive:false});
function centro(f){var r=sv.getBoundingClientRect();zoomAt(r.left+r.width/2,r.top+r.height/2,f)}
$("zi").onclick=function(){centro(1.4)};
$("zo").onclick=function(){centro(1/1.4)};
$("zr").onclick=function(){vb={x:0,y:0,w:VW,h:VH};setVB()};

$("pz").innerHTML=Object.keys(Z).map(function(k){return '<option value="'+k+'">'+Z[k].n+'</option>'}).join("");
$("pc").innerHTML=CATS.map(function(c){return '<option>'+c+'</option>'}).join("");

// Arma el mensaje y abre WhatsApp con los datos ya escritos
$("guardar").onclick=function(){var n=$("pn").value.trim();
if(!n){toast("Escribe el nombre del puesto");$("pn").focus();return}
var msg="Hola, quiero agregar mi puesto a UTCJ Eats.\n"+
"Nombre: "+n+"\n"+
"Qué vendo: "+($("pf").value.trim()||"-")+"\n"+
"Zona: "+Z[$("pz").value].n+"\n"+
"Categoría: "+$("pc").value+"\n"+
"Horario: "+($("ph").value.trim()||"-");
window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg),"_blank")};

$("th").onchange=function(){var v=this.value,r=document.documentElement;if(v==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",v);
try{localStorage.setItem("utcj-theme",v)}catch(e){}};
try{var t=localStorage.getItem("utcj-theme");if(t){$("th").value=t;$("th").onchange.call($("th"))}}catch(e){}

chips();lista();cargar();
setInterval(cargar,60000); // revisa cambios cada 60 segundos
