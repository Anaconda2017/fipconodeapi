const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Features = sequelize.define('Features', {
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
    ar_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Features; 