import { Link } from 'react-router';
import { Card, CardContent } from '@bettergov/kapwa/card';

export interface ServiceSidebarItem {
  label: string;
  to: string;
}

interface ServiceSidebarProps {
  title: string;
  items: ServiceSidebarItem[];
  leading?: ServiceSidebarItem;
}

export default function ServiceSidebar({
  title,
  items,
  leading,
}: ServiceSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-32 lg:self-start lg:w-64 lg:shrink-0 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            {title}
          </h3>
          <nav className="flex flex-col gap-1">
            {leading && (
              <Link
                to={leading.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {leading.label}
              </Link>
            )}
            {items.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 rounded-md text-sm text-gray-800 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}
