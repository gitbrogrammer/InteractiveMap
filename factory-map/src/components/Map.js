import React, { useRef } from "react";
import Marker from "./Marker";
import "./Map.css";

function Map({
    enterprises,
    onMarkerClick,
    onMapClick,
    editingEnterprise,
    onMarkerDrag,
    adminEditMode,
    adminAddMode,
}) {
    const mapRef = useRef();

    const handleMapClick = (e) => {
        if (!onMapClick) return;
        const rect = mapRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        onMapClick({
            x: Math.max(0, Math.min(100, Math.round(x * 100) / 100)),
            y: Math.max(0, Math.min(100, Math.round(y * 100) / 100)),
        });
    };

    return (
        <div className="map-container">
            <img
                ref={mapRef}
                src="/map.svg"
                alt=" арта страны"
                className="map-img"
                style={{
                    cursor:
                        adminEditMode || adminAddMode
                            ? "crosshair"
                            : onMapClick
                                ? "crosshair"
                                : "default"
                }}
                onClick={onMapClick ? handleMapClick : undefined}
                draggable={false}
            />
            {/* ѕоказываем только редактируемый/добавл€емый маркер */}
            {editingEnterprise && (
                <Marker
                    enterprise={editingEnterprise}
                    draggable={true}
                    mapRef={mapRef}
                    onDrag={onMarkerDrag}
                />
            )}
            {/* ќстальные маркеры только если не сейчас добавл€ем/редактируем */}
            {!editingEnterprise &&
                enterprises.map((enterprise) => (
                    <Marker key={enterprise.id} enterprise={enterprise} onClick={onMarkerClick} />
                ))}
        </div>
    );
}

export default Map;