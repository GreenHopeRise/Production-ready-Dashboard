import { useEffect, useState } from "react";
import { createProduct, getProducts, updateProduct } from "@/api/product.api";
import { useAuth } from "@/auth/AuthContext";
import { can } from "@/lib/can";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  // const [apiLoading, setApiLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [selectProduct, setSelectProduct] = useState(null);

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
  // console.log(form);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      if (selectProduct) {
        await updateProduct(selectProduct._id, form);
      } else {
        await createProduct(form);
      }
      await fetchProducts();
      setOpen(false);
      setSelectProduct(null);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  const resetForm = () => {
    setOpen(false);

    setSelectProduct(null);

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
    });
  };
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
            onClick={() => {
              setSelectProduct(null);

              setForm({
                name: "",
                description: "",
                price: "",
                category: "",
              });

              setOpen(true);
            }}
          >
            Add Product
          </button>
        )}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {selectProduct ? "Edit Product" : "Add Product"}
                </h2>

                <button onClick={resetForm}>✕</button>
              </div>

              <form onSubmit={handleCreateProduct}>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full border p-2 rounded mb-3"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-full border p-2 rounded mb-3"
                  value={form.price}
                  onChange={(e) => {
                    setForm({ ...form, price: e.target.value });
                  }}
                />

                <input
                  type="text"
                  placeholder="Category"
                  className="w-full border p-2 rounded mb-3"
                  value={form.category}
                  onChange={(e) => {
                    setForm({ ...form, category: e.target.value });
                  }}
                />

                <textarea
                  placeholder="Description"
                  className="w-full border p-2 rounded mb-3"
                  value={form.description}
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value });
                  }}
                />

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded"
                  onClick={() => {
                    // setApiLoading(true);
                  }}
                >
                  <h2>{selectProduct ? "Edit Product" : "Add Product"}</h2>
                </button>
              </form>
            </div>
          </div>
        )}
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
                      <button
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setSelectProduct(product);
                          setForm({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            category: product.category,
                          });
                          setOpen(true);
                        }}
                      >
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
