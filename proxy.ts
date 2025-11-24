import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "./features/auth/actions/current-user.action";

const authRoutes = ["/login", "/register"];
const publicRoutes = ["/privacy-policy", "/terms-of-service"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await currentUser();

  const isAuthenticated = user.success && !!user.data;

  if (isAuthenticated && authRoutes.includes(pathname)) {
    const next = request.nextUrl.searchParams.get("next");
    if (next) {
      return NextResponse.redirect(new URL(next, request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (
    !isAuthenticated &&
    !publicRoutes.includes(pathname) &&
    !authRoutes.includes(pathname)
  ) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
