import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import Product from "../components/Product";

const InfiniteProducts = () => {
  const [page, setPage] = useState(1);

  const fetchProducts = async (pageParam) => {
    const skip = 10 * (pageParam - 1);
    console.log(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${skip}`
    );
    const data = await response.json();
    return data;
  };

  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    getNextPageParam: (prev) => prev.nextPage,
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
  });

  if (productsQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (productsQuery.isError) {
    return <h1>{JSON.stringify(productsQuery.error)}</h1>;
  }

  console.log(productsQuery.data?.pages[0]);

  return (
    <div>
      <h1>Products Paginated</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          padding: 50,
        }}
      >
        {productsQuery.data?.pages[0]?.products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <button onClick={() => productsQuery.fetchNextPage()}>
        {productsQuery.isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default InfiniteProducts;
