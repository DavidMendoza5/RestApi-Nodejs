const pool = require('../database/connection');

let empleadoModel = {};

empleadoModel.getEmpleado = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM empleados ORDER BY id',
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

empleadoModel.insertEmpleado = (empleadoData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO empleados SET ?', empleadoData,
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

empleadoModel.updateEmpleado = (empleadoData, callback) => {
    if(pool){
        const sql = `
        UPDATE empleados SET
        usuario =  ${pool.escape(empleadoData.usuario)},
        contraseña = ${pool.escape(empleadoData.contraseña)}
        WHERE id = ${pool.escape(empleadoData.id)}
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

empleadoModel.deleteEmpleado = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM empleados WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM empleados WHERE id = ${id}
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

module.exports = empleadoModel;