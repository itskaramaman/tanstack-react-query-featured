import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Product from "../components/Product";

const ProductsPaginated = () => {
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const skip = 10 * (page - 1);
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${skip}`
    );
    const data = await response.json();
    return data;
  };

  const productsQuery = useQuery({
    queryKey: ["products", page],
    placeholderData: keepPreviousData,
    queryFn: () => fetchProducts(),
  });

  if (productsQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (productsQuery.isError) {
    return <h1>{JSON.stringify(productsQuery.error)}</h1>;
  }

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
        {productsQuery.data?.products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
    </div>
  );
};

export default ProductsPaginated;
