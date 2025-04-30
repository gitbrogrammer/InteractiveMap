import React, { useState, useCallback, useEffect } from "react";
import PlantPopup from "./PlantPopup";

function Marker({ enterprise, onClick, draggable, mapRef, onDrag }) {
    const [showPopup, setShowPopup] = useState(false);
    const [dragging, setDragging] = useState(false);

    const markerStyle = {
        position: "absolute",
        left: `${enterprise.x}%`,
        top: `${enterprise.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: draggable ? "grab" : "pointer",
        zIndex: 2,
        border: draggable ? "2px solid #23f" : undefined,
    };

    const handleMouseDown = (e) => {
        if (!draggable) return;
        setDragging(true);
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseMove = (e) => {
        if (!dragging || !draggable) return;
        const rect = mapRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        if (onDrag) {
            onDrag({
                x: Math.max(0, Math.min(100, Math.round(x * 100) / 100)),
                y: Math.max(0, Math.min(100, Math.round(y * 100) / 100)),
            });
        }
    };

    const handleMouseUp = () => {
        if (dragging) setDragging(false);
    };

    React.useEffect(() => {
        if (!dragging) return;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        // eslint-disable-next-line
    }, [dragging]);

    return (
        <div style={markerStyle}>
            <div
                className={`marker${draggable ? " marker-edit" : ""}`}
                onClick={!draggable ? () => setShowPopup((v) => !v) : undefined}
                onMouseDown={handleMouseDown}
                title={enterprise.name}
            />
            {showPopup && !draggable && (
                <PlantPopup
                    enterprise={enterprise}
                    onClick={() => onClick(enterprise)}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
}

export default Marker;