import express, { request, response } from 'express';
import {v4 as uuidv4 } from 'uuid';

const app = express();
const server = app.listen(8080, ()=> console.log("Listening on PORT 8080"));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let products = [];

app.get( '/products' , (request, response) => {
    response.json(products)
})

app.get( '/products/:id' , (request, response) => {
    const productoId = request.params.id;
    const producto = products.find( producto => producto.id === productoId)

    if(!producto){
        return response.status(400).json({error : 'Datos invalidos'});
    }
    response.json(producto);
})

app.post( '/products' , (request, response) => {
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

app.put( '/products/:id' , (request, response) => {
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

app.delete( '/products/:id' , (request, response) => {
    const productoIdDeleted = request.params.id;
    const productoIndex = products.findIndex(producto => producto.id === productoIdDeleted);

    if(productoIndex === -1){
        return response.status(404).json({error: 'Producto no encontrado'});
    }

    products.splice(productoIndex, 1);
    response.status(204).json({mensaje: 'Producto eliminado'})
})