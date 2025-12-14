
import { NextRequest,NextResponse } from "next/server";
import { updateSession } from "./app/lib/session";
 
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const valid =await updateSession(request);
 // console.log("nnnnnnnnnnnnnnnnnnnnnnn"+valid)
  /*if (
    // whatever your api route for login is
    pathname.includes("/login") || valid==10
  ) {
    return NextResponse.next();
  }
*/
  
/*  if (!valid &&
     pathname !== "/login" &&   pathname !== "/" && pathname !== "/about"
    && pathname !== "/contactus"
  ) {
    // since you want to redirect the user to "/"
    return NextResponse.redirect(new URL('/login', request.url));
  }
  */
 if (pathname.includes("/managment") && (!valid || valid==11 ||valid==12 ) ) 
       return NextResponse.redirect(new URL('/login', request.url));
 else  
 if (pathname.includes("/evaluator") && (!valid ||valid==12 ) ) 
       return NextResponse.redirect(new URL('/login', request.url));
 else   
 if (pathname.includes("/evaluated") && (!valid ||valid==11 ) ) 
       return NextResponse.redirect(new URL('/login', request.url));
 else  
  return  NextResponse.next();
}
