const express = require('express');
const router = express.Router();
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const mvc = require('../controller/root')

// configurando la estrategía de autenticación
passport.use(new PassportLocal(mvc.pass));

passport.serializeUser(mvc.serialize);
passport.deserializeUser(mvc.deserialize);

// Toma los datos del form y redirige a la vista home
router.post('/login', passport.authenticate('local',{
  successRedirect : '/home',
  failureRedirect : '/',
  failureFlash: 'Usuario o password incorrecto'
}));


/* Muestra la pagina principal. */
router.get('/', mvc.index);

// Cierre de sesion
router.get('/logout', mvc.logout);

// Lanza la vista registro
router.get('/registro', mvc.registro);

// Registro de usuario
router.post('/registro', mvc.insertar)

module.exports = router;
