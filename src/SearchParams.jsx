import React, {useState} from 'react';
import useBreedList from "./useBreedList";
import Results from "./Results";
import {useQuery} from "@tanstack/react-query";
import {fetchSearch} from "./fetchSearch";

const animals = ["", "bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });

    const results = useQuery(["search", requestParams], fetchSearch);

    const [animal, setAnimal] = useState("");
    const [breeds, _] = useBreedList(animal);

    const pets = results?.data?.pets ?? [];

    const onSubmit = (e) => {
        e.preventDefault();
        const formDate = new FormData(e.target);
        const obj = {
            animal: formDate.get("animal") || "",
            breed: formDate.get("breed") || "",
            location: formDate.get("location") || ""
        };
        setRequestParams(obj);
    };

    return (
        <div className="search-params">
            <form onSubmit={onSubmit}>

                <label htmlFor="location">
                   Location
                    <input id="location" name="location" placeholder="Location"/>
                </label>

                <label htmlFor="animal">
                    Animal
                    <select id="animal"
                            value={animal}
                            onChange={e => setAnimal(e.target.value)}
                            name="animal"
                    >
                        {
                            animals.map((animal, i) => <option key={i}>{animal}</option>)
                        }
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select id="breed" name="breed" disabled={breeds.length === 0}>
                        {
                            breeds.map((breed, i) => <option key={i}>{breed}</option> )
                        }
                    </select>

                </label>

                <button>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    );
};

export default SearchParams;