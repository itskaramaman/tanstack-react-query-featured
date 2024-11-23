const Product = ({ product }) => {
  return (
    <div style={{ width: 300, backgroundColor: "lightsalmon" }}>
      <img
        style={{ width: "100%", objectFit: "cover" }}
        src={product.thumbnail}
        alt="product-img"
      />
      <div style={{ padding: 10 }}>
        <p>{product.title}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{product.brand}</p>
          <p>{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
