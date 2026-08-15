/**
 * Preview GIF Generator Script for AI-Prompts Repository
 * 
 * Usage:
 *   node scripts/capture-preview.js <project-name|all|recent> [port] [viewportWidth] [viewportHeight]
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync, spawn } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

const ALL_PROJECTS = [
  'wandor-travel', 'space-travel-landing', 'leon-3d-portfolio', 'serene-wellness',
  'tinytrails-404', 'aura-email', 'atelier-agency', 'velorah-hero',
  'measured-wearable', 'lumora-app', 'leon-archive', 'prisma-studio',
  'axion-studio', 'vibrant-wellness', 'nora-studio', 'terra-elix',
  'cozy-paws', 'adam-roberts', 'mostar-city', 'skyelite-jets',
  'dehelpers-hero', 'void-404', 'echoid-voice', 'synapsex-landing',
  'kollektiva', 'vantage-landing', 'next-layer-ai', 'forma-contact',
  'evolve-ai'
];

const RECENT_PROJECTS = [
  'adam-roberts', 'mostar-city', 'skyelite-jets', 'dehelpers-hero',
  'void-404', 'echoid-voice', 'synapsex-landing', 'kollektiva',
  'vantage-landing', 'next-layer-ai', 'forma-contact', 'evolve-ai'
];

// Helper to serve static folder if pure HTML
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

// Helper to start Vite server for React/Vite projects
function startViteServer(projectDir, port) {
  return new Promise((resolve) => {
    console.log(`[Vite Server] Spawning Vite for ${projectDir} on port ${port}...`);
    const projectPath = path.join(ROOT_DIR, projectDir);
    const child = spawn('npx.cmd', ['-y', 'vite', '--port', String(port), '--host'], {
      cwd: projectPath,
      shell: true,
      stdio: 'pipe'
    });

    const checkInterval = setInterval(async () => {
      const running = await isServerRunning(`http://localhost:${port}/`);
      if (running) {
        clearInterval(checkInterval);
        console.log(`[Vite Server] Vite ready at http://localhost:${port}/`);
        resolve(child);
      }
    }, 500);

    setTimeout(() => {
      clearInterval(checkInterval);
      resolve(child);
    }, 10000);
  });
}

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
  let viteChild = null;

  const running = await isServerRunning(url);
  if (!running) {
    const hasPackageJson = fs.existsSync(path.join(projectPath, 'package.json'));
    if (hasPackageJson) {
      viteChild = await startViteServer(projectSlug, customPort);
    } else {
      localServer = await serveStatic(projectSlug, customPort);
    }
  }

  console.log(`[Capture] Recording "${projectSlug}" from ${url}...`);
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

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1200);

    const numFrames = 30;
    for (let i = 0; i < numFrames; i++) {
      const framePath = path.join(framesDir, `frame_${String(i).padStart(3, '0')}.png`);
      await page.screenshot({ path: framePath });
      await page.waitForTimeout(100);
    }
  } finally {
    await browser.close();
    if (localServer) localServer.close();
    if (viteChild) {
      try { process.kill(-viteChild.pid); } catch(e) { viteChild.kill(); }
    }
  }

  const targetGif = path.join(projectPath, 'preview.gif');
  const publicDir = path.join(projectPath, 'public');
  const publicGif = path.join(publicDir, 'preview.gif');

  console.log(`[FFmpeg] Compiling preview.gif for "${projectSlug}"...`);
  const ffmpegCmd = `ffmpeg -y -framerate 10 -i "${path.join(framesDir, 'frame_%03d.png')}" -vf "scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" "${targetGif}"`;
  
  execSync(ffmpegCmd, { stdio: 'ignore' });

  if (fs.existsSync(publicDir)) {
    fs.copyFileSync(targetGif, publicGif);
  }

  console.log(`[Success] preview.gif created for ${projectSlug}`);
  fs.rmSync(framesDir, { recursive: true, force: true });
}

async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || 'recent';
  const basePort = args[1] ? parseInt(args[1], 10) : 5300;
  const width = args[2] ? parseInt(args[2], 10) : 1487;
  const height = args[3] ? parseInt(args[3], 10) : 1058;

  let targets = [];
  if (target === 'all') {
    targets = ALL_PROJECTS;
  } else if (target === 'recent') {
    targets = RECENT_PROJECTS;
  } else {
    targets = [target];
  }

  console.log(`[Batch Capture] Processing projects: ${targets.join(', ')}`);

  for (let i = 0; i < targets.length; i++) {
    const proj = targets[i];
    const port = basePort + i;
    try {
      await capturePreview(proj, port, width, height);
    } catch (err) {
      console.error(`[Error] Failed to capture ${proj}:`, err);
    }
  }

  console.log('[Batch Capture] Completed all requested projects!');
}

main();
