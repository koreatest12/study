const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const dataDir = path.join(rootDir, 'data');

app.use(express.json());
app.use(express.static(publicDir));

function loadJson(fileName) {
  const filePath = path.join(dataDir, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

app.get('/health', function (req, res) {
  res.json({ status: 'ok', service: 'information-security-engineer-study' });
});

app.get('/subjects', function (req, res) {
  res.json(loadJson('subjects.json'));
});

app.get('/questions', function (req, res) {
  const questions = loadJson('questions.json');
  const subject = req.query.subject;
  const level = req.query.level;

  let result = questions;
  if (subject) result = result.filter((item) => item.subject === subject);
  if (level) result = result.filter((item) => item.level === level);

  res.json(result);
});

app.post('/grade', function (req, res) {
  const questions = loadJson('questions.json');
  const answers = Array.isArray(req.body.answers) ? req.body.answers : [];

  const details = answers.map(function (answer) {
    const question = questions.find((item) => item.id === answer.id);
    if (!question) return { id: answer.id, correct: false, reason: 'question not found' };
    return {
      id: question.id,
      subject: question.subject,
      correct: Number(answer.choice) === Number(question.answer),
      answer: question.answer,
      explanation: question.explanation
    };
  });

  const correctCount = details.filter((item) => item.correct).length;
  const score = details.length === 0 ? 0 : Math.round((correctCount / details.length) * 100);

  res.json({ total: details.length, correct: correctCount, score: score, details: details });
});

app.listen(port, function () {
  console.log('Study server running on http://localhost:' + port);
});
