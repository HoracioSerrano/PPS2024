import ConstructorEndpoints from "./backend/ConstructorEndpoints";
const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");

require('dotenv').config();

app.use(cors());

const connectDB = require('./backend/connectMongo');

connectDB();

const User = require('./backend/models/userModel');
const { trusted } = require('mongoose');

app.get("/", (req, res) => res.send("<p>Proyecto Para Practica Profesional Supervisada UTN 2024</p> <p>Para ejecutar local: vercel dev</p> <p>Prueba Franco</p> <p>Prueba Federico</p>"));

app.get("/api", async (req, res) => {
    try {
        
        const data = await User.find();
        return res.status(200).json({
            data
        })
    }
    catch(err) {
        return res.status(404).json({
            msg: err.message
        })
    }
})


var registrador: ConstructorEndpoints = new ConstructorEndpoints(app);



app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;