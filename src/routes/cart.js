import { request, response, Router } from "express";
import {v4 as uuidv4 } from 'uuid';

const router = Router();

let cart = [];

router.get( '/cart' , (request, response) => { // obtener recursos (products)
    response.json(cart)
})

router.post( '/cart' , (request, response) => {
    const {title, description, code, price, category} = request.body;
    if(!title || !description || !code || !price || !category){
        return response.status(400).json({error : 'Datos invalidos'});
    }

    const nuevoProducto = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        category
    };

    products.push(nuevoProducto);
    response.status(201).json(nuevoProducto);
})

export default router