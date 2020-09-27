const pageMain = document.getElementById('page-main')
const wordPage = document.getElementById('word')
const letterPage = document.getElementById('letter')
const answer = document.getElementById('answer')
const wordStatus = document.getElementById('wordStatus')

let arrayWord = []
let joinArrayWord = []

let wordsCompletOfPhrase = []
function phraseVerification() { // Verifica se ele colocou mais de 5 palavras no input.
    wordsCompletOfPhrase = (wordPage.value).split(' ')
    if (wordsCompletOfPhrase.length > 5 ) {
        arrayWord = [] // Se tiver mais que 5 palavras ele limpa todos os arrays e o answer
        joinArrayWord = []
        wordsCompletOfPhrase = []
        answer.value = ''        

        alert('Você só pode colocar até 5 palavras.')
    }
}

let qttLetters
function addWord() {
    
    arrayWord = [] // Toda vez que apertarmos esse botão ele primeiramente ele irá limpar todos os arrays(answer também) se caso eles tiverem algo.
    joinArrayWord = []
    wordsCompletOfPhrase = []
    answer.innerHTML = ''
    
    arrayWord = (wordPage.value).split('')

    qttLetters = Array(arrayWord.length)
    const repleceableArray = Array(qttLetters.length)

    for (let i = 0 ; i < qttLetters.length ; i++) {
        if (qttLetters[i] === undefined) {
            qttLetters[i] = ' _ '
            repleceableArray[i] = ' _ '
        } 
    }

    arrayWord.forEach( (e, i) => { // Se tiver algum espaço nas palvras que o user mandou eu vou setar esse espaço, no novo array
        if (e === ' ') {
            repleceableArray[i] = 'space'
        } 
    })

    wordStatus.innerHTML = repleceableArray.join('').replace('space' , '&nbsp')


    phraseVerification()
}

const treatmentOfErro = []
function treatmentError(error) { // Validação de erro
    treatmentOfErro.push(error)
    
    if (treatmentOfErro.length >= 6) {
        pageMain.innerHTML = 'Você perdeu'  
    }
}

function victory() {
    setTimeout( () => {
        const compare = (element, indice) => element === joinArrayWord[indice]
        const hasWon = arrayWord.every(compare) 
        
        if(hasWon === true) {
            pageMain.innerHTML = 'Ganhou'
        }
    },2000)
}

function testLetter() {
    const letter = letterPage.value
    let hit 
    let mistake

    arrayWord.forEach( (letterMoment, i) => {
        if (letter.toUpperCase() == letterMoment.toUpperCase()) { // A letra que o user mandou será passada pra maiúscula assim como a letra do momento, então se a letra for passada maiusucla ou minusula será true 
            hit = `A letra ${arrayWord[i]} está correta.`
            joinArrayWord[i] = letterMoment // A letra que vai entrar no joinArrayWord será a letra do momento que está no arrayWord.

            if (hit) {
                qttLetters[i] = ` ${letterMoment} `
         }


        } else {
            mistake = `ERROR a letra ${letter} não está correta`
        }
    })
    
    arrayWord.forEach( (e, i) => { // Se tiver algum espaço nas palvras que o user mandou eu vou setar esse espaço, no novo array
        if (e === ' ') {
            joinArrayWord[i] = ' '
            qttLetters[i] = 'space'
        } else if (e === '  ') {
            joinArrayWord[i] = '  '
        }
    })
    if(!hit) treatmentError('error') // se o hit for false será chamada a callback de erro.
    victory() // Vai chamar a callback victory pra checar se o user já ganhou.

    answer.innerHTML = `${hit? hit : mistake}<br><br>`
    wordStatus.innerHTML = qttLetters.join('').replace('space' , '&nbsp')

    letterPage.value = ''
    letterPage.focus()
}