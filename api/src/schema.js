const { gql } = require( 'apollo-server' );

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
	type User {
		id: ID!
		username: String!
	}

	"""
	shoe stuff, to show interface exemple
	"""
	interface Shoe{
		brand: String!
		size: Int!
	}

	type Sneaker implements Shoe {
		brand: String!
		size: Int!
		sport: String
	}

	type Boot implements Shoe {
		size: Int!
		brand: String!
		hasGrip: Boolean!
	}

	type Pet {
		id: ID!
		createdAt: String!
		name: String!
		type: String!
		user: User
	}

	input PetInput {
		name: String
		type: String
	}

	type Query {
		user: User!
		pets(input: PetInput ): [Pet]!
		pet(input: PetInput): Pet
	}

	input CreatePetInput{
		name: String!
		type: String!
	}

	type Mutation {
		createPet(input: CreatePetInput! ) : Pet!
	}

`;

module.exports = typeDefs;
