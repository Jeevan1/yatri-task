import { BlogPost } from "@/types/types";
import { getBlogPostBySlug } from "@/utils/api-service";
import { formatDateTime } from "@/utils/helpers";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";

interface BlogPostPageProps {
  post: BlogPost | null;
  title: string | undefined;
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  try {
    const post = await getBlogPostBySlug(Number(id));

    return {
      props: {
        post: post || null,
        title: post?.title || "Blog Post",
      },
    };
  } catch (error) {
    return {
      props: {
        post: null,
        title: "Blog Post",
        error: "Failed to fetch blog post",
      },
    };
  }
};

export default function BlogPostPage({
  post,
  title,
  error,
}: BlogPostPageProps) {
  if (!post || error) {
    return (
      <div className="container py-8">
        <h1 className="text-xl md:text-3xl font-bold mb-8  text-gray-800">
          {error || "No blog post found"}
        </h1>
        <Link
          href="/"
          className="text-blue-500 hover:underline mb-4 inline-flex items-center gap-1"
        >
          <FaArrowLeftLong />
          Back to homepage
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.description} />
      </Head>
      <div className="container py-8">
        <Link
          href="/"
          className="text-blue-500 hover:underline mb-4 inline-flex items-center gap-1"
        >
          <FaArrowLeftLong /> Back to homepage
        </Link>
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center space-x-2 my-3">
            <CiCalendarDate size={18} />
            <span className="text-gray-500 text-sm mt-1">
              {formatDateTime(post.date)}
            </span>
          </div>
          <p className="mt-4 text-gray-500 text-md font-normal">
            {post.description}
          </p>
        </article>
      </div>
    </>
  );
}
