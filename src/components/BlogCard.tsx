import { BlogPost } from "@/types/types";
import { formatDateTime } from "@/utils/helpers";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block">
      <div className="bg-gray-50 border rounded-lg p-6 hover:shadow-md transition-ease duration-300 group h-full">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 transition-colors group-hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4">{post.summary}</p>
        <div className="flex items-center space-x-2">
          <CiCalendarDate size={18} className="text-blue-600" />
          <span className="text-gray-500 text-sm mt-1">
            {formatDateTime(post.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}
