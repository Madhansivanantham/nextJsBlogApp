import type { Metadata } from 'next';
import { generateCommonMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateCommonMetadata(
  'Login - DevBlog Admin',
  'Sign in to access the DevBlog admin dashboard and manage your content.',
  '/login',
  undefined,
  ['login', 'authentication', 'sign in', 'admin']
);

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
