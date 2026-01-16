import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;

    // ✅ Never interfere with NextAuth endpoints
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const token = req.nextauth.token;

    if (pathname === "/login" && token) {
      return NextResponse.redirect(new URL("/items", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (path.startsWith("/add-item")) return !!token;
        if (path === "/login") return true;

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/add-item", "/login"],
};
