import { useQuery } from "@tanstack/react-query";
import postService from "../api/PostService";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => postService.getPostById(id),
  });

  const fetchUser = async (id) => {
    const reponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return await reponse.json();
  };

  const userQuery = useQuery({
    queryKey: ["user", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId !== null,
    queryFn: () => fetchUser(postQuery.data.userId),
  });

  if (postQuery.isLoading) return <div>Loading...</div>;

  if (postQuery.isError) {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <div style={{ padding: 50, backgroundColor: "lightsalmon" }}>
      <h2>{postQuery.data.title}</h2>
      <p>{postQuery.data.body}</p>
      <small>{postQuery.data.userId}</small>
      {userQuery.isLoading ? (
        <small>Loading...</small>
      ) : (
        <small>{userQuery.data?.name}</small>
      )}
    </div>
  );
};

export default Post;
