// Authors: Vojta Bruza and Grace Houser
// This file TODO

import { LatLngBounds, LatLngExpression } from "leaflet";
import { Pane, Polygon } from "react-leaflet";

interface MapMaskProps {
    bounds: LatLngBounds;
}

const MapMask = ({ bounds }: MapMaskProps) => {
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

export default MapMask;