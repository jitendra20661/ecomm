const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter product name"]
    },
    description:{
        type: String,
        required: [true, "Please Enter product description"]
    },
    price:{
        type: Number,
        required: [true, "Please Enter product price"]
    }, 
    images:{
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    }, 
    category:{
        type: String,
        required: [true, "Please Enter product category"],
        enum: {
            values: [
                "books",
                "clothes",
                "others"
            ],
            message: "Please select correct category"
            
        }
    },
    seller:{
        type: String,
        required: [true, "Please Enter product seller"]
    }, 
    stock:{
        type: Number,
        required: [true, "Please Enter product stock"]
    }, 
    ratings:{
        type: Number,
        default: 0
    }, 
    reviews: [
        {
            rating: {
                type: Number,
                requred: true
            },
            comment: {
                type: String,
                requred: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model("products", productSchema);