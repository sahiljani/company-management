const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, expenseController.createExpense);
router.get('/', verifyToken, expenseController.getExpenses);
router.put('/:id', verifyToken, expenseController.updateExpense);
router.delete('/:id', verifyToken, expenseController.deleteExpense);

module.exports = router;
