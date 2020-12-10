const bcrypt = require('bcrypt');
const saltRounds = 10;
const dao = require('../models/user');
const daowork = require('../models/work');
const daoPendientes = require('../models/pendientes');

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) => {
    dao.findUserById(id,(data)=>{
      done(null, data)
    });
  }

const pass = (username, password,done) => {
    dao.findUser(username,(data) => {
      if(data)
        if(bcrypt.compareSync(password, data.password))
          return done(null,data);
        return done(null, false,{error: 'Contraseña incorrecta'});
    });
  }

const index = (req, res, next) =>{  
    res.render('index', { title: 'Hazme el paro' } );
}

const logout = (req, res)=>{
    if(req.isAuthenticated())
      req.logout();
    res.render('index'); 
  }

const registro = (req, res, next)=>{
    res.render('registro');
  }

const insertar = (req, res) =>{
    let login = req.body.usuario;
    dao.findUser(login, (data)=>{
      if(!data){
        let user = {
          nombre : req.body.nombre,
          apellido : req.body.apellido,
          usuario : req.body.usuario,
          password : bcrypt.hashSync(req.body.password, saltRounds)
        };
  
        dao.insertUser(user, (data) =>{
          if(data.affectedRows === 0){
            res.redirect('/registro');
          }
          else {
            res.redirect('/');
          }
        })
      }
    })
  }

const home = (req, res) => {
    const {id} = req.user
    if(req.isAuthenticated()){
        daowork.getWorks(id, data=>{
            if(data)
                res.render('home', {data});
            else res.render('home');
        })
    }      
    else res.render('index');
  }

const misparos = (req, res) =>{
    let id = req.user.id;
    if(req.isAuthenticated()){
        daowork.findWorkByIdUser(id, (data) =>{
            if(data)
                res.render('misparos', {data})
            else res.render('misparos')
        })
    }
    else res.render('index')
  }

const pendientes = (req, res) =>{
    const {id} = req.user;
    if(req.isAuthenticated()){
      daoPendientes.getPendientes(id,(data)=>{
        if(data)
            res.render('pendientes',{data})
        else res.render('pendientes')
      })
    }
    else res.render('index')
  }

const upload = (req, res)=>{
    const work = {
      nombre: req.body.name,
      descripcion: req.body.description,
      idUsuario : req.user.id,
      nombreUsuario : req.user.nombre
    }

    daowork.createWork(work, (data)=>{
      if(data.affectedRows != 0){
        const respuesta = {
            res: 'Tarea Creada',
        }
        res.send(respuesta)

      }
    })
  }

const deleteParo = (req, res)=>{
    const {id} = req.params;
    daowork.deleteWork(id,(data)=>{
        res.redirect('/misparos')
    })
}

const updateParo = (req, res) =>{
    const {nombre} = req.body
    const {descripcion} = req.body
    const {id} = req.body

    const newwork = {
        id: id,
        name: nombre,
        description: descripcion
    }

    daowork.updateWork(newwork,(data)=>{
        const response = {
            message: 'Se han actualizado los datos'
        }

        res.send(response)
    })
}

const aceptarParo = (req, res) => {
    const {id} = req.params
    const iduser = req.user.id

    daowork.findWorkById(id, (data)=>{
        let pendiente = {
          nombre : data.nombre,
          descripcion : data.descripcion,
          nombreUsuario : data.nombreUsuario,
          idUsuario : iduser
        }

        console.log(pendiente)
        daoPendientes.createPendiente(pendiente, (data) => {
          if(data.affectedRows > 0) {
            console.log('pendiente creado')
          }
        })

        daowork.deleteWork(id,(data)=>{
            if(data.affectedRows > 0)
              res.redirect('/home')
        })
    })
}

const completado = (req, res) => {
    const id = req.body.id

    daoPendientes.deletePendiente(id, (data)=>{
        if(data.affectedRows > 1){
          console.log(data)
          res.send(data)
        }
    })
}

module.exports = {
    index,
    logout,
    registro,
    insertar,
    home,
    upload,
    pass,
    serialize,
    deserialize,
    misparos,
    pendientes,
    deleteParo,
    updateParo,
    aceptarParo, 
    completado
}