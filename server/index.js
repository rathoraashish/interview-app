import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchAllSubjects, getQuestionsBySubject, getSubjectBySlug } from "./api.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.json());

// API routes
app.get('/api/tests', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/tests.json'), 'utf8');
    const dataFromDB = await fetchAllSubjects();
    console.log("dataFromDB", dataFromDB);
    const tests = JSON.parse(data);
    res.json(dataFromDB);
  } catch (error) {
    console.error('Error reading tests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tests/:slug', async (req, res) => {
  try {
    const subjectFromDB = await getSubjectBySlug(req.params.slug);

    if (subjectFromDB) {
      console.log("subjectFromDB", subjectFromDB);
      const questionsFromDB = await getQuestionsBySubject(req.params.slug);
      console.log("questionsFromDB", questionsFromDB);

      //Remove correct answer from response
      questionsFromDB.forEach(question => {
        delete question.correct_option;
      })

      let response = {...subjectFromDB, questions: questionsFromDB}

      res.json(response);
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
    console.log("req.params.slug", req.params.id)
    const questionsFromDB = await getQuestionsBySubject(req.params.id);
      console.log("questionsFromDB for submit", questionsFromDB)
    if (questionsFromDB) {
      const userAnswers = req.body.answers;
      let score = 0;
      questionsFromDB.forEach(question => {
        if (userAnswers[question.id] === question.correct_option) {
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