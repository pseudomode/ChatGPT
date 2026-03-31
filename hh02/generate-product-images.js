#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

// Product data extracted from index.html
const products = [
  // WATER (5)
  {id:1,name:"Drinking/Sanitation Water",cat:"Water",emoji:"💧",price:1.50,unit:"/gallon/day",priority:"HIGH"},
  {id:2,name:"Water Purification Tablets",cat:"Water",emoji:"💊",price:8.00,unit:"/pack",priority:"HIGH"},
  {id:3,name:"Water Filter/Purifier (LifeStraw)",cat:"Water",emoji:"🔬",price:20.00,unit:"/unit",priority:"MEDIUM"},
  {id:4,name:"Collapsible Water Containers (5-gal)",cat:"Water",emoji:"🫗",price:12.00,unit:"/container",priority:"MEDIUM"},
  {id:5,name:"Water Storage Barrel (55-gal)",cat:"Water",emoji:"🛢️",price:90.00,unit:"/barrel",priority:"LOW"},
  // FOOD (10)
  {id:6,name:"Canned Goods (beans, tuna, soup, veggies)",cat:"Food",emoji:"🥫",price:30.00,unit:"/3-day supply",priority:"HIGH"},
  {id:7,name:"Manual Can Opener",cat:"Food",emoji:"🔧",price:8.00,unit:"/unit",priority:"HIGH"},
  {id:8,name:"Ready-to-Eat Meals (MREs)",cat:"Food",emoji:"🍱",price:12.00,unit:"/meal",priority:"HIGH"},
  {id:9,name:"Energy/Protein Bars",cat:"Food",emoji:"🍫",price:2.00,unit:"/bar",priority:"HIGH"},
  {id:10,name:"Dried Fruits & Nuts",cat:"Food",emoji:"🥜",price:10.00,unit:"/16oz",priority:"MEDIUM"},
  {id:11,name:"Peanut Butter",cat:"Food",emoji:"🥜",price:4.00,unit:"/jar",priority:"MEDIUM"},
  {id:12,name:"Crackers/Hard Biscuits",cat:"Food",emoji:"🍪",price:4.00,unit:"/box",priority:"MEDIUM"},
  {id:13,name:"Comfort/Stress Foods",cat:"Food",emoji:"🍬",price:10.00,unit:"/assortment",priority:"LOW"},
  {id:14,name:"Infant Formula",cat:"Food",emoji:"🍼",price:25.00,unit:"/per need",priority:"HIGH"},
  {id:15,name:"Baby Food/Purees",cat:"Food",emoji:"🥣",price:15.00,unit:"/per need",priority:"HIGH"},
  // KITCHEN & COOKING (7)
  {id:16,name:"Portable Camp Stove",cat:"Kitchen & Cooking",emoji:"🔥",price:35.00,unit:"/unit",priority:"HIGH"},
  {id:17,name:"Fuel Canisters",cat:"Kitchen & Cooking",emoji:"⛽",price:6.00,unit:"/canister",priority:"HIGH"},
  {id:18,name:"Mess Kit/Camping Cookware",cat:"Kitchen & Cooking",emoji:"🍳",price:18.00,unit:"/set",priority:"MEDIUM"},
  {id:19,name:"Plates, Cups, Utensils",cat:"Kitchen & Cooking",emoji:"🍽️",price:8.00,unit:"/set",priority:"MEDIUM"},
  {id:20,name:"Dish Soap & Sponge",cat:"Kitchen & Cooking",emoji:"🧴",price:4.00,unit:"",priority:"LOW"},
  {id:21,name:"Aluminum Foil",cat:"Kitchen & Cooking",emoji:"🧁",price:3.00,unit:"/roll",priority:"LOW"},
  {id:22,name:"Paper Towels",cat:"Kitchen & Cooking",emoji:"🧻",price:3.00,unit:"/roll",priority:"LOW"},
  // FIRST AID & MEDICAL (12)
  {id:23,name:"First Aid Kit (comprehensive)",cat:"First Aid & Medical",emoji:"🩹",price:25.00,unit:"/kit",priority:"HIGH"},
  {id:24,name:"First Aid Manual/Guide",cat:"First Aid & Medical",emoji:"📖",price:10.00,unit:"/book",priority:"HIGH"},
  {id:25,name:"Prescription Medications (7-day)",cat:"First Aid & Medical",emoji:"💊",price:0,unit:"/per need",priority:"HIGH"},
  {id:26,name:"Over-the-Counter Medications",cat:"First Aid & Medical",emoji:"💉",price:30.00,unit:"/assortment",priority:"HIGH"},
  {id:27,name:"Eyeglasses/Spare Pair",cat:"First Aid & Medical",emoji:"👓",price:0,unit:"/per need",priority:"HIGH"},
  {id:28,name:"Contact Lens Solution",cat:"First Aid & Medical",emoji:"👁️",price:8.00,unit:"/16oz",priority:"MEDIUM"},
  {id:29,name:"Hearing Aid Batteries",cat:"First Aid & Medical",emoji:"🔋",price:10.00,unit:"/per need",priority:"HIGH"},
  {id:30,name:"Medical Gloves (nitrile)",cat:"First Aid & Medical",emoji:"🧤",price:10.00,unit:"/box 50ct",priority:"MEDIUM"},
  {id:31,name:"SAM Splint & Elastic Bandage",cat:"First Aid & Medical",emoji:"🦴",price:8.00,unit:"/unit",priority:"MEDIUM"},
  {id:32,name:"Emergency Thermal Blankets",cat:"First Aid & Medical",emoji:"🛡️",price:3.00,unit:"/blanket",priority:"MEDIUM"},
  {id:33,name:"Tourniquet (CAT)",cat:"First Aid & Medical",emoji:"🩺",price:30.00,unit:"/unit",priority:"MEDIUM"},
  {id:34,name:"Thermometer",cat:"First Aid & Medical",emoji:"🌡️",price:12.00,unit:"/unit",priority:"MEDIUM"},
];

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable not set');
  console.error('Set it with: export OPENAI_API_KEY="sk-..."');
  process.exit(1);
}

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function generateImage(product) {
  const prompt = generatePrompt(product);
  console.log(`\n📸 Generating: ${product.name} (ID: ${product.id})`);
  console.log(`   Prompt: ${prompt.substring(0, 60)}...`);

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // Download image
    const filename = `product-${product.id.toString().padStart(3, '0')}.png`;
    const filepath = path.join(imagesDir, filename);

    await downloadImage(imageUrl, filepath);
    console.log(`   ✅ Saved: ${filename}`);

    return { id: product.id, filename, success: true };
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    return { id: product.id, success: false, error: error.message };
  }
}

function generatePrompt(product) {
  const style = 'professional product photography, studio lighting, clean background, high quality, commercial product photo';

  // Category-specific context
  const categoryContext = {
    'Water': 'emergency water supply container',
    'Food': 'emergency food supply item',
    'Kitchen & Cooking': 'portable camping/emergency cooking equipment',
    'First Aid & Medical': 'medical or first aid supply',
    'Communication': 'emergency communication device',
    'Light & Fire': 'emergency lighting or fire starting tool',
    'Sanitation & Hygiene': 'hygiene or sanitation supply product',
    'Clothing & Shelter': 'emergency shelter or protective clothing',
    'Documents & Finances': 'document storage or financial item',
    'Tools': 'emergency or survival tool',
    'Navigation': 'navigation or mapping device',
    'Infant & Child': 'baby or child emergency supply',
    'Pet Supplies': 'pet emergency or supply item',
    'Special Needs': 'medical aid or accessibility device',
    'Safety Devices': 'safety or emergency detection device'
  };

  const context = categoryContext[product.cat] || 'emergency preparedness item';

  return `A professional product photo of a ${product.name}. This is an ${context} for emergency preparedness. Shot in studio with clean white background. High quality, sharp focus, realistic product photography, ${style}`;
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function main() {
  console.log('🎨 Hero Home Product Image Generator');
  console.log(`📁 Output directory: ${imagesDir}`);
  console.log(`📦 Total products: ${products.length}`);
  console.log('---');

  const results = { success: 0, failed: 0, skipped: 0 };

for (let i = 0; i < Math.min(5, products.length); i++) {
    const product = products[i];
    const filename = `product-${product.id.toString().padStart(3, '0')}.png`;
    const filepath = path.join(imagesDir, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping: ${product.name} (already exists)`);
      results.skipped++;
      continue;
    }

    const result = await generateImage(product);
    results[result.success ? 'success' : 'failed']++;

    // Rate limit: 1 request per 3 seconds for DALL-E 3
    if (i < products.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n---');
  console.log('✅ Complete!');
  console.log(`   Success: ${results.success}`);
  console.log(`   Failed: ${results.failed}`);
  console.log(`   Skipped: ${results.skipped}`);
}

main().catch(console.error);
