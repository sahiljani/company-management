const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, incomeController.createIncome);
router.get('/', verifyToken, incomeController.getIncomes);
router.put('/:id', verifyToken, incomeController.updateIncome);
router.delete('/:id', verifyToken, incomeController.deleteIncome);

module.exports = router;
