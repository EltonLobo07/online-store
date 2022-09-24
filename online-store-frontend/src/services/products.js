import axios from "axios";

// const baseUrl = "http://localhost:3001/api/products";
const baseUrl = "/api/products";

async function getAllProducts() {
    const response = await axios.get(baseUrl);
    return response.data;
};

async function getOneProduct(productId) {
    const response = await axios.get(`${baseUrl}/${productId}`);
    return response.data;
};

const exposedObj = {getAllProducts, getOneProduct};

export default exposedObj;
