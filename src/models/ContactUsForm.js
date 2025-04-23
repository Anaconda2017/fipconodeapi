const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactUsForm = sequelize.define('ContactUsForm', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'read', 'replied'),
        defaultValue: 'pending'
    }
});

module.exports = ContactUsForm; 