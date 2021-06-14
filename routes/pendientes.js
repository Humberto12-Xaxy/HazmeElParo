const express = require('express');
const router = express.Router();
const dbwork = require('../models/work')
const mvc = require('../controller/root')

router.get('/', mvc.pendientes)

router.post('/completado', mvc.completado)

module.exports = router;