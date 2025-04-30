const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const DATA_FILE = path.join(__dirname, 'enterprises.json');
const questionsPath = path.join(__dirname, 'questions.json');

app.use(cors());
app.use(bodyParser.json());

// Получить все заводы
app.get('/enterprises', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).send('Ошибка чтения файла');
        res.json(JSON.parse(data));
    });
});

app.get('/questions', (req, res) => {
    fs.readFile(questionsPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Ошибка при загрузке вопросов!');
        res.json(JSON.parse(data));
    });
});

// Добавить завод
app.post('/enterprises', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).send('Ошибка чтения файла');
        const enterprises = JSON.parse(data);
        const newEnterprise = { ...req.body, id: Date.now().toString() };
        enterprises.push(newEnterprise);
        fs.writeFile(DATA_FILE, JSON.stringify(enterprises, null, 2), (err) => {
            if (err) return res.status(500).send('Ошибка записи файла');
            res.json(newEnterprise);
        });
    });
});

// Изменить завод
app.put('/enterprises/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).send('Ошибка чтения файла');
        let enterprises = JSON.parse(data);
        enterprises = enterprises.map(p => p.id === req.params.id ? { ...p, ...req.body } : p);
        fs.writeFile(DATA_FILE, JSON.stringify(enterprises, null, 2), (err) => {
            if (err) return res.status(500).send('Ошибка записи файла');
            res.json({ success: true });
        });
    });
});

// Удалить завод
app.delete('/enterprises/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).send('Ошибка чтения файла');
        let enterprises = JSON.parse(data);
        enterprises = enterprises.filter(p => p.id !== req.params.id);
        fs.writeFile(DATA_FILE, JSON.stringify(enterprises, null, 2), (err) => {
            if (err) return res.status(500).send('Ошибка записи файла');
            res.json({ success: true });
        });
    });
});



const PORT = 4000;
app.listen(PORT, () => {
    console.log('Backend запущен на http://localhost:' + PORT);
});