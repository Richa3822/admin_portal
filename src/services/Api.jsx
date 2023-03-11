import { axiosObject } from "../App";

 async function saveData(url, body) {
    var response = await axiosObject.post(url, body)
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

 async function getData(url) {
    var response = await axiosObject.get(url)
    if (response.status === 200) {
        return response.data;
    }
    return null;
}
 async function deleteData(url,id) {
    var response = await axiosObject.delete(url+id)
    if (response.status === 200) {
        return id;
    }
    return null;
}

export {
    saveData,
    getData,
    deleteData
}