import { useEffect, useState } from "react";
import { getProducts } from "@/api/product.api";
import { useAuth } from "@/auth/AuthContext";
import { can } from "@/lib/can";
// import { can } from "@/lib/permissions";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const {user} = useAuth()

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
          {
            can(user?.role, 'products.delete')&&<button>Delete</button>
          }
        </div>
      ))}

      <p>its for only github push</p>

    </div>
  );
};

export default ProductsPage;