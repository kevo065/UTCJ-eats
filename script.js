// ====== CONFIGURA ESTO ======
// Tu WhatsApp: código de país 52 + lada + número, sin + ni espacios
var WHATSAPP="526562730967";
// Zonas del mapa (según el croquis): n nombre, l etiqueta corta, x/y posición, w/h tamaño
var Z={
A:{n:"Edificio A",l:"A",x:316,y:234,w:44,h:34},
B:{n:"Edificio B",l:"B",x:366,y:196,w:44,h:34},
C:{n:"Edificio C",l:"C",x:316,y:158,w:44,h:34},
D:{n:"Edificio D",l:"D",x:265,y:189,w:44,h:34},
E:{n:"Edificio E",l:"E",x:259,y:235,w:44,h:34},
F:{n:"Edificio F",l:"F",x:175,y:177,w:44,h:34},
G:{n:"Edificio G",l:"G",x:221,y:231,w:36,h:34},
H:{n:"Edificio H",l:"H",x:80,y:163,w:44,h:34},
I:{n:"Edificio I",l:"I",x:78,y:213,w:44,h:34},
J:{n:"Edificio J",l:"J",x:22,y:183,w:44,h:34},
K:{n:"Edificio K",l:"K",x:304,y:365,w:44,h:34},
L:{n:"Edificio L",l:"L",x:249,y:302,w:44,h:34},
M:{n:"Edificio M",l:"M",x:399,y:241,w:30,h:34},
N:{n:"Edificio N",l:"N",x:199,y:298,w:44,h:34},
O:{n:"Edificio O",l:"O",x:92,y:59,w:44,h:34},
P:{n:"Edificio P",l:"P",x:195,y:357,w:44,h:34},
Q:{n:"Edificio Q",l:"Q",x:213,y:397,w:44,h:34},
gim:{n:"Gimnasio",l:"Gimnasio",x:192,y:9,w:60,h:34},
caf:{n:"Cafetería",x:22,y:448,w:190,h:36},
ent:{n:"Entrada",x:228,y:448,w:190,h:36}};
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

function mapa(){var h="";
for(var k in Z){var z=Z[k],a=S.filter(function(s){return s.z===k}),ab=a.filter(function(s){return s.o}).length,
cl=!a.length?"":(ab?"o":"c"),cx=z.x+z.w/2;
h+='<g class="zn '+cl+(selz===k?' sel':'')+'" tabindex="0" role="button" aria-label="'+z.n+': '+a.length+' puestos" data-z="'+k+'">'+
'<rect x="'+z.x+'" y="'+z.y+'" width="'+z.w+'" height="'+z.h+'" rx="8"/>'+
'<text x="'+cx+'" y="'+(z.y+z.h/2+5)+'" text-anchor="middle">'+(z.l||z.n)+'</text>'+
(a.length?'<circle class="bd" cx="'+(z.x+z.w-5)+'" cy="'+(z.y+5)+'" r="8"/><text class="bn" x="'+(z.x+z.w-5)+'" y="'+(z.y+8.5)+'" text-anchor="middle">'+a.length+'</text>':'')+'</g>'}
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
$("lista").onclick=function(e){var b=e.target.closest("[data-m]");if(b){var s=S.filter(function(x){return x.id===+b.dataset.m})[0];selz=s?s.z:null;ir("mapa")}};
$("svg").onclick=function(e){var p=e.target.closest("[data-z]");if(p){selz=p.dataset.z;mapa()}};
$("svg").onkeydown=function(e){if(e.key==="Enter"){var p=e.target.closest("[data-z]");if(p){selz=p.dataset.z;mapa()}}};

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
