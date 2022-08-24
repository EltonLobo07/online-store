import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

async function login(reqBody) {
    const response = await axios.post(baseUrl, reqBody);
    return response.data;
};

const exposedObj = {login};

export default exposedObj;
