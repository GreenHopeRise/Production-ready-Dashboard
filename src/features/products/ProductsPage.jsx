import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/api/product.api";
import { useAuth } from "@/auth/AuthContext";
import { can } from "@/lib/can";
import toast from "react-hot-toast";
import { FaPersonWalkingArrowLoopLeft, FaPersonWalkingArrowRight } from "react-icons/fa6";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [selectProduct, setSelectProduct] = useState(null);
  const [page, setPage] = useState(1)
  const limit =10
  const paginatedProducts = products.slice(
  (page - 1) * limit,
  page * limit
);

const totalPages = Math.ceil(products.length / limit);

  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-5 space-y-3">
        <div  className="h-25 bg-gray-200 animate-pulse rounded" />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    );
  }
  // console.log(form);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      setApiLoading(true);
      if (selectProduct) {
        await updateProduct(selectProduct._id, form);
        toast.success("Product updated successfully");
      } else {
        await createProduct(form);
        toast.success("Product created successfully");
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
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setApiLoading(false);
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
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;
    const prevProducts = [...products]
    setProducts(prv=>prv.filter(p=>p._id!==id))

    try {
      setDeleteLoading(id);
      await deleteProduct(id);
      await fetchProducts();
      toast.success("Product deleted successfully");
    } catch (err) {
      setProducts(prevProducts)
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleteLoading(null);
    }
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
                  disabled={apiLoading}
                >
                  <h2>
                    {apiLoading
                      ? "Saving"
                      : selectProduct
                        ? "Edit Product"
                        : "Add Product"}
                  </h2>
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
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No products found 😐
                </td>
              </tr>
            ) : (
              paginatedProducts .map((product) => (
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
                          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 cursor-pointer"
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
                        <button
                          className="px-3 py-1 text-sm border border-red-500 cursor-pointer text-red-500 rounded-md hover:bg-red-50"
                          onClick={() => handleDelete(product._id)}
                          disabled={deleteLoading === product._id}
                        >
                          {deleteLoading === product._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* PAGINATION */}
<div className="flex items-center justify-center gap-3 mt-6">
  
  <button
    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
  >
    <FaPersonWalkingArrowLoopLeft className="text-red-400" />
  </button>

  <span className="text-sm">
    {page} / {totalPages}
  </span>

  <button
    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
    disabled={page === totalPages}
    onClick={() => setPage((p) => p + 1)}
  >
    <FaPersonWalkingArrowRight className="text-blue-400"/>
  </button>

</div>
      </div>
    </div>
  );
};

export default ProductsPage;
