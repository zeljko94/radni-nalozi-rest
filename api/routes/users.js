const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');


router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .exec()
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: "Auth failed!"
                });
            }
            else{
                return res.status(200).json({
                    message: "Login successfull!",
                    user: user
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/radnici', (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            return res.status(200).json(result.filter(r => r.role.toLowerCase() == "radnik"));
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
});

router.post('/signup', (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user){
                return res.status(422).json({
                    message: "Email already in use!"
                });
            }
            else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                });
                user.save()
                    .then(result => {
                        return res.status(200).json({
                            message: "User created!",
                            user: result
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({error: err});
                    });
            }
        });
});


router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set:  updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User updated successfully!",
                user: result
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});



router.delete('/:userId', (req, res, next) => {
    User.deleteOne({ _id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;