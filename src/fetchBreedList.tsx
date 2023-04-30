import {QueryFunction} from "@tanstack/react-query";
import {Animal, BreedListApiResponse} from "../APIResponseTypes";

export const fetchBreedList:
    QueryFunction<BreedListApiResponse, ["breeds", Animal]>
    = async ({queryKey}) => {
    const animal = queryKey[1];
    if(!animal) {
        return [];
    }


    const apiRes = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    if(!apiRes.ok) {
        throw new Error(`breeds/${animal} fetch not ok`);
    }

    return apiRes.json();
};
