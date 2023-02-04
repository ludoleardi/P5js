let bg;
let completo = []; let denari = []; let coppe = []; let spade = []; let bastoni = [];
let scale = 6 //scala immagini
//elenco i semi
const listaSemi = ["bastoni", "denari", "coppe", "spade"] 
//associo a ogni seme il suo "mazzo" tramite un dizionario
const  mazzo = {"bastoni": bastoni, "denari": denari, "coppe": coppe, "spade": spade} 

function statistiche(){
    clear()
    background(bg)
    fill(255, 255, 255)
    textSize(80)
    textFont('Trebuchet MS')
    s = "Partita finita!"
    text(s, width/2 - textWidth(s) / 2, height/2)
    text("Tu: "+ giocatore.punti, width/2 - 200, height/2 + 200)
    text("IA: " + ia.punti, width/2 + 200, height/2 + 200)
}

function controlloMazzo(){
    if(denari.length == 0 && bastoni.length == 0 && coppe.length == 0 && spade.length == 0){
        statistiche()
        return false
    }
    return true
}

function valore(carta){
    ret = (completo.indexOf(carta) + 1)% 10;
    if(ret == 0)
        ret = 10
    return ret
}

function estrai(){
    do{
        seme = random(listaSemi) //scelgo un seme casuale
    } while(mazzo[seme].length == 0)
    //if(mazzo[seme].length){
        carta = random(mazzo[seme])
        mazzo[seme].splice(mazzo[seme].indexOf(carta), 1)
        return carta
    //}
}

function riempiCampo(){
    for(let i = 0; i < 4; i++){
        carta = estrai()
        //partita.aggiungi(carta)
        image(carta, 200*i+200, 275, height/scale, width/scale)
    }
}

function distribuisci(){
    if(controlloMazzo()){
        for(let i = 0; i < 3; i++){
            carta = estrai()
            giocatore.aggiungi(carta)
            image(carta, 200*i+200, 550, height/scale, width/scale)
            carta = estrai()
            ia.aggiungi(carta)
            image(retroMazzo, 200*i+200, 0, height/scale, width/scale)
        }
    }
}

function preload() {
    bg = loadImage('img/sfondo.jpg');
    retroMazzo = loadImage('img/retro.jpg')
    for(let i = 0; i<40; i++){
        let k = i+1; //le carte sono numerate a partire da uno
        completo[i] = loadImage('img/' + k + '.jpg') //carico tutti gli oggetti immagine in un mazzo completo
    }
    arrayCopy(completo, 0, denari, 0, 10) //copio le prime 10 carte nei denari
    arrayCopy(completo, 10, coppe, 0, 10) //le seguenti 10 nelle coppe
    arrayCopy(completo, 20, spade, 0, 10) //le seguenti 10 nelle spade
    arrayCopy(completo, 30, bastoni, 0, 10) //le seguenti 10 nei bastoni
    
}

function setup () {
    createCanvas(displayWidth, displayHeight-100)//dimensione piano di lavoro
    background('grey');//colore sfondo
    frameRate(2)
    textSize(32)
    giocatore = new Giocatore()
    ia = new Ia()
    partita = new Partita()
    background(bg)
    image(retroMazzo, displayWidth - 150, displayHeight/4, height/scale, width/scale)
    riempiCampo()
}

function draw() {
    distribuisci()
}

class Giocatore{
    constructor(){
        this.mano = []
        this.raccolte = []
        this.punti = 0
        this.carte = 0
    }

    aggiungi(carta){
        this.mano[this.carte] = carta
        this.carte++
    }
}

class Ia{
    constructor(){
        this.mano = []
        this.raccolte = []
        this.punti = 0
        this.carte = 0
    }

    aggiungi(carta){
        this.mano[this.carte] = carta
        this.carte++
    }
}

class Partita{
    constuctor(){
        this.campo = []
        this.carte = 0
    }

    aggiungi(carta){
        this.campo[this.carte] = carta
        this.carte++
    }
}