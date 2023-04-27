export const fetchBreedList = async ({queryKey}) => {
    const id = queryKey[1];
    if( id === '') {
        return new Promise(() => {});
    }
    console.log(queryKey);

    const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${id}`);

    if(!apiRes.ok) {
        throw new Error(`breeds/${id} fetch not ok`);
    }

    return apiRes.json();
};
