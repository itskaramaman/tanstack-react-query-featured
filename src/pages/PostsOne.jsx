import postService from "../api/PostService";
import { useQuery } from "@tanstack/react-query";

const PostsOne = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => postService.getPosts(),
  });

  if (postsQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (postsQuery.error) {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts One</h1>

      {postsQuery.data.slice(0, 5).map((post) => (
        <div
          key={post.id}
          style={{ marginBottom: 20, backgroundColor: "lavender" }}
        >
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsOne;
