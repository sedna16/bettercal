import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import ServiceCategoryGrid from '../services/ServiceCategoryGrid';

export default function ServicesSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();

  return (
    <Section>
      <Heading level={2}>{title || t('services.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('services.description')}
      </Text>

      <ServiceCategoryGrid />
    </Section>
  );
}
