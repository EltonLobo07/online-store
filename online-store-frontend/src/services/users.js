import axios from "axios";

const baseUrl = "/api/users";

async function createUser(reqBody) {
    const response = await axios.post(baseUrl, reqBody);
    return response.data;
};

async function addItemToShoppingCart(reqBody, userId, token) {
    const response = await axios.post(`${baseUrl}/${userId}/shoppingCartItems`, reqBody, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
};

async function getShoppingCartItems(userId, token) {
    const response = await axios.get(`${baseUrl}/${userId}/shoppingCartItems`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
};

async function removeShoppingCartItem(itemID, userId, token) {
    const response = await axios.delete(`${baseUrl}/${userId}/shoppingCartItems/${itemID}`, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
};

async function resetShoppingCart(token, userId) {
    const response = await axios.patch(`${baseUrl}/${userId}/shoppingCartItems`, null, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
}

const exposedObj = {createUser, addItemToShoppingCart, 
                    getShoppingCartItems, removeShoppingCartItem,
                    resetShoppingCart};

export default exposedObj;
