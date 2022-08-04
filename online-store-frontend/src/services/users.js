import axios from "axios";

const baseUrl = "/api/users";

async function createUser(reqBody) {
    const response = await axios.post(baseUrl, reqBody);
    return response.data;
};

async function addItemToShoppingCart(reqBody, token) {
    const response = await axios.put(`${baseUrl}/shoppingCartItems`, reqBody, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
};

async function getShoppingCartItems(token) {
    const response = await axios.get(`${baseUrl}/shoppingCartItems`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

const exposedObj = {createUser, addItemToShoppingCart, getShoppingCartItems};

export default exposedObj;
