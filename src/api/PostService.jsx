class PostService {
  constructor() {
    this.url = "https://jsonplaceholder.typicode.com/posts";
  }

  async getPosts() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error("Post API reponse error", response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.log("Get Posts API fetch error", error.message);
      return [];
    }
  }

  async getPostById(id) {
    try {
      console.log(`${this.url}/${id}`);
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) {
        throw new Error("Post API reponse error", response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.log("Get Posts API fetch error", error.message);
      return null;
    }
  }

  async createPost(title, body) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title,
            body,
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Post API reponse error", response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.log("Create Post API POST error", error.message);
      return null;
    }
  }
}

const postService = new PostService();
export default postService;
