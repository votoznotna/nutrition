
const { v1: uuidv1 } = require('uuid')
const datasource = require('./data.json')
const timeout = 500

const createDessertModel = startData => {
  let data = [...startData]
  return {
    getAll() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data.sort((a, b) => {
             return +a.created > +b.created ? -1 : 1
          }))
        }, timeout)
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // const initialData = [...datasource['dessert']]
          // data.length = 0
          data = [...datasource['dessert']]
          // let index = initialData.length
          // while(--index >= 0) {
          //   data.unshift(initialData[index])
          // }
          // console.log(`data: ${JSON.stringify(data, null, '\t')}`)
          resolve(data)
        }, timeout)
      })
    }
  }
}

module.exports = createDessertModel