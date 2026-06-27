const subjectList = document.getElementById('subject-list');
const subjectSelect = document.getElementById('subject-select');
const levelSelect = document.getElementById('level-select');
const quizList = document.getElementById('quiz-list');
const loadQuizButton = document.getElementById('load-quiz');
const gradeButton = document.getElementById('grade-button');
const scoreBox = document.getElementById('score-box');

let subjects = [];
let questions = [];
let currentQuestions = [];

async function loadData() {
  const subjectResponse = await fetch('../data/subjects.json');
  const questionResponse = await fetch('../data/questions.json');
  subjects = await subjectResponse.json();
  questions = await questionResponse.json();
}

function clearElement(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

function addTextElement(parent, tagName, text, className) {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (className) element.className = className;
  parent.appendChild(element);
  return element;
}

function renderSubjects() {
  clearElement(subjectList);
  subjectSelect.innerHTML = '<option value="">전체 과목</option>';

  subjects.forEach(function (subject) {
    const card = document.createElement('article');
    card.className = 'subject-card';
    addTextElement(card, 'h3', subject.name);
    addTextElement(card, 'p', subject.description);

    const keywordBox = document.createElement('div');
    subject.keywords.forEach(function (keyword) {
      addTextElement(keywordBox, 'span', keyword, 'keyword');
    });
    card.appendChild(keywordBox);
    subjectList.appendChild(card);

    const option = document.createElement('option');
    option.value = subject.id;
    option.textContent = subject.name;
    subjectSelect.appendChild(option);
  });
}

function renderQuestions() {
  clearElement(quizList);
  scoreBox.style.display = 'none';

  const subject = subjectSelect.value;
  const level = levelSelect.value;
  currentQuestions = questions.filter(function (question) {
    if (subject && question.subject !== subject) return false;
    if (level && question.level !== level) return false;
    return true;
  });

  currentQuestions.forEach(function (question, index) {
    const card = document.createElement('article');
    card.className = 'question-card';
    card.dataset.id = question.id;

    addTextElement(card, 'h3', String(index + 1) + '. ' + question.question);
    addTextElement(card, 'p', question.subject + ' / ' + question.level, 'keyword');

    question.options.forEach(function (optionText, optionIndex) {
      const label = document.createElement('label');
      label.className = 'option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = question.id;
      input.value = String(optionIndex + 1);

      label.appendChild(input);
      label.appendChild(document.createTextNode(' ' + String(optionIndex + 1) + '. ' + optionText));
      card.appendChild(label);
    });

    const explanation = addTextElement(card, 'p', '해설: ' + question.explanation, 'explanation');
    explanation.hidden = true;

    quizList.appendChild(card);
  });
}

function gradeQuestions() {
  if (currentQuestions.length === 0) return;

  let correct = 0;
  const cards = quizList.querySelectorAll('.question-card');

  cards.forEach(function (card) {
    const question = currentQuestions.find(function (item) {
      return item.id === card.dataset.id;
    });
    const checked = card.querySelector('input[type="radio"]:checked');
    const explanation = card.querySelector('.explanation');

    if (checked && question && Number(checked.value) === Number(question.answer)) {
      correct += 1;
      card.style.borderColor = '#22c55e';
    } else {
      card.style.borderColor = '#f97316';
    }

    if (explanation) explanation.hidden = false;
  });

  const score = Math.round((correct / currentQuestions.length) * 100);
  scoreBox.style.display = 'block';
  scoreBox.textContent = '점수: ' + score + '점 / 정답 ' + correct + '개 / 전체 ' + currentQuestions.length + '개';
}

loadQuizButton.addEventListener('click', renderQuestions);
gradeButton.addEventListener('click', gradeQuestions);

loadData()
  .then(function () {
    renderSubjects();
    renderQuestions();
  })
  .catch(function () {
    addTextElement(subjectList, 'p', '데이터를 불러오지 못했습니다. Node.js 서버 실행 후 접속해 주세요.');
  });
