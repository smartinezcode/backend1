import express from 'express';
import routerProduct from './routes/products.js';
import routerCart from './routes/cart.js';

const app = express();
app.listen(8080, ()=> console.log("Listening on PORT 8080"));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('routes/products', routerProduct);
app.use('routes/cart', routerCart);