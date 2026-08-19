import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';
import {
  Users,
  Heart,
  Building2,
  Home as HomeIcon,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface PopularCategory {
  label: string;
  icon: LucideIcon;
  href: string;
}

const popularCategories: PopularCategory[] = [
  { label: 'Social Welfare', icon: Users, href: '/services/social-welfare' },
  { label: 'Health Services', icon: Heart, href: '/services/health-services' },
  {
    label: 'Business and Livelihood',
    icon: Building2,
    href: '/services/business',
  },
  {
    label: 'Housing & Land Use',
    icon: HomeIcon,
    href: '/services/housing-land-use',
  },
  { label: 'Education', icon: GraduationCap, href: '/services/education' },
];

export default function PopularServicesSection() {
  return (
    <Section className="bg-gray-50">
      <Heading level={2}>Popular Services</Heading>
      <Text className="text-gray-600 mb-6">
        Quick access to the most-used city services.
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCategories.map(category => {
          const Icon = category.icon;
          return (
            <Link key={category.href} to={category.href}>
              <Card hoverable className="h-full">
                <CardContent className="flex items-center gap-4 p-5 h-full">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-md shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {category.label}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <Link to="/services">
          <Card className="h-full bg-primary-600 border-0 hover:bg-primary-700 transition-colors">
            <CardContent className="flex items-center justify-between p-5 h-full">
              <span className="font-semibold text-white text-lg">
                View all Services
              </span>
              <ArrowRight className="h-6 w-6 text-white" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </Section>
  );
}
