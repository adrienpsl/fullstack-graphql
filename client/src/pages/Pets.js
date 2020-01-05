import React, { useState }       from "react";
import gql                       from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import PetsList                  from "../components/PetsList";
import NewPetModal               from "../components/NewPetModal";
import Loader                    from "../components/Loader";

// directive @client on FIELD

const PETS_FIELDS = gql`
	fragment PetsFields on Pet {
		id name type img 
		vaccinated @client
		owner {
			id
			age @client
		}
	}
`;

const ALL_PETS = gql`
	query fetchAllPets { pets { ...PetsFields} }
	${PETS_FIELDS}
`;

const NEW_PET = gql`
	mutation newPet($newPet: NewPetInput! ) {
		addPet(input: $newPet) { ...PetsFields}
	}
	${PETS_FIELDS}
`;

export default function Pets() {
	// the component will be rerender each time the
	// the hooks will change
	const [ modal, setModal ] = useState( false );
	const { data, loading, error } = useQuery( ALL_PETS );

	// here I use that to update all queries that depend of my element
	// with that in place, I didn't need to add new
	const [ createPet, newPet ] = useMutation( NEW_PET,
			{
				update( cache, { data: { addPet } } ) {
					const { pets: prevPets } = cache.readQuery( { query: ALL_PETS } );
					cache.writeQuery( {
						query: ALL_PETS,
						data : { pets: [ addPet, ... prevPets ] }
					} );
				},
				optimisticResponse: {}
			} );

	if ( loading ) {
		return <Loader></Loader>;
	}

	if ( error || newPet.error ) {
		return <p>Error</p>;
	}

	const onSubmit = async newPet => {
		await createPet( {
			variables         : { newPet },
			optimisticResponse: {
				__typename: "mutation",
				addPet    : {
					__typename: "Pet",
					id        : Math.floor( Math.random() * 1000 ) + "",
					name      : newPet.name,
					type      : newPet.type,
					img       : "https://via.placeholder.com/300",
					owner     : { __typename: "Owner", id: "tot" }
				}
			}
		} );
		setModal( false );
	};

	if ( modal ) {
		return <NewPetModal onSubmit={ onSubmit }
												onCancel={ () => setModal( false ) }/>;
	}

	return (
			<div className="page pets-page">
				<section>
					<div className="row betwee-xs middle-xs">
						<div className="col-xs-10">
							<h1>Pets</h1>
						</div>

						<div className="col-xs-2">
							<button onClick={ () => setModal( true ) }>new pet
							</button>
						</div>
					</div>
				</section>
				<section>
					<PetsList pets={ data.pets }/>
				</section>
			</div>
	);
}

Pets.fragments = {
	PETS_FIELDS
};
