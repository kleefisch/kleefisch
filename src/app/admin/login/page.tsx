"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("password", password);

    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.success) {
      // Se a Server Action mandar o cookie direitinho, a gente é liberado pelo middleware e entramos lá dentro do dashboard
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background simplificado pro admin (um leve glow para não fugir da identidade)*/}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-violet/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="bg-foreground/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 bg-accent-violet/10 rounded-2xl flex items-center justify-center border border-accent-violet/20">
              <Lock className="w-8 h-8 text-accent-violet" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Restricted Access</h1>
            <p className="text-muted-foreground text-sm">
              Please enter your master password to access the CMS Dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                disabled={isLoading}
                className="w-full h-12 px-4 rounded-xl bg-background border border-white/10 text-center tracking-[0.25em] text-foreground focus:outline-none focus:ring-2 focus:ring-accent-violet/50 focus:border-transparent transition-all"
              />
              {error && (
                <p className="text-red-500 text-sm text-center font-medium animate-in fade-in">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-accent-violet text-white font-semibold hover:bg-accent-violet/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Unlock
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
