import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const inputPath = path.join(publicDir, 'logo-mata-mandor.png');
const outputPath = path.join(publicDir, 'logo-mata-mandor-transparent.png');
const faviconPath = path.join(publicDir, 'favicon.ico');

async function main() {
  // Read original image
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  // Get raw pixel data
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Make white/near-white pixels transparent
  const threshold = 230; // pixels with R,G,B all above this become transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0; // set alpha to 0
    }
  }

  // Save transparent version
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  console.log(`✅ Transparent logo saved to: ${outputPath}`);

  // Generate favicon (32x32)
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconPath.replace('.ico', '.png'));

  // Also create the ico as png (browsers accept png favicons)
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconPath);

  console.log(`✅ Favicon saved to: ${faviconPath}`);
}

main().catch(console.error);
