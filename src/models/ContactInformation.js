const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactInformation = sequelize.define('ContactInformation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ar_address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
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
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = ContactInformation; 