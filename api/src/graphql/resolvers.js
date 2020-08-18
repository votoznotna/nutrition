module.exports = {
    Query: {
      desserts: async (_, __, {models}) => {
        return await models.Dessert.getAll()
      }
    },
    // Query: {
    //   desserts(_, __, {models}) {
    //     return models.Dessert.getAll()
    //   }
    // },
    Mutation: {
      addDessert(_, {input}, {models}) {
        return models.Dessert.create(input)
      },
      deleteDesserts(_, {ids}, {models}) {
        return models.Dessert.delete(ids)

      },
      resetDesserts: async (_, __, {models}) => {
        return await models.Dessert.reset()
      }
    }
  }
  