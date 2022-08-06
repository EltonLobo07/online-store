import axios from "axios";

const baseUrl = "/api/products";

async function getAllProducts() {
    const response = await axios.get(baseUrl);
    return response.data;
};

const exposedObj = {getAllProducts};

export default exposedObj;
