const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChairmanMessage = sequelize.define('ChairmanMessage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ar_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_small_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_small_title: {
        type: DataTypes.STRING,
        allowNull: false
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
    }
});

module.exports = ChairmanMessage; 