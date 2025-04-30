import React from "react";

function PlantPopup({ enterprise, onClick, onClose }) {
    return (
        <div
            style={{
                position: "absolute",
                left: 24,
                top: -20,
                background: "#fff",
                border: "1px solid #aaa",
                borderRadius: 6,
                padding: "8px 14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 10,
                minWidth: 120,
            }}
            onClick={onClick}
        >
            <b>{enterprise.name}</b>
            <div style={{ fontSize: 13, color: "#555", margin: "6px 0" }}>
                {enterprise.shortDescription}
            </div>
            <button onClick={onClose} style={{ fontSize: 12, color: "#777" }}>
                Закрыть
            </button>
        </div>
    );
}

export default PlantPopup;