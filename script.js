/*

//const display = document.getElementById('text-display');
//const sampleText = 'we need to replace this'; // i need to delete this and replace with generateText function


let interval;
let started = false;




function updateStats() {
  const typed = input.value;
  const correctChars = typed.split('').filter((ch, i) => ch === sampleText[i]).length;
  const wpm = Math.round((typed.length / 5) / ((60 - timer) / 60));
  const accuracy = Math.round((correctChars / typed.length) * 100) || 0;
  wpmEl.textContent = wpm;
  accuracyEl.textContent = `${accuracy}%`;
}

restartBtn.addEventListener('click', resetTest);

resetTest();


// i need to generate text in infinite length and subsequence
function generateText(){

}
*/








const words = `find time line day seem here increase house may know of that with never again and come order what all want between more number show year same keep stand since good who long see so interest these use take much they work down home in people person go without way about through early where have present program`.split(' ');
//let words = []
let currentWordIndex = 0;
let startTime = null;
let totalTyped = 0;
let correctTyped = 0;

// curently no in index.html
let timer = 60; // i need to make it choiceable and not only time and by words

const input = document.getElementById('hidden-input');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const container = document.getElementById('word-container');

// curently no in index.html
//const restartBtn = document.getElementById('restart-btn'); 

const timerEl = document.getElementById('timer'); 



async function loadwords() {
  try {
    const response = await fetch('words.json');
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла');
    }
    const data = await response.json();
    words = data.words; // предполагается, что в JSON есть поле "words"
    console.log('Слова загружены:', words);
  } catch (error) {
    console.error('Ошибка при загрузке или парсинге:', error);
  }
}

//loadwords()


function startTimer() {
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      clearInterval(interval);
      input.disabled = true;
      updateStats();
    }
  }, 1000);
}

// startTimer analog but not by times but by number of words
function startwords(){

}









function renderWords() {
  container.innerHTML = '';
  words.forEach((word, wordIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.dataset.index = wordIdx;

    [...word].forEach((char, charIdx) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.className = 'char';
      wordSpan.appendChild(charSpan);
    });

    container.appendChild(wordSpan);
    container.appendChild(document.createTextNode(' '));
  });
}

function highlightCursor() {
  document.querySelectorAll('.char').forEach(span => span.classList.remove('cursor'));

  const currentWordSpan = document.querySelector(`.word[data-index="${currentWordIndex}"]`);
  if (!currentWordSpan) return;

  const chars = currentWordSpan.querySelectorAll('.char');
  const typed = input.value;

  const cursorPos = Math.min(typed.length, chars.length - 1);
  if (chars[cursorPos]) chars[cursorPos].classList.add('cursor');
}

function updateWordDisplay() {
  const wordSpan = document.querySelector(`.word[data-index="${currentWordIndex}"]`);
  const chars = wordSpan.querySelectorAll('.char');
  const typed = input.value;

  chars.forEach((charSpan, i) => {
    if (typed[i] == null) {
      charSpan.className = 'char';
    } else if (typed[i] === charSpan.textContent) {
      charSpan.className = 'char correct-char';
    } else {
      charSpan.className = 'char incorrect-char';
    }
  });

  highlightCursor();
}

function finalizeWord() {
  const typed = input.value;
  const target = words[currentWordIndex];
  const wordSpan = document.querySelector(`.word[data-index="${currentWordIndex}"]`);

  if (typed === target) {
    correctTyped += target.length;
  }

  totalTyped += typed.length;

  if (typed !== target) {
    wordSpan.querySelectorAll('.char').forEach(span => {
      span.className = 'char incorrect-char';
    });
  }

  currentWordIndex++;
  input.value = '';
  updateStats();
  highlightCursor();
}

function updateStats() {
  const elapsed = (Date.now() - startTime) / 1000 / 60;
  const wpm = Math.round((correctTyped / 5) / elapsed);
  const accuracy = Math.round((correctTyped / Math.max(totalTyped, 1)) * 100);
  wpmEl.textContent = isFinite(wpm) ? wpm : 0;
  accuracyEl.textContent = `${accuracy}%`;
}








input.addEventListener('keydown', (e) => {
  if (!startTime) startTime = Date.now();

  if (e.key === ' ') {
    e.preventDefault();
    finalizeWord();
  } else if (e.key === 'Backspace') {
    updateWordDisplay();
  }
});

input.addEventListener('input', () => {
  updateWordDisplay();
});


renderWords()
highlightCursor()


/*
 NOTE for what we need to remade in this file.
 NOTE: we need to check if user type the right character if not color them red.

 */

// ============================== все ниже это уже чистый вариант








// event listeners section

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    console.log("escape key is pressed..")
    resetTest()
  }
});



// function section

function resetTest() {
  // rewrite this func
  input.value = '';
  input.disabled = false;
  input.focus();
  display.textContent = sampleText; // rewrite 
  timer = 60; // rewrite
  timerEl.textContent = timer;
  wpmEl.textContent = 0;
accuracyEl.textContent = '100%';
  clearInterval(interval);
  started = false;
}
