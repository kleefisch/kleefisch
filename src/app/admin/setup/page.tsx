"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { setupAdminAction } from "./actions";
import { CheckCircle2, Copy, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AdminSetupPage() {
  const [data, setData] = useState<any>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await setupAdminAction();
      setData(result);

      if (result.success && result.totpUri) {
        const url = await QRCode.toDataURL(result.totpUri, {
          color: {
            dark: "#06B6D4", // Cyan color
            light: "#0A0E17", // Dark background
          },
          margin: 2,
        });
        setQrCodeDataUrl(url);
      }
    } catch (error: any) {
      console.error("Error generating admin setup", error);
      setData({
        success: false,
        message: "Erro ao se conectar ao banco de dados: " + String(error.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-20 relative">
      {/* Background ambient glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-violet/10 blur-[150px] mix-blend-screen pointer-events-none -z-10" />

      <div className="max-w-2xl w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-12 backdrop-blur-xl relative z-10 flex flex-col items-center shadow-2xl">
        <div className="h-16 w-16 bg-accent-cyan/10 border border-accent-cyan/30 rounded-2xl flex items-center justify-center mb-6">
          <ShieldCheck className="h-8 w-8 text-accent-cyan" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 text-center">Setup de Segurança Admin</h1>
        <p className="text-neutral-400 text-center max-w-md mb-10">
          Gere suas credenciais blindadas e o código QR para sincronizar com seu Google
          Authenticator.
        </p>

        {!data && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 bg-accent-cyan hover:bg-accent-cyan/90 text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Gerando chaves criptográficas..." : "Gerar Acesso Admin Seguro"}
          </button>
        )}

        {data && data.success && (
          <div className="w-full flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">
                Credenciais geradas com sucesso! Salve a senha agora, ela não será mostrada
                novamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    Seu Email
                  </label>
                  <div className="px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white font-mono text-sm tracking-wide break-all">
                    {data.email}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    Sua Senha Gerada
                  </label>
                  <div className="px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-accent-cyan font-mono text-sm flex justify-between items-center group">
                    <span>{data.plainPassword}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(data.plainPassword)}
                      className="p-1.5 text-neutral-500 hover:text-white bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copiar"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Utilizada com <strong className="text-white">bcryptjs</strong> com 10 rounds de
                  salt. Seu banco só possui o hash irreversível.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-black/30 border border-white/5 rounded-xl gap-4">
                <h3 className="text-sm font-bold text-white text-center">
                  Passo 2: Escaneie o QR Code
                </h3>
                <p className="text-xs text-neutral-400 text-center">
                  Abra o Google Authenticator ou Authy no seu celular e adicione esta conta.
                </p>
                {qrCodeDataUrl && (
                  <div className="p-3 bg-[#0A0E17] rounded-xl border border-accent-cyan/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex justify-center items-center relative w-48 h-48">
                    <Image
                      src={qrCodeDataUrl}
                      alt="2FA QR Code"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
                <div className="mt-2 text-[10px] text-accent-violet font-mono break-all text-center">
                  TOTP HmacSHA1
                </div>
              </div>
            </div>
          </div>
        )}

        {data && !data.success && (
          <div className="w-full text-center p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {data.message} <br />
            <br /> Se você esqueceu a senha, será necessário limpar a tabela no Neon.
          </div>
        )}
      </div>
    </div>
  );
}
