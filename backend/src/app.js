import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app= express();

//Middlewares 
app.use(cors());
app.use(express.json());

//Routes
import exampleRoutes from './routes/example.routes.js';
app.use("/api/example", exampleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})