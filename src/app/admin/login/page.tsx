"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (step === 2) {
      formData.append("totpCode", totpCode);
    }

    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.requiresTwoFactor) {
      setStep(2);
      setIsLoading(false);
    } else if (result.success) {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background simplificado pro admin (um leve glow para não fugir da identidade)*/}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="bg-foreground/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="flex justify-center mb-8 relative">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="lock-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="h-16 w-16 bg-accent-violet/10 rounded-2xl flex items-center justify-center border border-accent-violet/20"
                >
                  <Lock className="w-8 h-8 text-accent-violet" />
                </motion.div>
              ) : (
                <motion.div
                  key="shield-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="h-16 w-16 bg-accent-cyan/10 rounded-2xl flex items-center justify-center border border-accent-cyan/20"
                >
                  <ShieldCheck className="w-8 h-8 text-accent-cyan" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Restricted Access</h1>
            <p className="text-muted-foreground text-sm">
              {step === 1
                ? "Please authenticate to manage the CMS."
                : "Enter your 2FA code from Authenticator"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step-1"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@email.com"
                      required
                      disabled={isLoading}
                      className="w-full h-12 px-4 rounded-xl bg-background border border-white/10 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-accent-violet/50 focus:border-transparent transition-all"
                    />
                  </div>
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
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value)}
                      placeholder="000000"
                      required
                      disabled={isLoading}
                      autoFocus
                      className="w-full h-16 px-4 rounded-xl bg-background border border-accent-cyan/30 text-center text-3xl tracking-[0.5em] text-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-transparent transition-all font-mono"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="text-red-500 text-sm text-center font-medium animate-in fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || (step === 1 ? !email || !password : totpCode.length < 6)}
              className={`group relative h-12 w-full overflow-hidden rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] ${
                step === 1
                  ? "bg-accent-violet hover:bg-accent-violet/90"
                  : "bg-accent-cyan hover:bg-accent-cyan/90 text-black"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className={`w-5 h-5 animate-spin ${step === 2 && "text-black"}`} />
                ) : (
                  <>
                    {step === 1 ? "Continue" : "Verify & Unlock"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-xs text-neutral-500 hover:text-white transition-colors mt-2"
              >
                ← Back to Password
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
