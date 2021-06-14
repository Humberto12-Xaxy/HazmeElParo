const db = require('../config/database')

module.exports = {

    createPendiente : (pendiente, cb) => {
        let sql = 'INSERT INTO pendientes SET ?';
        db.query(sql, pendiente,(err, data) => {
            if(err) throw err;
            return cb(data)
        })
    },

    getPendientes : (id, cb) => {
        let sql = 'SELECT * FROM pendientes WHERE idUsuario= ?'
        db.query(sql, id, (err, data) => {
            if(err) throw err;
            if(data.length > 0) return cb(data);
            return cb(null);
        })
    },

    deletePendiente : (id, cb) => {
        let sql = 'DELETE FROM pendientes WHERE id = ?';
        db.query(sql, id, (err, data) => {
            if(err) throw err;
            return cb(data)
        })
    }

}