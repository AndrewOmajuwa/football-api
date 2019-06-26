//import sequelize
const sequelize = require('sequelize')
//import db
const db = require('./../db.js')

//declare team
const Team = db.define(
   'team', {
       name: {
           type: sequelize.STRING,
           field: 'team_name'
       }
   },
   { tableName : 'football_teams'} 
)

module.exports = Team

