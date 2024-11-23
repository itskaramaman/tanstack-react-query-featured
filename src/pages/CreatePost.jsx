import { useState } from "react";
import postService from "../api/PostService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: (data) => {
      queryClient.setQueriesData(["posts", data.id], data); // manully updating our cache, as we have created a new Post and  we got to that post, instead of fetching it, it should be get from cache
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true, // this means it should only refresh queries which have queryKey as ["posts"] and not ["posts", 1]
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, body });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 300,
        justifyContent: "center",
      }}
    >
      <h1>Create Post</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button disabled={createPostMutation.isPending} type="submit">
        {createPostMutation.isPending ? (
          <span>Creating</span>
        ) : (
          <span>Create</span>
        )}
      </button>
    </form>
  );
};

export default CreatePost;
