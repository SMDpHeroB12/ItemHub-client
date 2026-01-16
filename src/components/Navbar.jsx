"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/navLinks";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    toast.success("Logged out!");
    await signOut({ callbackUrl: "/" });
  };

  // while session is loading (avoid UI flicker)
  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur shadow bg-base-100/70 border-b border-base-200/50 w-11/12 container rounded-lg">
      <div className="navbar px-4">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Desktop */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {navLinks.map((link) => {
              // ✅ Hide Add Item when not logged in
              if (link.href === "/add-item" && !isLoggedIn) return null;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? "btn btn-sm btn-primary"
                        : "btn btn-sm btn-ghost text-base-content"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* Right actions */}
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : isLoggedIn ? (
            <>
              <Image
                width={40}
                height={40}
                alt="User Avatar"
                title={session.user?.name}
                src={
                  session.user?.image ||
                  "https://i.ibb.co.com/7xwWQvM3/user-circles.png"
                }
                className="rounded-full mr-2 w-10 h-10"
              ></Image>
              <span className="hidden sm:inline text-sm text-base-content/70">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}

          {/* Mobile */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow border border-base-200/50"
            >
              {navLinks.map((link) => {
                if (link.href === "/add-item" && !isLoggedIn) return null;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        isActive(link.href)
                          ? "font-semibold text-primary"
                          : "text-base-content"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              <div className="divider my-1" />

              {isLoading ? (
                <li>
                  <span className="loading loading-spinner loading-sm" />
                </li>
              ) : isLoggedIn ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
