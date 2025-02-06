import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function LayerControl() {
   const map = useMap();

   useEffect(() => {
      const osmLayer = L.tileLayer(
         "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
         {
            attribution:
               '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         }
      );

      const esriWorldImagery = L.tileLayer(
         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
         {
            attribution:
               "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
         }
      );

      // add both layers to the map initially
      osmLayer.addTo(map);

      const baseLayers = {
         "OpenStreetMap": osmLayer,
         "Esri World Imagery": esriWorldImagery,
      };

      L.control.layers(baseLayers).addTo(map);

   }, [map]);

   return null;
}