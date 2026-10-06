const $=s=>document.querySelector(s);
const mezclar=a=>[...a].sort(()=>Math.random()-.5);

function quiz(){
 const box=$('#quiz');if(!box)return;
 const P=[
  {q:'¿Dónde encontró Lucía el libro?',o:['En la biblioteca','En el desván de su abuela','En la escuela'],c:1},
  {q:'¿Qué hacía cada noche en lugar de mirar la tableta?',o:['Dibujaba','Dormía temprano','Leía un capítulo'],c:2},
  {q:'¿Con quién vivió su aventura en el jardín?',o:['Con su hermano Tomás','Con su abuela','Sola'],c:0}];
 let i=0,pts=0;
 function ver(){
  if(i>=P.length){
   box.innerHTML=`<p class="resultado">Acertaste ${pts} de ${P.length} ${pts==P.length?'🏆 ¡Excelente lector!':'📖 ¡Sigue leyendo y vuelve a intentarlo!'}</p><button class="btn" id="rq">Jugar de nuevo</button>`;
   $('#rq').onclick=()=>{i=0;pts=0;ver()};return}
  const p=P[i];
  box.innerHTML=`<p><strong>Pregunta ${i+1} de ${P.length}:</strong> ${p.q}</p><div class="opciones">${p.o.map((t,k)=>`<button class="opcion" data-k="${k}">${t}</button>`).join('')}</div><p class="msg" id="msg"></p>`;
  const bs=box.querySelectorAll('.opcion');
  bs.forEach(b=>b.onclick=()=>{
   const k=+b.dataset.k;bs.forEach(x=>x.disabled=true);bs[p.c].classList.add('ok');
   if(k==p.c){pts++;$('#msg').textContent='¡Correcto!'}
   else{b.classList.add('mal');$('#msg').textContent='Casi. La respuesta correcta está en verde.'}
   setTimeout(()=>{i++;ver()},1500)});
 }
 ver();
}

function ordenar(){
 const box=$('#ordenar');if(!box)return;
 const F=['Leer todos los días mejora la memoria','Escribir a mano ayuda a aprender','Jugar al aire libre es divertido y saludable'];
 let n=0;
 function ver(){
  box.innerHTML=`<p>Toca las palabras en orden para formar la oración:</p><div class="zona" id="resp"></div><div class="zona" id="pool"></div><button class="btn" id="ok">Comprobar</button> <button class="btn sec" id="rs">Reiniciar</button><p class="msg" id="m"></p>`;
  const resp=$('#resp'),pool=$('#pool');
  mezclar(F[n].split(' ')).forEach(t=>{
   const b=document.createElement('button');b.className='chip';b.textContent=t;
   b.onclick=()=>(b.parentNode===pool?resp:pool).appendChild(b);pool.appendChild(b)});
  $('#rs').onclick=ver;
  $('#ok').onclick=()=>{
   const r=[...resp.children].map(x=>x.textContent).join(' ');
   if(r==F[n]){$('#m').textContent='🎉 ¡Muy bien! Vamos con otra oración.';n=(n+1)%F.length;setTimeout(ver,1400)}
   else $('#m').textContent='Todavía no. Mueve las palabras e inténtalo otra vez.'};
 }
 ver();
}

function retoEscritura(){
 const b=$('#reto-esc');if(!b)return;
 const W=['dragón','biblioteca','lluvia','globo','secreto','robot','isla','mariposa','tesoro','luna','bicicleta','montaña'];
 b.innerHTML=`<p>Escribe una historia corta usando estas 3 palabras:</p><div id="pal"></div><textarea id="hist" rows="5" placeholder="Había una vez..."></textarea><p class="msg" id="cnt">0 palabras</p><button class="btn" id="nuevas">Nuevas palabras</button>`;
 const nuevas=()=>{$('#pal').innerHTML=mezclar(W).slice(0,3).map(w=>`<span class="etiqueta">${w}</span>`).join('')};
 nuevas();$('#nuevas').onclick=nuevas;
 $('#hist').oninput=e=>{
  const n=e.target.value.trim().split(/\s+/).filter(Boolean).length;
  $('#cnt').textContent=n+(n==1?' palabra':' palabras')+(n>=30?' 🌟 ¡Gran historia!':'')};
}

function calc(){
 const b=$('#calc');if(!b)return;
 b.innerHTML=`<label for="h">Horas diarias frente a pantallas: <strong id="hv">3</strong></label><input type="range" id="h" min="0" max="12" step="0.5" value="3"><div id="res" class="resultado"></div>`;
 const act=()=>{
  const h=+$('#h').value,a=h*365;$('#hv').textContent=h;
  $('#res').innerHTML=`En un año son <strong>${Math.round(a)} horas</strong> (${Math.round(a/24)} días completos). Con ese tiempo podrías leer unos <strong>${Math.round(a/6)} libros</strong>.<br>${h<=1?'✅ Uso equilibrado.':h<=3?'⚠️ Intenta reducirlo un poco.':'🚨 Es demasiado. Prueba actividades sin pantalla.'}`};
 $('#h').oninput=act;act();
}

function reto(){
 const b=$('#reto-sem');if(!b)return;
 const A=['Leí un libro impreso','Jugué al aire libre','Cené sin pantallas','Dibujé o escribí en un cuaderno','Conversé con mi familia','Dormí sin celular'];
 b.innerHTML=`<p>Marca lo que hiciste hoy sin pantallas:</p>`+A.map(t=>`<label class="check"><input type="checkbox">${t}</label>`).join('')+`<div class="barra"><div id="prog"></div></div><p class="msg" id="pm"></p>`;
 const act=()=>{const c=b.querySelectorAll('input:checked').length;
  $('#prog').style.width=c/A.length*100+'%';
  $('#pm').textContent=c==A.length?'🏆 ¡Día desconectado completado!':c+' de '+A.length+' logros'};
 b.querySelectorAll('input').forEach(x=>x.onchange=act);act();
}

document.addEventListener('DOMContentLoaded',()=>{quiz();ordenar();retoEscritura();calc();reto()});
