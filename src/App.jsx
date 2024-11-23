import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsOne from "./pages/PostsOne";
import PostsTwo from "./pages/PostsTwo";
import Navbar from "./components/Navbar";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import ProductsPaginated from "./pages/ProductsPaginated";
import InfiniteProducts from "./pages/InfiniteProducts";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/posts1" element={<PostsOne />} />
        <Route path="/posts2" element={<PostsTwo />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/products" element={<ProductsPaginated />} />
        <Route path="/products-infinite" element={<InfiniteProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
