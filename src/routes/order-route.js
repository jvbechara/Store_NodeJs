const express = require('express');
const router = express.Router();
const controller = require('../controller/order-controller');
const authService = require('../services/auth-service');

router.post('/', authService.authorize, controller.post);
router.get('/', authService.authorize, controller.get);

module.exports = router;