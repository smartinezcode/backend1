import express from 'express';
import productsRouter from './routes/products';
import cartRouter from './routes/cart';

const app = express();
app.listen(8080, ()=> console.log("Listening on PORT 8080"));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);