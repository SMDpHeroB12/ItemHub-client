"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isAllowed = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const description = form.description.value.trim();
    const price = form.price.value;
    const image = form.image.value.trim();

    if (!name || !description || !price || !image) {
      setLoading(false);
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, price, image }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create item");
      }

      toast.success("Item created successfully!");
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Item created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();
      router.push("/items");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAllowed) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Add Item</h1>
        <p className="mt-2 text-base-content/70">
          You must be logged in to access this page.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 pt-30">
      <h1 className="text-3xl font-bold">Add Item</h1>
      <p className="mt-2 text-base-content/70">
        Add a new item to the database (protected after auth setup).
      </p>

      <div className="mt-8 max-w-xl rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Kettlebell"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Short description"
              rows={4}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="input input-bordered w-full"
              placeholder="29.99"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              name="image"
              type="url"
              className="input input-bordered w-full"
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Item"}
          </button>
        </form>
      </div>
    </section>
  );
}
