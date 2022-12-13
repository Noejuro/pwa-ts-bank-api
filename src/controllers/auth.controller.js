import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Client from 'belvo';

const client = new Client.default(
    process.env.BELVO_KEY_ID,
    process.env.BELVO_KEY_PASSWORD,
    process.env.BELVO_ENVIRONMENT
  );

export const signUp = async (req, res) => {
    
    const { name, email, password } = req.body;    

    const newUser = new User({
        name, 
        email,
        password: await User.encryptPassword(password)
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET) 

    res.status(200).json({token})
}

export const login = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email});

    if (!userFound) return res.status(400).json({message: "Invalid Credentials"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) return res.status(400).json({message: "Invalid Credentials"})

    const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET)

    res.json({token})

}