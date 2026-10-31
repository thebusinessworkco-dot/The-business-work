import fs from "fs";
import path from "path";

const possiblePaths = [
  path.join(process.cwd(), "node_modules", "next", "dist", "compiled", "@next", "font", "dist", "google", "loader.js"),
  path.join(process.cwd(), "frontend", "node_modules", "next", "dist", "compiled", "@next", "font", "dist", "google", "loader.js"),
];

for (const filePath of possiblePaths) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf-8");
    const target = "const ext = /\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1];";
    const replacement = 'const extMatch = /\\.(woff|woff2|eot|ttf|otf)(\\?.*)?$/.exec(googleFontFileUrl); const ext = extMatch ? extMatch[1] : "woff2";';
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`[patch-next-font] Successfully patched next/font loader at ${filePath}`);
    }
  }
}
