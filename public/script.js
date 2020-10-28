const wordPage = document.getElementById('wordPage')
const letterPage = document.getElementById('letterPage')
const statusLetter = document.getElementById('status-letter')
const traceContainer = document.getElementById('trace-container')
const letterContainer = document.getElementById('letter-container')

const dissappearGameConfig = document.getElementById('dissappearGameConfig') //Pegando conteúdo que deve aparecer e desaparecer
const appearContentLetter = document.getElementById('appearContentLetter')
appearContentLetter.style.display = "none" 

const head = document.getElementById('head') 
const body = document.getElementById('body')
const armLeft = document.getElementById('armLeft')
const armRight = document.getElementById('armRight')
const legLeft = document.getElementById('legLeft')
const legRight = document.getElementById('legRight')


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
            hit = arrayWord[i]? arrayWord[i] : 'erro'
            arrayIndice.push(i)
        }
    })
    if(letter && !hit) mistake() //  letter tem que está prenchido e o hit tem que ser falso pra a função mistkae ser chamada

    const addLetterInIndiceCorrect = e =>  wordCorret[e] = ` <div class="letter">${hit}</div>` // se o usuário colocar uma palavra que tenha letras iguais a função vai pegar os indíces dessa letra e vai ir adicionando a letra em todos os indíces necessários
    if(hit) arrayIndice.forEach(addLetterInIndiceCorrect) // todos vinham concatenados com undefined e também quando se errava uma letra entrava o undfined no array. com esse algoritmo a letra só é adicionada se o hit for true. E a função que está dentro do forEach é resposável por adicionar todas as letras nos indíces e também  a letra não vai concatenada com undefined

    letterContainer.innerHTML = wordCorret.join('')

    letterPage.value = ''
    letterPage.focus()
}

function mistake() {
    alert('errou')
}




(function() { // algoritmo que joga uma cor aleátoria para o body
    const colors = {
        0: '#b8de6f',1: '#388e3c', 2: '#1565c0',3: '#e53935',4: '#f67809',5: '#5e35b1',
        6: '#fbc02d',7: '#d81b60',8: '#64dd17',9: '#00acc1',10: '#304ffe',11: '#9f6581',
        12: '#24b6da',13: '#616161',14: '#ee6f57',15: '#ffa5a5',
        
        getColor() {
            numberColor = Math.trunc(Math.random() * 15)
            return [this[numberColor]]
        }
    }
    document.body.style.background = colors.getColor()
})()
