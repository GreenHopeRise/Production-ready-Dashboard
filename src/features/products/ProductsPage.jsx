import { useEffect, useState } from "react";
import { getProducts } from "@/api/product.api";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {products.map((p) => (
        <div key={p._id} className="border p-3 mb-2">
          <p>{p.name}</p>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;