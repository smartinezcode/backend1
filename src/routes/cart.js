import { request, response, Router } from "express";
import {v4 as uuidv4 } from 'uuid';

const routerCart = Router();

let cart = [];

routerCart.get( '/cart' , (request, response) => { // obtener recursos (carro)
    response.json(cart)
})

routerCart.post( '/cart' , (request, response) => {
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

export default routerCart