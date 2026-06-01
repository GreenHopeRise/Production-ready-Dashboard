import { useEffect, useState } from "react";
import { getProducts } from "@/api/product.api";
import { useAuth } from "@/auth/AuthContext";
import { can } from "@/lib/can";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name:'',
    description:'',
    price:'',
    category:''
  })

  const { user } = useAuth();

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl border p-5">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">Manage all products</p>
        </div>

        {/* CREATE BUTTON */}
        {can(user?.role, "products.create") && (
          <button
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => setOpen(true)}
          >
            + Add Product
          </button>
        )}
        {
  open && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Add Product
          </h2>

          <button onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <form>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border p-2 rounded mb-3"
            value={form.name}
            onChange={(e)=>{
              setForm({...form, name:e.target.value})
            }}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded mb-3"
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border p-2 rounded mb-3"
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded mb-3"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Create Product
          </button>
        </form>

      </div>
    </div>
  )
}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="py-3">Product</th>
              <th className="py-3">Price</th>
              <th className="py-3">Category</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <td className="py-4 font-medium">{product.name}</td>

                {/* PRICE */}
                <td className="py-4">${product.price}</td>

                {/* CATEGORY */}
                <td className="py-4">{product.category}</td>

                {/* ACTIONS */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    {/* EDIT */}
                    {can(user?.role, "products.update") && (
                      <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                        Edit
                      </button>
                    )}

                    {/* DELETE */}
                    {can(user?.role, "products.delete") && (
                      <button className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
