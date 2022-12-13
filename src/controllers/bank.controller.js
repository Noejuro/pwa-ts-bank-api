import Client from 'belvo';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'

const client = new Client(
    process.env.BELVO_KEY_ID,
    process.env.BELVO_KEY_PASSWORD,
    process.env.BELVO_ENVIRONMENT
  );

export const accessToken = async (req, res) => {
    try {
        await client.connect();
        const access_token = await client.widgetToken.create();
        res.json(access_token);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const associateBelvoData = async (req, res) => {
    const userId = getUserId(req);

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true
    });

    res.status(204).json(updatedUser)
}

export const getTransactions = async (req, res) => {

    console.log(req.query)

    if(!req.query.link) return res.status(403).json({message: "Unauthorized"});

    try {
        await client.connect();
        const transactions = await client.transactions.list({
            filters: {
              link: req.query.link,
              page: req.query.page,
            }
        })
        res.json(transactions);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getUserId = (req) => {
    const token = req.headers["x-access-token"];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
}