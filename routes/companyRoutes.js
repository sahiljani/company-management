const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, companyController.createCompany);
router.get('/', verifyToken, companyController.getCompanies);
router.put('/:id', verifyToken, companyController.updateCompany);
router.delete('/:id', verifyToken, companyController.deleteCompany);

module.exports = router;
