import { cpSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, "src", "views");
const destDir = join(__dirname, "dist", "views");

if (!existsSync(sourceDir)) {
  console.error("❌ Error: No existe la carpeta src/views");
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });

try {
  cpSync(sourceDir, destDir, { recursive: true });
} catch (error) {
  console.error("❌ Error al copiar archivos:", error);
  process.exit(1);
}
