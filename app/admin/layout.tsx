import type { Metadata } from 'next';
import { generateCommonMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateCommonMetadata(
  'Admin Dashboard - Manage Your Blog',
  'Access the admin dashboard to manage blog posts, comments, and site content.',
  '/admin',
  undefined,
  ['admin', 'dashboard', 'blog management']
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
