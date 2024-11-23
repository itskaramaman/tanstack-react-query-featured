import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import postService from "../api/PostService";

const Navbar = () => {
  const queryClient = useQueryClient();
  const handlePostOnePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => postService.getPostById(1),
    });
  };
  return (
    <nav
      style={{
        display: "flex",
        gap: 20,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#333",
      }}
    >
      <Link
        onMouseEnter={handlePostOnePrefetch}
        to="/posts1"
        style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
      >
        Posts 1
      </Link>
      <Link
        to="/posts2"
        style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
      >
        Posts 2
      </Link>

      <Link
        to="/posts/1"
        style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
      >
        Post
      </Link>
      <Link
        to="/create-post"
        style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
      >
        Create Post
      </Link>
    </nav>
  );
};

export default Navbar;
