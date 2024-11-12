// Authors: Vojtech Bruza and Grace Houser
import { useRef, useEffect } from 'react';
import L from 'leaflet';
import '@bopen/leaflet-area-selection/dist/index.css';
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';
import 'leaflet/dist/leaflet.css';

export default function AreaSelectionMap() {
   const mapRef = useRef<L.Map | null>(null);

   useEffect(() => {
      // Initialize the map only once
      if (mapRef.current === null) {
         // Create the map instance
         const map = L.map('map').setView([53.3484000, -6.2539000], 13);

         // Add OpenStreetMap tile layer
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
               '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         }).addTo(map);

         // Initialize the area selection tool with onPolygonReady callback
         const areaSelection = new DrawAreaSelection({
            color: 'blue', // Customize polygon color
            active: true,
            onPolygonReady: (polygon: L.Polygon, controlInstance: any) => {
               const bounds = polygon.getBounds();
               console.log('Selected area bounds:', bounds);
               // Additional processing can be added here (e.g., sending to server)
               // TODO
            },
         });

         // Add the area selection control to the map
         map.addControl(areaSelection);

         mapRef.current = map;
      }
   }, []);

   // TODO style
   return <div id="map" style={{ height: '100%', width: '100%' }} />;
};
