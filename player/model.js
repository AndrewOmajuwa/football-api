//import sequelize
const sequelize = require('sequelize')
const db = require('../db')
//require team model file for relational purposes
const Team = require('../team/model')

const Player = db.define(
    'player', {
        name: {
            type: sequelize.STRING,
            field: 'player_name'
        },
        number: {
            type: sequelize.INTEGER,
            field: 'player_number'        }
    },
    {tableName: 'players'}
)

//specify to sequelizer player belongs to team
Player.belongsTo(Team)

module.exports = Player