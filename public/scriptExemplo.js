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

    qttLetters = Array(arrayWord.length) ;; // Esse array é criado com a quantidade de elementos da palavra colocada pelo user, unicamente para colocar os _ mas ele só funciona quando a função testLetter é chamada.
    const repleceableArray = Array(qttLetters.length) // Esse array tem quase o mesmo sentido do anterior, poém assim que essa função é chamado ele já coloca os _ porém quandoeu invoco o testLetter ele é meio que substituido.

    for (let i = 0 ; i < qttLetters.length ; i++) {
        if (qttLetters[i] === undefined) { // Toda vez que a posição for  indefinida será setado um _, pra os dois arrays.
            qttLetters[i] = ' _ '
            repleceableArray[i] = ' _ '
        } 
    }

    arrayWord.forEach( (e, i) => { // Se tiver algum espaço nas palvras que o user mandou eu vou setar esse espaço, no novo array
        if (e === ' ') {
            repleceableArray[i] = 'space' // Explicação na função testLetter próximo ao fim.
        } 
        console.log(repleceableArray[i])
    })
 
    repleceableArray.forEach( (e, i) => {
        if (e === 'space') {
            repleceableArray[i] = '&nbsp'
        }
    })
 
    wordStatus.innerHTML =  repleceableArray.join('')

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

    arrayWord.forEach( (letterMoment, i) => {// Comentário na linha posterior
        if (letter.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g , '') == letterMoment.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g , '')) { // A letra que o user mandou será passada pra maiúscula assim como a letra do momento, então se a letra for passada maiusucla ou minusula será true 
            hit = `A letra ${arrayWord[i]} está correta.`                                                                                                             //A função normalize será aplicada a todos as letras que tiverem açentos, aplicando tanto em letter como em letterMoment e será ignorado todas os açentos pois os dois serão iguais.                                                                          
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
            qttLetters[i] = 'space' // Esse "space" que eu dou nos espaços do array será aplicado um replace em cima deles e no lugar do space será dado um espaço pra separar as palavras.
        } else if (e === '  ') {
            joinArrayWord[i] = '  '
        }
    })

    if(!hit) treatmentError('error') // se o hit for false será chamada a callback de erro.
    victory() // Vai chamar a callback victory pra checar se o user já ganhou.

    qttLetters.forEach( (e, i) => {
        if (e === 'space') {
            qttLetters[i] = '&nbsp'
        }
    })

    answer.innerHTML = `${hit? hit : mistake}<br><br>`
    wordStatus.innerHTML = qttLetters.join('')

    letterPage.value = ''
    letterPage.focus()
}
