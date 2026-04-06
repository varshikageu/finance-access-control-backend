const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');
const records = require('../controllers/recordController');

router.get('/', authenticate, authorize(['Admin', 'Analyst']), records.getAll);
router.post('/', authenticate, authorize(['Admin']), records.create);
// Added PUT route for updates
router.put('/:id', authenticate, authorize(['Admin']), records.update); 
router.delete('/:id', authenticate, authorize(['Admin']), records.delete);

module.exports = router;