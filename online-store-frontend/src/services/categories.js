import axios from "axios";

const baseUrl = "/api/categories";

async function getAllCategories() {
    const response = await axios.get(baseUrl);
    return response.data;
};

const exposedObj = {getAllCategories};

export default exposedObj;
