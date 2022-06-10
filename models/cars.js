const db = require('../config/config');

const Cars = {};


Cars.findByUser = (id_user) => {
    const sql = `
    SELECT
        id,
        id_user,
        marca,
        modelo,
        year,
        placa,
        color,
        image
    FROM
        cars
    WHERE 
        id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
}


Cars.deleteUserCar = (id) => {
    const sql = `DELETE FROM cars WHERE id  = $1`;
    const vali = [id];
//id  = ${id};
    return db.manyOrNone(sql,vali,id);
}



Cars.getAll = () => {

    const sql = `
        SELECT
        id,
        id_user,
        marca,
        modelo,
        year_car,
        placa,
        color,
        image_car,
        created_at,
        updated_at,
        FROM
            cars
        ORDER BY
            marca
    `;

    return db.manyOrNone(sql);
}

Cars.create = (cars) => {
    const sql = `
    INSERT INTO
        cars(
            id_user,
            marca,
            modelo,
            year,
            placa,
            color,
            image,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `;
    return db.oneOrNone(sql, [
        cars.id_user,
        cars.marca,
        cars.modelo,
        cars.year,
        cars.placa,
        cars.color,
        cars.image,
        new Date(),
        new Date()
    ]);
}

module.exports = Cars;