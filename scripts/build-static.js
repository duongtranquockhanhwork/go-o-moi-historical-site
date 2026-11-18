// Xuất toàn bộ dữ liệu từ SQLite ra public/data/site.json để trang chạy tĩnh
// (GitHub Pages) mà không cần server Node. Chạy: npm run build
const path = require('node:path');
const fs = require('node:fs');
const { getSiteData } = require('../server/db');

const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OUT_FILE = path.join(OUT_DIR, 'site.json');

fs.mkdirSync(OUT_DIR, { recursive: true });
// Bỏ dấu "/" đầu đường dẫn ảnh để trang chạy được cả ở domain gốc lẫn
// đường dẫn con (vd. https://<user>.github.io/<repo>/).
const toRelative = (p) => (typeof p === 'string' ? p.replace(/^\/+/, '') : p);
const data = getSiteData();
data.points.forEach((pt) => { pt.image = toRelative(pt.image); });
data.gallery.forEach((img) => { img.filename = toRelative(img.filename); });

fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2) + '\n');
console.log(`Đã xuất dữ liệu ra ${OUT_FILE}`);
