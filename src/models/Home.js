const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Home = sequelize.define('Home', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ar_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

module.exports = Home; 