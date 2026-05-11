import type { Metadata, ResolvingMetadata } from 'next';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export default async function SlugLayout({ children, params }: LayoutProps) {
  return children;
}
