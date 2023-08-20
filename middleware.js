import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (pathname === "/cart") {
    if (!session) return NextResponse.redirect(`${origin}/my-account`);
  }
  if (pathname === "/order") {
    if (!session) return NextResponse.redirect(`${origin}/my-account`);
  }
  if (pathname === "/cart") {
    if (!session) return NextResponse.redirect(`${origin}/my-account`);
  }
  if (pathname === "/checkout") {
    if (!session) return NextResponse.redirect(`${origin}/my-account`);
  }
  if (pathname === "/dashboard") {
    if (session?.role !== "admin")
      return NextResponse.redirect(`${origin}/my-account`);
  }
  if (pathname === "/dashboard/products") {
    if (session?.role !== "admin")
      return NextResponse.redirect(`${origin}/my-account`);
  }

  if (pathname === "/dashboard/orders") {
    if (session?.role !== "admin")
      return NextResponse.redirect(`${origin}/my-account`);
  }
}
