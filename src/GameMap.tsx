import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

function GameMap() {
    // https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202
    const gameMapRef = useRef(null);
    return (
        <MapContainer center={[53.3484000, -6.2539000]} zoom={13} scrollWheelZoom={true}
            ref={gameMapRef} style={{ height: "85vh", width: "90vw", margin: "auto" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[53.3484000, -6.2539000]} >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default GameMap;
