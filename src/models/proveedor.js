const pool = require('../database/connection');

let proveedorModel = {};

proveedorModel.getProveedor = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM proveedores ORDER BY id',
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
proveedorModel.getAproveedor = (id, callback) => {
    if (pool) {
        console.log(id)
        pool.query(`SELECT * FROM proveedores WHERE id='${id}'`, (err,rows) => {
            if (err) {
               throw err;
            } else {
                callback(null,rows);
            }
        });
    }
};
proveedorModel.insertProveedor = (proveedorData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO proveedores SET ?', proveedorData,
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

proveedorModel.updateProveedor = (proveedorData, callback) => {
    if(pool){
        const sql = `
        UPDATE proveedores SET
        nombre =  ${pool.escape(proveedorData.nombre)},
        cantidad_kg = ${pool.escape(proveedorData.cantidad_kg)},
        direccion = ${pool.escape(proveedorData.direccion)},
        telefono = ${pool.escape(proveedorData.telefono)},
        total_p = ${pool.escape(proveedorData.total_p)}
        WHERE id = ${pool.escape(proveedorData.id)}
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

proveedorModel.deleteProveedor = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM proveedores WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM proveedores WHERE id = ${id}
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

module.exports = proveedorModel;