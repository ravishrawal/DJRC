const db = require('./db');
const Sequelize = db.Sequelize;

const Genre = db.define('genre', {
    name: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    }
})

module.exports = Genre;