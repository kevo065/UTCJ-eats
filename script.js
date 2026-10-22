// Zonas del campus (cámbialas por las reales: nombre, posición x/y y tamaño w/h)
var Z={A:{n:"Edificio A",x:20,y:20,w:90,h:55},B:{n:"Edificio B",x:120,y:20,w:90,h:55},C:{n:"Edificio C",x:220,y:20,w:80,h:55},
caf:{n:"Cafetería",x:20,y:100,w:110,h:55},can:{n:"Canchas",x:150,y:100,w:150,h:55},ent:{n:"Entrada",x:90,y:175,w:140,h:42}};

// Puestos iniciales (vacío). Formato: {id:1,n:"Nombre",f:"Qué vende",z:"caf",c:"Comida",o:true}
var S=[];

var filtro="Todos",sel=null,$=function(i){return document.getElementById(i)};

function save(){try{localStorage.setItem("utcj-eats",JSON.stringify(S))}catch(e){}}
try{var g=localStorage.getItem("utcj-eats");if(g)S=JSON.parse(g)}catch(e){}

function chips(){var h="";["Todos","Abiertos","Comida","Bebidas","Postres"].forEach(function(c){
h+='<button class="chip" aria-pressed="'+(c===filtro)+'" data-c="'+c+'">'+c+'</button>'});$("chips").innerHTML=h}

function vis(){return S.filter(function(s){return filtro==="Todos"||(filtro==="Abiertos"?s.o:s.c===filtro)})}

function card(s,btn){return '<div class="row"><h3>'+s.n+'</h3><span class="st '+(s.o?'o':'c')+'">'+(s.o?'Abierto':'Cerrado')+'</span></div>'+
'<p class="meta">'+s.f+' · '+Z[s.z].n+'</p>'+(btn?'<button class="b g" data-m="'+s.id+'">Ver en el mapa</button>':'')}

function lista(){var v=vis();$("lista").innerHTML=v.length?v.map(function(s){return '<article class="stand">'+card(s,1)+'</article>'}).join(""):
'<p class="empty">'+(S.length?'No hay puestos con este filtro. Prueba con «Todos».':'Aún no hay puestos registrados. Si vendes comida, ve a «Mi puesto» y registra el tuyo.')+'</p>'}

function mapa(){var h="";for(var k in Z){var z=Z[k];h+='<rect class="zone" x="'+z.x+'" y="'+z.y+'" width="'+z.w+'" height="'+z.h+'" rx="8"/><text class="zl" x="'+(z.x+8)+'" y="'+(z.y+14)+'">'+z.n+'</text>'}
var cnt={};S.forEach(function(s){var z=Z[s.z],i=cnt[s.z]=(cnt[s.z]||0)+1;
h+='<g class="pin '+(s.o?'o':'')+(sel===s.id?' sel':'')+'" tabindex="0" role="button" aria-label="'+s.n+'" data-p="'+s.id+'"><circle cx="'+(z.x+16+(i-1)*24)+'" cy="'+(z.y+z.h-16)+'" r="9"/></g>'});
$("svg").innerHTML=h;var s=S.filter(function(x){return x.id===sel})[0];
$("info").innerHTML=s?card(s,0):'<span class="meta">Toca un punto del mapa para ver el puesto. Verde: abierto. Rojo: cerrado.</span>'}

function ir(t){["puestos","mapa","panel","ajustes"].forEach(function(i){$(i).classList.toggle("on",i===t)});
document.querySelectorAll("nav button").forEach(function(b){if(b.dataset.t===t)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
if(t==="mapa")mapa();window.scrollTo(0,0)}

function toast(m){var t=$("toast");t.textContent=m;t.classList.add("show");setTimeout(function(){t.classList.remove("show")},1800)}

$("nav").onclick=function(e){var b=e.target.closest("button");if(b)ir(b.dataset.t)};
$("chips").onclick=function(e){var b=e.target.closest("button");if(b){filtro=b.dataset.c;chips();lista()}};
$("lista").onclick=function(e){var b=e.target.closest("[data-m]");if(b){sel=+b.dataset.m;ir("mapa")}};
$("svg").onclick=function(e){var p=e.target.closest("[data-p]");if(p){sel=+p.dataset.p;mapa()}};
$("svg").onkeydown=function(e){if(e.key==="Enter"){var p=e.target.closest("[data-p]");if(p){sel=+p.dataset.p;mapa()}}};

$("pz").innerHTML=Object.keys(Z).map(function(k){return '<option value="'+k+'">'+Z[k].n+'</option>'}).join("");

$("guardar").onclick=function(){var n=$("pn").value.trim();if(!n){toast("Escribe el nombre del puesto");$("pn").focus();return}
var m=S.filter(function(s){return s.mine})[0];
var d={n:n,f:$("pf").value.trim()||"Sin descripción",z:$("pz").value,c:$("pc").value,o:$("po").checked,mine:true};
if(m){for(var k in d)m[k]=d[k]}else{d.id=Date.now();S.push(d)}
save();lista();toast("Cambios guardados")};

$("th").onchange=function(){var v=this.value,r=document.documentElement;if(v==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",v);
try{localStorage.setItem("utcj-theme",v)}catch(e){}};
try{var t=localStorage.getItem("utcj-theme");if(t){$("th").value=t;$("th").onchange.call($("th"))}}catch(e){}

chips();lista();