import { readFileSync, writeFileSync } from "fs";
const file = "src/components/home/hero.tsx";
let content = readFileSync(file, "utf8");

// Remover o hero de teste e deixar só o principal que eu acabei de renomear
content = content.replace(
  /export function Hero\(\) \{[\s\S]*?\{[^}]*KEEPING OLD HERO BELOW AS SECONDARY SECTION[^}]*\}[\s\S]*?<HeroOld \/>[\s\S]*?\}[\s\S]*?export function Hero\(\)/g,
  "export function Hero()",
);

writeFileSync(file, content);
