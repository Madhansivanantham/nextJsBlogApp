import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

/** Plain JSON-serializable shape for React Server Components */
function toSerializable<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

export async function getAllPostsFromDb() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return toSerializable<typeof posts>(posts);
}

export async function getPostBySlugFromDb(slug: string) {
  await connectDB();
  const post = await Post.findOne({ slug }).lean();
  if (!post) return null;
  return toSerializable<typeof post>(post);
}
