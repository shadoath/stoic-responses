import { NextRequest, NextResponse } from "next/server"
import SlowDown from "slowdown"

const limiter = SlowDown({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 50, // Allow 100 requests per windowMs without delay
  delayMs: 100, // Add 100ms delay per request above the limit
})

export async function rateLimiter(req: NextRequest) {
  return new Promise<NextResponse | void>((resolve, reject) => {
    limiter(req, null, (err: Error) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export async function middleware(req: NextRequest) {
  try {
    await rateLimiter(req)
    return NextResponse.next()
  } catch (err) {
    console.error("Error generating stoic response: in Middle ware", err)
    return NextResponse.error()
  }
}
