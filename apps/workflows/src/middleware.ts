import { NextRequest, NextResponse } from "next/server";
import { supabaseMiddleware } from "@/utils/supabase/middleware";
import { authLinks, protectedRoutes } from "@/utils/auth";
import { getUser } from "@/utils/auth/helpers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = await supabaseMiddleware(request, response);

  // const notProtectedPathnameRegex = RegExp(
  //   `^(/(${locales.join("|")}))?(${notProtectedRoutes
  //     .flatMap((p) => (p === "/" ? ["", "/"] : p))
  //     .join("|")})/?$`
  // );

  const user = await getUser(supabase);

  if (
    user &&
    (request.nextUrl.pathname.startsWith(authLinks.sign_in) ||
      request.nextUrl.pathname.startsWith(authLinks.sign_up))
  ) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}${authLinks.dashboard}`
    );
  }

  if (
    !user &&
    protectedRoutes.find((route) =>
      route.comparison === "exact"
        ? route.href === request.nextUrl.pathname
        : request.nextUrl.pathname.startsWith(route.href)
    )
  ) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}${authLinks.sign_in}`
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
