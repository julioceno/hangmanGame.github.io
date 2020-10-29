const wordPage = document.getElementById('wordPage')
const wordTip = document.getElementById('wordTip')
const letterPage = document.getElementById('letterPage')
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

let wordRandomChosen; 
let tipRandomChosen

function addWordAlone() {
    const numberWord = Math.trunc(Math.random() * 6)
   
    const wordsRandoms= {

        0: {
            0: 'Pavão',1: 'Arara',2: 'Zebra',3: 'Girafa ',4: 'Avestruz',5: 'Periquito', 6: 'Cobra',7: 'Búfalo',
            8: 'Aranha',9: 'Pardal',10: 'Lula',

            getWordRandom() {
                const numberWord = Math.trunc(Math.random() * 50)
                return this[numberWord]
            },

            tip : "Animais"
        },
       
        1: {
            0: 'Padeiro',1: 'Astronauta',2: 'Ator', 3: 'Maquinista',
            4: 'Carpinteiro',5: 'Encanador',6: 'Faxineira',7: 'Engenheiro',8: 'Taxista',9: 'Vendedora',

            getWordRandom() {
                const numberWord = Math.trunc(Math.random() * 10)
                return this[numberWord]
            },

            tip : "Profissão"
        },
       
        2: {
            0: 'Branco',1: 'Roxo',2: 'Vermelho',3: 'Preto',4: 'Marrom',5: 'Rosa', 6: 'Branco',
            7: 'Cinza',8: 'Verde',

            getWordRandom() {
                const numberWord = Math.trunc(Math.random() * 10)
                return this[numberWord]
            },

            tip : "Cor"
        },

        3: {
            0: 'Queijo',  1: 'Queijo',   2: 'Alcachofra',   3: 'Tamareira',   4: 'Leite',   5: 'Legumes',   6: 'Framboesa',  7: 'Caqui',  8: 'Amora',  9: 'Cogumelos', 
            10: 'Ovo', 

            getWordRandom() {
                const numberWord = Math.trunc(Math.random() * 10)
                return this[numberWord]
            },

            tip : "Alimentos"
        },

        4: {
            0: 'Bonde',  1: 'Balsa',   2: 'Submarino',   3: 'Triciclo',   4: 'Caiaque',   5: 'Parapente',   6: 'Bicicleta',  7: 'Navio',  8: 'Ferrovia',  9: 'Carruagem',  10: 'Foguete', 

            getWordRandom() {
                const numberWord = Math.trunc(Math.random() * 10)
                return this[numberWord]
            },

            tip : "Transporte"
        },

        5: {
            0: 'Bisneta',  1: 'Tio',   2: 'Neta',   3: 'Pai',   4: 'Neto',   5: 'Esposa',   6: 'Pai',  7: 'Sobrinha',  8: 'Tia',  9: 'Bisneta',  10: 'Filha', 

            getWordRandom() {
                const numberWord = Math.trunc(Math.random() * 10)
                return this[numberWord]
            },

            tip : "Familia"
        },
      
         
        getClassWordRandom() {
            return this[numberWord].getWordRandom()
        },

        getTipRandom() {
            return this[numberWord].tip
        }

        
    }
    
    wordRandomChosen = wordsRandoms.getClassWordRandom()
    tipRandomChosen = wordsRandoms.getTipRandom()
    
    wordTip.style.display ="block"
    wordTip.innerHTML = `Dica: <Small>${tipRandomChosen}</small>`
    addWord()
}

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

    wordRandomChosen? arrayWord = wordRandomChosen.split("") : arrayWord = (wordPage.value).split("")

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
            const numberColor = Math.trunc(Math.random() * 15)
            return [this[numberColor]]
        }
    }
    document.body.style.background = colors.getColor()


    wordPage.addEventListener('keypress', e => {
        if (e.key == ' ') {
            e.preventDefault()
        }
    })
        
    letterPage.addEventListener('keypress', e => {
        const moreThanOneLetter = (letterPage.value).split("")

        if (moreThanOneLetter.length > 0) {
            e.preventDefault()
        }
    })
    
    wordPage.addEventListener("keyup", e => {
        if (e.keyCode === 13) addWord()
    })
    
    letterPage.addEventListener('keyup', e => {
        if (e.keyCode === 13) addLetter()
    })
})()
