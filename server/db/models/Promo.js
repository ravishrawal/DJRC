const db = require('./db');
const Sequelize = db.Sequelize;

const Promo = db.define('promo', {
    name: {
        type: Sequelize.STRING
    },
    expiration: {
        type: Sequelize.DATE
    }
})

module.exports = Promo;