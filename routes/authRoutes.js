'use strict';

const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

const { loginEmployee } = authController;

router.post('/login', loginEmployee);

module.exports = {
    routes: router
}
