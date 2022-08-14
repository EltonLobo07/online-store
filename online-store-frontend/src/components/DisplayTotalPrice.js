import React, { useState, useImperativeHandle } from "react";

const DisplayTotalPrice = React.forwardRef(({ initialTotalPrice }, ref) => { 
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

    useImperativeHandle(ref, () => ({totalPrice, setTotalPrice}));

    return <div>Total price: ${totalPrice.toFixed(2)}</div>;
});

export default DisplayTotalPrice;
