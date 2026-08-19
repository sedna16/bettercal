import {
  serviceCategories,
  getCategorySubcategories,
} from '../data/yamlLoader';

export interface SearchEntry {
  id: string;
  label: string;
  description?: string;
  href: string;
  category: string;
}

let indexPromise: Promise<SearchEntry[]> | null = null;

async function buildIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];
  const categories = serviceCategories.categories;

  for (const category of categories) {
    entries.push({
      id: `category-${category.slug}`,
      label: category.category,
      description: category.description,
      href: `/services/${category.slug}`,
      category: 'Services',
    });

    const index = await getCategorySubcategories(category.slug);
    for (const page of index.pages) {
      entries.push({
        id: `service-${category.slug}-${page.slug}`,
        label: page.name,
        description: page.description,
        href: `/services/${category.slug}/${page.slug}`,
        category: category.category,
      });
    }
  }

  return entries;
}

export function getServiceIndex(): Promise<SearchEntry[]> {
  if (!indexPromise) {
    indexPromise = buildIndex();
  }
  return indexPromise;
}

export async function searchServices(query: string): Promise<SearchEntry[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const entries = await getServiceIndex();
  const text = (value?: string) => (value ?? '').toLowerCase();

  const scored = entries
    .map(entry => {
      const labelMatch = text(entry.label).includes(normalized);
      const descriptionMatch = text(entry.description).includes(normalized);
      let score = 0;
      if (labelMatch) score += 2;
      if (descriptionMatch) score += 1;
      if (text(entry.label).startsWith(normalized)) score += 1;
      return { entry, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 8).map(result => result.entry);
}
