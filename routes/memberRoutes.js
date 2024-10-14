const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, memberController.createMember);
router.get('/', verifyToken, memberController.getMembers);
router.put('/:id', verifyToken, memberController.updateMember);
router.delete('/:id', verifyToken, memberController.deleteMember);

module.exports = router;
