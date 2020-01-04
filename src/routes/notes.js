const express = require('express');
const router = express.Router();

const Note = require('../models/Note');


router.get('/notes/add', (req, res) => {
    res.render('notes/new-notes-form');
});

router.post('/notes/new-notes-form', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Plese Write a Title' });
    }
    if (!description) {
        errors.push({ text: 'Please Write a Description' })
    }
    if (errors.length > 0) {
        res.render('notes/new-notes-form', {
            errors, title, description
        });
    }
    else {
        const newNote = new Note({ title, description });
        console.log(newNote);
        await newNote.save();
        res.redirect('/notes')
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date:'desc'});
    res.render('notes/all-notes',{notes})
});


module.exports = router;