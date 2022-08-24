import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

async function createUser(reqBody) {
    const response = await axios.post(baseUrl, reqBody);
    return response.data;
};

async function addProductToShoppingCart(reqBody, userId, token) {
    const response = await axios.post(`${baseUrl}/${userId}/shoppingCartProducts`, reqBody, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
};

async function getShoppingCartProducts(userId, token) {
    const response = await axios.get(`${baseUrl}/${userId}/shoppingCartProducts`, {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
};

async function getShoppingCartProductsDetailed(userId, token) {
    const response = await axios.get(`${baseUrl}/${userId}/shoppingCartProducts/detailed`, {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
};

async function removeShoppingCartProduct(ProductId, userId, token) {
    const response = await axios.delete(`${baseUrl}/${userId}/shoppingCartProducts/${ProductId}`, {headers: {Authorization: `Bearer ${token}`}});

    return response.status;
};

async function resetShoppingCart(token, userId) {
    const response = await axios.delete(`${baseUrl}/${userId}/shoppingCartProducts`, {headers: {Authorization: `Bearer ${token}`}});
    
    return response.status;
};

async function updateShoppingCartProduct(token, userId, productId, quantity) {
    const response = await axios.patch(`${baseUrl}/${userId}/shoppingCartProducts/${productId}`, {quantity}, {headers: {Authorization: `Bearer ${token}`}});
    
    return response.data;
};

async function getShoppingCartProductQuantity(token, userId, productId) {
    const response = await axios.get(`${baseUrl}/${userId}/shoppingCartProducts/${productId}`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
};

async function isProductPresentInTheCart(token, userId, productId) {
    const response = await axios.get(`${baseUrl}/${userId}/shoppingCartProducts/${productId}/isProductPresent`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
};

async function getAddress(token, userId) {
    const response = await axios.get(`${baseUrl}/${userId}/address`, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
};

async function setAddress(token, userId, address) {
    const response = await axios.put(`${baseUrl}/${userId}/address`, {address}, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
}

const exposedObj = {createUser, addProductToShoppingCart, 
                    getShoppingCartProducts, removeShoppingCartProduct,
                    resetShoppingCart, updateShoppingCartProduct,
                    getShoppingCartProductQuantity, getShoppingCartProductsDetailed,
                    isProductPresentInTheCart, getAddress, setAddress};

export default exposedObj;
