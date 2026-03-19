import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth/jwt";

// Quais rotas esse middleware deve inspecionar?
// Basicamente tudo que começar com /admin (ignorando arquivos estáticos para não perder performance)
export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  
  // Se o dev estiver tentando entrar na página de login, continua o fluxo normal e deixa ele ver
  if (currentPath === "/admin/login") {
    return NextResponse.next();
  }

  // Verifica se existe algum cookie de token gravado ali
  const token = request.cookies.get("admin_token")?.value;

  // Se não tem cookie, bota pra correr devolta para o login!
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Se tem cookie, vamos abrir ele (descriptografar a assinatura) e ver se foi a gente mesmo quem gerou o JWT
  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) {
    // Alguém tentou forjar um cookie fingindo ser admin, chuta ele de volta!
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("admin_token"); // ainda limpa a sujeira pra garantir
    return response;
  }

  // Se deu tudo certo e chegou até aqui: O Guardião diz "Pode Passar chefia!" ✅
  return NextResponse.next();
}
