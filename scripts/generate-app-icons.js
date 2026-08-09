/**
 * Generate app icons (favicon + PWA logos) — book motif for Podstawy section.
 * Run manually when icon design changes: npm run generate:icons
 * Not part of prebuild — icons are static assets; Docker build has no Python.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../public');

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Zabawa">
  <rect x="32" y="32" width="448" height="448" rx="64" fill="#4a90d9"/>
  <rect x="118" y="198" width="220" height="152" rx="12" fill="#6BCB77"/>
  <rect x="118" y="198" width="48" height="152" fill="#3a7bc8"/>
  <rect x="190" y="142" width="220" height="152" rx="12" fill="#ff9f43"/>
  <rect x="190" y="142" width="48" height="152" fill="#dc7828"/>
  <rect x="248" y="162" width="148" height="112" fill="#fff8f0"/>
  <line x1="268" y1="198" x2="388" y2="198" stroke="#c8d4e0" stroke-width="8"/>
  <line x1="268" y1="228" x2="388" y2="228" stroke="#c8d4e0" stroke-width="8"/>
  <line x1="268" y1="258" x2="360" y2="258" stroke="#c8d4e0" stroke-width="8"/>
</svg>
`;

async function main() {
  const sharp = require('sharp');
  const toIco = require('to-ico');

  fs.writeFileSync(path.join(ROOT, 'favicon.svg'), FAVICON_SVG, 'utf8');

  const svgBuffer = Buffer.from(FAVICON_SVG);

  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(ROOT, 'logo192.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(ROOT, 'logo512.png'));

  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((size) => sharp(svgBuffer).resize(size, size).png().toBuffer())
  );
  const ico = await toIco(icoBuffers);
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico);

  console.log('Generated favicon.ico, favicon.svg, logo192.png, logo512.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
