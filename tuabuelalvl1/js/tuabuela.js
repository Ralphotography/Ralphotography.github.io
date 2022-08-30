//DEFINO MENÚ DE START
function menu(){
    //EMPIEZA EL JUEGO    
    decision = prompt("¡Bienvenido! ¿Quieres jugar?")
    if (decision=="si"||decision=="SI"||decision=="Si"){
        alert("Has osado retar a tu abuela a jugar a piedra, papel y tijera. Ten cuidado... ¿Estás listo?")
        } else if(decision=="no"){
            alert("Entonces, ¿pa que entras payaso? Te lo volveré a preguntar")+menu()} else{menu()
            }
    alert("Si continúas jugando aceptas ser desheredado por tu abuela. ¿Deseas continuar?")
}
//DEFINO FUNCION NÚMERO ALEATORIO DE 1 A 3
function numaleat(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
//Defino jugadores
let jugador
let tuabuela
//Defino proceso de selección de jugada
function selección(min,max){
    jugador = prompt("Elige: 1 Piedra, 2 Papel, 3 Tijera")
    tuabuela = numaleat(1,3)
}
//DEFINO ELECCIONES POSIBLES (1 es piedra, 2 papel y 3 tijera)
function elección(jugada){
    if(jugada==1) {return "🪨"}
    else if (jugada==2){return "🧻"}
    else if(jugada==3){return "✂️"}
    else{alert("Retrasado, escribe un número del 1 al 3") + juego()}
}
//DEFINIR FUNCION COMBATE
function combate(jugador, tuabuela){
    if(jugador==tuabuela){
        return "Has empatado con tu abuela! " + elección(jugador) + elección(tuabuela) + " Pero nunca harás las croquetas como ella ni de fly..."
        } else if((jugador == 1 && tuabuela == 3)||(jugador == 2 && tuabuela == 1)||(jugador == 3 && tuabuela == 2)) {
            wins=wins+1 
            return "GANASTE! Ya te vale ganar a tu abuela con " + elección(jugador)
            } else{
                looses=looses+1
                return "Tu abuela te fulminó con " + elección(tuabuela)+ ". Te avisé..."
                }
}
//DEFINO DINAMICA DE FUNCIONES DEL JUEGO
function juego(){
    //Defino contador
        selección(1,3)
        alert("Elegiste " + elección(jugador) + " y tu abuela eligió " + elección(tuabuela))
        alert(combate(jugador, tuabuela))
        alert("Tú ➡️ " + wins + " vs " + looses + " ⬅️ Tu abuela")
}
//DEFINO FUNCION RESULTADO
function resultado(){
    if(wins>looses){
        alert("Has ganado a tu abuela! 🏆")
    } else if(wins<looses){
        alert("Perdiste... estaba claro 🙅🏻‍♂️")
    } else {alert("no sé que ha pasao")}
    
}
//AQUÍ EMPIESA  
menu()
let wins = 0
let looses = 0
while (wins < 3 && looses < 3){
    juego()
}
resultado()          