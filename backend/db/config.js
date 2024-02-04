const mongoose = require('mongoose')

// mongoose.connect("mongodb://localhost:27017/GECommerce_db")

async function connect(){
    try{
        await mongoose.connect("mongodb://localhost:27017/GECommerce_db")
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("Mongo connected successfully");
        })
        connection.on('error', (err)=>{
            console.log('MongoDB connection error. Please make sure MongoDB is running.'+err);
        })
    }
    catch(error){
        console.log('Someting went wrong!');
        console.log(error);
    }
}

connect()