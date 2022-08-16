import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/users";
import StyledButton from "./Button";

function EditAddress({ user }) {
    const [address, setAddress] = useState("");
    const [editAddress, setEditAddress] = useState(false);

    async function handleClick(e) {
        if (editAddress) {
            try {
                await userService.setAddress(user.token, user.id, address);
            }
            catch (err) {
                alert(err?.response?.data?.error || err.message);
            }
        }

        setEditAddress(!editAddress);
    };

    useEffect(() => {
        if (user) {
            userService.getAddress(user.token, user.id)
                       .then(address => setAddress(address))
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }
    }, [user]);

    return (
        <div>
            <StyledButton onClick = {handleClick}>{editAddress ? "Save " : "Edit "} address</StyledButton>
            <textarea disabled = {!editAddress} value = {address} onChange = {e => setAddress(e.target.value)}></textarea>
        </div>
    );
};

EditAddress.propTypes = {
    user: PropTypes.object
};

export default EditAddress;
