/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const emailApi = require('../helpers/email');
var express = require('express');
var router = express.Router();

var fetch = require('../fetch');

var { GRAPH_ME_ENDPOINT } = require('../authConfig');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/email',
    isAuthenticated,
    async function (req, res, next) {
    try{
        console.log("Users Router = user is " + req.session.account?.username);
        const useremail = req.session.account?.username;
        await emailApi.sendTemplateEmail(useremail,'WELCOME_EMAIL');
        console.log("email sent");
        res.render('index', {
            isAuthenticated: req.session.isAuthenticated,
            username: req.session.account?.username,
            fullName: req.session.account?.name
        });
    }catch(e){
        console.log(e);
        res.render('error/index',{
            isAuthenticated: req.session.isAuthenticated,
            username: req.session.account?.username,
            fullName: req.session.account?.name,
            error: e,
            CustomErrorMessage: ""
        });
    }
});

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        res.render('users/index_id', { 
          isAuthenticated: req.session.isAuthenticated,
          username: req.session.account?.username,
          fullName: req.session.account?.name,
          idTokenClaims: req.session.account.idTokenClaims
        });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
            res.render('users/index_profile', { 
                profile: graphResponse,
                isAuthenticated: req.session.isAuthenticated,
                username: req.session.account?.username,
                fullName: req.session.account?.name
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;