const pool = require('../database/connection');
let dempleadoModel = {};

dempleadoModel.getDempleado = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM datos_empleados ORDER BY id',
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

dempleadoModel.insertDempleado = (dempleadoData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO datos_empleados SET ?', dempleadoData,
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

dempleadoModel.updateDempleado = (dempleadoData, callback) => {
    if(pool){
        const sql = `
        UPDATE datos_empleados SET
        nombre =  ${pool.escape(dempleadoData.nombre)},
        apaterno = ${pool.escape(dempleadoData.apaterno)},
        amaterno = ${pool.escape(dempleadoData.amaterno)},
        telefono = ${pool.escape(dempleadoData.telefono)},
        direccion = ${pool.escape(dempleadoData.direccion)}
        WHERE id = ${pool.escape(dempleadoData.id)}
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

dempleadoModel.deleteDempleado = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM datos_empleados WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM datos_empleados WHERE id = ${id}
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

module.exports = dempleadoModel;