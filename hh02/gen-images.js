const fs = require('fs');
const path = require('path');
const https = require('https');

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY not set');
  process.exit(1);
}

const products = [
  {id:1,name:"Drinking/Sanitation Water",emoji:"💧"},
  {id:2,name:"Water Purification Tablets",emoji:"💊"},
  {id:3,name:"Water Filter (LifeStraw)",emoji:"🔬"},
  {id:4,name:"Collapsible Water Containers",emoji:"🫗"},
  {id:5,name:"Water Storage Barrel",emoji:"🛢️"},
];

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, {recursive:true});

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);
    https.get(url, r => {
      r.pipe(file);
      file.on('finish', () => { file.close(); resolve(filepath); });
    }).on('error', e => { fs.unlink(filepath, () => {}); reject(e); });
  });
}

async function generateImage(product) {
  try {
    const prompt = `Product photo of ${product.name}. Professional product photograph, white background, studio lighting, realistic e-commerce product shot.`;
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1024x1024', quality: 'standard' }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const url = data.data[0].url;
    const filename = `product-${product.id}-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    await downloadImage(url, filename);
    return {success: true, id: product.id, name: product.name, filename};
  } catch (e) {
    return {success: false, id: product.id, name: product.name, error: e.message};
  }
}

async function main() {
  console.log(`Generating images for ${products.length} products...`);
  let completed = 0, failed = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    process.stdout.write(`[${i+1}/${products.length}] ${product.name}... `);
    const result = await generateImage(product);
    if (result.success) {
      console.log(`✅ ${result.filename}`);
      completed++;
    } else {
      console.log(`❌ ${result.error}`);
      failed++;
    }
    if (i < products.length - 1) await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\nDone! Generated: ${completed}, Failed: ${failed}`);
}

main().catch(console.error);
