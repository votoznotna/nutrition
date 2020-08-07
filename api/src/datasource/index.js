const createDessertModel = require('./dessert')
const datasource = require('./data.json');

module.exports = {
  models: {
    Dessert:  createDessertModel([...datasource['dessert']])
  },
  datasource
}