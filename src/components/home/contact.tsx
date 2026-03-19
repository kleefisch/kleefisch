"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Exemplo de handler (será trocado futuramente por uma Server Action)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simula uma requisição
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Futuramento adicione toast notification aqui
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Glow - Final central glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent-violet/10 blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 bg-foreground/[0.02] border border-white/5 rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-sm"
          >
            {/* Left Column: Info & Text */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-8 bg-accent-cyan" />
                  <span className="text-accent-cyan font-mono text-sm uppercase tracking-wider">
                    Get in Touch
                  </span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
                  Let&apos;s work <br /> together.
                </h2>
                <p className="text-muted-foreground text-lg">
                  I&apos;m currently open for new opportunities. Whether you have a question or just
                  want to say hi, I&apos;ll try my best to get back to you!
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="h-12 w-12 rounded-full border border-white/10 bg-background/50 flex items-center justify-center text-accent-emerald">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-foreground">Email</h4>
                    <a
                      href="mailto:hello@example.com"
                      className="hover:text-accent-cyan transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="h-12 w-12 rounded-full border border-white/10 bg-background/50 flex items-center justify-center text-accent-violet">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-foreground">Location</h4>
                    <span>Remote / Earth</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 flex flex-col bg-background/30 p-6 sm:p-8 rounded-2xl border border-white/5 shadow-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-md bg-background border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full h-12 px-4 rounded-md bg-background border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full p-4 rounded-md bg-background border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative h-12 w-full sm:w-auto px-8 overflow-hidden rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
