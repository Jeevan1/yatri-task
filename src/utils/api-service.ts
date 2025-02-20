import data from "@/data/data.json";

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  summary: string;
  date: string;
}
export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data.blogs;
}

export async function getBlogPostBySlug(
  id: number
): Promise<BlogPost | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data.blogs.find((post) => post.id === id);
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return data.blogs.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.summary.toLowerCase().includes(query.toLowerCase())
  );
}
