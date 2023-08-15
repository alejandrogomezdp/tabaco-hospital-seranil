import React from 'react';
import './BarcodeScanner.css'
import { QrReader } from 'react-qr-reader';

function BarcodeScanner({ action, scanMode, setScanMode }) {
    const handleScan = (data) => {
        if (data && scanMode) {
            if (action === 'add') {
                // Llamar al endpoint para añadir stock
            } else if (action === 'subtract') {
                // Llamar al endpoint para restar stock
            }
            console.log(data);
            setScanMode(false); // desactivar scanMode después de escanear
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
            />
        </div>
    );
}

export default BarcodeScanner;
