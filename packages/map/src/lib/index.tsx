import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { createRef, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import { MapContainer, Marker } from './styles';

/* eslint-disable-next-line */
export interface MapProps {
  initialCoordinates?: { lat: number; lng: number };
  initialZoom?: number;
  markers?: number[][];
  onMapClick?: (e: L.LeafletMouseEvent) => void;
}

export function Map({
  initialCoordinates,
  initialZoom,
  markers,
  onMapClick,
}: MapProps) {
  const mapContainerRef = createRef<HTMLDivElement>();
  const mapRef = useRef<L.Map | null>();
  const polyLineRef = useRef<L.Polyline | null>();
  // Example layer group for markers
  const layerGroupRef = useRef<L.LayerGroup | null>();

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }
    if (mapRef.current) {
      return;
    }
    mapRef.current = L.map(mapContainerRef.current).setView(
      [
        initialCoordinates?.lat || 52.588302,
        initialCoordinates?.lng || 13.322774,
      ],
      initialZoom || 10
    );

    // register map click handler
    onMapClick && mapRef.current.on('click', onMapClick);

    // Add a tile layer (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      mapRef.current
    );
    layerGroupRef.current = L.layerGroup().addTo(mapRef.current);
  }, [
    initialCoordinates?.lat,
    initialCoordinates?.lng,
    initialZoom,
    mapContainerRef,
    onMapClick,
  ]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    layerGroupRef.current?.clearLayers();

    markers?.forEach((marker, index) => {
      const element = ReactDOMServer.renderToStaticMarkup(
        <Marker>{index + 1}</Marker>
      );
      const icon = L.divIcon({
        html: element,
      });

      L.marker({ lat: marker[0], lng: marker[1] }, { icon }).addTo(
        layerGroupRef.current as L.LayerGroup
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    polyLineRef.current = L.polyline(markers as any, {
      color: '#1086e0',
    }).addTo(layerGroupRef.current as L.LayerGroup);
  }, [markers]);

  return (
    <MapContainer
      ref={mapContainerRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
}

export default Map;
