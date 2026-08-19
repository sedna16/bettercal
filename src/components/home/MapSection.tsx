import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { MapPin, ExternalLink } from 'lucide-react';

const mapsQuery = 'Caloocan City, Philippines';

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

      <iframe
        title={`Map of ${import.meta.env.VITE_GOVERNMENT_NAME}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          mapsQuery
        )}&output=embed`}
        className="w-full h-[420px] border-0 block"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        style={{ border: 0 }}
      />

      <div className="container mx-auto px-4 py-6">
        <a
          href={`https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}`}
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
