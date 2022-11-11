import express = require('express');
import { User } from '../models/user';
import { Roles } from '../models/enum';
import { makeUserArrayView, makeUserView } from '../projections/user';
import { randomUUID } from 'crypto';

const all = async (req: express.Request, res: express.Response) => {
        User.find({})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then ((data) => {
            res.json(makeUserArrayView(data));
        })
};

const id = async (req: express.Request, res: express.Response) => {
        User.findOne({id: req.query.id})
        .then((data) => {
            res.json(makeUserView(data));
        })
}

const create = (req: express.Request, res: express.Response) => {
        User.create({...req.body, id: randomUUID()}, (error, result) => {
            console.log(error);
            return result;
        })
        res.json(req.body);
        res.end();
}

const update = (req: express.Request, res: express.Response) => {
        User.updateOne({id : req.query.id}, req.body, (error) => {
            if(error) {
                console.log(error);
                res.json(null);
            }
            else {
                res.json(req.body);
            }
        })
}

const remove = (req : express.Request, res : express.Response) => {
        User.deleteOne({id: req.query.id})
        .then ((result) => {
            res.end();
        })
        .catch((error) => {
            console.log(error);
            res.end();
        })
}

const filter = async (req: express.Request, res: express.Response) => {
        const query : UserQuery = makeQuery(req);
        
        User.find({username: {$regex: ".*" + query.username + ".*" , $options: "i"}})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then((result) => {
            res.json(makeUserArrayView(result));
            res.end();
        }).catch((err) => {
            console.log(err);
            res.end();
        })
}


interface UserQuery {
    username : string
}

const makeQuery = (req : express.Request) => {
    return {
        username: (req.query.username) ? (req.query.username as string) : ""
    }
}

export default {all, id, create, update, remove, filter};
