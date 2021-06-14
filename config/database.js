const mysql = require('mysql');

const config = {
    host : 'localhost',
    user : 'user.nodejs',
    port : 3307,
    password : 'PARZIVAL11',
    database : 'drivelocal'
};

const conn = mysql.createConnection(config);

conn.connect((err)=>{
    if(err) throw err;
    console.log('Database is connected succesfully!');
});

module.exports = conn;