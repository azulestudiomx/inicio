// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
// ¡IMPORTANTE! express.json() DEBE ir antes de las rutas que usen req.body
app.use(express.json()); // <--- Asegúrate de que esta línea esté aquí y antes de cualquier app.use('/api/...')

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Usar las rutas
// Puedes añadir un console.log aquí si quieres ver qué rutas se están llamando
// app.use((req, res, next) => {
//   console.log(`Petición entrante: ${req.method} ${req.url}`);
//   next();
// });

app.use('/api/users', userRoutes); // Tus rutas de usuario
app.use('/api/events', eventRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/auth', authRoutes);

// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.send('API de FotoStock está funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});