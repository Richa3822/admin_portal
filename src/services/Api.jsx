import { axiosObject } from "../App.jsx";

async function saveData(url, body, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await axiosObject.post(url, body, headers)
        return response.data;

    } catch (error) {
        return error.response.data
    }
}

async function getData(url) {
    try {
        const responce = await axiosObject.get(url)
        return responce.data;
    } catch (error) {
        return error.response.data
    }
}

async function deleteData(url, body, headers = { 'Content-Type': 'application/json' }) {

    try {
        const response = await axiosObject.delete(url, {
            data: body
        }, headers)
        return response.data

    } catch (error) {
        return error.response.data
    }
}

async function axiosPatch(url, body) {
    try {
        const responce = await axiosObject.patch(url, body);
        console.log("patch data = ", responce);

        return responce.data
    } catch (error) {
        return error.responce.data
    }
}

async function axiosPut(url, body) {
    try {
        const responce = await axiosObject.put(url, body);
        console.log("put data = ", responce);

        return responce.data
    } catch (error) {
        return error.responce.data
    }
}

export {
    saveData,
    getData,
    deleteData,
    axiosPatch,
    axiosPut
}