import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import {
  Search as SearchIcon,
  ArrowRight,
  Loader2,
  CornerDownLeft,
} from 'lucide-react';
import { searchServices, type SearchEntry } from '../../lib/serviceSearch';

const popularServices = [
  {
    label: 'Business Permit',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: 'Health Check-ups',
    href: '/services/health-services/get-free-check-ups-basic-medicines-and-vaccines',
  },
  {
    label: 'Garbage Collection',
    href: '/services/garbage-waste-disposal/check-garbage-collection-schedules-and-request-pickup',
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef(query);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    queryRef.current = query;
    window.clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const matches = await searchServices(trimmed);
        if (queryRef.current.trim() !== trimmed) return;
        setResults(matches);
        setHighlighted(0);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => window.clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (results[0]) {
      navigate(results[0].href);
    } else {
      navigate('/services');
    }
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      if (results.length > 0) {
        setOpen(true);
        event.preventDefault();
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted(current => (current + 1) % Math.max(results.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted(current =>
        current <= 0 ? Math.max(results.length - 1, 0) : current - 1
      );
    } else if (event.key === 'Enter') {
      const target = results[highlighted] ?? results[0];
      if (target) {
        event.preventDefault();
        navigate(target.href);
        setOpen(false);
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-fade-in">
          <div>
            <Text transform="uppercase" className="text-primary-100">
              Welcome to
            </Text>
            <Heading className="text-white">
              {import.meta.env.VITE_GOVERNMENT_NAME}
            </Heading>
            <Text className="text-lg text-primary-100 mb-8">
              {t('hero.subtitle')}
            </Text>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-primary-700 hover:bg-primary-50 font-semibold transition-colors"
              >
                Browse Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 rounded-md border border-white/60 text-white hover:bg-white/10 font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative w-full max-w-[30.8rem] lg:justify-self-end mt-8 lg:mt-0"
          >
            <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-xl">
              <form
                onSubmit={handleSubmit}
                className="flex items-center rounded-md bg-gray-50 border border-gray-200 p-1.5"
              >
                <SearchIcon className="ml-3 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (results.length > 0) setOpen(true);
                  }}
                  placeholder="Search services and information..."
                  className="w-full bg-transparent px-3 py-2 text-gray-800 placeholder-gray-600 focus:outline-none"
                  aria-label="Search services"
                  aria-expanded={open}
                  aria-autocomplete="list"
                />
                {loading ? (
                  <Loader2 className="h-5 w-5 text-primary-500 animate-spin mr-2" />
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-sm bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors whitespace-nowrap"
                  >
                    Search
                  </button>
                )}
              </form>

              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Find a Service:
                </span>
                {popularServices.map(service => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="rounded-full bg-primary-50 px-2.5 py-1 text-xs text-primary-700 font-medium hover:bg-primary-100 transition-colors"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            {open && (
              <div className="absolute left-0 right-0 mt-2 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                {results.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-500">
                    No matching services found.
                  </p>
                ) : (
                  <ul role="listbox">
                    {results.map((result, index) => (
                      <li
                        key={result.id}
                        role="option"
                        aria-selected={index === highlighted}
                      >
                        <Link
                          to={result.href}
                          onMouseEnter={() => setHighlighted(index)}
                          onClick={() => setOpen(false)}
                          className={`block px-4 py-3 transition-colors ${
                            index === highlighted
                              ? 'bg-primary-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-gray-900">
                              {result.label}
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 whitespace-nowrap">
                              {result.category}
                            </span>
                          </div>
                          {result.description && (
                            <p className="mt-0.5 text-xs text-gray-600 line-clamp-1">
                              {result.description}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}
                    <li className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-1">
                      <CornerDownLeft className="h-3 w-3" /> Select a result to
                      open it
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
