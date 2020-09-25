const pageMain = document.getElementById('page-main')
const wordPage = document.getElementById('word')
const letterPage = document.getElementById('letter')
const wordStatus = document.getElementById('wordStatus')
const answer = document.getElementById('answer')
let arrayWord
let joinArrayWord = []

function addWord() {
    arrayWord = (wordPage.value).split('')
}

const treatmentOfErro = []
function treatmentError(error) { // Validação de erro
    treatmentOfErro.push(error)
    
    if (treatmentOfErro.length >= 6) {
        pageMain.innerHTML = 'Você perdeu'  
    }
}

function victory(arrayWord, joinArrayWord, resp) {
    let trueOrFalse 
    arrayWord.filter( (e, i) => {
        
        if(e === joinArrayWord)
    })
}

function testLetter() {
    const letter = letterPage.value
    let hit 
    let mistake

    arrayWord.forEach( (letterMoment, i) => {
        if (letter.toUpperCase() == letterMoment.toUpperCase()) { // A letra que o user mandou será passada pra maiúscula assim como a letra do momento, então se a letra for passada maiusucla ou minusula será true 
            hit = `A letra ${arrayWord[i]} está correta.`
            joinArrayWord[i] = letterMoment // A letra que vai entrar no joinArrayWord será a letra do momento que está no arrayWord.

        } else {
            mistake = `ERROR a letra ${letter} não está correta`
        }
    })

    victory(arrayWord, joinArrayWord)

    arrayWord.forEach( (e, i) => { // Se tiver algum espaço nas palvras que o user mandou eu vou setar esse espaço, no novo array
        if (e === ' ') {
            joinArrayWord[i] = ' '
        }
    })

    if(!hit) treatmentError('error') // se o hit for false será chamada a callback de erro

    answer.innerHTML = `${hit? hit : mistake}<br><br>`
    answer.innerHTML += joinArrayWord.join('')

    letterPage.value = ''
    letterPage.focus()
}

