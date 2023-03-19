const WORD_LIST = ['apple', 'table', 'chair', 'hello', 'world'];
const MAX_ATTEMPTS = 6;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

let attempts = 0;
let secretWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
let usedLetters = new Set();

let userInput = document.getElementById('user-input');
let submitButton = document.getElementById('submit-guess');
let guessesContainer = document.getElementById('guesses-container');
let keyboard = document.getElementById('keyboard');

submitButton.addEventListener('click', submitGuess);

ALPHABET.split('').forEach(letter => {
    let key = document.createElement('div');
    key.classList.add('key');
    key.innerHTML = letter;
    keyboard.appendChild(key);
});

function submitGuess() {
    let guess = userInput.value.toLowerCase();
    if (guess.length !== 5) {
        alert('Please enter a 5-letter word.');
        return;
    }

    let guessDisplay = document.createElement('div');
    guessDisplay.innerHTML = guess + ' - ' + compareWords(guess, secretWord);
    guessesContainer.appendChild(guessDisplay);

    attempts++;
    userInput.value = '';

    for (let letter of guess) {
        usedLetters.add(letter);
    }
    updateUsedLetters();

    if (guess === secretWord) {
        alert('Congratulations! You guessed the word!');
        resetGame();
    } else if (attempts === MAX_ATTEMPTS) {
        alert('Game over! The secret word was ' + secretWord + '.');
        resetGame();
    }
}

function compareWords(guess, secretWord) {
    let comparison = '';
    for (let i = 0; i < 5; i++) {
        if (guess[i] === secretWord[i]) {
            comparison += '◉';
        } else if (secretWord.includes(guess[i])) {
            comparison += '〇';
        } else {
            comparison += '✖';
        }
    }
    return comparison;
}

function updateUsedLetters() {
    let keys = keyboard.getElementsByClassName('key');
    for (let key of keys) {
        if (usedLetters.has(key.innerHTML)) {
            key.classList.add('used');
        }
    }
}

function resetGame() {
    attempts = 0;
    secretWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    guessesContainer.innerHTML = '';
    usedLetters.clear();
    updateUsedLetters();
}
