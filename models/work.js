const db = require('../config/database')

module.exports = {

    findWorkById : (id, callback) =>{
        let sql = 'SELECT * FROM works WHERE id=?';
        db.query(sql, id, (err, data) =>{
            if(err) throw err;
            return callback(data[0]);
        });
    },
    getWorks: (id, cb) =>{
        let sql = 'SELECT * FROM works WHERE idusuario !=?';
        db.query(sql, id, (err,data) =>{
            if(err) throw err;
            if(data.length > 0) return cb(data);
            return cb(null)
        })
    },

    findWorkByIdUser:(id, callback)=>{
        let sql = 'SELECT * FROM works WHERE idUsuario =?';
        db.query(sql, id, (err, data) => {
            if(err) throw err;
            return callback(data);
        })
    },

    createWork: (work, cb)=>{
        let sql = 'INSERT INTO works SET ?';
        db.query(sql, work, (err, data)=>{
            if(err) throw err;
            return cb(data);
        })
    },

    updateWork: (work, cb)=>{
        let sql = 'UPDATE works set nombre=?, descripcion=? WHERE id=?';
        db.query(sql, [work.name, work.description, work.id], (err, data)=>{
            if(err) throw err;
            return cb(data);
        } )
    },

    deleteWork : (id, cb)=>{
        let sql = 'DELETE FROM works WHERE id=?';
        db.query(sql, id, (err, data)=>{
            if(err) throw err;
            return cb(data);
        })
    }
}