import React from "react";
import PropTypes from "prop-types";

function Input({ inputId, inputLabel, isRequired, type, placeholder, value, onChange}) {
    return (
        <div className = "flex flex-col gap-y-1">
            <label htmlFor = {inputId} className = "text-purple-700 font-medium">
                {inputLabel}{isRequired ? "*" : ""}
            </label>
            <input id = {inputId} type = {type} placeholder = {placeholder} value = {value} onChange = {onChange} className = "bg-gray-100 p-2 border border-white outline-none focus:border-purple-700 rounded-md w-40 sm:w-60 md:w-80" />
        </div>
    );
};

Input.propTypes = {
    inputId: PropTypes.string.isRequired,
    inputLabel: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Input;
