import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      {/* Aqui virão as próximas seções: About Me, Skills, Featured Projects */}
    </div>
  );
}
