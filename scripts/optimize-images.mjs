import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { pdf } from 'pdf-to-img';

const publicDir = 'public';
const imagesToOptimize = [
  'hs-certificate.png',
  'ai-engineer-certificate.png',
  'hbnb.png',
  'healthcare.png',
  'flora.jpg',
  'hero.jpg',
  'beenthere.png'
];

const pdfsToOptimize = [
  'understand_cloud_computing.pdf',
  'working_with_the_openai_api.pdf'
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  for (const image of imagesToOptimize) {
    const inputPath = join(publicDir, image);
    const outputPath = join(publicDir, image.replace(/\.(png|jpg|jpeg)$/, '.webp'));

    try {
      const info = await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const inputStats = await sharp(inputPath).metadata();
      const savings = ((1 - info.size / inputStats.size) * 100).toFixed(1);

      console.log(`✅ ${image}`);
      console.log(`   → ${outputPath}`);
      console.log(`   → Size: ${(info.size / 1024).toFixed(0)}KB (${savings}% smaller)`);
      console.log(`   → Dimensions: ${info.width}x${info.height}\n`);
    } catch (error) {
      console.error(`❌ Error processing ${image}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
}

async function optimizePDFs() {
  console.log('📄 Starting PDF to WebP conversion...\n');

  for (const pdfFile of pdfsToOptimize) {
    const inputPath = join(publicDir, pdfFile);
    const outputPath = join(publicDir, pdfFile.replace('.pdf', '.webp'));

    try {
      const inputStats = await stat(inputPath);
      const inputSize = inputStats.size;

      // Convert PDF to image
      const document = await pdf(inputPath, { scale: 3 });

      // Get first page only (certificates are single-page)
      const page = await document.getPage(1);

      // Convert to WebP using sharp
      const webpBuffer = await sharp(page)
        .webp({ quality: 85, effort: 6 })
        .toBuffer();

      // Save WebP file
      await writeFile(outputPath, webpBuffer);

      const outputSize = webpBuffer.length;
      const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(`✅ ${pdfFile}`);
      console.log(`   → ${outputPath}`);
      console.log(`   → Size: ${(outputSize / 1024).toFixed(0)}KB (${savings}% smaller than PDF)\n`);
    } catch (error) {
      console.error(`❌ Error processing ${pdfFile}:`, error.message);
    }
  }

  console.log('✨ PDF conversion complete!');
}

async function optimizeAll() {
  await optimizeImages();
  console.log('');
  await optimizePDFs();
}

optimizeAll();
