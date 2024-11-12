// Authors: Vojtech Bruza and Grace Houser
import { useRef, useEffect } from 'react';
import L from 'leaflet';
import '@bopen/leaflet-area-selection/dist/index.css';
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';
import 'leaflet/dist/leaflet.css';
import { usePolygon } from '../Contexts/PolygonContext';

export default function MapAreaSelection() {
  const { setPolygon: setMapPolygon } = usePolygon();
   const mapRef = useRef<L.Map | null>(null);

   useEffect(() => {
      // Initialize the map only once
      if (mapRef.current === null) {
         // Create the map instance
         const map = L.map('map').setView([50.22, 7.91], 3);

         // Add OpenStreetMap tile layer
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
               '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         }).addTo(map);

         // Initialize the area selection tool with the 'active' and 'onPolygonReady' options
         const areaSelection = new DrawAreaSelection({
            active: false, // Start with the selection tool active
            color: 'blue', // Customize polygon color
            onPolygonReady: (polygon: L.Polygon, controlInstance: any) => {
               // TODO send to server instead of the context
               setMapPolygon(polygon);
            }
         });

         // Add the area selection control to the map
         map.addControl(areaSelection);

         mapRef.current = map;
      }
   }, []);

   return <div id="map" style={{ height: '100%', width: '100%' }} />;
}
