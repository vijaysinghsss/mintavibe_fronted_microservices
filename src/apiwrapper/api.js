import { BASECONFIG } from "../config";

const api = async ({ body, headers = {}, method, signal, url, formData = false }) => {

    headers['Access-Control-Allow-Origin'] = '*';
    if (!formData) {
        headers['content-type'] = 'application/json';
    }
    console.log(body, "body", BASECONFIG.BASE_URL + url)

    try {
        const response = await fetch(BASECONFIG.BASE_URL + url, {
            method,
            headers,
            body: body ? (formData ? body : JSON.stringify(body)) : null,
            signal
        });

        if (!response.ok) {
            throw Error(await response.clone().json())
        }

        return response.clone().json();

    } catch (error) {
        console.log('error', error);
        throw Error(error)
    }

}

export const allApi = async ({ body, headers = {}, method, signal, url, formData = false }) => {

    // headers['Access-Control-Allow-Origin'] = '*';

    try {
        return await fetch(url, {
            method,
            headers,
            body: body ? (formData ? body : JSON.stringify(body)) : null,
            signal
        })
            .then((response) => response.clone().json())
            .then((data) => data);
    } catch (error) {
        throw Error(error)
    }
}

export default api; 