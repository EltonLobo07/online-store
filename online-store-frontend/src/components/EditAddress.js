import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import userService from "../services/users";

function EditAddress({ user, displayErr }) {
    const [address, setAddress] = useState("");
    const [editAddress, setEditAddress] = useState(false);
    const ref = useRef(null);

    async function handleClick(e) {
        if (editAddress) {
            try {
                await userService.setAddress(user.token, user.id, address);
            }
            catch (err) {
                displayErr(err?.response?.data?.error || err.message);
            }
        }
        else {
            ref.current.disabled = false;
            ref.current.focus();
        }

        setEditAddress(!editAddress);
    };

    useEffect(() => {
        if (user) {
            userService.getAddress(user.token, user.id)
                       .then(address => setAddress(address))
                       .catch(err => displayErr(err?.response?.data?.error || err.message));
        }
    }, [user]);

    return (
        <div className = "flex flex-col gap-y-4 org-sm:flex-row org-sm:gap-x-4 items-center">
            <button onClick = {handleClick} className = "btn">
                {editAddress ? "Save " : "Edit "} address
            </button>

            <textarea disabled = {!editAddress} value = {address} onChange = {e => setAddress(e.target.value)} rows = "5" className = {`${!editAddress ? "bg-gray-50 border-gray-50" : "bg-white border-white"} p-2 min-h-[100px] border outline-none focus:border-purple-700 rounded-md w-52 sm:w-60 md:w-80`} ref = {ref}></textarea>
        </div>
    );
};

EditAddress.propTypes = {
    user: PropTypes.object,
    displayErr: PropTypes.func
};

export default EditAddress;
