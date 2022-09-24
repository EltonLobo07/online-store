import axios from "axios";

// const baseUrl = "http://localhost:3001/api/categories";
const baseUrl = "/api/categories";

async function getAllCategories() {
    const response = await axios.get(baseUrl);
    return response.data;
};

const exposedObj = {getAllCategories};

export default exposedObj;
