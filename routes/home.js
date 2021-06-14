const express = require('express');
const router = express.Router();
const dbwork = require('../models/work')
const mvc = require('../controller/root')

router.get('/', mvc.home);

router.get('/aceptar/:id', mvc.aceptarParo)

router.post('/upload', mvc.upload);

module.exports = router;