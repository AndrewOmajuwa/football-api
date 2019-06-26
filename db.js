//import sequelize
const Sequelize = require('sequelize')
//declare databaseURl
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres'
//create new instance of sequelize
const sequelize = new Sequelize(databaseUrl, {define: { timestamps: false }})
//call sync method on sequalize instance created
sequelize.sync()
    .then(() => console.log('Database schema has been updated'))
    .catch(console.error)

module.exports = sequelize