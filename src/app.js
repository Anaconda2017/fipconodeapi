const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const serviceRoutes = require('./routes/service');
const homeRoutes = require('./routes/homeRoutes');
const featuresRoutes = require('./routes/featuresRoutes');
const contactInformationRoutes = require('./routes/contactInformationRoutes');
const contactUsFormRoutes = require('./routes/contactUsFormRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/contact-information', contactInformationRoutes);
app.use('/api/contact-forms', contactUsFormRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to FIPCO API',
        version: '1.0.0',
        status: 'active'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // Sync database models
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('Database models synchronized successfully.');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer(); 