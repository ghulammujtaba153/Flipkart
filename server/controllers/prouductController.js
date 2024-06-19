import Products from "../models/productSchema.js"

export const getProducts=async(req, res)=>{
    try {
        const data=await Products.find({})
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const getProductDetails=async(req, res)=>{
    try {
        const id=req.params.id;
        const data=await Products.findOne({'_id':id})
        
        res.status(200).json(data)
        
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//admin

export const addProduct=async(req, res)=>{
    try {
        const newProduct = new Products(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const deleteProduct=async(req, res)=>{
    try {
        const id=req.params.id;
        const data=await Products.deleteOne({_id: id})
        res.status(201).json(id);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}