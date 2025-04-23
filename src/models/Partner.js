const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partner = sequelize.define('Partner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ar_partner_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    en_partner_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    partner_type: {
        type: DataTypes.ENUM('partner', 'client'),
        allowNull: false
    },
    new_counter: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    active_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Partner; 