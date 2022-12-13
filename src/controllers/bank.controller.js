import Client from 'belvo';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'

const client = new Client.default(
    process.env.BELVO_KEY_ID,
    process.env.BELVO_KEY_PASSWORD,
    process.env.BELVO_ENVIRONMENT
  );

export const accessToken = async (req, res) => {
    try {
        await client.connect();
        const access_token = await client.widgetToken.create();
        res.json(access_token)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const associateBelvoData = async (req, res) => {
    const userId = getUserID(req)

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true
    });

    res.status(204).json(updatedUser)
}

const getUserID = (req) => {
    const token = req.headers["x-access-token"];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
}