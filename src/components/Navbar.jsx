"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/navLinks";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur shadow bg-base-100/70 border-b border-base-200/50  rounded-lg">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <Link href="/" className=" text-xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Desktop */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "font-semibold text-primary btn"
                      : "text-base-content btn btn-ghost"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link href="/login" className="btn btn-sm btn-primary">
            Login
          </Link>

          {/* Mobile */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              ☰
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-60 mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((link) => (
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
              ))}
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
