import { useRef } from "react";
import { MapContainer, Marker, Pane, Polygon, Popup, TileLayer, useMap } from "react-leaflet";
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

// map bounds (display a "bacground" around this area)
const bounds = L.latLngBounds(
    L.latLng(53.261616, -6.496525), // Southwest corner
    L.latLng(53.40118, -6.03441)  // Northeast corner
);

// TODO either use this map mask, or just set the min zoom to automatically adjust according to the specified coordinates.
// We should be able to do this: 'map.getBoundsZoom(bounds, false);' if needed, but we need to get the map reference first.
const MapMask = () => {
    // Coordinates for the corners of the map area
    const mapCorners: LatLngExpression[] = [
        [90, -180], // Top-left
        [90, 180],  // Top-right
        [-90, 180], // Bottom-right
        [-90, -180] // Bottom-left
    ];

    // Coordinates for the corners of the bounds to cut out
    const boundsCoords: LatLngExpression[] = [
        [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
        [bounds.getSouthWest().lat, bounds.getNorthEast().lng],
        [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
        [bounds.getNorthEast().lat, bounds.getSouthWest().lng],
    ];

    // Combine map corners and bounds to create the mask
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

function GameMap() {
    // https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202
    const gameMapRef = useRef(null);

    return (
        <MapContainer
            center={[53.3484000, -6.2539000]}
            zoom={13} scrollWheelZoom={true}
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
            <Marker position={[53.3484000, -6.2539000]} >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

            <MapMask />
        </MapContainer>
    );
};

export default GameMap;
