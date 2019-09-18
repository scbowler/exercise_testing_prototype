const express = require('express');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

app.get('/api/exercises', (req, res) => {
    res.send({
        message: 'Get list of exercises'
    });
});

app.get('/api/exercises/:id', (req, res) => {
    res.send({
        message: 'Get list of questions'
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
