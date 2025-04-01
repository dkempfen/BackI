import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

// Verificar si la variable de entorno está siendo cargada correctamente
console.log("MONGO_URI:", process.env.MONGO_URI); // Esto debería mostrar la URL de MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("API corriendo...");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
