import { products } from "./constants/products.js";
import Products from "./models/productSchema.js";


export const DefaultData= async ()=>{
    try {
        await Products.insertMany(products);
        console.log("data saved")

    } catch (error) {
        console.log(error.message)
        
    }
}