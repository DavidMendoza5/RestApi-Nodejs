const pool = require('../database/connection')

let tamanoModel = {};

tamanoModel.getTamano = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM tamano ORDER BY id',
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

tamanoModel.insertTamano = (tamanoData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO tamano SET ?', tamanoData,
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

tamanoModel.updateTamano = (tamanoData, callback) => {
    if(pool){
        const sql = `
        UPDATE tamano SET
        tamano =  ${pool.escape(tamanoData.tamano)},
        rebanada = ${pool.escape(tamanoData.rebanada)}
        WHERE id = ${pool.escape(tamanoData.id)}
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

tamanoModel.deleteTamano = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM tamano WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM tamano WHERE id = ${id}
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

module.exports = tamanoModel;