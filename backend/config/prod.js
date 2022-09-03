require('dotenv').config()

const db = process.env.DB_URL

module.exports = {
  dbURL: db ,
  dbName: 'JAUNT_DB',
}