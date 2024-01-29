const express = require('express');
const cors = require('cors');
require('./db/config')
const user = require('./db/users_schema')
const product = require('./db/products_schema')
const app = express();

app.use(express.json());
app.use(cors());


//if get api is called in the root page
app.get('/',(req,res)=>{
    res.send("app is working...")
});
app.post("/signin", async (req,res) =>{
    let userr = new user(req.body);
    let result = await userr.save();
    res.send(result);
})
// app.post("/add_product")



app.listen(5000);