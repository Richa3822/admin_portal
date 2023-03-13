import axios from "axios";
import { BASE_URL } from "../constants/Constant";


// --> add token in future

export async function getData({ url }) {
    try {
        const fetchData = await axios.get(BASE_URL + url)
        console.log(" axios get === ", fetchData)
        return fetchData.data;
    } catch (error) {
        return error.response.data
    }
}

export async function postData({ url, body, headers = { 'Content-Type': 'application/json' } }) {
    try {
        const postData = await axios.post(BASE_URL + url, body, { headers })
        console.log(" axios post === ", postData)
        return postData.data;

    } catch (error) {
        return error.response.data
    }
}

export async function deleteData({ url, body, headers = { 'Content-Type': 'application/json' } }) {
    try {
        const deletedData = await axios.delete(BASE_URL + url, {
            data: body
        }, headers)
        console.log("axios delete = ", deletedData)
        return deletedData.data

    } catch (error) {
        return error.response.data
    }

}