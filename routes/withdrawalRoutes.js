const express = require('express');
const router = express.Router();
const withdrawalController = require('../controllers/withdrawalController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, withdrawalController.createWithdrawal);
router.get('/', verifyToken, withdrawalController.getWithdrawals);
router.put('/:id', verifyToken, withdrawalController.updateWithdrawal);
router.delete('/:id', verifyToken, withdrawalController.deleteWithdrawal);

module.exports = router;
