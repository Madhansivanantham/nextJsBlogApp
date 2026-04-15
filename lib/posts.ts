// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// export interface Post {
//   _id: string;
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   date: string;
//   tag: string;
//   readTime: string;
// }

// const postsDirectory = path.join(process.cwd(), 'posts');

// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
// }

// export function getPostBySlug(slug: string): Post | null {
//   try {
//     const fullPath = path.join(postsDirectory, `${slug}.mdx`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//     const { data, content } = matter(fileContents);

//     return {
//       slug,
//       title: data.title,
//       excerpt: data.excerpt,
//       content, // This will be the MDX content
//       author: data.author,
//       date: data.date,
//       tag: data.tag,
//       readTime: data.readTime,
//     };
//   } catch {
//     return null;
//   }
// }

// export function getAllPosts(): Post[] {
//   const slugs = getPostSlugs();
//   const posts = slugs
//     .map(slug => getPostBySlug(slug.replace('.mdx', '')))
//     .filter((post): post is Post => post !== null)
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//   return posts;
// }

// // For backward compatibility with the API
// const posts = getAllPosts();

// export { posts };
