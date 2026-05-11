import { Metadata } from 'next';

// Site configuration
export const siteConfig = {
  name: 'DevBlog',
  description: 'A developer blog sharing insights, best practices, and tutorials on modern web development, Next.js, TypeScript, Tailwind CSS, and more.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'DevBlog Contributors',
  email: 'contact@devblog.com',
  social: {
    twitter: '@devblog',
    github: 'devblog',
  },
};

// Open Graph Image dimensions
export const ogImageDimensions = {
  width: 1200,
  height: 630,
};

// Keywords for different pages
export const keywords = {
  home: [
    'dev blog',
    'web development',
    'Next.js',
    'TypeScript',
    'React',
    'Tailwind CSS',
    'full stack development',
  ],
  blog: ['blog posts', 'articles', 'tutorials', 'web development'],
  articles: ['articles', 'learning', 'web development'],
};

// Generate common metadata
export function generateCommonMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string,
  keywords?: string[]
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og-image.jpg`;

  return {
    title,
    description,
    keywords: keywords || [],
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: ogImageDimensions.width,
          height: ogImageDimensions.height,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: siteConfig.social.twitter,
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate article metadata (for blog posts)
export function generateArticleMetadata(
  title: string,
  description: string,
  slug: string,
  image: string | undefined,
  author: string,
  publishedDate: string,
  tags: string[]
): Metadata {
  const url = `${siteConfig.url}/blog/${slug}`;
  const ogImage = image || `${siteConfig.url}/og-image.jpg`;

  return {
    title,
    description,
    keywords: [...tags, ...keywords.blog],
    authors: [{ name: author }],
    creator: author,
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: ogImageDimensions.width,
          height: ogImageDimensions.height,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      publishedTime: new Date(publishedDate).toISOString(),
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
