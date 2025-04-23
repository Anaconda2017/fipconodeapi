const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AboutUs = sequelize.define('AboutUs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ar_stand_for_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_stand_for_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_stand_for_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_stand_for_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ar_mission_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_mission_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_mission_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_mission_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ar_vision_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_vision_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_vision_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_vision_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ar_main_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_main_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = AboutUs; 