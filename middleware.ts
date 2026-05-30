import { NextRequest, NextResponse } from "next/server"

const PUBLIC_ROUTES = ["/login"]
const PROTECTED_ROUTES = ["/dashboard", "/clients","/clients/new", "/reservations", "/chambres", "/equipements", "/tarifs"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const path = request.nextUrl.pathname

  const isProtected = PROTECTED_ROUTES.some((route) => path.startsWith(route))
  const isPublic = PUBLIC_ROUTES.includes(path)

  // pas de token + route protégée → login
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // token présent + page login → dashboard
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}