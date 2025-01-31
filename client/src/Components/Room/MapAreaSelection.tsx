import { DrawAreaSelection } from "@bopen/leaflet-area-selection";
import "@bopen/leaflet-area-selection/dist/index.css";
import * as L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import GestureHandling from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { usePolygon } from "../Contexts/PolygonContext";

export type MapAreaSelectionRef = {
   getMapInstance: () => L.Map | null;
};

const MapAreaSelection = forwardRef<MapAreaSelectionRef>((_, ref) => {
   const { setPolygon: setMapPolygon } = usePolygon();
   const mapRef = useRef<L.Map | null>(null);

   // Add gesture handling to Leaflet
   L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

   useImperativeHandle(ref, () => ({
      getMapInstance: () => mapRef.current,
   }));

   useEffect(() => {
      // Initialize the map only once
      if (mapRef.current === null) {
         // Create the map instance with gesture handling enabled
         const map = L.map("map", {
            center: [50.22, 7.91],
            zoom: 3,
            gestureHandling: true,
         });

         // Add OpenStreetMap tile layer
         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
               '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         }).addTo(map);

         // Initialize the area selection tool
         const areaSelection = new DrawAreaSelection({
            active: false,
            color: "blue",
            onPolygonReady: (polygon: L.Polygon) => {
               setMapPolygon(polygon);
            },
         });

         // Add the area selection control to the map
         map.addControl(areaSelection);

         // Add the search control
         L.Control.geocoder({
            defaultMarkGeocode: true,
            // Customize the position here 'topright', 'topleft', 'bottomleft', or 'bottomright'
            position: "topleft",
         })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on("markgeocode", function (e: any) {
               const bbox = e.geocode.bbox;
               const bounds = L.latLngBounds(
                  L.latLng(bbox.getSouthWest()),
                  L.latLng(bbox.getNorthEast())
               );
               map.fitBounds(bounds);
            })
            .addTo(map);

         mapRef.current = map;
      }
   }, []);

   return <div id="map" style={{ height: "100%", width: "100%" }} />;
});

export default MapAreaSelection;
