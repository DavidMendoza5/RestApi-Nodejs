const pool = require('../database/connection');

let tipospModel = {};

tipospModel.getTiposp = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM tipos_pizza ORDER BY id',
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

tipospModel.getOneTiposp = (id, callback)=>{
    if (pool){
        console.log(id)
        pool.query(`SELECT * FROM tipos_pizza WHERE id = '${id}'`,(err,rows)=>{
            if(err){
                throw err;
            }else{
                callback(null,rows)
            }
        });
    }
};

tipospModel.insertTiposp = (tipospData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO tipos_pizza SET ?', tipospData,
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

tipospModel.updateTiposp = (tipospData, callback) => {
    if(pool){
        const sql = `
        UPDATE tipos_pizza SET
        nombre =  ${pool.escape(tipospData.nombre)}
        WHERE id = ${pool.escape(tipospData.id)}
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

tipospModel.deleteTiposp = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM tipos_pizza WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM tipos_pizza WHERE id = ${id}
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

module.exports = tipospModel;