// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export default function middleware(request) {
//     const path=request.nextUrl.pathname
//     const isPublicpath =path ==="/login"
//   const token =  request.cookies.get('token')?.value || ""
//   console.log(token,'token form middleware')
//     //  if(isPublicpath && token){
//     // return NextResponse.redirect(new URL('/admin/dashboard', request.url))
//     //  }
//     // else{
//     //     return NextResponse.redirect(new URL('/login', request.url)) 
//     // }
  
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/', '/login', '/admin/:path*', '/user/:path*']
// }


import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export default function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/login"
    const token = request.cookies.get('token')?.value || ""

    
    if ((isPublicPath && !token) || (!isPublicPath && token)) {
        return NextResponse.next() // Allow the request to continue
    }

    // Redirect conditions
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/', '/login', '/admin/:path*', '/user/:path*']
}