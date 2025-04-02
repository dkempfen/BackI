import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());  // Para parsear JSON
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
