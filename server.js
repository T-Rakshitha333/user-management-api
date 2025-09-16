require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database'); // initialize DB
const userRoutes = require('./routes/users');


const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Health check
app.get('/', (req, res) => {
res.json({ status: 'ok', message: 'User Management API is running' });
});


// Routes
app.use('/api/users', userRoutes);


// 404 handler
app.use((req, res) => {
res.status(404).json({ error: 'Endpoint not found' });
});


// Global error handler
app.use((err, req, res, next) => {
console.error('Server error:', err);
res.status(500).json({ error: 'Internal server error' });
});


app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});
