const {ApolloServer} = require('apollo-server');

const gql = require( 'graphql-tag' );

const typeDefs = gql`
	type User {
		email: String!
		avatar: String!
		# if I do  [ User ! ] array can't be null	
		friends: [User]!
	}
	type Query {
		me: User!
	}
`;

const resolvers = {
  Query: {
    me() {
      return {
        email  : 'toto@tata.fr',
        avatar : 'toto',
        friends: []
      };
    }
  }
};

const server = new ApolloServer( {
  typeDefs, resolvers,
} );

server.listen(3000).then(console.log)