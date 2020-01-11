const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length<=0){
        errors.push({ text: "Please insert a Name" })
    }
    if (password != confirm_password) {
        errors.push({ text: "Passwords do not match" })
    }
    if (password.length < 8) {
        errors.push({ text: 'Passwords must be at least 8 characters' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    }
    else {
        res.send('ok')
    }

})

module.exports = router;