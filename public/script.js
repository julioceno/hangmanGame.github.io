const wordPage = document.getElementById('wordPage')
const letterPage = document.getElementById('letterPage')
const statusLetter = document.getElementById('status-letter')
const traceContainer = document.getElementById('trace-container')
const letterContainer = document.getElementById('letter-container')

 

const head = document.getElementById('head') 
const body = document.getElementById('body')
const armLeft = document.getElementById('armLeft')
const armRight = document.getElementById('armRight')
const legLeft = document.getElementById('legLeft')
const legRight = document.getElementById('legRight')

const dissappearGameConfig = document.getElementById('dissappearGameConfig') //Pegando conteúdo que deve aparecer e desaparecer
const appearContentLetter = document.getElementById('appearContentLetter')
appearContentLetter.style.display = "none"

let wordCorret = [];
let arrayWord;
function addWord() {
   
    dissappearGameConfig.style.display = "none"
    appearContentLetter.style.display = "block" 

  

    head.style.display = "none"
    body.style.display = "none" 
    armLeft.style.display = "none"
    armRight.style.display = "none"
    legLeft.style.display = "none"
    legRight.style.display = "none"

    arrayWord = (wordPage.value).split("")

    arrayWord.forEach( (e, i) => { // isso é feito para que todos os espaços do array fiquem prenchidos, e na tela os espaços da letra fiquem com um border-bottom deixando assim os tracinhos
        wordCorret[i] = `<div class="letter">&nbsp</div>`
    })
    addLetter() // função é chamada para os tracinhos aparecerem
}

function addLetter() {

    const letter = letterPage.value
    let hit;
    let arrayIndice = []

    arrayWord.forEach( (e, i) => {
        if (letter.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g , '') === e.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g , '')) {     
            hit = arrayWord[i]
            arrayIndice.push(i)
        }
    })
    
    const addLetterInIndiceCorrect = e =>  wordCorret[e] = ` <div class="letter">${hit}</div>` // se o usuário colocar uma palavra que tenha letras iguais a função vai pegar os indíces dessa letra e vai ir adicionando a letra em todos os indíces necessários
    if(hit) arrayIndice.forEach(addLetterInIndiceCorrect) // todos vinham concatenados com undefined e também quando se errava uma letra entrava o undfined no array. com esse algoritmo a letra só é adicionada se o hit for true. E a função que está dentro do forEach é resposável por adicionar todas as letras nos indíces e também  a letra não vai concatenada com undefined
    
    if(letter && !hit) mistake() //  letter tem que está prenchido e o hit tem que ser falso pra a função mistkae ser chamada

    victory()
    letterContainer.innerHTML = wordCorret.join('')
    letterPage.value = ''
    letterPage.focus()
}

const popUp = document.getElementById('pop-up-container')
const resultGamePopup = document.getElementById('result-game-popup')
const resultWordPopup = document.getElementById('result-word-popup')
const wordCorretPopup = document.getElementById('word-corret-popup')

const error = []
function mistake() {
    error.push('erro')

    switch(error.length) {
        case 1: head.style.display = 'block' 
        break;
        case 2: body.style.display = 'block' 
        break;
        case 3: armLeft.style.display = 'block'
        break;
        case 4: armRight.style.display = 'block'
        break;
        case 5: legLeft.style.display = 'block' 
        break;
        case 6: legRight.style.display = 'block' 
                appearContentLetter.style.display = 'none'
                break;
            }
            
            if(error.length == 6) {
                
                setTimeout( () => {
                    document.body.style.background = "#f05454"
                    popUp.style.display="block"
                    resultGamePopup.innerHTML = "Fim de jogo :("
                    resultWordPopup.innerHTML = "Palavra correta"
                    wordCorretPopup.innerHTML = arrayWord.join('')
            }, 500)
        }
    }

function victory() {

    const extractingLetter = e => e.substring(21, e.length - 6)
    const wordCorretWithoutTag = wordCorret.map(extractingLetter)
    
    const compareArray = (e, i) => e === wordCorretWithoutTag[i] 
    const arraysIdentical = arrayWord.every(compareArray)

    if (arraysIdentical === true) {
        appearContentLetter.style.display = 'none'

        setTimeout( () => {
        popUp.style.display="block"
        resultGamePopup.innerHTML = "Você ganhou :)"
        resultWordPopup.innerHTML = "Você acertou a palavra"
        wordCorretPopup.innerHTML = arrayWord.join('')

        resultGamePopup.style.marginTop = "1.80rem"
        resultWordPopup.style.marginTop = "1rem"
        document.body.style.background = "#64dd17"
        },500)
    
    }
 
}


(function() { // algoritmo que joga uma cor aleátoria para o body
    const colors = {
        0: '#214252',1: '#388e3c', 2: '#1565c0',3: '#ffe05d',4: '#f67809',5: '#5e35b1',
        6: '#fbc02d',7: '#16697a',8: '#6a097d',9: '#00acc1',10: '#304ffe',11: '#9f6581',
        12: '#24b6da',13: '#616161',14: '#ee6f57',15: '#1f3c88', 16: '#070d59', 17: '#c62a88',
        18: '#0278ae', 19: '#f0a500', 20: '#d789d7', 21: '#9d65c9', 22: '#5d54a4', 23: '#00b7c2',
        24: '#fa26a0', 25: '#1b1b2f', 26: '#27496d', 27: '#035aa6', 28: '#323232', 29: '#414141',
        
        getColor() {
            numberColor = Math.trunc(Math.random() * 15)
            return [this[numberColor]]
        }
    }
    document.body.style.background = colors.getColor()
})()
