const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

const ALL_PROJECTS = [
  'wandor-travel', 'space-travel-landing', 'leon-3d-portfolio', 'serene-wellness',
  'tinytrails-404', 'aura-email', 'atelier-agency', 'velorah-hero',
  'measured-wearable', 'lumora-app', 'leon-archive', 'prisma-studio',
  'axion-studio', 'vibrant-wellness', 'nora-studio', 'terra-elix',
  'cozy-paws', 'adam-roberts', 'mostar-city', 'skyelite-jets',
  'dehelpers-hero', 'void-404', 'echoid-voice', 'synapsex-landing',
  'kollektiva', 'vantage-landing', 'next-layer-ai', 'forma-contact',
  'evolve-ai', 'nexum-hero', 'epoch-hero', 'apogee-hero', 'lumen-index', 'signal-login',
  'vesper-ai', 'mainframe-hero', 'marcus-bennet'
];

async function convertAll() {
  console.log(`[Convert] Starting batch GIF -> WebP conversion for ${ALL_PROJECTS.length} projects...`);
  
  let totalGifBytes = 0;
  let totalWebpBytes = 0;
  let convertedCount = 0;

  for (const slug of ALL_PROJECTS) {
    const projDir = path.join(ROOT_DIR, slug);
    const gifPath = path.join(projDir, 'preview.gif');
    const webpPath = path.join(projDir, 'preview.webp');
    const publicDir = path.join(projDir, 'public');
    const publicWebp = path.join(publicDir, 'preview.webp');

    if (!fs.existsSync(gifPath)) {
      console.warn(`[Skip] ${slug} has no preview.gif`);
      continue;
    }

    const gifStat = fs.statSync(gifPath);
    totalGifBytes += gifStat.size;

    console.log(`[Converting] ${slug} (${(gifStat.size / 1024 / 1024).toFixed(2)} MB)...`);
    
    // Convert to high-quality animated WebP using ffmpeg
    const cmd = `ffmpeg -y -i "${gifPath}" -vcodec libwebp -filter:v "fps=10" -lossless 0 -compression_level 4 -q:v 75 -loop 0 "${webpPath}"`;
    try {
      execSync(cmd, { stdio: 'ignore' });
      const webpStat = fs.statSync(webpPath);
      totalWebpBytes += webpStat.size;
      convertedCount++;

      // Also copy to public directory if exists
      if (fs.existsSync(publicDir)) {
        fs.copyFileSync(webpPath, publicWebp);
      }

      console.log(`  ✓ Done ${slug}: ${(gifStat.size / 1024 / 1024).toFixed(2)} MB -> ${(webpStat.size / 1024 / 1024).toFixed(2)} MB (-${((1 - webpStat.size / gifStat.size) * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error(`  ✗ Error converting ${slug}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log(`[Summary] Converted: ${convertedCount}/${ALL_PROJECTS.length} projects`);
  console.log(`Total GIF Size : ${(totalGifBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total WebP Size: ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved          : ${((totalGifBytes - totalWebpBytes) / 1024 / 1024).toFixed(2)} MB (-${((1 - totalWebpBytes / totalGifBytes) * 100).toFixed(1)}%)`);
  console.log('========================================');
}

convertAll();
