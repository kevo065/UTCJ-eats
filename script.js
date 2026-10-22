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

fu
