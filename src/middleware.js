import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.geo?.country?.toUpperCase() || "UNKNOWN";
  const restrictedCountries = ["US", "GB", "NL", "SE", "BE"];

  if (restrictedCountries.includes(country)) {
    // Option 1: Show custom "Access Denied" HTML page
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

    // Option 2 (alternative): redirect to another page
    // return NextResponse.redirect("https://moonbet.games/blocked");
  }

  return NextResponse.next();
}

// Apply to all routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
