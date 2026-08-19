import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { User, Users, Building2 } from 'lucide-react';

const offices = [
  {
    icon: User,
    title: 'Office of the Mayor',
    description:
      'The Mayor is the chief executive of the city, leading local development programs, overseeing city services, and representing the LGU.',
    href: '/government/departments/executive',
  },
  {
    icon: Users,
    title: 'Sangguniang Panlungsod (City Council)',
    description:
      'The legislative body of the city, composed of elected councilors presided over by the Vice Mayor, approves ordinances and resolutions.',
    href: '/government/departments/legislative',
  },
  {
    icon: Building2,
    title: 'City Departments & Offices',
    description:
      'The administrative offices that deliver frontline services such as health, social welfare, business permits, engineering, and more.',
    href: '/government/departments',
  },
];

const powers = [
  { label: 'City Mayor', value: 'Chief Executive' },
  { label: 'Vice Mayor', value: 'Presides over the City Council' },
  { label: 'Councilors', value: 'Legislative body (Sangguniang Panlungsod)' },
  { label: 'Barangays', value: 'Smallest administrative divisions' },
  { label: 'City Departments', value: 'Frontline service delivery' },
];

const Local: React.FC = () => {
  return (
    <>
      <SEO
        title="Local Government"
        description={`Explore the local government of ${import.meta.env.VITE_GOVERNMENT_NAME}: the office of the Mayor, the Sangguniang Panlungsod, and city departments.`}
        keywords="local government, mayor, city council, sangguniang panlungsod, city departments, barangay"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Heading>Local Government</Heading>
        <Text className="text-gray-600 mb-8">
          The local government of {import.meta.env.VITE_GOVERNMENT_NAME} is the
          city government responsible for delivering public services to its
          residents. It is composed of an executive branch (the Mayor), a
          legislative branch (the Sangguniang Panlungsod), and the city
          departments that provide frontline services.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {offices.map(office => {
            const Icon = office.icon;
            return (
              <Link key={office.title} to={office.href}>
                <Card
                  hoverable
                  className="h-full border-t-4 border-primary-500"
                >
                  <CardContent>
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start w-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {office.title}
                    </h3>
                    <Text className="text-gray-800">{office.description}</Text>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <Heading level={2}>How the Local Government is Organized</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {powers.map(item => (
            <Card key={item.label} className="h-full">
              <CardContent>
                <span className="block text-sm text-primary-600 font-medium mb-1">
                  {item.label}
                </span>
                <span className="text-gray-800">{item.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 bg-primary-50 rounded-md">
          <Heading level={3}>Explore National Government</Heading>
          <Text className="text-gray-700 mb-4">
            Looking for national agencies, the three branches of government, or
            national services? Visit the national government section.
          </Text>
          <Link
            to="/government/national"
            className="inline-block px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
          >
            Go to National Government
          </Link>
        </div>
      </Section>
    </>
  );
};

export default Local;
