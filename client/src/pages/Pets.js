import React, { useState }       from "react";
import gql                       from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import PetsList                  from "../components/PetsList";
import NewPetModal               from "../components/NewPetModal";
import Loader                    from "../components/Loader";

const ALL_PETS = gql`
    query Name { pets { id name type img } }
`;

const NEW_PET = gql`
    mutation newPet($newPet: NewPetInput! ) {
        addPet(input: $newPet) { id name type img }
    }
`;

export default function Pets() {
	// the component will be rerender each time the
	// the hooks will change
	const [ modal, setModal ] = useState( false );
	const { data, loading, error } = useQuery( ALL_PETS );
	const [ createPet, newPet ] = useMutation( NEW_PET );

	if ( loading || newPet.loading) {
		return <Loader></Loader>;
	}

	if ( error || newPet.error) {
		return <p>Error</p>;
	}

	const onSubmit = async newPet => {
		await createPet( { variables: { newPet } } );
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
