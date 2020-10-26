const wordPage = document.getElementById('word')
const traceContainer = document.getElementById('trace-container')
const letterPage = document.getElementById('letter')

const dissappearGameConfig = document.getElementById('dissappearGameConfig') //Pegando conteúdo que deve aparecer e desaparecer
const appearContentLetter = document.getElementById('appearContentLetter')
appearContentLetter.style.display = "none" 
let wordCorret;
let arrayWord;
function addWord() {
   
    dissappearGameConfig.style.display = "none"
    appearContentLetter.style.display = "block" 

    const head = document.getElementById('head') 
    const body = document.getElementById('body')
    const armLeft = document.getElementById('armLeft')
    const armRight = document.getElementById('armRight')
    const legLeft = document.getElementById('legLeft')
    const legRight = document.getElementById('legRight')

    head.style.display = "none"
    body.style.display = "none" 
    armLeft.style.display = "none"
    armRight.style.display = "none"
    legLeft.style.display = "none"
    legRight.style.display = "none"

    
    arrayWord = (wordPage.value).split("")
     const addingTraces = Array(arrayWord.length) // isso vai retornar um array com a mesma quantidade de letras que o usuário adicionou, mas as posições do array serão undefined
     
     for (let i = 0 ; i < addingTraces.length ; i++) { // adicionando as imagens no novo array criado.
        if (addingTraces[i] === undefined) { 
            addingTraces[i] = ' <img class="trace" src="/public/images/stickman/gallows-trace.png" alt="traço"> '
        } 
    }  

    wordCorret = Array(arrayWord.length)
    for (let i = 0 ; i < wordCorret.length ; i++) { // vai trocar todos os undefined's por um espaço vazio
        if (wordCorret[i] === undefined) { 
            wordCorret[i] = ''
        } 
    }
    traceContainer.innerHTML = addingTraces.join('')
}


function testLetter() {

    const letter = letterPage.value
    let hit;
    let mistake;

    arrayWord.forEach( (e, i) => {
        if (letter.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g , '') === e.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g , '')) {
            

            wordCorret[i] += `<p> ${arrayWord[i]} </p>`
            hit = letter

        } else {
             mistake = `[ERRO] a letra ${letter}` 
        }
    })

    traceContainer.innerHTML = wordCorret.join('')


    letterPage.value = ''
    letterPage.focus()
}


(function() {
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
}
)()
