require('dotenv').config()
const express = require('express');
const cors = require('cors');
require('./db/config')
const user = require('./db/users_schema')
const product = require('./db/products_schema')
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


app.use(express.json());    

app.use(cors({
    origin: 'http://localhost:3000',        // must specify origin if using credentials(i.e COOKIES) in request headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true
}))
app.use(cookieParser());

function generateAccessToken(userExist){
    const tokenData = {
        //token data 
        id: userExist._id,
        username: userExist.username,
        email: userExist.email
    }
    const secret = 'secret-key-store-in-env';
    const options = {expiresIn: '1d'};

    return jwt.sign(tokenData, secret, options);
}

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
        const existingEmail = await user.findOne({ email: newUser.email });


        if(existingUser){
            console.log({ message: 'Username already taken' })
            return res.status(400).json({ message: 'Username already taken'});
        }
        if(existingEmail){
            console.log({ message: 'Email already registered' })
            return res.status(400).json({ message: 'Email already registered.'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;
        
        let savedUser = await newUser.save();
        // res.status(201).json({ message: 'User created successfully', user: savedUser });
        res.status(201).json({ message: 'User created successfully'});
        // res.send(result);
    }
    catch(error){
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Login endpoint
app.post("/login", async (req,res)=>{
    try{
        // const newUser = new user(req.body);
        const {username, password} = req.body
        // console.log(username);
        
        //check if user exists
        const userExist = await user.findOne({username: username});

        if(!userExist){
            return res.status(400).json({message: 'User not found'});
        }

        //check if the password is correct
        const validPassword = await bcrypt.compare(password, userExist.password);
        if(!validPassword){
            return res.status(400).json({message: 'Invalid Password'});
        }

        //create jwt token 
        const accessToken = generateAccessToken(userExist);
        // res.cookie('user@GEComm_token', accessToken, {httpOnly: true})
        // res.cookie('user@GEComm_token', "login", {httpOnly: true})
        res.cookie('user@GEComm_token', accessToken, {httpOnly: true});

        // return res.status(200).json({message: 'Login Successful', token: accessToken})
        return res.status(200).json({message: 'Login Successful'})


    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
})

// logout endpoint 
app.get("/logout", async (req, res)=>{
    try {
        // console.log('incoming cookies: ', req.cookies);
        res.cookie('user@GEComm_token', "", {httpOnly: true});
        return res.status(200).json({message: 'Logout Successful'})
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message});

    }
})

// app.post("/add_product")



// listening port
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`GEComm is live at ${PORT}`);
});