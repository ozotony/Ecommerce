import cookie from "cookie"


export function parseCookies(token) {
    if (!token) { return; }
   
   // return cookie.parse(token)
   // const base64Url = token.split('.')[1];
   // const base64 = base64Url.replace('-', '+').replace('_', '/');
   // return JSON.parse(window.atob(base64));
}