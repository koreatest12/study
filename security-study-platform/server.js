const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'data', 'questions.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadQuestions() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'information-security-engineer-study-platform',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/questions', (req, res) => {
  const { subject, limit } = req.query;
  let questions = loadQuestions();

  if (subject) {
    questions = questions.filter((q) => q.subject === subject);
  }

  if (limit && !Number.isNaN(Number(limit))) {
    questions = questions.slice(0, Number(limit));
  }

  res.json({
    total: questions.length,
    questions
  });
});

app.get('/api/quiz/random', (req, res) => {
  const { subject } = req.query;
  let questions = loadQuestions();

  if (subject) {
    questions = questions.filter((q) => q.subject === subject);
  }

  if (questions.length === 0) {
    return res.status(404).json({ message: '해당 조건의 문제가 없습니다.' });
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  res.json(questions[randomIndex]);
});

app.get('/api/subjects', (req, res) => {
  res.json([
    { code: 'system', name: '시스템 보안' },
    { code: 'network', name: '네트워크 보안' },
    { code: 'application', name: '어플리케이션 보안' },
    { code: 'general', name: '정보보안 일반' },
    { code: 'management', name: '정보보안 관리 및 법규' }
  ]);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`정보보안기사 학습 플랫폼 실행 중: http://localhost:${PORT}`);
  });
}

module.exports = app;
