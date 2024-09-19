import { request, response, Router } from "express";
import {v4 as uuidv4 } from 'uuid';
import router from "./cart";

const router = Router();

let products = []; //aqui almaceno

router.get( '/products' , (request, response) => { // obtener recursos (products)
    response.json(products)
})

router.get( '/products/:id' , (request, response) => {
    const productoId = request.params.id;
    const producto = products.find( producto => producto.id === productoId)

    if(!producto){
        return response.status(400).json({error : 'Datos invalidos'});
    }
    response.json(producto);
})

router.post( '/products' , (request, response) => {
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

router.put( '/products/:id' , (request, response) => {
    const productoIdBuscado = request.params.id;
    const {title, description, code, price, category} = request.body;
    const productoIndex = products.findIndex(producto => producto.id === productoIdBuscado)

    if (productoIndex === -1){
        return response.status(404).json({error: 'Producto no encontrada'})
    }

    if(!title || !description || !code || !price || !category){
        return response.status(400).json({error : 'Datos invalidos'});
    }

    products[productoIndex] = {
        title,
        description,
        code,
        price,
        category
    };

    response.json(products[productoIndex]);
})

router.delete( '/products/:id' , (request, response) => {
    const productoIdDeleted = request.params.id;
    const productoIndex = products.findIndex(producto => producto.id === productoIdDeleted);

    if(productoIndex === -1){
        return response.status(404).json({error: 'Producto no encontrado'});
    }

    products.splice(productoIndex, 1);
    response.status(204).json({mensaje: 'Producto eliminado'})
})

export default router