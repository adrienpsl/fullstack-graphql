import { ApolloClient }  from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink }      from "apollo-link-http";

/**
 * Create a new apollo client and export as default
 * we create a link, that is an interface to interact with graphQl sever
 */
	// I can have multiple client, and multiple link
const link = new HttpLink( { uri: "http://localhost:4000/" } );
// read how that's work, because I didn't get all that shit
const cache = new InMemoryCache( {} );

const client = new ApolloClient( { link, cache } );

// the bracket says : It's a short method
// const query = gql`
//     {
//         characters {
//             results {
//                 fullname: name
//                 id
//             }
//         }
//     }
// `;

export default client;
