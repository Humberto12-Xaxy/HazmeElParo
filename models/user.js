const db = require('../config/database')

module.exports = {
    findUser : (usuario, callback) =>{
        let sql = 'SELECT * FROM user WHERE usuario =?';
        db.query(sql, usuario, (err, data) =>{
            if(err) throw err;
            if(data.length > 0) return callback(data[0]);
            return callback(null);
        })
    },

    findUserById : (id, callback) =>{
        let sql = 'SELECT * FROM user WHERE id=?';
        db.query(sql, id, (err, data) =>{
            if(err) throw err;
            return callback(data[0]);
        });
    },

    getUser : (callback) =>{
        let sql = 'SELECT * FROM user';
        db.query(sql, (err, data) =>{
            if(err) throw err;
            if(data.length > 0) return callback(data);
            return callback(null);
        });
    },

    insertUser : (user, callback) =>{
        let sql = 'INSERT INTO user SET ?';
        db.query(sql, user, (err, data)=>{
            if(err) throw err;
            return callback(data);
        });
    },

    updateUser : (user, callback) =>{
        let sql = 'UPDATE user SET nombre =?, apellido =? WHERE id=?';
        db.query(sql, [user.nombre, user.apellido, user.id], (err, data)=>{
            if(err) throw err;
            return callback(data);
        });
    },

    updatePassword : (user, callback) =>{
        let sql = 'UPDATE user SET password=? WHERE id =?';
        db.query(sql, [user.password, user.id], (err, data) =>{
            if(err) throw err;
            return callback(data);
        });
    },

    deleteUser : (id, callback) =>{
        let sql = 'DELETE FROM user WHERE id=?';
        db.query(sql, id, (err,data)=>{
            if(err) throw err;
            return callback(data)
        });
    }
}