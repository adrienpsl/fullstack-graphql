import { ApolloClient }  from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink }      from "apollo-link-http";
import { setContext }    from "apollo-link-context";
import { ApolloLink }    from "apollo-link";
import gql               from "graphql-tag";

const typeDefs = gql`
	extend type User {
		age : Int
	}
	extend type Pet {
		vaccinated: Boolean!
	}

`;

const resolvers = {
	User: {
		age: () => 35
	},
	Pet : {
		vaccinated: () => true
	}
};

const delay = setContext( () =>
		new Promise( ( success ) => {
			setTimeout( () => success(), 800 );
		} ) );


// I can have multiple client, and multiple link
const http = new HttpLink( { uri: "http://localhost:4000/" } );

const link = ApolloLink.from( [ delay, http ] );

// read how that's work, because I didn't get all that shit
const cache = new InMemoryCache( {} );

const client = new ApolloClient( {
	link, cache, resolvers, typeDefs
} );


export default client;
