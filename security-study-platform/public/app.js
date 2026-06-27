const quizBox = document.getElementById('quizBox');
const quizTitle = document.getElementById('quizTitle');
const scoreBadge = document.getElementById('scoreBadge');
const randomBtn = document.getElementById('randomBtn');
const wrongNoteBtn = document.getElementById('wrongNoteBtn');
const wrongList = document.getElementById('wrongList');
const clearWrongBtn = document.getElementById('clearWrongBtn');

let score = Number(localStorage.getItem('score') || '0');
let solved = Number(localStorage.getItem('solved') || '0');
let currentQuestion = null;

function updateScore() {
  scoreBadge.textContent = `정답 ${score} / 풀이 ${solved}`;
  localStorage.setItem('score', String(score));
  localStorage.setItem('solved', String(solved));
}

function getWrongNotes() {
  return JSON.parse(localStorage.getItem('wrongNotes') || '[]');
}

function saveWrongNote(question, selectedIndex) {
  const notes = getWrongNotes();
  notes.unshift({
    id: question.id,
    subjectName: question.subjectName,
    question: question.question,
    selected: question.choices[selectedIndex],
    answer: question.choices[question.answer],
    explanation: question.explanation,
    savedAt: new Date().toLocaleString('ko-KR')
  });
  localStorage.setItem('wrongNotes', JSON.stringify(notes.slice(0, 50)));
  renderWrongNotes();
}

function renderWrongNotes() {
  const notes = getWrongNotes();
  if (notes.length === 0) {
    wrongList.textContent = '아직 저장된 오답이 없습니다.';
    return;
  }
  wrongList.innerHTML = notes.map((note) => `
    <div class="wrong-item">
      <strong>[${note.subjectName}] ${note.question}</strong>
      <p>선택: ${note.selected}</p>
      <p>정답: ${note.answer}</p>
      <p>${note.explanation}</p>
      <small>${note.savedAt}</small>
    </div>
  `).join('');
}

function renderQuestion(question) {
  currentQuestion = question;
  quizTitle.textContent = `[${question.subjectName}] 문제 ${question.id}`;
  quizBox.innerHTML = `
    <h3>${question.question}</h3>
    <div class="choices">
      ${question.choices.map((choice, index) => `
        <button class="choice" data-index="${index}">${index + 1}. ${choice}</button>
      `).join('')}
    </div>
    <div id="explanationArea"></div>
  `;

  document.querySelectorAll('.choice').forEach((button) => {
    button.addEventListener('click', () => checkAnswer(Number(button.dataset.index)));
  });
}

function checkAnswer(selectedIndex) {
  if (!currentQuestion) return;
  solved += 1;
  const buttons = document.querySelectorAll('.choice');
  buttons.forEach((btn) => btn.disabled = true);

  const isCorrect = selectedIndex === currentQuestion.answer;
  if (isCorrect) score += 1;
  else saveWrongNote(currentQuestion, selectedIndex);

  buttons.forEach((btn, index) => {
    if (index === currentQuestion.answer) btn.classList.add('correct');
    if (index === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  document.getElementById('explanationArea').innerHTML = `
    <div class="explanation">
      <strong>${isCorrect ? '정답입니다.' : '오답입니다.'}</strong>
      <p>${currentQuestion.explanation}</p>
    </div>
  `;
  updateScore();
}

async function fetchRandomQuestion(subject = '') {
  const url = subject ? `/api/quiz/random?subject=${subject}` : '/api/quiz/random';
  const res = await fetch(url);
  if (!res.ok) throw new Error('문제를 불러오지 못했습니다.');
  return res.json();
}

randomBtn.addEventListener('click', async () => {
  const question = await fetchRandomQuestion();
  renderQuestion(question);
});

document.querySelectorAll('.subject-card').forEach((card) => {
  card.addEventListener('click', async () => {
    const subject = card.dataset.subject;
    const question = await fetchRandomQuestion(subject);
    renderQuestion(question);
  });
});

wrongNoteBtn.addEventListener('click', () => {
  document.querySelector('.wrong-note').scrollIntoView({ behavior: 'smooth' });
});

clearWrongBtn.addEventListener('click', () => {
  localStorage.removeItem('wrongNotes');
  renderWrongNotes();
});

updateScore();
renderWrongNotes();
