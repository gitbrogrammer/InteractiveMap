import React from "react";

function PlantDetails({ enterprise, onClose }) {
    return (
        <div
            style={{
                position: "fixed",
                right: 20,
                top: 80,
                background: "#fff",
                border: "2px solid #23f",
                borderRadius: 10,
                padding: 24,
                boxShadow: "0 4px 28px rgba(0,0,0,0.12)",
                zIndex: 1000,
                maxWidth: 350,
            }}
        >
            <button onClick={onClose} style={{ float: "right" }}>×</button>
            <h2>{enterprise.name}</h2>
            <img
                src={enterprise.image}
                alt={enterprise.name}
                style={{ maxWidth: "100%", borderRadius: 8, margin: "12px 0" }}
            />
            <div style={{ fontWeight: 500, margin: "8px 0" }}>{enterprise.shortDescription}</div>
            <div>{enterprise.fullDescription}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 12 }}>
                Координаты: {enterprise.x}%, {enterprise.y}%
            </div>
        </div>
    );
}

export default PlantDetails;