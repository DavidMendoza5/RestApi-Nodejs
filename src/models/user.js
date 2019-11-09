const pool = require('../database/connection');

let userModel = {};

userModel.getUser = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM clientes ORDER BY id',
            (err, rows) => {
                if(err){
                    throw err;
                }else{
                    callback(null, rows);
                }
            }
        )
    }
};
userModel.getanUser = (id , callback)=>{
    if(pool){
        console.log(id)
        pool.query(`SELECT * FROM clientes WHERE id ='${id}'`,(err,rows)=>{
           if(err){
               throw err;
           }else{
               callback(null,rows)
           }
        });
    }
};

userModel.insertUser = (userData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO clientes SET ?', userData,
            (err, result) => {
                if(err){
                    throw err;
                }else{
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
}

userModel.updateUser = (userData, callback) => {
    if(pool){
        const sql = `
        UPDATE clientes SET
        nombre =  ${pool.escape(userData.nombre)},
        apaterno = ${pool.escape(userData.apaterno)},
        amaterno = ${pool.escape(userData.amaterno)},
        telefono = ${pool.escape(userData.telefono)},
        direccion = ${pool.escape(userData.direccion)}
        WHERE id = ${pool.escape(userData.id)}
        `
        pool.query(sql, (err, result) => {
            if(err){
                throw err;
            }else {
                callback(null, {
                    "msg":"success"
                });
            }
        });
    }
};

userModel.deleteUser = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM clientes WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM clientes WHERE id = ${id}
                `;
                pool.query(sql, (err, result) => {
                    if(err){
                        throw err;
                    }else{
                        callback(null, {
                            msg:'deleted'
                        })
                    }
                })
            }else{
                callback(null, {
                    msg: 'not exists'
                })
            }
        });
    }
};

module.exports = userModel;