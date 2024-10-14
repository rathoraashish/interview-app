import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.json());

// API routes
app.get('/api/tests', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/tests.json'), 'utf8');
    const tests = JSON.parse(data);
    res.json(tests);
  } catch (error) {
    console.error('Error reading tests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tests/:id', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/tests.json'), 'utf8');
    const tests = JSON.parse(data);
    const test = tests.find(t => t.id === req.params.id);
    if (test) {
      res.json(test);
    } else {
      res.status(404).json({ error: 'Test not found' });
    }
  } catch (error) {
    console.error('Error reading test:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tests/:id/submit', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/tests.json'), 'utf8');
    const tests = JSON.parse(data);
    const test = tests.find(t => t.id === req.params.id);
    if (test) {
      const userAnswers = req.body.answers;
      let score = 0;
      test.questions.forEach(question => {
        if (userAnswers[question.id] === question.correctAnswer) {
          score++;
        }
      });
      res.json({ score });
    } else {
      res.status(404).json({ error: 'Test not found' });
    }
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});