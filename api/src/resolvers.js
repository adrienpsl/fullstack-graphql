/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query   : {
    // first value '_' is the initial value
    // second is arguments
    pets( _, { input }, ctx ) {
      // return ctx.models.Pet.findMany()
      return [ { id: 1 }, { id: 2 } ];
    },
    pet( _, { input }, ctx ) {
      return ctx.models.Pet.findOne( { name: input.name } );
    }
  },
  Mutation: {
    createPet( _, { input: { name, type } }, ctx ) {
      return ctx.models.Pet.create( { name, type } );
    }
  },
  Shoe    : {
    __resolveType( shoe ) {
      if ( shoe[ 'sport' ] ) return 'Sneaker';
      return 'Boot';
    }
  },
  Pet     : {
    user( Pet, _, ctx ) {
      return { 'id': 'aoeu', username: 'atta' };
    }
  }
  // Pet: {
  //   id(pet) {
  //     return 3
  //   }
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {
  //
  // }
};
