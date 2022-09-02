import React, { useRef } from "react";
import PropTypes from "prop-types";

function Input({ inputId, inputLabel, isRequired, type, placeholder, value, onChange, optionalText }) {
    const ref = useRef(null);

    return (
        <div className = "flex flex-col gap-y-1">
            <label htmlFor = {inputId} className = "text-purple-700 font-medium">
                {inputLabel}{isRequired ? "*" : ""}
            </label>
            
            <input id = {inputId} type = {type} placeholder = {placeholder} value = {value} onChange = {onChange} ref = {ref} className = "bg-gray-100 p-2 border border-white outline-none focus:border-purple-700 rounded-md w-40 sm:w-60 md:w-80" />

            {optionalText !== undefined ? <div onClick = {() => ref.current.focus()} className = "text-purple-700 cursor-default w-40 sm:w-60 md:w-80">{optionalText}</div> : null}
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
    onChange: PropTypes.func.isRequired,
    optionalText: PropTypes.string
};

export default Input;
