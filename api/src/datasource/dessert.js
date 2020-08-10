
const { v1: uuidv1 } = require('uuid')
const datasource = require('./data.json')

const createDessertModel = data => {
  return {
    getAll() {
      return data.sort((a, b) => {
          return +a.created > +b.created ? -1 : 1
      })
    },
    delete(ids) {
        const successfullyDeletedIds = []
        ids.forEach(id => {
            const index = data.findIndex(item => item.id === id)
            if(typeof index !== 'undefined') {
              data.splice(index, 1);
              successfullyDeletedIds.push(id)
            }
        })
        return successfullyDeletedIds
    },
    create(dessert) {
      const newDessert = {id: uuidv1(), created: Date.now().toString(), 
        ...{
          name: dessert.name,
          nutritionInfo: {
            calories: dessert.calories,
            fat: dessert.fat,
            carbs: dessert.carbs,
            protein: dessert.protein
          }
        }
      }
      data.push(newDessert)
      return newDessert
    },
    reset() {
      const initialData = [...datasource['dessert']]
      data.length = 0
      let index = initialData.length
      while(--index >= 0) {
        data.unshift(initialData[index])
      }
      return data;
    }
  }
}

module.exports = createDessertModel