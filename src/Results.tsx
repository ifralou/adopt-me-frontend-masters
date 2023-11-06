import React from 'react';
import Pet from "./Pet";
import {Pet as PetApi} from "../APIResponseTypes";

type ResultsProps = {
    pets: PetApi[]
}
const Results = ({pets}: ResultsProps) => {

    return (
        <div className="search">
            {
                !pets?.length ?
                    <h1>No pets found</h1> :
                    pets.map(pet =>
                        <Pet
                            id={pet.id}
                            key={pet.id}
                            animal={pet.animal}
                            name={pet.name}
                            breed={pet.breed}
                            images={pet.images}
                            location={`${pet.city} ${pet.state}}`}
                        />)
            }
        </div>
    );
};

export default Results;