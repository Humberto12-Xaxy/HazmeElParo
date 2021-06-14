const express = require('express');
const router = express.Router();
const dbwork = require('../models/work')
const mvc = require('../controller/root')

router.get('/', mvc.misparos)

router.get('/delete/:id', mvc.deleteParo)

router.put('/update', mvc.updateParo)

module.exports = router;