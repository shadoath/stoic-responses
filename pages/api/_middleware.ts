import { NextRequest, NextResponse } from "next/server"
import { rateLimiter } from "../../_middleware/ratelimiter"

export async function middleware(req: NextRequest) {
  try {
    await rateLimiter(req)
    return NextResponse.next()
  } catch (err) {
    console.error("Error generating stoic response:", err)
    return NextResponse.error()
  }
}
