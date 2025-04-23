const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ar_service_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_service_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ar_service_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    en_service_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    service_type: {
        type: DataTypes.ENUM('service', 'project'),
        allowNull: false
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_view: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    home_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Service; 