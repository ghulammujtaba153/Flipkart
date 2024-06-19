import mongoose  from "mongoose";
import { products } from './../constants/products.js';

const productSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    url: String,
    detailUrl:String,
    title:Object,
    price:Object,
    quantity:Number,
    description:String,
    discount:String,
    tagline:String,
})

const Products = mongoose.model('product', productSchema)
export default Products;