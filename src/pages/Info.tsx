import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent, CardHeader } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../components/SEO';
import { interpolate } from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';

import statisticsContent from '../../content/pages/statistics.md?raw';
import historyContent from '../../content/pages/history.md?raw';
import transparencyContent from '../../content/pages/transparency.md?raw';
import contactContent from '../../content/pages/contact.md?raw';

const pageContent: Record<string, string> = {
  statistics: statisticsContent,
  history: historyContent,
  transparency: transparencyContent,
  contact: contactContent,
};

interface InfoProps {
  slug: string;
  label: string;
}

const Info: React.FC<InfoProps> = ({ slug, label }) => {
  const raw = pageContent[slug];

  if (!raw) {
    return (
      <Section className="p-3 mb-12">
        <Banner
          type="error"
          title="Page Not Found"
          description={`No content found for ${slug}`}
          icon
        />
      </Section>
    );
  }

  const content = interpolate(raw);
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : label;
  const descriptionMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
  const description = descriptionMatch
    ? descriptionMatch[1].replace(/^>\s*/, '').trim()
    : undefined;

  const markdownComponents = createMarkdownComponents(
    getTypographyTheme('default')
  );

  return (
    <>
      <SEO
        title={title}
        description={description || `Information about ${label}`}
        keywords={`${label}, local government, information`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs
          className="mb-8"
          items={[{ label: 'Home', href: '/' }, { label }]}
        />
        <Card className="mb-8 markdown-content">
          <CardHeader>
            {description && <CardContent>{description}</CardContent>}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </CardHeader>
        </Card>
      </Section>
    </>
  );
};

export default Info;
