// Collects real screenshots from each project (plus the ones in raw/) and writes optimised WebP to public/projects/<slug>/.
import sharp from 'sharp';
import { mkdirSync, existsSync, rmSync } from 'node:fs';
import { basename } from 'node:path';
const ROOT = new URL('../../', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1').replaceAll('%20', ' ');
const R = (p) => ROOT + p;
const SRC = {
  'sales-dashboard': { cover: 'java_p/docs/screenshots/02-admin-dashboard.png', shots: ['java_p/docs/screenshots/03-sales-top-customers.png','java_p/docs/screenshots/05-orders-bulk-actions.png','java_p/docs/screenshots/21-dark-sales.png','java_p/docs/screenshots/12-tasks.png','java_p/docs/screenshots/13-order-with-items.png','java_p/docs/screenshots/15-products-stock.png','java_p/docs/screenshots/22-dark-orders.png','java_p/docs/screenshots/11-daily-report.png'], phone: 'java_p/docs/screenshots/31-phone-dashboard.png' },
  'reliefops': { cover: 'reliefops/docs/screenshots/overview.png', shots: ['reliefops/docs/screenshots/dispatches.png','reliefops/docs/screenshots/login.png'], phone: 'reliefops/docs/screenshots/mobile.png' },
  'repairdesk': { cover: 'repairdesk/docs/screenshots/overview.png', shots: ['repairdesk/docs/screenshots/repair-board.png','repairdesk/docs/screenshots/customer-portal.png','repairdesk/docs/screenshots/invoice.png','repairdesk/docs/screenshots/login.png'], phone: 'repairdesk/docs/screenshots/mobile.png' },
  'threads': { cover: 'threads-clothing/docs/screenshots/home-desktop.jpg', shots: ['threads-clothing/docs/screenshots/home-slider.jpg','threads-clothing/docs/screenshots/shop-desktop.jpg','threads-clothing/docs/screenshots/product-desktop.jpg','threads-clothing/docs/screenshots/bag-desktop.jpg'], phone: 'threads-clothing/docs/screenshots/home-phone.jpg' },
  'bloom': { cover: 'ecom/docs/screenshots/home-desktop.jpg', shots: ['ecom/docs/screenshots/home-full.jpg','ecom/docs/screenshots/shop-desktop.jpg','ecom/docs/screenshots/product-desktop.jpg','ecom/docs/screenshots/home-tablet.jpg'], phone: 'ecom/docs/screenshots/home-phone.jpg' },
  'aurora-atlas': { cover: 'aurora-atlas/screenshots/desktop.png', shots: ['aurora-atlas/screenshots/desktop-full.png','aurora-atlas/screenshots/bag.png','aurora-atlas/screenshots/mobile-product.png'], phone: 'aurora-atlas/screenshots/mobile.png' },
  'saas-platform': { cover: 'portfolio-3d/raw/saas/dashboard.png', shots: ['portfolio-3d/raw/saas/board.png','portfolio-3d/raw/saas/projects.png','portfolio-3d/raw/saas/dashboard-dark.png','portfolio-3d/raw/saas/login.png'], phone: 'portfolio-3d/raw/saas/phone.png' },
  'company-map': { cover: 'portfolio-3d/raw/companymap/map-desktop.png', shots: ['portfolio-3d/raw/companymap/walk-5.png','portfolio-3d/raw/companymap/walk-17.png','portfolio-3d/raw/companymap/walk-26.png','portfolio-3d/raw/companymap/walk-34.png','portfolio-3d/raw/companymap/walk-43.png','portfolio-3d/raw/companymap/walk-50.png','portfolio-3d/raw/companymap/walk-57.png','portfolio-3d/raw/companymap/walk-10.png'], phone: 'portfolio-3d/raw/companymap/map-phone.png' },
  'halo': { cover: 'portfolio-3d/raw/halo/hero.png', shots: ['portfolio-3d/raw/halo/design.png','portfolio-3d/raw/halo/customise.png','portfolio-3d/raw/halo/specs.png','portfolio-3d/raw/halo/buy.png'], phone: 'portfolio-3d/raw/halo/phone.png' },
  'clinic': { cover: 'portfolio-3d/raw/clinic/terminal.png', shots: [], phone: null },
  'agentforge': { cover: 'portfolio-3d/raw/agentforge/terminal.png', shots: [], phone: null },
  'inkcomplete': { cover: 'portfolio-3d/raw/inkcomplete/draw.png', shots: [], phone: null },
  'portfolio-2d': { cover: 'portfolio/screenshots/hero.png', shots: ['portfolio/screenshots/work.png','portfolio/screenshots/skills.png','portfolio/screenshots/process.png','portfolio/screenshots/impact.png','portfolio/screenshots/experience.png','portfolio/screenshots/education.png'], phone: 'portfolio/screenshots/mobile.png' },
};
const out = new URL('../public/projects/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1').replaceAll('%20', ' ');
if (existsSync(out)) rmSync(out, { recursive: true });
const manifest = {};
for (const [slug, s] of Object.entries(SRC)) {
  mkdirSync(out + slug, { recursive: true });
  manifest[slug] = { cover: null, shots: [], phone: null };
  const conv = async (rel, name, w) => {
    const file = R(rel);
    if (!existsSync(file)) { console.log('MISSING', rel); return null; }
    const meta = await sharp(file).metadata();
    const ratio = meta.height / meta.width;
    let img = sharp(file);
    // very tall desktop pages: keep the top, so the gallery stays readable
    if (meta.width > 800 && ratio > 1.3) img = img.extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.width * 0.8) });
    await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${out}${slug}/${name}.webp`);
    const m = await sharp(`${out}${slug}/${name}.webp`).metadata();
    return { src: `/projects/${slug}/${name}.webp`, w: m.width, h: m.height, portrait: m.height / m.width > 1.2 };
  };
  // uniform 16:10 hero + ring thumbnail (top-aligned crop keeps headers/nav in frame)
  const cf = R(s.cover);
  await sharp(cf).resize(1600, 1000, { fit: 'cover', position: 'top' }).webp({ quality: 84 }).toFile(`${out}${slug}/cover.webp`);
  await sharp(cf).resize(800, 500, { fit: 'cover', position: 'top' }).webp({ quality: 80 }).toFile(`${out}${slug}/thumb.webp`);
  manifest[slug].cover = { src: `/projects/${slug}/cover.webp`, thumb: `/projects/${slug}/thumb.webp`, w: 1600, h: 1000 };
  for (const [i, f] of s.shots.entries()) { const r = await conv(f, `shot-${i + 1}`, 1400); if (r) manifest[slug].shots.push(r); }
  if (s.phone) manifest[slug].phone = await conv(s.phone, 'phone', 700);
  console.log('ok', slug, manifest[slug].shots.length + ' shots');
}
import('node:fs').then(({ writeFileSync }) => writeFileSync(new URL('../src/images.json', import.meta.url), JSON.stringify(manifest, null, 2)));
