const userInput = document.getElementById('user-input');
const submitGuess = document.getElementById('submit-guess');
const attemptsContainer = document.querySelector('.attempts-container');

const wordList = ['apple', 'chair', 'laptop', 'guitar', 'pencil']; // Replace with a larger word list
const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
const maxAttempts = 6;
let attempts = 0;

function evaluateGuess(guess, target) {
  let result = '';
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result += '✅';
    } else if (target.includes(guess[i])) {
      result += '🟡';
    } else {
      result += '❌';
    }
  }
  return result;
}

submitGuess.addEventListener('click', () => {
  const guess = userInput.value.toLowerCase();

  if (guess.length !== 5) {
    alert('Please enter a 5-letter word.');
    return;
  }

  attempts++;
  const result = evaluateGuess(guess, targetWord);

  const attemptElement = document.createElement('div');
  attemptElement.classList.add('attempt');
  attemptElement.innerHTML = `<p>${attempts}. ${guess.toUpperCase()} - ${result}</p>`;
  attemptsContainer.appendChild(attemptElement);

  if (result === '✅✅✅✅✅') {
    alert(`Congratulations! You've guessed the word correctly!`);
    attempts = 0;
    attemptsContainer.innerHTML = '';
    userInput.value = '';
  } else if (attempts >= maxAttempts) {
    alert(`Sorry, you've reached the maximum attempts. The word was "${targetWord.toUpperCase()}".`);
    attempts = 0;
    attemptsContainer.innerHTML = '';
  }

  userInput.value = '';
});
