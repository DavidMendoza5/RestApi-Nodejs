const pool = require('../database/connection');

let ingredienteModel = {};

ingredienteModel.getIngrediente = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM ingredientes ORDER BY id',
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

ingredienteModel.insertIngrediente = (ingredienteData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO ingredientes SET ?', ingredienteData,
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

ingredienteModel.updateIngrediente = (ingredienteData, callback) => {
    if(pool){
        const sql = `
        UPDATE ingredientes SET
        id_proveedor = ${pool.escape(ingredienteData.id_proveedor)},
        nombre =  ${pool.escape(ingredienteData.nombre)}
        WHERE id = ${pool.escape(ingredienteData.id)}
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

ingredienteModel.deleteIngrediente = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM ingredientes WHERE id = ${connection.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM ingredientes WHERE id = ${id}
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

module.exports = ingredienteModel;