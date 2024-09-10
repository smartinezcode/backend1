import express from 'express';

const app = express();
const server = app.listen(8080, ()=> console.log("Listening on PORT 8080"));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let products = [];

app.get( '/products' , (request, response) => {
    response.json(products)
})



app.post