const { ApolloServer } = require( 'apollo-server' );
const typeDefs = require( './schema' );
const resolvers = require( './resolvers' );
const { models, db } = require( './db' );

const server = new ApolloServer( {
  typeDefs, resolvers,
  context() {
    // const user = models.User.get();
    return {
      models, db,
      // user
    };
  },
} );

server.listen()
      .then( ( { url } ) => {
        console.log( `🚀 Server ready at ${ url }` );
      } )
      .catch( console.error );
