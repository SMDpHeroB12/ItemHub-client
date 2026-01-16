"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      toast.success("Logged in successfully!");
      router.push("/items");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/items" });
  };

  const handleDemoLogin = async () => {
    setLoading(true);

    const res = await signIn("credentials", {
      email: "test@itemhub.com",
      password: "123456",
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      toast.success("Demo login successful!");
      router.push("/items");
    } else {
      toast.error("Demo login failed");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 pt-30">
      <div className="max-w-md mx-auto rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-base-content/70 text-sm">
          Credentials: <span className="font-semibold">test@itemhub.com</span> /{" "}
          <span className="font-semibold">123456</span>
        </p>

        <form onSubmit={handleCredentialsLogin} className="mt-6 space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="test@itemhub.com"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full"
              placeholder="123456"
              required
            />
          </div>

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleDemoLogin}
          className="btn btn-secondary w-full"
          disabled={loading}
        >
          Use Demo Credential (One Click)
        </button>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
          disabled={loading}
        >
          Continue with Google
        </button>
      </div>
    </section>
  );
}
