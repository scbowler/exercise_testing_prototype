const express = require('express');
const { resolve } = require('path');
const db = require('./db');
const verify = require('./verify');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

app.get('/api/exercises', async (req, res) => {

    const [exercises] = await db.query('SELECT e.pid, e.title, COUNT(q.id) AS questions  FROM exercises AS e LEFT JOIN exerciseQuestions AS q ON q.exerciseId=e.id GROUP BY e.id');

    res.send({
        exercises
    });
});

app.get('/api/exercises/:id', async (req, res) => {
    const { id } = req.params;

    const [[{title, exId}]] = await db.execute('SELECT title, id AS exId FROM exercises WHERE pid=?', [id]);

    const [questions] = await db.execute('SELECT question, pid FROM exerciseQuestions WHERE exerciseId=?', [exId]);

    res.send({ title, questions });
});

app.post('/api/admin/exercises/:id/questions/test', async (req, res) => {
    try {
        const { answer, question, test } = req.body;

        if (!answer) throw new Error('Missing answer');
        if (!question) throw new Error('Missing question');
        if (!test) throw new Error('Missing test');

        const { result, passed } = await runTest(answer, test);

        res.send({
            result, passed
        });

    } catch (err) {
        res.status(418).send({
            message: 'Error testing new question for exercise',
            error: err.message
        });
    }
});

app.post('/api/admin/exercises/:id/questions', async (req, res) => {
    try {
        const { answer, question, test } = req.body;
        const { id } = req.params;

        if(!answer) throw new Error('Missing answer');
        if(!question) throw new Error('Missing question');
        if(!test) throw new Error('Missing test');

        const {result, passed} = await runTest(answer, test);

        if(!passed){
            throw new Error('Test Failed!');
        }

        const [[{exId}]] = await db.execute('SELECT id AS exId FROM exercises WHERE pid=?', [id]);

        const [dbResult] = await db.execute('INSERT INTO exerciseQuestions (pid, question, answer, test, exerciseId) VALUES (UUID(), ?, ?, ?, ?)', [question, answer, test, exId]);

        if(!dbResult.affectedRows){
            throw new Error('Failed to save test to database');
        }

        const [[q]] = await db.query('SELECT answer, created, pid, question, test FROM exerciseQuestions WHERE id=?', [dbResult.insertId]);

        res.send({
            message: 'Question successfully added',
            question: q
        });

    } catch (err) {
        res.status(418).send({
            message: 'Error adding new question to exercise',
            error: err.message
        });
    }
});

app.post('/api/exercises/questions/test/:qid', async (req, res) => {
    const { body: { solution }, params: { qid } } = req;

    const [[question = null]] = await db.execute('SELECT answer, test FROM exerciseQuestions WHERE pid=?', [qid]);

    const {result, passed} = await runTest(solution, question.test);

    let instructorSolution = 'Must pass to view';

    if(passed){
        instructorSolution = question.answer;
    }

    res.send({
        passed,
        instructorSolution,
        studentSolution: solution,
        qid,
        result,
    });
});

app.post('/api/admin/exercises', async (req, res) => {
    try {
        const { title } = req.body;

        if(!title) throw new Error('Missing title');

        const [result] = await db.execute('INSERT INTO exercises (pid, title) VALUES (UUID(), ?)', [title]);

        if(!result.affectedRows) throw new Error('Error creating new exercise');

        const [[exercise]] = await db.query('SELECT pid FROM exercises WHERE id=?', [result.insertId]);

        res.send({
            id: exercise.pid
        });
    } catch(err) {
        res.status(418).send({
            message: 'Error creating new exercise',
            error: err.message
        });
    }
});

app.get('/api/admin/exercises/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [[{ exId, title }]] = await db.execute('SELECT title, id AS exId FROM exercises WHERE pid=?', [id]);

        const [questions] = await db.query('SELECT question, pid, answer, test, created FROM exerciseQuestions WHERE exerciseId=?', [exId]);

        res.send({ title, questions });
    } catch(err) {
        res.status(404).send('No exercise found');
    }
});

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist'));
});

app.listen(PORT, () => {
    console.log('Server running @ localhost:%d', PORT);
});

async function runTest(solution, testSuite){
    const test = {};

    test.result = await verify({ solution, testSuite });

    test.passed = !(test.result.error);

    return test;
}
