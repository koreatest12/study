const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '..', 'data');
const subjectsPath = path.join(dataDir, 'subjects.json');
const questionsPath = path.join(dataDir, 'questions.json');

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message);
    process.exit(1);
  }
}

const subjects = JSON.parse(fs.readFileSync(subjectsPath, 'utf-8'));
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));

assert(Array.isArray(subjects), 'subjects.json must be an array');
assert(subjects.length >= 5, 'subjects.json should contain five subjects');
assert(Array.isArray(questions), 'questions.json must be an array');
assert(questions.length >= 25, 'questions.json should contain at least 25 questions');

for (const question of questions) {
  assert(question.id, 'question must have id');
  assert(question.subject, 'question must have subject');
  assert(question.question, 'question must have question text');
  assert(Array.isArray(question.options), 'question options must be an array');
  assert(question.options.length === 4, 'question must have four options');
  assert([1, 2, 3, 4].includes(question.answer), 'answer must be 1~4');
  assert(question.explanation, 'question must have explanation');
}

console.log('All study data tests passed.');
