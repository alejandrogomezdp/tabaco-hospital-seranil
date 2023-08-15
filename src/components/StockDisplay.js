import React, { useState, useEffect } from 'react';

function StockDisplay({ setAction, setScanMode }) {
    const [stock, setStock] = useState(0);

    useEffect(() => {
        // Suponiendo que el servidor tiene un endpoint para obtener el stock actual
        fetch('/stock')
            .then((res) => res.json())
            .then((data) => setStock(data.stock));
    }, []);

    const handleAdd = () => {
        setAction('add');
        setScanMode(true);
    };

    const handleSubtract = () => {
        setAction('subtract');
        setScanMode(true);
    };

    return (
        <div>
            <h2>Stock Actual: {stock}</h2>
            <button onClick={handleAdd}>Añadir</button>
            <button onClick={handleSubtract}>Restar</button>
        </div>
    );
}

export default StockDisplay;
