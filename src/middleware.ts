import { NextRequest, NextResponse } from 'next/server'


export const config = {
  matcher: [
    '/admin',           // ← add this line
    '/admin/:path*',
    
  ],
}

export function middleware(req: NextRequest) {
  // allow public GETs to /api/products
  console.log("🔒 Middleware triggered:", req.nextUrl.pathname);
  if (req.nextUrl.pathname.startsWith('/api/products') && req.method === 'GET') {
    return NextResponse.next()
  }

  // Basic Auth
  const auth = req.headers.get('authorization') ?? ''
  if (!auth.startsWith('Basic ')) {
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
    })
  }

  const [user, pass] = atob(auth.split(' ')[1]).split(':')
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    return NextResponse.next()
  }
  
  
  return new NextResponse('Unauthorized', { status: 401 })

}
