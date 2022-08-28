import React, { useState, useImperativeHandle } from "react";

const DisplayTotalPrice = React.forwardRef(({ initialTotalPrice }, ref) => { 
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

    useImperativeHandle(ref, () => ({totalPrice, setTotalPrice}));

    return (
        <div className = "text-lg text-purple-700 font-medium">
            Total price: ${totalPrice.toFixed(2)}
        </div>
    );
});

export default DisplayTotalPrice;
