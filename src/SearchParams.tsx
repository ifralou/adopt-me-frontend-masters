import React, {FormEvent, useState} from 'react';
import useBreedList from "./useBreedList";
import Results from "./Results";
import {useQuery} from "@tanstack/react-query";
import {fetchSearch} from "./fetchSearch";
import {Animal} from "../APIResponseTypes";

const animals : Animal[]= ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });

    const [animal, setAnimal] = useState<Animal>("bird");
    const [breeds, _] = useBreedList(animal);

    const response = useQuery(["search", requestParams], fetchSearch);

    const pets = response?.data?.pets || [];

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDate = new FormData(e.currentTarget);
        const obj = {
            animal: formDate.get("animal")?.toString() || "",
            breed: formDate.get("breed")?.toString() || "",
            location: formDate.get("location")?.toString() || ""
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
                            onChange={e => setAnimal(e.target.value as Animal)}
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
                            (breeds as string[]).map((breed: string, i: number) => <option key={i}>{breed}</option> )
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