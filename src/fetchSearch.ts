import {QueryFunction} from "@tanstack/react-query";
import {Search} from "react-router-dom";

export const fetchSearch:
    QueryFunction<Search, ["search", { location: string, animal: string, breed: string }]> = async ({queryKey}) => {
    const {animal, location, breed} = queryKey[1];

    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);

    if (!res.ok) {
        throw new Error("pet search not okay");
    }

    return res.json();
}