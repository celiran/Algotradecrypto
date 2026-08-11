export async function GET(request:Request){
  const hostname=new URL(request.url).hostname.toLowerCase();
  const isProduction=hostname==="algotradecrypto.com"||hostname==="www.algotradecrypto.com";
  const body=isProduction
    ? ["User-agent: *","Allow: /","Disallow: /api/","Disallow: /checkout/","Disallow: /cart/","Disallow: /my-account/","Sitemap: https://algotradecrypto.com/sitemap.xml","Host: https://algotradecrypto.com",""] .join("\n")
    : ["User-agent: *","Disallow: /",""] .join("\n");
  return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=300"}})
}
