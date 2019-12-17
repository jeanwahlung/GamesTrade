const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
let User = require('../Backend/User');
let UserSession = require('../Backend/UserSession');
let Trade = require('../Backend/Trade')

let Todo = require('./User');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/api/account/verify').get(function (req, res) {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        } else {
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    });
});
todoRoutes.route('/api/account/update/:id').post(function(req, res) {
    UserSession.findOneAndDelete({userId:req.params.id}, function(err, user) {
        
       
       
    });
});

todoRoutes.route('/api/account/logout').post(function (req, res) {
    UserSession.findById(req.params.userId, function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.isDeleted = true;
            

            user.save().then(user => {
                res.json('user updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


todoRoutes.route('/api/account').get(function (req, res) {
    UserSession.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

todoRoutes.route('/api/account/users').get(function (req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
todoRoutes.route('/api/account/trades/add').post(function(req, res) {
    let trade = new Trade(req.body);
    trade.save()
        .then(trade => {
            res.status(200).json({'trade': 'trade added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new trade failed');
        });
});
todoRoutes.route('/api/account/trades/update/:id').post(function(req, res) {
    Trade.findById(req.params.id, function(err, trade) {
        if (!trade)
            res.status(404).send('data is not found');
        else
            trade.userId1 = req.body.userId1;
            trade.userId2 = req.body.userId2;
            trade.isTraded1 = req.body.isTraded1;
            trade.isTraded2 = req.body.isTraded2;

            trade.save().then(trade => {
                res.json('trade updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/api/account/trades/delete/:id').delete(function(req, res) {
    let id = req.params.id;
    Trade.findByIdAndRemove(id, function(err, trade) {
        res.json(trade);
    });
});
todoRoutes.route('/api/account/trades/').get(function(req, res) {
    Trade.find(function(err, trades) {
        if (err) {
            console.log(err);
        } else {
            res.json(trades);
        }
    });
});



todoRoutes.route('/api/account/signup').post(function (req, res) {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;
    let {
        name
    } = body;
    let {
        lastname
    } = body;
    

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }
    if (!lastname) {
        return res.send({
            success: false,
            message: 'Error: last name cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        // Save the new user
        const newUser = new User();

        newUser.email = email;
        newUser.name = name;
        newUser.lastname = lastname;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
});

todoRoutes.route('/api/account/signin').post(function (req, res) {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;


    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }

            return res.send({
                success: true,

                token: doc._id
            });
        });
    });
});

app.use('/users', todoRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});