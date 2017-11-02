const db = require('./db');
const Sequelize = db.Sequelize;

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    isBusiness: {
        type: Sequelize.BOOLEAN
    },
    vibe: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    }
})

module.exports = User;