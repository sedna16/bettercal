import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServiceSidebar from '../components/services/ServiceSidebar';
import ServiceCategoryGrid from '../components/services/ServiceCategoryGrid';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';

const Services: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const subcategories: Subcategory[] = categoryIndex.pages;
  const markdownComponents = createMarkdownComponents(
    getTypographyTheme('default')
  );

  const getCategory = () => {
    return serviceCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      setMarkdownContent(null);
      getCategorySubcategories(category)
        .then(async index => {
          setCategoryIndex(index);
          if (index.layout === 'inline' && index.pages.length > 0) {
            const content = await loadMarkdownContent(
              index.pages[0].slug,
              category,
              'service'
            );
            setMarkdownContent(content);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />
        <Section>
          <div className="flex flex-col gap-8 lg:flex-row">
            <ServiceSidebar
              title="Services"
              items={serviceCategories.categories.map(c => ({
                label: c.category,
                to: `/services/${c.slug}`,
              }))}
            />
            <div className="flex-1 min-w-0">
              <Heading level={2}>All local government services</Heading>
              <Text className="text-gray-600 mb-6">
                All services provided by the{' '}
                {import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you
                need for citizenship, business, education, and more.
              </Text>
              <ServiceCategoryGrid />
            </div>
          </div>
        </Section>
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={markdownContent?.title || categoryData.category || category}
        description={markdownContent?.description || categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <div className="flex flex-col gap-8 lg:flex-row">
          <ServiceSidebar
            title={categoryData.category || category}
            leading={{ label: 'All Services', to: '/services' }}
            items={
              categoryIndex.layout === 'inline'
                ? []
                : subcategories.map(subcategory => ({
                    label: subcategory.name,
                    to: `/services/${category}/${subcategory.slug}`,
                  }))
            }
          />
          <div className="flex-1 min-w-0">
            <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
            <Heading>{categoryData.category || category}</Heading>
            <Text className="text-gray-600 mb-6">
              {categoryData.description}
            </Text>

            {loading ? (
              <div className="flex justify-center items-center p-8">
                <Text>Loading services...</Text>
              </div>
            ) : categoryIndex.layout === 'inline' ? (
              markdownContent && (
                <Card className="mb-8 markdown-content">
                  <CardContent>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {markdownContent.content}
                    </ReactMarkdown>
                  </CardContent>
                </Card>
              )
            ) : (
              <>
                {categoryIndex.title && (
                  <Heading level={3}>{categoryIndex.title}</Heading>
                )}
                {categoryIndex.description && (
                  <Text className="text-gray-600 mb-4">
                    {categoryIndex.description}
                  </Text>
                )}
                {categoryIndex.layout === 'grid' ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {subcategories.map(subcategory => (
                      <Link
                        key={subcategory.slug}
                        to={`/services/${category}/${subcategory.slug}`}
                      >
                        <Card
                          hoverable
                          className="h-full border-t-4 border-primary-500"
                        >
                          <CardContent>
                            <h4 className="text-lg font-medium text-gray-900">
                              {subcategory.name}
                            </h4>
                            {subcategory.description && (
                              <p className="mt-2 text-sm text-gray-600">
                                {subcategory.description}
                              </p>
                            )}
                            <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                              {categoryData.category || category}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subcategories.map(subcategory => (
                      <Link
                        key={subcategory.slug}
                        to={`/services/${category}/${subcategory.slug}`}
                      >
                        <Card hoverable className="mb-4">
                          <CardContent>
                            <h4 className="text-lg font-medium text-gray-900">
                              {subcategory.name}
                            </h4>
                            {subcategory.description && (
                              <p className="mt-2 text-sm text-gray-600">
                                {subcategory.description}
                              </p>
                            )}
                            <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                              {categoryData.category || category}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Services;
