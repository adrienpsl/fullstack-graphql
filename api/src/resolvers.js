/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    // first value '_' is the initial value
    // second is arguments
    pets(_, __, ctx) {
      return ctx.models.Pet.findMany()
    }
  },
  // Mutation: {
  //
  // },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {
  //
  // }
}
