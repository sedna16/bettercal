import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { MapPin, ExternalLink } from 'lucide-react';
import { caloocanNorth, caloocanSouth } from '../../data/caloocanBoundary';

function FitView() {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([...caloocanNorth, ...caloocanSouth]);
    const zoom = Math.min(
      map.getBoundsZoom(bounds, false) + 1,
      map.getMaxZoom()
    );
    map.setView(bounds.getCenter(), zoom);
  }, [map]);

  return null;
}

export default function MapSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Heading level={2}>Map</Heading>
        <Text className="text-gray-600 mb-6">
          Find your way around {import.meta.env.VITE_GOVERNMENT_NAME}. Use the
          map below to explore the city, identify barangays, and locate city
          offices and landmarks.
        </Text>
      </div>

      <div className="relative w-full h-[420px] z-0 overflow-hidden bg-gray-200">
        <MapContainer
          center={[14.72, 121.03]}
          zoom={11}
          minZoom={4}
          maxZoom={19}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="topleft" />
          <Polygon
            positions={caloocanNorth}
            pathOptions={{
              color: '#2563eb',
              weight: 1,
              fillColor: '#2563eb',
              fillOpacity: 0.4,
            }}
          />
          <Polygon
            positions={caloocanSouth}
            pathOptions={{
              color: '#dc2626',
              weight: 1,
              fillColor: '#dc2626',
              fillOpacity: 0.4,
            }}
          />
          <FitView />
        </MapContainer>
      </div>

      <div className="container mx-auto px-4 py-6">
        <a
          href={`https://www.google.com/maps?q=${encodeURIComponent(
            'Caloocan City, Philippines'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <MapPin className="h-4 w-4" />
          Open in Google Maps
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
