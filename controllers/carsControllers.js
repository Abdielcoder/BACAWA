const Cars = require('../models/cars');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {
    

    async findByUser(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await Cars.findByUser(id_user);
            console.log(`Cars ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener los Autos',
                error: error,
                success: false
            })
        }

    },

    async deleteUserCar(req, res, next) {
        try {
            
            let car = req.params.id;
           
            await Cars.deleteUserCar(car);
            

            return res.status(201).json({
                success: true,
                message: 'El vehiculo se elimino correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al eliminar el vehiculo',
                error: error
            });
        }
    },


    //GET ALL CARS
    async getAll(req, res, next) {

        try {
            const data = await Cars.getAll();
            console.log(`Cars ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener los Autos',
                error: error,
                success: false
            })
        }

    },

    //CREATE CAR WITHOUT IMAGE
    async create(req, res, next) {
        try {
            const cars = req.body;
            console.log(`Auto enviado: ${cars}`);

            const data = await Cars.create(cars);

            return res.status(201).json({
                message: 'El auto  se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al agregar el vehiculo',
                success: false,
                error: error
            });
        }
    },

    //CREATE CAR WITH IMAGE
    async registerWithImage(req, res, next) {
        try {
            //THE OBJECT mycar HAS ALL DATA THIS NAME NAMED IN CAR PROVIDER
            const mycar = JSON.parse(req.body.mycar);
            console.log(`Datos enviados del vehiculo: ${mycar}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    mycar.image = url;
                }
            }

            const data = await Cars.create(mycar);

           // await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicia sesion',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Hubo un error con el registro del usuario: ${error}`,
                error: error
            });
        }
    },

}