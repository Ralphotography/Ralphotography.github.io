//DEFINO VARIABLES GLOBALES
let estrategiaJugador = ""
let poderEstrategia = 0
let lanzamientoAbuelita = ""
let tipoAbuelita = ""
let punteriaAbuelita = 0
let objetoElegido = ""
let dificultad = 0
let vidasObjeto = 0
let furiaAbuelita = 0
let dañoInflingido = 0
let dañoLanzamiento = 0
let certezaLanzamiento = ""

function iniciarSelección() {
    let botonElegirDefensa = document.getElementById('boton-elegir-objeto')
    botonElegirDefensa.addEventListener('click', objetosDisponibles)
}
function objetosDisponibles () {
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
    else {spanObjetoElegido.innerHTML = 'No has elegido nada'; alert ('Debes elegir un objeto para continuar, es por tu bien')}
    document.getElementById('objeto-elegido').innerHTML = objetoElegido
    alert('A tu abuela no le ha gustado que cogieras su ' + objetoElegido + '. La has enfadado más y su nivel de furia está en 100 puntos. ¡Buena suerte!')
    furiaAbuelita=100
    mostrarFuriaAbuelita()
    mostrarVidasObjeto()
    elegirDificultad()
}
function numaleat(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
function elegirDificultad() {
    let botonDificultadFacil = document.getElementById('boton-fácil')
    let botonDificultadMedia = document.getElementById('boton-media')
    let botonDificultadDificil = document.getElementById('boton-difícil')    

    botonDificultadFacil.addEventListener('click',dificultadFacil)
    botonDificultadMedia.addEventListener('click', dificultadMedia)
    botonDificultadDificil.addEventListener('click', dificultadDificil)
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
    juego()
}
function mostrarVidasObjeto(){
    document.getElementById('vidas-objeto').innerHTML=vidasObjeto
}
function mostrarFuriaAbuelita() {
    document.getElementById('furia-abuelita').innerHTML=furiaAbuelita
}
function tipoAbuelitaAleatorio() {
    let abuelitaRandom = numaleat(1,3)
    if (abuelitaRandom==1){tipoAbuelita='COCINERAMON';lanzamientoAbuelita='cazuela';dañoLanzamiento=10}
    else if (abuelitaRandom==2){tipoAbuelita='COSTURERAMON';lanzamientoAbuelita='máquina de coser';dañoLanzamiento=15}
    else {tipoAbuelita='COLLEJERAMON';lanzamientoAbuelita='colleja';dañoLanzamiento=5}
    calculoAleatorioPunteria()
}
function calculoAleatorioPunteria() {
    if (dificultad==1){punteriaAbuelita=Math.floor(numaleat(1,60))}
    else if (dificultad==2){punteriaAbuelita=Math.floor(numaleat(1,80))}
    else {punteriaAbuelita=Math.floor(numaleat(1,100))}
    resultadoLanzamiento()
}
function calculoDañoInflingido (){
    if(objetoElegido=='jarrón'){dañoInflingido=dañoLanzamiento}
    else if(objetoElegido=='cuadro familiar'){dañoInflingido=dañoLanzamiento*1.10}
    else if(objetoElegido=='caja de costura'){dañoInflingido=dañoLanzamiento*1.15}
}
function resultadoLanzamiento() {
    if (punteriaAbuelita >= 50){certezaLanzamiento = 'acierta'; calculoDañoInflingido(); restarVidaObjeto()}
    else {certezaLanzamiento = 'no acierta'}
    registroMensajesAbuelita()
}   
function restarVidaObjeto() {
    vidasObjeto = vidasObjeto-dañoInflingido
    mostrarVidasObjeto()
}
function seleccionarEstrategia() {
    let botonFlores = document.getElementById("boton-regalar-flores")
    let botonTq = document.getElementById("boton-decir-tq")
    let botonHalagar = document.getElementById("boton-halagar")
    
    botonFlores.addEventListener('click', estrategiaFlores)
    botonTq.addEventListener('click', estrategiaTq)
    botonHalagar.addEventListener('click', estrategiaHalagar)
}
function poderAleatorioEstrategia() {
    poderEstrategia= Math.floor(numaleat(5,30)/dificultad)
    furiaAbuelita=furiaAbuelita-poderEstrategia
    mostrarFuriaAbuelita()
    registroMensajesJugador()
}
function estrategiaFlores() {estrategiaJugador = 'regalar flores';poderAleatorioEstrategia()}
function estrategiaTq() {estrategiaJugador = 'decirle te quiero';poderAleatorioEstrategia()}
function estrategiaHalagar() {estrategiaJugador = 'decirle que sus croquetas son las mejores';poderAleatorioEstrategia()}

function registroMensajesJugador() {
    let secciónRegistroMensajes = document.getElementById('mensajes-combate')
    let mensajeEstrategiaJugador = document.createElement('p')
   
    mensajeEstrategiaJugador.innerHTML= 'Has probado a ' + estrategiaJugador + '. Tu estrategia tuvo una eficacia de: ' + poderEstrategia + ' puntos. Conseguiste reducir el enfado de tu abuela a ' + furiaAbuelita + '. Es momento de defenderte con tu ' + objetoElegido + ' y esperar al lanzamiento de tu abuela.'

    secciónRegistroMensajes.appendChild (mensajeEstrategiaJugador)
    tipoAbuelitaAleatorio()
}
function registroMensajesAbuelita () {
    let secciónRegistroMensajes = document.getElementById('mensajes-combate')
    let mensajeLanzamientoAbuelita = document.createElement('p')

    mensajeLanzamientoAbuelita.innerHTML= 'Tu abuela digievoluciona a ' + tipoAbuelita + ' y te lanza una ' + lanzamientoAbuelita + '. Te proteges con tu ' + objetoElegido + '. Tu abuela ' + certezaLanzamiento + ' inflingiendo ' + dañoInflingido + ' puntos de daño a tu ' + objetoElegido + ', le siguen quedando ' + vidasObjeto + ' puntos de vida. ¡Adelante! Prueba tu siguiente estrategia...'
        
    secciónRegistroMensajes.appendChild (mensajeLanzamientoAbuelita)
    
}
function juego(){
    seleccionarEstrategia()
}

window.addEventListener('load', iniciarSelección)





