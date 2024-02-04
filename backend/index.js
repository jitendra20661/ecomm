const express = require('express');
const cors = require('cors');
require('./db/config')
const user = require('./db/users_schema')
const product = require('./db/products_schema')
const app = express();
const bcrypt = require('bcryptjs');


app.use(express.json());
app.use(cors());


//root endpoint
app.get('/',(req,res)=>{
    res.send("app is working...")
});

// Signup endpoint
app.post("/signin", async (req,res) =>{
    
    try {

    let newUser = new user(req.body);

    // check if username already exists
    const existingUser = await user.findOne({ username: newUser.username });

    if(existingUser)
        return res.status(400).json({ message: 'Username already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    
    let result = await newUser.save();
    // res.status(201).json({ message: 'User created successfully', user: result });
    // res.status(201).json({ message: 'User created successfully'});
    res.send(result);
    }
    catch(error){
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

// Login endpoint


// app.post("/add_product")



// listening port
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`GEComm is live at ${PORT}`);
});