const pool = require('../database/connection');

let productosModel = {};

productosModel.getProductos = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM producto ORDER BY id',
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

productosModel.insertProductos = (productosData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO producto SET ?', productosData,
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

productosModel.updateProductos = (productosData, callback) => {
    if(pool){
        const sql = `
        UPDATE producto SET
        id_proveedor = ${pool.escape(productosData.id_proveedor)},
        nombre =  ${pool.escape(productosData.nombre)},
        existencia_b = ${pool.escape(productosData.existencia_b)},
        disponible_v = ${pool.escape(productosData.disponible_v)}
        WHERE id = ${pool.escape(productosData.id)}
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

productosModel.deleteProductos = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM producto WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM producto WHERE id = ${id}
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

module.exports = productosModel;