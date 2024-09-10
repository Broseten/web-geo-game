import { useState, useRef } from "react";
import { MapContainer, Marker, Pane, Polygon, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// map bounds (display a "background" around this area)
const bounds = L.latLngBounds(
    L.latLng(53.261616, -6.496525), // Southwest corner
    L.latLng(53.40118, -6.03441)  // Northeast corner
);

const MapMask = () => {
    const mapCorners: LatLngExpression[] = [
        [90, -180], // Top-left
        [90, 180],  // Top-right
        [-90, 180], // Bottom-right
        [-90, -180] // Bottom-left
    ];

    const boundsCoords: LatLngExpression[] = [
        [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
        [bounds.getSouthWest().lat, bounds.getNorthEast().lng],
        [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
        [bounds.getNorthEast().lat, bounds.getSouthWest().lng],
    ];

    const maskCoords: LatLngExpression[][] = [
        [...mapCorners],
        [...boundsCoords]
    ];

    return (
        <Pane name="mask-pane" style={{ zIndex: 500 }}>
            <Polygon
                positions={maskCoords}
                pathOptions={{ color: 'black', fillColor: 'black', fillOpacity: 0.7, stroke: false }}
            />
        </Pane>
    );
};

// Component to handle clicks and add markers
function ClickHandler({ onClick }: { onClick: (latlng: LatLngExpression) => void }) {
    useMapEvents({
        click(e) {
            onClick([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

function GameMap() {
    const gameMapRef = useRef(null);
    const [markers, setMarkers] = useState<LatLngExpression[]>([]);

    const addMarker = (position: LatLngExpression) => {
        setMarkers((current) => [...current, position]);
    };

    return (
        <MapContainer
            center={[53.3484000, -6.2539000]}
            zoom={13} 
            scrollWheelZoom={true}
            ref={gameMapRef}
            style={{ height: "85vh", width: "90vw", margin: "auto" }}
            maxBounds={bounds}
            maxBoundsViscosity={1.0} // Enforces bounds restriction
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={12}
            />

            <ClickHandler onClick={addMarker} />

            {markers.map((position, idx) => (
                <Marker key={idx} position={position}>
                    <Popup>You clicked here!</Popup>
                </Marker>
            ))}

            <MapMask />
        </MapContainer>
    );
}

export default GameMap;
