import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const statistics = [
  { label: 'Barangays', value: '193' },
  { label: 'Population', value: '1,814,693' },
  { label: 'GDP', value: '₱235.54 billion' },
];

export default function StatisticsSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <Heading level={2}>Statistics</Heading>
          <Text className="text-gray-600">
            Key figures about Caloocan City at a glance.
          </Text>
        </div>
        <Link
          to="/statistics"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors whitespace-nowrap"
        >
          View Statistics
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statistics.map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-700 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
