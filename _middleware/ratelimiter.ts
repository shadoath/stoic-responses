import { NextRequest, NextResponse } from "next/server"
import SlowDown from "slowdown"

const limiter = SlowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // Allow 100 requests per windowMs without delay
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
