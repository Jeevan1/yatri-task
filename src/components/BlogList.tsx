import { useState } from "react";
import { searchBlogPosts } from "@/utils/api-service";
import BlogPostCard from "./BlogCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { ClipLoader } from "react-spinners";
import { BlogPost } from "@/types/types";

interface BlogListProps {
  post: BlogPost[];
  error?: string;
}

export default function BlogList({ post, error }: BlogListProps) {
  const [posts, setPosts] = useState(post);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const searchResults = await searchBlogPosts(query);
      setPosts(searchResults);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
      setErrorMessage(`Error fetching search results: ${error}`);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (error) {
    return (
      <div className="container py-8">
        <h1 className="text-xl md:text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-3 text-gray-800">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-xl md:text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-3 text-gray-800">
        My Blogs
      </h1>
      <div className="max-w-md">
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="#36d7b7" />
        </div>
      ) : errorMessage ? (
        <h2 className="text-red-500 font-semibold">{errorMessage}</h2>
      ) : (
        <div>
          {posts.length === 0 ? (
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
      )}
    </div>
  );
}
