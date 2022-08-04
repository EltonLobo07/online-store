import axios from "axios";

const baseUrl = "https://fakestoreapi.com/products";

async function getAllProducts() {
    const response = await axios.get(baseUrl);
    return response.data;
};

const exposedObj = {getAllProducts};

export default exposedObj;
