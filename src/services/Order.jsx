import axios from "axios";
async function FetchOrders(url,body,headers={"Content-Type":"Application/json"}){
    let orders = await axios.get(url,body,headers);
    return orders;
}
async function UpdateOrders(url,body,headers = { headers: { Accept: "application/json", 'Content-Type': "application/json" } }){
    let updatedOrder = axios.patch(url,body,headers);
    return updatedOrder;
}
export {FetchOrders,UpdateOrders};