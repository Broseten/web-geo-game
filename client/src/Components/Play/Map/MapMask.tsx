// Authors: Vojta Bruza and Grace Houser

import { LatLngExpression } from "leaflet";
import { Pane, Polygon } from "react-leaflet";

interface MapMaskProps {
    polygonCoords: LatLngExpression[];
}

const MapMask = ({ polygonCoords }: MapMaskProps) => {
    const mapCorners: LatLngExpression[] = [
        [90, -180], // Top-left
        [90, 180],  // Top-right
        [-90, 180], // Bottom-right
        [-90, -180] // Bottom-left
    ];

    // Create the mask using the map corners and the polygon bounds
    const maskCoords: LatLngExpression[][] = [
        mapCorners,
        polygonCoords
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

export default MapMask;
