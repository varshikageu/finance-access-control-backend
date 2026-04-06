const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const dashboard = require('../controllers/dashboardController');

router.get('/summary', authenticate, dashboard.getSummary);

module.exports = router;