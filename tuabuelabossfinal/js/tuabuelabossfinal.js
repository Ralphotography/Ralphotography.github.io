//DEFINO VARIABLES GLOBALES

//Variables constantes desde el inicio
let objetoElegido = ""
let dificultad = 0

//status
let vidasObjeto = 0
let furiaAbuelita = 0

//Variables cambiantes en cada turno
let estrategiaJugador = ""
let poderEstrategia = 0
let lanzamientoAbuelita = ""
let tipoAbuelita = ""
let punteriaAbuelita = 0
let dañoLanzamiento = 0
let certezaLanzamiento = ""
//VARIABLES RECURRENTES DURANTE LOS TURNOS
function mostrarBotonesEstrategia() {document.getElementById('botones-estrategia').style.display='block'};
function ocultarBotonesEstrategia(){document.getElementById('botones-estrategia').style.display='none'};

//VARIABLES DE MENSAJES DE REGISTRO Y CONTADOR DE MENSAJES
let secciónRegistroMensajes = document.getElementById('mensajes-combate')
let mensajeEstrategiaJugador = document.createElement('p')
let mensajeLanzamientoAbuelita = document.createElement('p')
let mensajeEsperarLanzamiento = document.createElement('p')
let mensajeTurnoJugador = document.createElement('p')
let mensajesJugador = 0
let mensajesAbuelita = 0

//FUNCIONES QUE SE LLAMAN SÓLO 1 VEZ (AL INICIO)
function iniciarSelección(){
    document.getElementById('boton-iniciar-selección').style.display='none'
    document.getElementById('menú-selección').style.display='block'
    document.getElementById('boton-elegir-objeto').addEventListener('click', forzarSelección)
}
function forzarSelección(){
    let inputJarrón = document.getElementById('Jarrón')
    let inputCuadroFamiliar = document.getElementById('Cuadro familiar')
    let inputCajaCostura = document.getElementById('Caja de costura')
    if (inputJarrón.checked || inputCuadroFamiliar.checked || inputCajaCostura.checked){elegirObjeto()}
    else {alert("Debes elegir un objeto para continuar");iniciarSelección}
}
function elegirObjeto(){
    //Convierto cada objeto elegible en variable
    let inputJarrón = document.getElementById('Jarrón')
    let inputCuadroFamiliar = document.getElementById('Cuadro familiar')
    let inputCajaCostura = document.getElementById('Caja de costura')
    //Defino mensaje objeto elegido
    let spanObjetoElegido = document.getElementById('objeto-jugador')
    //Comprobación de objeto seleccionado
    if (inputJarrón.checked) {spanObjetoElegido.innerHTML = 'JARRÓN FRÁGIL 🏺'; objetoElegido="jarrón"; vidasObjeto=60} 
    else if(inputCuadroFamiliar.checked) {spanObjetoElegido.innerHTML = 'CUADRO FAMILIAR 🖼️'; objetoElegido="cuadro familiar"; vidasObjeto=85}
    else if(inputCajaCostura.checked) {spanObjetoElegido.innerHTML = 'CAJA DE COSTURA 🧰'; objetoElegido="caja de costura"; vidasObjeto=100}
    else {spanObjetoElegido.innerHTML = 'No has elegido nada'; alert ('Debes elegir un objeto para continuar, es por tu bien');iniciarSelección}
    //mostrar span objeto
    document.getElementById('objeto-elegido').innerHTML = objetoElegido
    document.getElementById('mostrar-selección').style.display='block'
    alert('A tu abuela no le ha gustado que cogieras su ' + objetoElegido + '. Su nivel de furia está en 100 puntos. ¡Buena suerte!')
    //Establece furia inicial
    furiaAbuelita=100;
    elegirDificultad()
}
function elegirDificultad() {
    document.getElementById('menú-dificultad').style.display='block'
    document.getElementById('boton-fácil').addEventListener('click',dificultadFacil)
    document.getElementById('boton-media').addEventListener('click', dificultadMedia)
    document.getElementById('boton-difícil').addEventListener('click', dificultadDificil) 
}
function dificultadFacil () {
    dificultad = 1;
    alert ('Has elegido dificultad FÁCIL 🐞');
    mostrarDificultad()
}
function dificultadMedia () {
    dificultad = 2;
    alert ('Has elegido dificultad MEDIA ¡Ánimo!');
    mostrarDificultad()
}
function dificultadDificil () {
    dificultad = 3;
    alert ('Has elegido dificultad DIFÍCIL... estás perdido ☣️');
    mostrarDificultad()
}
function mostrarDificultad() {
    spanDificultadElegida = document.getElementById('dificultad-elegida')
    if(dificultad==1){spanDificultadElegida.innerHTML= 'FÁCIL 🐞'}  
    else if(dificultad==2){spanDificultadElegida.innerHTML= 'MEDIA 💪🏻'} 
    else if(dificultad==3){spanDificultadElegida.innerHTML= 'DIFÍCIL ☣️'} 
    else{spanDificultadElegida.innerHTML= 'Elige cobarde'}

    document.getElementById('menú-selección').style.display = 'none';
    document.getElementById('comienzo-partida').style.display='block'

    setTimeout(function(){document.getElementById('comienza-batalla').innerHTML="¡COMIENZA LA BATALLA!"},500)
    setTimeout(function(){document.getElementById('comienza-batalla').style.display='none'},2000)


    setTimeout(function(){secciónRegistroMensajes.appendChild(mensajeTurnoJugador)},2000)
    setTimeout(function(){secciónRegistroMensajes.removeChild(mensajeTurnoJugador)},5000)

    mostrarVidasObjeto()
    mostrarFuriaAbuelita()
    seleccionarEstrategia()
}

//FUNCIONES A LLAMAR EN CADA TURNO
//Turno jugador
function seleccionarEstrategia() {
    let botonFlores = document.getElementById("boton-regalar-flores")
    let botonTq = document.getElementById("boton-decir-tq")
    let botonHalagar = document.getElementById("boton-halagar")
    
    setTimeout(function(){mostrarBotonesEstrategia()},2000)

    botonFlores.addEventListener('click', estrategiaFlores)
    botonTq.addEventListener('click', estrategiaTq)
    botonHalagar.addEventListener('click', estrategiaHalagar)
}
function estrategiaFlores() {estrategiaJugador = 'regalar flores';poderAleatorioEstrategia()}
function estrategiaTq() {estrategiaJugador = 'decirle te quiero';poderAleatorioEstrategia()}
function estrategiaHalagar() {estrategiaJugador = 'decirle que sus croquetas son las mejores';poderAleatorioEstrategia()}
function poderAleatorioEstrategia() {
    poderEstrategia= Math.ceil(numaleat(5,30)/dificultad)
    furiaAbuelita=furiaAbuelita-poderEstrategia
    ocultarBotonesEstrategia()
    mostrarFuriaAbuelita()
    registroMensajesJugador()
}
function mostrarFuriaAbuelita() {
    let statusFuria = document.getElementById('furia-abuelita')
    statusFuria.innerHTML=furiaAbuelita
    if (furiaAbuelita>60){statusFuria.style.color="rgb(255, 35, 35)"}
    else if (furiaAbuelita >30){statusFuria.style.color="rgb(255, 180, 122)"}
    else {statusFuria.style.color="rgb(129, 255, 122)"}
}
function registroMensajesJugador() {
    
    mensajeEstrategiaJugador.innerHTML= '>    Has probado a ' + estrategiaJugador + '. <br> Tu estrategia tuvo una eficacia de: ' + poderEstrategia + ' puntos en reducir el enfado de tu abuela.'
   
    secciónRegistroMensajes.appendChild(mensajeEstrategiaJugador)
    mensajesJugador++
    //Mensaje de espera (tarda 1s, dura 4s)
    mensajeEsperarLanzamiento.innerHTML= '...Dale unos segundos a tu abuela...'
    setTimeout(function(){secciónRegistroMensajes.appendChild(mensajeEsperarLanzamiento)},1000)
    setTimeout(function(){secciónRegistroMensajes.removeChild(mensajeEsperarLanzamiento)}, 4000)

    comprobarFinalCombate()
    setTimeout(function(){tipoAbuelitaAleatorio()}, 5000)
}
//Turno abuelita
function tipoAbuelitaAleatorio() {
    let abuelitaRandom = numaleat(1,3)
    if (abuelitaRandom==1){tipoAbuelita='COCINERAMON';lanzamientoAbuelita='cazuela';dañoLanzamiento=10}
    else if (abuelitaRandom==2){tipoAbuelita='COSTURERAMON';lanzamientoAbuelita='máquina de coser';dañoLanzamiento=15}
    else {tipoAbuelita='COLLEJERAMON';lanzamientoAbuelita='colleja';dañoLanzamiento=5}
    calculoAleatorioPunteria()
}
function calculoAleatorioPunteria() {
    if (dificultad==1){punteriaAbuelita=numaleat(1,40);resultadoLanzamiento()}
    else if (dificultad==2){punteriaAbuelita=numaleat(10,40);resultadoLanzamiento()}
    else {punteriaAbuelita=numaleat(10,30);resultadoLanzamiento()}
}
function resultadoLanzamiento() {
    if (punteriaAbuelita >= 20){certezaLanzamiento = 'acierta'; vidasObjeto = vidasObjeto-dañoLanzamiento}
    else {certezaLanzamiento = 'no acierta'; dañoLanzamiento=0}
    mostrarVidasObjeto()
    registroMensajesAbuelita()
}
function registroMensajesAbuelita () {
    mensajeLanzamientoAbuelita.innerHTML= '>    Tu abuela digievoluciona a ' + tipoAbuelita + ' y te lanza una ' + lanzamientoAbuelita + ', <br>' + certezaLanzamiento + ' inflingiendo ' + dañoLanzamiento + ' puntos de daño a tu ' + objetoElegido
    
    secciónRegistroMensajes.appendChild (mensajeLanzamientoAbuelita)
    mensajesAbuelita++

    comprobarFinalCombate()
    mensajeTurnoJugador.innerHTML= '.............¡ES TU TURNO!.............'
    setTimeout(function(){secciónRegistroMensajes.appendChild(mensajeTurnoJugador)},1000)
    setTimeout(function(){secciónRegistroMensajes.removeChild(mensajeTurnoJugador)},5000)

    
    restaurarValores()
    seleccionarEstrategia()
}
function comprobarFinalCombate(){
    let secciónRegistroMensajes = document.getElementById('mensajes-combate')
    let mensajeFinalCombate = document.createElement('p')

    if(vidasObjeto <=0) {secciónRegistroMensajes.innerHTML= 'TU OBJETO SE HA ROTO. HAS PERDIDO'; secciónRegistroMensajes.appendChild(mensajeFinalCombate); setTimeout(function(){alert('EL ÚLTIMO LANZAMIENTO DE TU ABUELA HA ROTO TU ' + objetoElegido + ' .TE PERDONA LA VIDA Y TE OBLIGA A COMPRARLE OTRO ' + objetoElegido + '. HAS PERDIDO!')},2000); document.getElementById('abuelita-gana').style.display='block'}
    else if (furiaAbuelita <=0){secciónRegistroMensajes.innerHTML='¡ENHORABUENA! HAS CALMADO A TU ABUELA.';secciónRegistroMensajes.appendChild(mensajeFinalCombate);setTimeout(function(){alert('🎉¡ENHORABUENA!🎉 TUS ESTRATEGIAS HAN FUNCIONADO. TU ABUELA HA PASADO DE FURIOSA A MOLESTA. TENDRÁS QUE FREGAR LOS PLATOS DURANTE UN MES. PERO EN EL FONDO TE VUELVE A QUERER.')},2000); document.getElementById('jugador-gana').style.display='block'}
    else{}
}
function comprobarSaturaciónMensajes (){
    if(mensajesJugador > 6){secciónRegistroMensajes.removeChild(mensajeEstrategiaJugador)}
    if(mensajesAbuelita > 6){secciónRegistroMensajes.removeChild(mensajeLanzamientoAbuelita)}
    else{}
}
function restaurarValores(){
    poderEstrategia = 0
    lanzamientoAbuelita = ""
    tipoAbuelita = ""
    punteriaAbuelita = 0
    dañoLanzamiento = 0
    certezaLanzamiento = ""    
}
function numaleat(min,max){
    return Math.ceil(Math.random()*(max-min+1)+min)
}
function mostrarVidasObjeto(){
    let statusVidas = document.getElementById('vidas-objeto')
    statusVidas.innerHTML=vidasObjeto
    if (vidasObjeto>60){statusVidas.style="font:size 30pt; color:rgb(129, 255, 122)";} //verde
    else if (statusVidas>30){statusVidas.style="color:rgb(255, 180, 122)"} //naranja
    else {statusVidas.style="color:rgb(255, 35, 35)"} //rojo
}
  





//EVENT LISTENER QUE MARCA INICIO DE FUNCIONES (ELEGIR EL OBJETO)
function abuelitaEnfadada() {
    setTimeout(function(){document.getElementById('abuelita-enfadada').style.display='block'},1500)
    setTimeout(function(){document.getElementById('abuelita-enfadada').style.display='none';document.getElementById('boton-iniciar-selección').style.display='block'},4000)
}
window.addEventListener('load', abuelitaEnfadada())
document.getElementById('boton-iniciar-selección').addEventListener('click',iniciarSelección)



//FUNCIONES EN DESUSO
let dañoInflingido = 0
function calculoDañoInflingido (){
    if(objetoElegido=='jarrón'){dañoInflingido=dañoLanzamiento}
    else if(objetoElegido=='cuadro familiar'){dañoInflingido=dañoLanzamiento*1.10}
    else if(objetoElegido=='caja de costura'){dañoInflingido=dañoLanzamiento*1.15}
}
function comprobarWhile(){
    while(vidasObjeto>0 && furiaAbuelita>0){
        seleccionarEstrategia()}
    finalCombate()
}
