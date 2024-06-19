import User from "../models/userSchema.js";

export const userSignup=async (req, res)=>{
    try {
        const exist=await User.findOne({username:req.body.username});
        if(exist){
            res.status(401).json({message:'user already exist!'})
        }
        const user=req.body;
        const newUser=new User(user);
        await newUser.save();
        res.status(200).json({message:user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const userLogin = async (req, res) => {
    try {
        console.log(req.body);

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({ message: 'No user with this email!' });
            return; // End the function here if user not found
        }

        if (user.password === req.body.password) {
            res.status(200).json( user );
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//admin

export const getAllUsers= async(req, res)=>{
    try {
        console.log('dd')
        const data=await User.find({});
        res.status(200).json(data);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
        
    }
    
}