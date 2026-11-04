import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'ECOCYCLE — A Living Circular Economy Experience';
const DEFAULT_DESCRIPTION =
  'Infrastruktur teknologi tata kelola daur ulang dan ekonomi sirkular cerdas. Mengubah aliran material menjadi neraca sumber daya terverifikasi dan bernilai nyata.';
const SITE_URL = 'https://ecocycle.id';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/og-cover.png`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData
}) => {
  const fullTitle = title ? `${title} — ECOCYCLE` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  useEffect(() => {
    // 1. Document Title
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 3. Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:site_name', 'ECOCYCLE');
    setMetaTag('property', 'og:locale', 'id_ID');

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // 5. Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // 6. JSON-LD Structured Data
    const defaultSchemas: Array<Record<string, any>> = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ECOCYCLE',
        alternateName: 'ECOCYCLE Platform',
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        description: DEFAULT_DESCRIPTION,
        sameAs: [
          'https://instagram.com/ecocycle.id',
          'https://linkedin.com/company/ecocycle-id'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ECOCYCLE',
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/pemilahan-pintar?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ];

    const schemasToInject = structuredData
      ? Array.isArray(structuredData)
        ? [...defaultSchemas, ...structuredData]
        : [...defaultSchemas, structuredData]
      : defaultSchemas;

    let scriptEl = document.getElementById('ecocycle-structured-data') as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'ecocycle-structured-data';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemasToInject);
  }, [fullTitle, description, canonicalUrl, type, fullImageUrl, noindex, structuredData]);

  return null;
};
