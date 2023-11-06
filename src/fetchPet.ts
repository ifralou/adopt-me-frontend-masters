import { QueryFunction } from "@tanstack/react-query";
import {PetApiResponse} from "../APIResponseTypes";

export const fetchPet:
    QueryFunction<
        PetApiResponse,
        ["details", string | undefined]
    >
 = async ({queryKey}) => {
   const id  = queryKey[1];
   if(!id) {
      throw new Error("Undefined id.")
   }
   const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

   if(!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok.`);
   }

   return apiRes.json();
}