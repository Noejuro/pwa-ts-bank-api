import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json' assert {type: 'json'};
import 'dotenv/config';

import authRoutes from "./routes/auth.routes.js";

const app = express();
app.set('port', 4000);

app.set("pkg", pkg)

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version
    })
})

app.use('/api/auth', authRoutes);

export default app;
