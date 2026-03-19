import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Guardião do Admin
  if (currentPath.startsWith("/admin")) {
    // Permite bypass para login e setup
    if (currentPath === "/admin/login" || currentPath === "/admin/setup") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const verifiedToken = await verifyToken(token);
    if (!verifiedToken) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
    return NextResponse.next();
  }

  // Internacionalização para as outras rotas
  return intlMiddleware(request);
}
