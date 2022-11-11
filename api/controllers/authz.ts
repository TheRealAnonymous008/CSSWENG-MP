import express = require('express');
import Bcrypt = require('bcryptjs');
import { User } from '../models/user';
import signToken from '../utils/signToken';

const register =  (req : express.Request, res : express.Response) => {
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        password : Bcrypt.hashSync(req.body.password, 10),
        role : req.body.role
    }
    User.create(newUser);
    res.end();
}

const login = (req : express.Request, res : express.Response) => {
    console.log(`Attempting Login`)
    User.findOne({username : req.body.username})
    .then((user) => {
        if (user) {
            Bcrypt.compare(req.body.password, user.password, (error, result) => {
                console.info("Comparing Password")
                console.log(error)
                if(!result) {
                    res.cookie("This", "Meh");
                    return res.status(401).json({
                        success : false,
                        message : "Incorrect Password!"
                    })
                } 
                else if (result) {
                    let tk = signToken(user, (err, token, refreshToken) => {
                        if (err) {
                            return res.status(500).json({
                                success : false,
                                message : err.message,
                                error : err,
                            })
                        }
                        else if (token) {
                            console.log("Testing token")
                            if(refreshToken) {
                                console.log("Passing refreshToken")
                                console.log(refreshToken)
                                res.cookie('jwt', refreshToken, 
                                    {
                                        httpOnly:true,
                                        sameSite: "none",
                                        secure: true,
                                    })
                                    return res.status(200).json({
                                        success : true,
                                        message : "Authenticated",
                                        token: token
                                    });
                            }   
                        }
                    });
                }
                else if(error) {
                    return res.status(401).json({
                        success : false,
                        message : "Password Input Failure"
                    })
                }
            });
        } 
        else {
            res.json({
                success : false, 
                error : "User does not exist",
            });
        }
    })
    .catch((error) => {
        res.json({
            success : false, 
            error : error
        });
    })
}

const refresh = (req : express.Request, res : express.Response) => {
    console.log("TEST")
    console.log(req.cookies)
    res.status(200).send();
    
}

export default { login, register, refresh };