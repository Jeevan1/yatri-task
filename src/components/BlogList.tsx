import { useState } from "react";
import {
  type BlogPost,
  getBlogPosts,
  searchBlogPosts,
} from "@/utils/api-service";
import BlogPostCard from "./BlogCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { ClipLoader } from "react-spinners";
import { GetServerSideProps } from "next";

interface BlogListProps {
  post: BlogPost[];
}

export default function Home({ post }: BlogListProps) {
  const [posts, setPosts] = useState(post);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const handleSearch = async (query: string) => {
    setLoading(true);
    const searchResults = await searchBlogPosts(query);
    setPosts(searchResults);
    setCurrentPage(1);
    setLoading(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Blogs
      </h1>
      <div className="max-w-md">
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="#36d7b7" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-600">No posts found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      {posts.length > postsPerPage && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getBlogPosts();
  return {
    props: {
      post: posts,
    },
  };
};
