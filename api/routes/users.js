const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

router.delete('/:_id', /*checkAuth,*/ (req, res, next) => {
    const id = req.params._id;
    res.status(200).json({
        id: id
    });
    User.deleteOne({ _id: id })
         .exec()
         .then(product => {
            res.status(200).json({
                message: "User deleted!"
            });
         })
         .catch(err => {
             res.status(404).json({
                message: "User not found!",
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
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({error: err});
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            lastname: req.body.lastname,
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            role: req.body.role
                        });
                        user.save()
                            .then(result => {
                                res.status(200).json({
                                    message: "User created!",
                                    user: result
                                });
                            })
                            .catch(err => {
                                res.status(500).json({error: err});
                        });
                    }
                });

            }
        });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: "Auth failed!"
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    return res.status(401).json({message: 'Auth failed!'});
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id,
                            role: user.role,
                            name: user.name,
                            lastname: user.lastname,
                            username: user.username,
                        }, 
                        process.env.JWT_KEY || "secret",
                        {
                            expiresIn: "1h"
                        });

                        return res.status(200).json({
                            message: 'Auth successfull!',
                            token: token
                        }
                    );
                }
                else{
                    res.status(500).json({
                        message: "Auth failed!"
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.body.userId})
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