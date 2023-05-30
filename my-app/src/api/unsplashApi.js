import { createApi } from 'unsplash-js';

export default async function getData(queryString) {
    const unsplash = createApi({ accessKey: "MBv7zF3Jz4JPS_qWXV3IoMSMmnnTGp6bXpby_2XQOuQ" });
    const response = await unsplash.search.getPhotos({
        query: queryString,
        page: 1,
        perPage: 10
    });
    console.log(response);
    if (response.type === "success") {
        console.log(response.response);
        return response.response;
    }
    else {
        return undefined;
    }
}