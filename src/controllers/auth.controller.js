import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Client from 'belvo';

const client = new Client.default(
    'ebe92189-43dd-4c0b-85af-ba1d77a0f470',
    '@cjA3mOuKC*g-em94k0zLI3bx*1JR1SOjl8AIPPcCACKNSPXyeX45nQ8j*pfxjsw',
    'sandbox'
  );

export const signUp = async (req, res) => {
    
    const { name, company, email, phone, password } = req.body;    

    const newUser = new User({
        name, 
        company, 
        email, 
        phone,
        password: await User.encryptPassword(password)
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN // 24 Hours
    }) 

    res.status(200).json({token})
}

export const login = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email});

    if (!userFound) return res.status(400).json({message: "Invalid Credentials"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) return res.status(400).json({message: "Invalid Credentials"})

    const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.json({token})

}

export const accessToken = async () => {
    try {
        await client.connect();
        const access_token = await client.widgetToken.create();
        res.json(access_token)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}