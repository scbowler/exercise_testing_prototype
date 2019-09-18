const express = require('express');
const { resolve } = require('path');
const db = require('./db');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

app.get('/api/exercises', async (req, res) => {

    const [exercises] = await db.query('SELECT pid, title FROM exercises');

    res.send({
        exercises
    });
});

app.get('/api/exercises/:id', async (req, res) => {
    const { id } = req.params;

    const [results] = await db.execute('SELECT e.title, q.question, q.pid FROM exercises AS e JOIN exerciseQuestions AS q ON e.id=q.exerciseId WHERE e.pid=?', [id]);

    const [{ title }] = results;

    const questions = results.map(({title, ...q}) => ({...q}));

    res.send({
        title,
        questions
    });
});

app.post('/api/exercises/test/:qid', (req, res) => {
    res.send({
        questionId: qid,
        message: 'Your answer is wrong!'
    });
});

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist'));
});

app.listen(PORT, () => {
    console.log('Server running @ localhost:%d', PORT);
});
