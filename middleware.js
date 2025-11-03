// /middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.geo?.country?.toUpperCase() || "UNKNOWN";
  const blockedCountries = ["US", "GB", "NL", "SE", "BE"];

  if (blockedCountries.includes(country)) {
    return new NextResponse(
      `<html>
        <head><title>Access Restricted</title></head>
        <body style="background:#000;color:#fff;font-family:sans-serif;text-align:center;padding-top:100px;">
          <h1>🚫 Access Restricted</h1>
          <p>Moonbet Games is not available in your country (${country}).</p>
        </body>
      </html>`,
      {
        status: 403,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
