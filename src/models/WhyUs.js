const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WhyUs = sequelize.define('WhyUs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    why_us_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ar_why_us_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_why_us_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_why_us_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_why_us_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = WhyUs; 