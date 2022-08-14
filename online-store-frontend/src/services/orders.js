import axios from "axios";
import userService from "./users";

const baseUrl = "/api/orders"

async function order(token, userId) {
    const response = await axios.post(baseUrl, null, {headers: {Authorization: `Bearer ${token}`}});
    
    if (response.status === 201)
    {
        const newResponse = await userService.resetShoppingCart(token, userId);
        return newResponse.status;
    }
    
    return response.status;
};

const exposedObj = {order};

export default exposedObj;
