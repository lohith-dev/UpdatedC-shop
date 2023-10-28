const path = require('path');

const express = require('express');

const expController = require('../controllers/expenseController.js');

const router = express.Router();

// /admin/add-product => GET 
router.get('/', expController.getappntdata);

router.post('/', expController.addNewCandy);

router.put('/',expController.updAppntdata)





// /admin/products => GET




module.exports = router;
