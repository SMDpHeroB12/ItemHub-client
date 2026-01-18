"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { gsap } from "gsap";
import { useSession } from "next-auth/react";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoadingSession = status === "loading";
  const isLoggedIn = !!session?.user;

  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".add-head",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );
      gsap.fromTo(
        ".add-card",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.05,
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const [loading, setLoading] = useState(false);

  // ✅ local file + preview
  const [files, setFiles] = useState([]); // [{file, previewUrl, name, size}]
  const [uploading, setUploading] = useState(false);

  // Fields
  const [category, setCategory] = useState("Fitness");
  const [subCategory, setSubCategory] = useState("Bands");
  const [tags, setTags] = useState(["Simple", "Fast", "Clean"]);
  const [tagInput, setTagInput] = useState("");

  const categories = useMemo(
    () => ({
      Fitness: ["Bands", "Dumbbells", "Kettlebell", "Accessories"],
      Electronics: ["Gadgets", "Wearable", "Accessories"],
      Home: ["Kitchen", "Decor", "Tools"],
    }),
    [],
  );

  useEffect(() => {
    const subs = categories[category] || [];
    if (!subs.includes(subCategory)) setSubCategory(subs[0] || "");
  }, [category, subCategory, categories]);

  // ✅ Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((x) => x.previewUrl && URL.revokeObjectURL(x.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPickFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    const next = selected.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setFiles((prev) => [...next, ...prev]);
    e.target.value = "";
  };

  const removeFile = (idx) => {
    setFiles((prev) => {
      const target = prev[idx];
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (tags.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t));

  async function uploadOneToImgbb(file) {
    const fd = new FormData();
    fd.append("image", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${baseUrl}/api/upload/imgbb`, {
      method: "POST",
      body: fd,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Image upload failed");

    return data.url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const description = form.description.value.trim();
    const price = Number(form.price.value);

    if (!name || !description || !price) {
      toast.error("Name, description and price are required");
      return;
    }

    if (files.length === 0) {
      toast.error("Please select at least 1 image");
      return;
    }

    try {
      setLoading(true);
      setUploading(true);

      // ✅ Upload all selected images (sequential)
      const uploadedUrls = [];
      for (const f of files) {
        const url = await uploadOneToImgbb(f.file);
        uploadedUrls.push(url);
      }

      setUploading(false);

      const image = uploadedUrls[0];

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            price,
            image,
            images: uploadedUrls,
            category,
            subCategory,
            tags,
          }),
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to create item");

      toast.success("Item created successfully!");
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Item created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      // cleanup preview urls
      files.forEach((x) => x.previewUrl && URL.revokeObjectURL(x.previewUrl));

      form.reset();
      setFiles([]);
      setTags(["Simple", "Fast", "Clean"]);
      setCategory("Fitness");
      setSubCategory("Bands");

      router.push("/items");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
      setUploading(false);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingSession) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10 pt-28">
        <div className="rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm">
          <span className="loading loading-spinner loading-md" />
        </div>
      </section>
    );
  }

  if (!isLoggedIn) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10 pt-28">
        <div className="rounded-3xl bg-base-100 border border-base-300/40 p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Add Item</h1>
          <p className="mt-2 text-base-content/70">
            You must be logged in to access this page.
          </p>
          <div className="mt-6">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="max-w-6xl mx-auto px-4 py-10 pt-28">
      <div className="add-head">
        <h1 className="text-3xl font-bold">Add Item</h1>
        <p className="mt-2 text-base-content/70">
          Upload images from your device (ImgBB) and publish.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-2 gap-6">
        {/* LEFT: Real file upload */}
        <div className="add-card rounded-3xl bg-base-100 border border-base-300/40 p-6 shadow-sm">
          <p className="font-semibold">Add Images</p>

          <div className="mt-4 rounded-2xl border-2 border-dashed border-base-300 bg-base-200/40 p-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-4xl opacity-70">🖼️</div>
              <p className="text-sm text-base-content/70">
                Select images from your device. Preview will appear below
                instantly.
              </p>
            </div>

            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                multiple
                className="file-input file-input-bordered w-full"
                onChange={onPickFiles}
              />
              <p className="mt-2 text-xs text-base-content/60">
                ImgBB supports up to 32MB per image.
              </p>
            </div>
          </div>

          {/* Preview list */}
          <div className="mt-5 space-y-3">
            {files.length === 0 ? (
              <div className="rounded-2xl bg-base-200/50 p-4 text-sm text-base-content/70">
                No images selected yet.
              </div>
            ) : (
              files.map((img, idx) => (
                <div
                  key={img.previewUrl}
                  className="flex items-center gap-3 rounded-2xl bg-base-200/50 p-3"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-300/40">
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{img.name}</p>
                    <p className="text-xs text-base-content/60">
                      {(img.size / 1024).toFixed(0)} KB
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => removeFile(idx)}
                    title="Remove"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="add-card rounded-3xl bg-base-100 border border-base-300/40 p-6 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Resistance Bands"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {Object.keys(categories).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Sub Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {(categories[category] || []).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                className="input input-bordered w-full"
                placeholder="e.g. 14.50"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Write a short description..."
                rows={5}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>

              <div className="flex gap-2">
                <input
                  className="input input-bordered w-full"
                  placeholder="Type a tag and press Add"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={addTag}
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => removeTag(t)}
                    className="badge badge-outline gap-2 cursor-pointer"
                    title="Click to remove"
                  >
                    {t} <span className="opacity-60">✕</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            {uploading && (
              <span className="text-sm text-base-content/70">
                Uploading images...
              </span>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || uploading}
            >
              {loading || uploading ? "Publishing..." : "Publish Item"}
            </button>
          </div>

          <p className="mt-3 text-xs text-base-content/60">
            We upload your selected images to ImgBB first, then save the
            returned URL(s) in MongoDB.
          </p>
        </div>
      </form>
    </section>
  );
}
