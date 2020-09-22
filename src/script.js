const wordPage = document.getElementById('word')
const letterPage = document.getElementById('letter')
const answer = document.getElementById('answer')
let arrayWord
let joinArrayWord = []

function addWord() {
    arrayWord = (wordPage.value).split('')
console.log(arrayWord)
}

const treatmentOfErro = []
function treatmentError(error) {
    treatmentOfErro.push(error)

    if (treatmentOfErro.length == 5) {
        console.log('Perdeu')
    }

    console.log(treatmentOfErro)
}

function testLetter() {
    const letter = letterPage.value
    let hit 
    let mistake
    
    arrayWord.forEach( (letterMoment, i) => {
        if (letter.toUpperCase() == letterMoment.toUpperCase()) {
            hit = `A letra ${letter} está correta.`
            joinArrayWord[i] = arrayWord[i]
        } else {
            mistake = `ERROR a letra ${letter} não está correta`
        }
    })

    if(!hit) treatmentError('error')

    alert(hit? hit : mistake)
    answer.innerHTML = joinArrayWord.join('')

    letterPage.value = ''
    letterPage.focus()
}

