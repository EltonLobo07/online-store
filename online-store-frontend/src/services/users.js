const axios = require("axios");

const baseUrl = "/api/users";

async function createUser(reqBody) {
    const response = await axios.post(baseUrl, reqBody);
    return response.data;
};

async function addItem(reqBody, token) {
    const response = await axios.put(`${baseUrl}/addItem`, reqBody, {headers: {Authorization: `Bearer ${token}`}});
    return response.status;
};

module.exports = {createUser, addItem};
