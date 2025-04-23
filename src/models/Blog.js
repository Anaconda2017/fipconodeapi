const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
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
    ar_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    en_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

module.exports = Blog; 