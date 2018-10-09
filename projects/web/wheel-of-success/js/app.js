const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const scoreboard = document.querySelectorAll('#scoreboard img');
const overlay = document.querySelector('#overlay');
const startBtn = document.querySelector('.btn__reset');
const keyrowBtns = document.querySelectorAll('.keyrow button');
const ul = phrase.children[0];
const phrases = [
    'Start somewhere',
    'Work for it',
    'Now or never',
    'Move forward',
    'Be nice or go away'];
let missed = 0;


startBtn.addEventListener('click', (e) => {
    if(e.target.textContent === 'Try Again?') {
        // Reset hearts
        missed = 0;
        for(let i = 0; i < scoreboard.length; i++) {
            scoreboard[i].src = 'images/liveHeart.png';
        }
        // Reset keyboard styles
        for(let i = 0; i < keyrowBtns.length; i++){
            keyrowBtns[i].className = '';
            keyrowBtns[i].disabled = false;
        }
        // Remove the last winner-info text
        const infoText = document.getElementsByTagName('h3')[0];
        overlay.removeChild(infoText);

        // Remove animation
        ul.className ='';
    }
    // New random phrase gets generated regardless
    const phraseArray = getRandomPhraseAsArray(phrases);
    addToPhraseDisplay(phraseArray);
    overlay.style.display = 'none';
});

keyboard.addEventListener('click', (e) => {
    const button = e.target;
    if(button.tagName === 'BUTTON') {
        button.className = 'chosen';
        button.disabled = true;

        let matched = checkLetter(button.textContent);
        if(matched != null) {
            button.classList.add('match');
        } else {
            if(missed < scoreboard.length) {
                scoreboard[missed].src = 'images/lostHeart.png';
                missed++;
            }
        }
    }
    checkWin();
});

function checkLetter(letter) {
    const letters = document.querySelectorAll('.letter');
    let match = false;
    for(let i = 0; i < letters.length; i++) {
        if(letter.toLowerCase() === letters[i].textContent.toLowerCase()) {
            match = true;
            letters[i].classList.add('show');
        }
    }
    if(match){
        return letter;
    }
    return null;
}

function checkWin() {
    const numOfShown = document.querySelectorAll('.show').length;
    const numOfLetters = document.querySelectorAll('.letter').length;
    const numOfHearts = scoreboard.length;

    if(missed === numOfHearts) {
        setGameOverScreen('flex', 'lose', 'You Lose!');

    } else if (missed < numOfHearts && numOfShown === numOfLetters) {
        ul.classList.add('blink-1');
        setTimeout(() => {
            setGameOverScreen('flex', 'win', 'You Win!');
        }, 3000);
    }
}

function setGameOverScreen(display, className, textContent) {

    // Remove phrase from being displayed in the background
    while (ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
    // Show a winner/loser information text and display it under the 'play again' btn
    const gameOverText = document.createElement('h3');
    gameOverText.classList.add('bounce-in-top');
    gameOverText.textContent = textContent;
    startBtn.parentNode.insertBefore(gameOverText, startBtn.nextSibling);

    overlay.style.display = display;
    overlay.className = className;
    startBtn.textContent = 'Try Again?';

}

function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * (arr.length))];
    return [...randomPhrase]; // ES6 - returned as array of chars
}

function addToPhraseDisplay(arr){
    for(let i = 0; i < arr.length; i++) {
        let li = document.createElement('LI');
        li.textContent = arr[i];
        if(arr[i] !== ' ') {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
}

