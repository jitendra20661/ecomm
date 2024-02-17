import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname

    const isPublicPath = path ==='/login' || path === '/signup'

    const token = request.cookies.get('user@GEComm_token')?.value||''
    // console.log(request.cookies);

    //when token is present
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // when user acess private path without login
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/signup', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/', 
        '/products',
        '/login',
        '/signup',
    ]
}