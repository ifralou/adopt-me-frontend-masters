import { QueryFunction } from "@tanstack/react-query";
import { PetApiResponse } from "../APIResponseTypes";

export const fetchSearch:
    QueryFunction<
        PetApiResponse,
        ["search", { location: string, animal: string, breed: string }]
    >
= async ({queryKey}) => {
    const {animal, location, breed} = queryKey[1];

    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);

    if (!res.ok) {
        throw new Error("Pet search not okay");
    }

    return res.json();
}