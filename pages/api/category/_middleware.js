import { NextResponse,NextRequest } from 'next/server'
import { parseCookies } from "../helper"
import cookie from "cookie"
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';



function isEmpty(obj) { 
  for (var x in obj) { return false; }
  return true;
}




export async function middleware (req,res) {
   // const router = useRouter();
   const { pathname, origin } = req.nextUrl



    console.log("Middleware is called ");
   // const Redirect = redirect('https://github.com/pablopunk')

  // return res.status(405).json({message:'Method not allowed'})
  //redirects();

  //  return  NextResponse.redirect('/subcategory')
    const {cookies} =req;
    //const {body}=req;
   // console.log('req.users 1');
   // const tokens = req.headers.get('cookie')
  // console.log('cookies')
  //  console.log(cookies)

  
   // return NextResponse.redirect('/signin');
   
   if (isEmpty(cookies)) {
       console.log('about to redirect')
       const url = req.nextUrl.clone()
       url.pathname = '/subcategory'
      // console.log( url)
      // return NextResponse.rewrite(new URL('/subcategory', req.url))
      return new Response(JSON.stringify({ message: 'Not authenticated' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });

     // return NextResponse.rewrite(url);
      // return NextResponse.rewrite(url);

   //  return   router.push({
    //    pathname: 'http://localhost:3000',
    //    query: { returnUrl: router.asPath }
    //});
    
  //  return NextResponse.redirect('http://localhost:3000')
   }
   
    
    
//var decoded = jwt.verify(token2[1], secret);
 //const token3 = await jwt.getToken(token2[1], secret )
 
//req.userid=decoded.userid;

    
 // const  token2=tokens.split("=");
   // console.log(request.headers.cookie);
   //const data = cookie.parse(token2[1]) 

  // const secret = '#ozo333666'
  // var decoded = jwt.verify(token2[1], secret);
 //  const token3 = await jwt.getToken(token2[1], secret )
  // console.log(decoded );

  //  console.log('req.users 1 end');
   // console.log(req);
  return NextResponse.next()
}