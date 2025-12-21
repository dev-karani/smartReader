import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import healthRoutes from "./routes/health.routes.js";

dotenv.config();

const app = express();

//Middlewares 
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/upload", uploadRoutes);
app.use("/health", healthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});