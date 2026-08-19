import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { Landmark, Scale, Gavel, Building2 } from 'lucide-react';

const branches = [
  {
    icon: Landmark,
    title: 'Executive Branch',
    description:
      'The President heads the national government and implements laws. It includes the Office of the President, the Cabinet, and executive departments and agencies.',
    links: [
      { label: 'Official Gazette', href: 'https://www.officialgazette.gov.ph' },
      { label: 'Office of the President', href: 'https://op-proper.gov.ph' },
    ],
  },
  {
    icon: Scale,
    title: 'Legislative Branch',
    description:
      'The Congress of the Philippines makes national laws. It is composed of the Senate and the House of Representatives.',
    links: [
      {
        label: 'House of Representatives',
        href: 'https://www.congress.gov.ph',
      },
      {
        label: 'Senate of the Philippines',
        href: 'https://legacy.senate.gov.ph',
      },
    ],
  },
  {
    icon: Gavel,
    title: 'Judiciary',
    description:
      'The Judiciary interprets laws and settles legal disputes. It is headed by the Supreme Court and includes lower courts across the country.',
    links: [
      { label: 'Supreme Court', href: 'https://sc.judiciary.gov.ph' },
      { label: 'Judiciary Website', href: 'https://judiciary.gov.ph' },
    ],
  },
];

const agencies = [
  'Department of Education (DepEd)',
  'Department of Health (DOH)',
  'Department of the Interior and Local Government (DILG)',
  'Department of Social Welfare and Development (DSWD)',
  'Department of Budget and Management (DBM)',
  'Bureau of Internal Revenue (BIR)',
];

const National: React.FC = () => {
  return (
    <>
      <SEO
        title="National Government"
        description="Information about the national government of the Philippines: the Executive, Legislative, and Judiciary branches, and national agencies."
        keywords="national government, executive, legislative, judiciary, government agencies, Philippines"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Heading>National Government</Heading>
        <Text className="text-gray-600 mb-8">
          The national government of the Philippines is organized into three
          branches that carry out the country&#8217;s governance, alongside
          constitutional commissions and national agencies.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {branches.map(branch => {
            const Icon = branch.icon;
            return (
              <Card
                key={branch.title}
                hoverable
                className="h-full border-t-4 border-primary-500"
              >
                <CardContent>
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start w-fit">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {branch.title}
                  </h3>
                  <Text className="text-gray-800">{branch.description}</Text>
                  <ul className="mt-4 space-y-1">
                    {branch.links.map(link => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          {link.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Heading level={2}>National Government Agencies</Heading>
        <Text className="text-gray-600 mb-6">
          These are the main executive departments that deliver national
          programs and services down to the local level.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agencies.map(agency => (
            <Card key={agency} className="h-full">
              <CardContent className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary-600" />
                <span className="text-gray-800 font-medium">{agency}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 bg-primary-50 rounded-md">
          <Heading level={3}>Learn about your Local Government</Heading>
          <Text className="text-gray-700 mb-4">
            Prefer to explore how your city government works? Find local
            departments, offices, and the office of the mayor.
          </Text>
          <Link
            to="/government/local"
            className="inline-block px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
          >
            Go to Local Government
          </Link>
        </div>
      </Section>
    </>
  );
};

export default National;
