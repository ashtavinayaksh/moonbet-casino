import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.geo?.country || "UNKNOWN";
  const blocked = ["US", "GB", "NL", "SE", "BE"];
  if (blocked.includes(country)) {
    return new NextResponse("Access Denied: Your country is restricted.", { status: 403 });
  }
  return NextResponse.next();
}
