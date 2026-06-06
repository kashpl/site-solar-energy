import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images', 'optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const stat = fs.statSync(inputPath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, path.extname(file));

    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const outputPath = path.join(outputDir, `${name}.webp`);
      console.log(`Processing ${file}... (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const outStat = fs.statSync(outputPath);
        console.log(` -> Optimized to ${(outStat.size / 1024 / 1024).toFixed(2)} MB`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processImages();
