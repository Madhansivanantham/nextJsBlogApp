import type { Metadata } from 'next';
import { generateCommonMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateCommonMetadata(
  'Add New Blog Post - DevBlog',
  'Create and publish a new blog post on DevBlog. Write about web development, technology, and tutorials.',
  '/addBlog',
  undefined,
  ['write', 'create post', 'publish', 'blog editor']
);

export default function AddBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
