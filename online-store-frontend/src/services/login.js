const axios = require("axios");

const baseUrl = "/api/login";

async function login(reqBody) {
    const response = await axios.post(baseUrl, reqBody);
    return response.data;
};

module.exports = {login};
