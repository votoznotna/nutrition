module.exports = {
    Query: {
      desserts(_, __, {models}) {
        return models.Dessert.getAll()
      }
    },
    Mutation: {
      addDessert(_, {input}, {models}) {
        return models.Dessert.create(input)
      },
      deleteDesserts(_, {ids}, {models}) {
        return models.Dessert.delete(ids)

      },
      resetDesserts(_, __, {models}) {
        return models.Dessert.reset()
      }
    }
  }
  