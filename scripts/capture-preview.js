/**
 * Preview GIF Generator Script for AI-Prompts Repository
 * 
 * Usage:
 *   node scripts/capture-preview.js <project-name> [port] [viewportWidth] [viewportHeight]
 * 
 * Examples:
 *   node scripts/capture-preview.js vantage-landing 5173
 *   node scripts/capture-preview.js next-layer-ai 5174
 *   node scripts/capture-preview.js all
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to serve static folder if dev server is not running
function serveStatic(projectDir, port) {
  const dirPath = path.join(ROOT_DIR, projectDir);
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(dirPath, req.url === '/' ? 'index.html' : req.url);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(dirPath, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.woff2': 'font/woff2'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading file');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      console.log(`[Static Server] Serving ${projectDir} at http://localhost:${port}/`);
      resolve(server);
    });
  });
}

// Helper to check if server is active
function isServerRunning(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => resolve(res.statusCode >= 200 && res.statusCode < 400))
      .on('error', () => resolve(false));
  });
}

async function capturePreview(projectSlug, customPort = 5173, width = 1487, height = 1058) {
  const projectPath = path.join(ROOT_DIR, projectSlug);
  if (!fs.existsSync(projectPath)) {
    console.error(`[Error] Project directory "${projectSlug}" does not exist at ${projectPath}`);
    return;
  }

  const url = `http://localhost:${customPort}/`;
  let localServer = null;

  const running = await isServerRunning(url);
  if (!running) {
    console.log(`[Info] No active dev server detected at ${url}. Starting temporary static server...`);
    localServer = await serveStatic(projectSlug, customPort);
  }

  console.log(`[Capture] Launching browser to record "${projectSlug}" from ${url}...`);
  const framesDir = path.join(ROOT_DIR, `temp_frames_${projectSlug}`);
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(framesDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: Number(width), height: Number(height) },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Allow entrance animations to stabilize

  const numFrames = 30; // 3 seconds @ 10 fps
  for (let i = 0; i < numFrames; i++) {
    const framePath = path.join(framesDir, `frame_${String(i).padStart(3, '0')}.png`);
    await page.screenshot({ path: framePath });
    await page.waitForTimeout(100);
  }

  await browser.close();

  if (localServer) {
    localServer.close();
  }

  const targetGif = path.join(projectPath, 'preview.gif');
  const publicDir = path.join(projectPath, 'public');
  const publicGif = path.join(publicDir, 'preview.gif');

  console.log(`[FFmpeg] Compiling high-quality preview.gif for "${projectSlug}"...`);
  const ffmpegCmd = `ffmpeg -y -framerate 10 -i "${path.join(framesDir, 'frame_%03d.png')}" -vf "scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" "${targetGif}"`;
  
  execSync(ffmpegCmd, { stdio: 'inherit' });

  if (fs.existsSync(publicDir)) {
    fs.copyFileSync(targetGif, publicGif);
  }

  console.log(`[Success] preview.gif created at ${targetGif}`);
  fs.rmSync(framesDir, { recursive: true, force: true });
}

async function main() {
  const args = process.argv.slice(2);
  const target = args[0];
  const port = args[1] ? parseInt(args[1], 10) : 5173;
  const width = args[2] ? parseInt(args[2], 10) : 1487;
  const height = args[3] ? parseInt(args[3], 10) : 1058;

  if (!target) {
    console.log(`
Usage:
  node scripts/capture-preview.js <project-name> [port] [viewportWidth] [viewportHeight]

Examples:
  node scripts/capture-preview.js vantage-landing 5173
  node scripts/capture-preview.js next-layer-ai 5174
    `);
    process.exit(0);
  }

  try {
    await capturePreview(target, port, width, height);
  } catch (err) {
    console.error('[Fatal Error] Failed to generate GIF:', err);
    process.exit(1);
  }
}

main();
