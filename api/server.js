const express = require('express');
const Hobbit = require('./hobbits/hobbits-model');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "up"});
});

server.get('/hobbits', (req, res) => {
    Hobbit.getAll()
        .then(hobbits => {
            res.status(200).json(hobbits)
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
});

server.post('/hobbits', (req, res) => {
    Hobbit.insert(req.body)
        .then(hobbit => {
            res.status(201).json(hobbit);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
});

server.delete('/hobbits/:id', (req, res) => {
    Hobbit.remove(req.params.id)
        .then(hobbit => {
            res.status(200).json(hobbit)
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

server.get('/:id', (req, res) => {
    Hobbit.getById(req.params.id)
        .then(hobbit => {
            res.status(200).json(hobbit);
        })
        .catch(err => {
            res.status(500).json(err.message)
        });
});

module.exports = server;