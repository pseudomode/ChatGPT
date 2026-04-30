import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { SUPPLY_CATEGORIES } from "@/lib/supplyData";
import SuppliesTutorial from "./SuppliesTutorial";

// AI-generated photographic image URLs per item (white background, realistic)
const ITEM_IMAGES = {
  w1: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&q=80", // water jugs
  w2: "https://images.unsplash.com/photo-1563351672-62b74891a28a?w=120&q=80", // storage container
  w3: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=120&q=80", // tablets
  w4: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=120&q=80", // filter straw
  w5: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&q=80", // collapsible jug
  f1: "https://images.unsplash.com/photo-1584931423298-4e2e2b3e0a2e?w=120&q=80", // canned goods
  f2: "https://images.unsplash.com/photo-1585282263861-f55e341878f8?w=120&q=80", // MRE
  f3: "https://images.unsplash.com/photo-1622484211772-9a9c5d1c8e90?w=120&q=80", // protein bars
  f4: "https://images.unsplash.com/photo-1508747703725-719777637510?w=120&q=80", // nuts
  f5: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&q=80", // rice
  f6: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=120&q=80", // peanut butter
  f7: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=120&q=80", // honey
  f8: "https://images.unsplash.com/photo-1559181567-c3190b53e930?w=120&q=80", // baby food
  f9: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=120&q=80", // chocolate
  k1: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=120&q=80", // can opener
  k2: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=120&q=80", // camp stove
  k3: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // matches
  k4: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=120&q=80", // mess kit
  k5: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=80", // grill
  k6: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // foil
  k7: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=120&q=80", // water bottle
  m1: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // first aid kit
  m2: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&q=80", // medications
  m3: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // pain relievers
  m4: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // antihistamines
  m5: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // antiseptic
  m6: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=120&q=80", // tourniquet
  m7: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=120&q=80", // cpr mask
  m8: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // thermometer
  m9: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // bp monitor
  m10: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // eye wash
  m11: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=120&q=80", // masks
  m12: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80", // gloves
  t1: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // flashlight
  t2: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=120&q=80", // radio
  t3: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // batteries
  t4: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&q=80", // multi-tool
  t5: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // duct tape
  t6: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // work gloves
  t7: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // whistle
  t8: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&q=80", // extinguisher
  t9: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&q=80", // paracord
  t10: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&q=80", // crowbar
  h1: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=80", // toilet paper
  h2: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=80", // hand sanitizer
  h3: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=80", // soap
  h4: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=80", // toothbrush
  h5: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=80", // feminine hygiene
  h6: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // garbage bags
  h7: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // portable toilet
  d1: "https://images.unsplash.com/photo-1568667256549-094345857637?w=120&q=80", // document bag
  d2: "https://images.unsplash.com/photo-1568667256549-094345857637?w=120&q=80", // documents
  d3: "https://images.unsplash.com/photo-1529259922363-e2c2ba9f0c1e?w=120&q=80", // cash
  d4: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=120&q=80", // usb drive
  c1: "https://images.unsplash.com/photo-1609592175335-bce18e7de0a9?w=120&q=80", // phone charger
  c2: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=120&q=80", // walkie talkie
  c3: "https://images.unsplash.com/photo-1568667256549-094345857637?w=120&q=80", // contact list
  c4: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // solar lantern
  s1: "https://images.unsplash.com/photo-1520350094754-f0fdcac35c1c?w=120&q=80", // mylar blanket
  s2: "https://images.unsplash.com/photo-1520350094754-f0fdcac35c1c?w=120&q=80", // sleeping bag
  s3: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // rain poncho
  s4: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // clothes
  s5: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80", // shoes
  s6: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=120&q=80", // tent
  g1: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=120&q=80", // backpack
  g2: "https://images.unsplash.com/photo-1568667256549-094345857637?w=120&q=80", // map
  g3: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // compass
  g4: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=120&q=80", // masks
  g5: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&q=80", // whistle
  g6: "https://images.unsplash.com/photo-1568667256549-094345857637?w=120&q=80", // id copies
};

// Detailed expanded info per item
const ITEM_EXPANDED = {
  w1: { youNeedQty: 9, youNeedUnit: "Gallons", basis: "3 people × 3 days\n@ 1 gal/person/day\n= 9 gallons", longDesc: "Clean water is the single most critical emergency resource. The human body can only survive 3–5 days without water, making it the top priority in any disaster preparedness plan. Municipal water supplies are frequently disrupted during emergencies — earthquakes can break pipes, floods contaminate treatment plants, and hurricanes knock out pumping stations. FEMA recommends a minimum 3-day supply, but a 2-week supply is strongly advised. Store water in food-grade, BPA-free containers away from sunlight and chemicals. Rotate your supply every 6 months. Beyond drinking, water is needed for cooking, hygiene, wound care, and sanitation — plan accordingly." },
  w2: { youNeedQty: 2, youNeedUnit: "Containers", basis: "1 large container\nper household\n= 2 containers", longDesc: "Large BPA-free water storage containers are the backbone of your home water supply. Stackable 5–7 gallon jugs are the most practical option — they're easy to move, won't tip over, and fit in standard storage spaces. Look for food-grade polyethylene with a secure cap and built-in spout. Dark-colored containers protect water from light-induced algae growth. Label each container with the fill date and rotate stock every 6 months. Store in a cool, dark location away from gasoline, pesticides, and cleaning agents, which can permeate through plastic over time." },
  w3: { youNeedQty: 3, youNeedUnit: "Packs", basis: "1 pack/person\nfor backup\n= 3 packs", longDesc: "Water purification tablets (iodine or chlorine-based) are a lightweight backup for when your stored water runs out or needs emergency treatment. Each pack typically treats 25 quarts of water. They're ideal for go-bags and evacuation scenarios where weight matters. Chlorine dioxide tablets are more effective against Cryptosporidium than iodine tablets and leave less aftertaste. Allow 30 minutes contact time before drinking. Tablets do not remove chemical contamination, heavy metals, or turbidity — always filter murky water first. Store in a cool, dry location; shelf life is typically 4 years when sealed." },
  w4: { youNeedQty: 1, youNeedUnit: "Filter", basis: "1 per household\nfor field use\n= 1 unit", longDesc: "Portable water filters like the LifeStraw and Sawyer Squeeze are among the most valuable emergency tools available. They remove 99.9999% of bacteria and 99.9% of protozoa from virtually any freshwater source — streams, puddles, or questionable tap water. The Sawyer Squeeze is especially versatile: it can be used inline with a hydration bladder, attached to a standard water bottle, or used as a gravity-fed system for group use. Unlike tablets, filters don't add chemical taste. Important limitation: most portable filters do NOT remove viruses — a concern primarily outside the US. For full protection internationally, combine filtration with chemical treatment." },
  w5: { youNeedQty: 2, youNeedUnit: "Jugs", basis: "1 per person\nfor evacuation\n= 2 jugs", longDesc: "Collapsible water jugs pack flat when empty, making them ideal for go-bags and evacuation kits where space is limited. When expanded, they typically hold 2–7 gallons. BPA-free food-grade options are available from brands like Reliance and WaterBOB. They're invaluable when your primary water containers are too bulky to take during an emergency evacuation, or when you arrive at a destination and need to carry water from a distant source. Look for models with a secure cap, wide mouth for easy filling, and a built-in handle. Not suitable for long-term storage as they don't seal as reliably as rigid containers." },
  f1: { youNeedQty: 27, youNeedUnit: "Cans", basis: "3 cans/person/day\n× 3 people × 3 days\n= 27 cans", longDesc: "Non-perishable canned goods form the foundation of any emergency food supply. They require no refrigeration, minimal preparation, and most have shelf lives of 2–5 years. Prioritize protein-rich options like tuna, chicken, and beans, as well as vegetables for vitamins and fruits for morale. Choose low-sodium options when possible to reduce water consumption. Rotate stock using a 'first in, first out' system — mark cans with the purchase date and use oldest first during your monthly cooking. A manual can opener is essential — keep one in the same location as your canned goods. Avoid cans with dents, swelling, rust, or damaged seals." },
  f2: { youNeedQty: 9, youNeedUnit: "Meals", basis: "3 meals/day\n× 3 people × 3 days\n= 27 meals min", longDesc: "Military-grade Meals Ready to Eat (MREs) are self-contained field rations designed to be eaten without cooking. Each MRE provides approximately 1,250 calories and contains an entrée, side dishes, crackers, spread, dessert, seasoning, and a flameless heater. They have a shelf life of 5+ years when stored below 60°F. While more expensive than canned goods, MREs offer convenience during chaotic emergencies when cooking is impossible. They're ideal for go-bags, evacuation scenarios, and the first 72 hours of any disaster. Pair MREs with regular canned goods for extended supplies. Civilian MRE brands like Sopakco and Meal Kit Supply are widely available." },
  f3: { youNeedQty: 2, youNeedUnit: "Boxes", basis: "2 bars/person/day\n× household size\n= 2 boxes min", longDesc: "Energy and protein bars are the ultimate emergency food — compact, calorie-dense, and requiring zero preparation. The best emergency bars provide 2,000–3,600 calories per package (enough for one full day) and are specifically formulated to withstand temperature extremes. Look for bars with a 5-year shelf life, like S.O.S. Food Labs Emergency Ration Bars or Datrex bars. For shorter-term storage, popular brands like Clif, Kind, and RXBar are excellent choices. Keep bars in your go-bag, car kit, and office emergency kit. High fat and carbohydrate content provides sustained energy during physical exertion common in disaster scenarios." },
  f4: { youNeedQty: 6, youNeedUnit: "lbs", basis: "2 lbs/person\n× 3 people\n= 6 lbs", longDesc: "Dried fruits and nuts are nature's perfect emergency food — nutrient-dense, shelf-stable, and requiring zero preparation. Mixed nuts provide protein, healthy fats, and calories to sustain energy during physically demanding emergency situations. Dried fruits add carbohydrates, natural sugars for quick energy, and important vitamins. Trail mix combining both offers a complete snack that won't cause energy spikes and crashes. Store in sealed, airtight containers away from heat and light. Shelf life is typically 6–12 months for store-bought versions, though properly stored vacuum-sealed nuts can last up to 2 years. Avoid mixes with chocolate chips in warm climates — they melt and make the mix clump." },
  f5: { youNeedQty: 15, youNeedUnit: "lbs", basis: "5 lbs/person\n× 3 people\n= 15 lbs", longDesc: "Dry staples like rice, oats, and pasta are the most calorie-efficient emergency foods available. White rice provides approximately 350 calories per cup and stores virtually indefinitely when properly sealed in Mylar bags with oxygen absorbers. Oats offer fiber and sustained energy, making them ideal for breakfast. Pasta cooks quickly and requires minimal fuel. For maximum shelf life (5–10+ years), store in food-grade 5-gallon buckets lined with Mylar bags and oxygen absorbers. Label all containers with the pack date. These foods require water for preparation — account for this when calculating your water storage needs. Consider including a variety of spices and seasonings to improve palatability during extended emergencies." },
  f6: { youNeedQty: 6, youNeedUnit: "Jars", basis: "2 jars/person\n× 3 people\n= 6 jars", longDesc: "Peanut butter is one of the most valuable emergency foods — calorie-dense (190 calories per 2-tablespoon serving), high in protein and healthy fats, shelf-stable without refrigeration, and universally palatable. A single 16-oz jar provides approximately 7 days of protein snacks. Choose natural or regular peanut butter over reduced-fat versions, as the fat content is what makes it calorie-dense and filling. Sealed jars last 1–2 years; opened jars last 2–3 months at room temperature. Peanut butter can be eaten directly, spread on crackers, mixed with oats, or used as a protein addition to meals. For those with nut allergies, sunflower seed butter is an excellent substitute with similar nutritional properties." },
  f7: { youNeedQty: 1, youNeedUnit: "Supply set", basis: "Essential seasonings\nfor 3-person household", longDesc: "Salt, sugar, and honey are essential emergency pantry staples with near-unlimited shelf lives. Salt is critical for food preservation — it prevents bacterial growth in meats and vegetables during extended grid-down scenarios and maintains electrolyte balance during strenuous physical activity. Granulated sugar stored in airtight containers lasts indefinitely and provides quick caloric energy. Raw honey is particularly remarkable: it never expires (archaeologists have found 3,000-year-old honey still edible), has natural antimicrobial properties useful for wound care, and serves as a natural sweetener and energy source. Store all three in airtight containers away from moisture. These items also serve as excellent barter commodities in extended emergency scenarios." },
  f8: { youNeedQty: 1, youNeedUnit: "Monthly supply", basis: "As needed\nfor infants in household", longDesc: "If your household includes infants, maintaining a dedicated emergency supply of formula is absolutely critical — breast milk supply can be disrupted by maternal stress, dehydration, or illness, making formula a vital backup. FEMA recommends a minimum 2-week supply. Store in the original sealed container in a cool, dry location. Track expiration dates carefully and rotate stock regularly. Powdered formula has the longest shelf life and is most practical for storage. If your baby requires a specific specialty formula (hypoallergenic, soy-based, or for medical conditions), stockpile that specific type — substituting formulas can cause digestive issues. Include sterilizing tablets if you lose access to clean water for washing bottles." },
  f9: { youNeedQty: 1, youNeedUnit: "Assorted box", basis: "Morale items\nfor household comfort", longDesc: "Comfort foods are often overlooked in emergency planning but have significant psychological value during disaster scenarios. Research consistently shows that familiar foods reduce stress, improve morale, and help maintain psychological resilience during prolonged emergencies. Include coffee or tea for adults who depend on caffeine — withdrawal headaches are miserable during an already stressful situation. Chocolate provides both comfort and quick energy. Hard candy, gum, and familiar snack foods help normalize an abnormal situation, especially for children. Choose items with reasonable shelf lives and that don't require refrigeration. The goal is to have a few 'treats' that make difficult circumstances more manageable. Rotate stock seasonally and tailor selections to your household's preferences." },
  k1: { youNeedQty: 2, youNeedUnit: "Openers", basis: "1 primary + 1 backup\nper household", longDesc: "A manual can opener is one of the most overlooked yet critical emergency tools. Electric can openers become useless the moment power fails, which is precisely when you need your canned food supplies. Military-style P-38 and P-51 can openers are incredibly compact and durable — soldiers have relied on them for decades. For home kits, a quality manual swing-arm opener like the OXO Good Grips provides easier operation with a cushioned handle. Store one with your food supplies and one in your go-bag. Consider keeping a third in your car emergency kit. Test your opener regularly and replace if it shows signs of rust, dull cutting wheel, or difficulty operating. A good manual opener can last 20+ years with basic care." },
  k2: { youNeedQty: 1, youNeedUnit: "Set", basis: "1 stove + 3 fuel\ncanisters per household", longDesc: "A portable camp stove is essential for cooking when your kitchen stove is unavailable — after earthquakes (gas lines shut off), during power outages, or when evacuated. The MSR PocketRocket and Coleman Classic are top-rated for reliability and fuel efficiency. Canister stoves using isobutane-propane mix light reliably in most conditions. White gas stoves perform better in cold weather. Always use camp stoves outdoors or in well-ventilated spaces — carbon monoxide from combustion is deadly indoors. Store fuel canisters in a cool, dry location away from heat sources. A single 8-oz canister boils approximately 12 liters of water. Practice setting up and using your stove before an emergency. Include a windscreen for efficiency in outdoor conditions." },
  k3: { youNeedQty: 3, youNeedUnit: "Sets", basis: "1 set/person\n+ 1 spare = 3 sets", longDesc: "Redundant fire-starting capability is critical in emergency scenarios. Waterproof matches are specially treated or packaged to light even when wet — UCO Stormproof Matches will light in wind and rain and burn for 15 seconds. Keep them in a sealed waterproof case. Lighters are more convenient but can fail in cold temperatures or high winds — Zippo lighters are windproof but require lighter fluid. BIC disposable lighters are reliable and inexpensive — store several in different kits. Ferrocerium fire starters (firestarters/sparkers) never run out and work in any weather — include one as a tertiary backup. Store all fire-starting tools in separate locations so no single failure leaves you without options." },
  k4: { youNeedQty: 3, youNeedUnit: "Sets", basis: "1 set per person\n× 3 people = 3 sets", longDesc: "A dedicated mess kit ensures you can prepare and eat food during an emergency without improvising with regular kitchenware that may be too bulky to transport. Collapsible silicone sets are ideal — they fold flat for easy storage and are lightweight for go-bags. A complete kit should include a pot for boiling water and cooking, a lid that doubles as a pan, a bowl, a mug, and utensils (fork, spoon, knife). Titanium kits are premium (lightweight and durable) while aluminum sets are affordable and practical. Avoid plastic utensils — they melt on camp stoves. Include a compact cutting board and a small spatula. Clean kits thoroughly between uses to prevent bacterial contamination during storage." },
  k5: { youNeedQty: 1, youNeedUnit: "Grill", basis: "1 per household\nfor extended outages", longDesc: "A portable BBQ grill serves as an important backup cooking system for extended power outages or grid-down scenarios when camp stove fuel runs out. Charcoal grills provide the most fuel-efficient cooking for large households — a 20 lb bag of charcoal provides many hours of cooking. Propane grills offer more convenience and precise temperature control. Weber's compact Smokey Joe is a popular emergency choice for its durability and cooking surface area. Always use grills outdoors only — never in garages, tents, or enclosed spaces. Carbon monoxide from charcoal grills kills dozens of people annually in emergency situations. Store with a full propane tank or a sealed supply of charcoal in a dry location." },
  k6: { youNeedQty: 2, youNeedUnit: "Rolls", basis: "1 roll per cooking kit\n+ 1 spare = 2 rolls", longDesc: "Heavy-duty aluminum foil is one of the most versatile emergency items available. For cooking, it can be used to wrap and cook food directly over open flame or coals without any other cookware. Multiple layers create makeshift cooking vessels and baking dishes. Foil can be used as an emergency signaling mirror to attract rescuers — the reflective surface is visible for miles in sunlight. It can patch small holes in tents, rain tarps, and improvised shelters. Foil wraps around feet inside shoes for additional insulation in cold conditions. It can be shaped into cups and bowls for eating and drinking. Heavy-duty (18-micron) foil is significantly more durable than standard household foil — opt for commercial or heavy-duty grades for emergency kits." },
  k7: { youNeedQty: 3, youNeedUnit: "Bottles", basis: "1 bottle per person\n× 3 people = 3 bottles", longDesc: "Quality reusable water bottles are essential for both storage and transportation during emergencies. Insulated stainless steel bottles (like Hydro Flask or YETI) keep water cold for 24 hours and hot for 12 hours — critical for comfort in extreme conditions and for keeping purified water cold to slow bacterial growth. BPA-free plastic bottles (Nalgene) are lightweight for go-bags. Never use single-use plastic water bottles for long-term storage — they're not designed for repeated use or chemical resistance. Wide-mouth bottles are easier to fill from natural sources and to clean. Include a built-in filter straw (Brita Sport or LifeStraw) in at least one bottle for added water treatment redundancy during evacuation." },
  m1: { youNeedQty: 2, youNeedUnit: "Kits", basis: "1 home kit + 1 go-bag\nper household", longDesc: "A comprehensive first aid kit is the cornerstone of medical preparedness. ANSI A+ rated kits include bandages in multiple sizes, sterile gauze pads, medical tape, antiseptic wipes, antibiotic ointment, CPR face shield, nitrile gloves, scissors, tweezers, and a first aid guide. For a family of three, an 85+ piece kit is the minimum. Beyond the kit, consider adding a SAM splint for fracture immobilization, a triangular bandage for slings, QuikClot hemostatic gauze for severe bleeding, and a blood pressure cuff. Most importantly, know how to use everything in your kit — take a Red Cross First Aid/CPR course. Check your kit semi-annually, replace used and expired items, and ensure all household members know its location." },
  m2: { youNeedQty: 30, youNeedUnit: "Day supply", basis: "30-day supply\nper prescription medication", longDesc: "Prescription medication management is one of the most overlooked aspects of emergency preparedness. During disasters, pharmacies close, supply chains break, and refills become impossible. Work with your doctor to maintain a 30-day emergency supply by requesting an extra prescription, using mail-order pharmacies that provide 90-day supplies, or asking your doctor about emergency prescriptions. Keep medications in their original labeled containers and store in a waterproof, temperature-controlled environment — many medications degrade rapidly when exposed to heat or moisture. Maintain a printed medication list including drug name, dosage, prescribing physician, and pharmacy contact. For critical medications (insulin, EpiPens, nitroglycerin), have a plan for temperature management during extended power outages." },
  m3: { youNeedQty: 2, youNeedUnit: "Bottles", basis: "1 ibuprofen +\n1 acetaminophen = 2", longDesc: "Maintaining a dual over-the-counter pain reliever supply is an important medical preparedness strategy. Ibuprofen (Advil, Motrin) is an NSAID that reduces inflammation, making it superior for muscle strains, sprains, arthritis flares, dental pain, and headaches with an inflammatory component. However, it can irritate the stomach and is contraindicated in certain kidney conditions and pregnancy. Acetaminophen (Tylenol) is gentler on the stomach and safer for pregnant women and those with kidney issues, but carries liver toxicity risk at high doses. The two medications work through different mechanisms and can be alternated every 3 hours for around-the-clock pain control. Store with your first aid kit, in the original labeled bottles, away from heat and humidity." },
  m4: { youNeedQty: 2, youNeedUnit: "Packs", basis: "1 per household kit\n+ 1 for go-bag = 2", longDesc: "Diphenhydramine (Benadryl) is a first-generation antihistamine essential for any emergency medical kit. It treats allergic reactions to insect stings and bites, plant contact (poison oak/ivy), food reactions, and environmental allergens — all of which are common in disaster scenarios where people are exposed to unfamiliar outdoor environments. For severe anaphylaxis, antihistamines are secondary to epinephrine (EpiPen) — if someone in your household has known severe allergies, an EpiPen prescription is essential. Benadryl also has a mild sedative effect, which can be beneficial during the severe stress and sleep disruption that accompanies major disasters. Loratadine (Claritin) is a non-drowsy alternative appropriate for daytime use." },
  m5: { youNeedQty: 2, youNeedUnit: "Sets", basis: "1 home + 1 go-bag\n= 2 sets", longDesc: "Antiseptic wipes and topical antibiotic ointment are essential for wound infection prevention. Alcohol wipes (70% isopropyl alcohol) disinfect skin before injections and clean surfaces, but cause tissue damage if used directly inside wounds. Benzalkonium chloride wipes are gentler and appropriate for wound cleansing. Neosporin (neomycin/polymyxin B/bacitracin) prevents bacterial infection in minor cuts, abrasions, and burns and keeps wounds moist to promote faster healing. Bacitracin alone is preferred for those with neomycin allergies. Apply a thin layer after cleaning the wound and cover with a sterile bandage. Change dressings daily or when wet. During disasters, the risk of infection is elevated due to contaminated environments and limited medical care access." },
  m6: { youNeedQty: 2, youNeedUnit: "Tourniquets", basis: "1 per go-bag\n+ 1 home kit = 2", longDesc: "A Combat Application Tourniquet (CAT) is the most important addition to a basic first aid kit for life-threatening emergencies. Uncontrolled extremity bleeding is one of the leading preventable causes of trauma death. Applied correctly, a CAT can stop arterial bleeding from a limb wound in under 60 seconds. The SOFTT-W is an excellent alternative with a wider band that's gentler on tissue. Military and civilian trauma guidelines now recommend tourniquets as the first line of treatment for severe limb bleeding. Apply 2–3 inches above the wound, tighten until bleeding stops, and note the application time — medical personnel will need this information. Take a Stop the Bleed course to practice proper application technique before you need it." },
  m7: { youNeedQty: 2, youNeedUnit: "Masks", basis: "1 per household\n+ 1 go-bag spare = 2", longDesc: "A CPR face shield or pocket mask is essential for anyone trained in CPR, providing a protective barrier between rescuer and victim during rescue breathing. Without protection, many rescuers hesitate or refuse to perform CPR — reducing survival rates significantly. The compact keychain-style face shields (Laerdal Pocket Mask) weigh less than an ounce and fit on a keyring. More complete pocket masks include a one-way valve to prevent disease transmission and allow more effective ventilation. Current CPR guidelines emphasize that hands-only CPR (compressions without breaths) is effective for the first few minutes — a face shield extends the quality of CPR if you're willing to provide rescue breaths. Pair your CPR mask with formal CPR training from the American Red Cross or American Heart Association." },
  m8: { youNeedQty: 1, youNeedUnit: "Thermometer", basis: "1 per household\nmedical kit", longDesc: "A digital thermometer provides critical health monitoring capability during emergencies when professional medical care may be unavailable. Fever above 103°F in adults signals serious illness requiring aggressive treatment. For children under 3, a rectal thermometer provides the most accurate reading; for older children and adults, temporal (forehead) or axillary (armpit) thermometers are convenient. Tympanic (ear) thermometers are fast but can give inaccurate readings if positioned incorrectly. Forehead thermometers using temporal artery scanning are accurate and hygienic. Store with the included protective case to prevent damage. Replace batteries annually. During multi-victim scenarios (disease outbreaks), being able to monitor fever trends over time helps prioritize care and identify deteriorating conditions early." },
  m9: { youNeedQty: 1, youNeedUnit: "Monitor", basis: "1 per household\nif applicable", longDesc: "For households with members managing hypertension, heart disease, or other cardiovascular conditions, a portable blood pressure monitor is a critical piece of emergency medical equipment. During disasters, stress levels skyrocket — which can trigger hypertensive crises and cardiac events in vulnerable individuals. When medication supplies become interrupted, monitoring blood pressure helps assess health status and guides decision-making. Omron and Withings make reliable, battery-powered automatic upper-arm monitors that deliver clinical-grade accuracy. Store with fresh AA batteries and include spare batteries in your kit. Take baseline readings during normal conditions so you have reference values during emergencies. Include a printed medication protocol from your cardiologist covering what to do if blood pressure reaches dangerous levels without access to medical care." },
  m10: { youNeedQty: 2, youNeedUnit: "Bottles", basis: "1 home kit +\n1 go-bag = 2", longDesc: "Eye wash solution is essential for treating chemical splashes, debris contamination, and smoke irritation — all common in disaster scenarios. During wildfires, volcanic ash, chemical spills, and structural collapse create significant eye hazard risks. A sterile saline eye wash bottle allows immediate flushing of the eye without requiring a sink or running water. The standard first aid treatment for most eye exposures is 15–20 minutes of continuous flushing. Squeeze bottles make this easier to execute properly. Avoid rubbing the eyes when a foreign substance is present — rubbing embeds particles deeper. For serious chemical exposures (acids, bases, industrial chemicals), flushing is only the first step — seek emergency medical care as quickly as possible after initial decontamination." },
  m11: { youNeedQty: 30, youNeedUnit: "Masks", basis: "10 masks/person\n× 3 people = 30", longDesc: "NIOSH-approved N95 respirators filter at least 95% of airborne particulates, providing effective protection against wildfire smoke, volcanic ash, biohazard exposure, and pandemic respiratory threats. 3M and Honeywell are the most trusted NIOSH-certified brands. KN95 masks (Chinese standard equivalent) provide similar protection when sourced from reputable manufacturers. For emergency kits, N95s are preferred over cloth masks or surgical masks, which offer significantly less filtration efficiency. Proper fit is critical — a mask that doesn't seal to the face provides minimal protection. Conduct a seal check by placing both hands over the mask and exhaling sharply — you should feel no air leaking around the edges. Single-use N95s should be discarded after extended use, contamination, or damage. Store in a sealed plastic bag to maintain integrity." },
  m12: { youNeedQty: 2, youNeedUnit: "Boxes", basis: "1 box/household\n+ 1 go-bag box = 2", longDesc: "Nitrile gloves are essential personal protective equipment for emergency first aid, sanitation work, and hazardous material handling. Unlike latex gloves, nitrile is latex-free (eliminating allergy risk), puncture-resistant, and chemical-resistant — superior for handling contaminated water, sewage, biohazardous materials, and industrial chemicals common in disaster environments. Powder-free nitrile gloves reduce the risk of latex allergy sensitization and are preferred for medical procedures. Use a fresh pair for each patient contact and whenever switching tasks to prevent cross-contamination. For go-bags, include at least 10 pairs per person. Double-gloving provides additional protection when handling unknown hazardous materials. Dispose of contaminated gloves properly — don't touch your face while gloved." },
  t1: { youNeedQty: 3, youNeedUnit: "Flashlights", basis: "1 per room\n(bedroom + living)\n+ 1 spare = 3", longDesc: "LED flashlights are an absolute emergency essential — when power goes out, they're immediately critical. Modern LED technology provides dramatic improvements over older incandescent bulbs: LED flashlights last 50,000+ hours (compared to 1,000 for incandescent) and provide significantly better battery life. Petzl, Fenix, and Maglite are trusted brands. Headlamps are particularly valuable because they free both hands — critical for repairs, search operations, and childcare in the dark. Keep a flashlight in every bedroom (under the bed for earthquake scenarios), in your kitchen, and in your go-bag. Dedicate one high-powered flashlight (1,000+ lumens) for outdoor use and signaling. Store batteries separately and insert them before an emergency — stored batteries can leak inside flashlights and damage the contacts." },
  t2: { youNeedQty: 1, youNeedUnit: "Radio", basis: "1 per household\nfor emergency alerts", longDesc: "A NOAA weather radio is your lifeline to official emergency information when cellular networks and internet fail. NOAA Weather Radio All Hazards broadcasts 24/7 on 7 dedicated frequencies, providing severe weather warnings, natural disaster information, environmental hazards, national security alerts, and evacuation orders. Look for radios with the SAME (Specific Area Message Encoding) alert system, which allows you to program your county code and receive only local alerts — reducing false alarms. Hand-crank plus solar models from Midland, Kaito, and Sangean also charge phones via USB, making them triply valuable. AM/FM reception provides access to local emergency broadcasts. Test your radio monthly and replace batteries annually. Many models include a built-in LED flashlight and SOS signal capability." },
  t3: { youNeedQty: 4, youNeedUnit: "Packs", basis: "1 pack per\nmajor device type\n= 4 packs", longDesc: "Battery stockpiles are frequently underestimated in emergency planning — yet virtually every critical emergency device depends on them. Alkaline batteries maintain 80% capacity for up to 10 years when stored at room temperature in original packaging. Lithium batteries (Energizer Ultimate) offer even longer shelf life (20 years) and superior performance in cold temperatures — ideal for outdoor or vehicle kits. Store batteries in their original packaging, not loose in a drawer where they can short-circuit against metal objects. Include AA, AAA, C, D, and 9V sizes to cover your specific device inventory — audit your emergency devices and stock accordingly. Rechargeable NiMH batteries are economical for frequently used devices, but keep non-rechargeable alkalines as backup for when charging isn't possible." },
  t4: { youNeedQty: 1, youNeedUnit: "Multi-tool", basis: "1 per household\n+ 1 go-bag = 2 ideal", longDesc: "A quality multi-tool is among the most versatile emergency tools available, providing dozens of capabilities in a single compact package. The Leatherman Wave+ is the gold standard — it includes needle-nose and regular pliers, wire cutters, wire strippers, a knife blade, a serrated knife, a saw, a scissors, multiple screwdrivers (flathead and Phillips), a can opener, a file, and more. The 25-year warranty reflects its exceptional durability. In emergencies, multi-tools can cut seatbelts from trapped occupants, strip wire for emergency electrical repairs, tighten loose bolts on structural elements, open food containers, trim bandages, and countless other tasks. For your go-bag, a lighter Leatherman Skeletool or Swiss Army Climber reduces weight while still providing essential tools. Learn to use your multi-tool before you need it." },
  t5: { youNeedQty: 3, youNeedUnit: "Rolls", basis: "1 roll per kit\n(home, go-bag, car)\n= 3 rolls", longDesc: "Duct tape is the most versatile repair and improvisation tool in your emergency kit, with hundreds of practical applications in disaster scenarios. It seals broken windows to prevent water intrusion during storms. It patches holes in tarps, tents, and emergency shelters. It secures splints for fracture management and wraps around paracord to create improvised handles. Duct tape repairs damaged water containers temporarily. It marks evacuation routes on walls and floors during search operations. Gorilla Tape offers superior adhesion and waterproofing compared to standard duct tape — worth the premium for emergency kits. In extreme cold or very wet conditions, warm the tape between your hands before applying to ensure adhesion. Store rolls in a climate-controlled environment — extreme heat can cause the adhesive to dry out over time." },
  t6: { youNeedQty: 3, youNeedUnit: "Pairs", basis: "1 pair per adult\n= 3 pairs", longDesc: "Cut-resistant leather work gloves are essential protection during the debris removal and manual labor that follows disasters. Post-earthquake rubble is filled with broken glass, exposed rebar, sharp metal, and splintered wood — bare hands are extremely vulnerable. After wildfires, handling burned structural materials exposes hands to toxic ash and sharp debris. Quality options include leather palm gloves (Wells Lamont), cut-resistant mechanic gloves (Mechanix Wear), and heat-resistant welding gloves for fire scenarios. Choose gloves with reinforced palms, finger articulation for dexterity, and wrist coverage. Keep one pair per adult in your home kit and include a lightweight pair in your go-bag. Gloves also protect against chemical exposure during post-flood cleanup where contaminated water is present." },
  t7: { youNeedQty: 3, youNeedUnit: "Whistles", basis: "1 per person\n× 3 people = 3", longDesc: "A pealess safety whistle is one of the most powerful rescue signaling tools available, producing sounds audible over 1 mile away with minimal effort. Unlike traditional pea whistles, pealess models work reliably in freezing temperatures where the pea (a small ball inside traditional whistles) can freeze and render the whistle useless. Fox 40 is the industry standard — a single blast from a Fox 40 Classic produces 115 decibels. The international distress signal is three short blasts, repeated at intervals. Attach a whistle to every go-bag exterior, life jacket, and hiking pack using a carabiner. For children, consider high-visibility colored whistles with a breakaway safety neck cord. In collapse scenarios where you're trapped and weakened, a whistle conserves energy while attracting rescuers far more effectively than shouting." },
  t8: { youNeedQty: 2, youNeedUnit: "Extinguishers", basis: "1 kitchen +\n1 garage = 2 units", longDesc: "ABC-rated fire extinguishers combat three of the four primary fire classes: Class A (wood, paper, cloth), Class B (flammable liquids), and Class C (electrical fires) — the three types most common in residential emergencies. For kitchens specifically, a Class K extinguisher is recommended for cooking oil fires, though ABC models provide adequate basic coverage. Kidde and First Alert are the most reliable consumer brands. A 2.5-lb portable model is appropriate for go-bags and vehicles; 5-lb models provide better coverage for home use. Mount in accessible locations — kitchen (away from the stove, so heat doesn't block access) and garage. Check pressure gauges monthly. Professional recharging and inspection is required annually. Most residential extinguishers have a 12-year service life. Learn the PASS technique: Pull, Aim, Squeeze, Sweep." },
  t9: { youNeedQty: 200, youNeedUnit: "feet", basis: "100 ft home kit +\n100 ft go-bag = 200 ft", longDesc: "550 paracord (parachute cord) is named for its original use in parachute suspension lines and its 550-lb tensile strength. Modern survival paracord contains 7 inner nylon strands that can be extracted for finer tasks. Emergency applications are extensive: guy lines for emergency shelter construction, clothesline for drying wet clothing, splint securing in fracture care, gear lashing and repair, fishing line (inner strand), emergency tourniquet (temporary), boot laces replacement, and bow drill fire-starting (outer sheath). Atwood Rope and Rothco produce military-specification type III paracord. Real 550-cord feels waxy-smooth and holds its shape when tied. Avoid cheap imitations that can't sustain load. Pre-practice common knots — bowline, clove hitch, sheet bend, and figure-eight — before you need them in an emergency." },
  t10: { youNeedQty: 1, youNeedUnit: "Crowbar", basis: "1 per household\nfor structural access", longDesc: "A steel crowbar or wrecking bar is essential after earthquakes, building collapses, and severe structural damage where standard doors, windows, and access points may be jammed or blocked. The leverage advantage of a crowbar allows a single person to exert thousands of pounds of force — enough to open jammed fire doors, remove debris blocking escape routes, pry collapsed sections apart to create rescue access, and force open swollen wood-framed doors after flooding. Stanley and Estwing produce high-quality forged steel models. A 24-inch crowbar balances portability with leverage. The flat end is useful for prying, while the curved end provides leverage for heavier materials. In post-earthquake scenarios specifically, a crowbar may mean the difference between being trapped and self-rescue. Store in an accessible location, not buried under other supplies." },
  h1: { youNeedQty: 1, youNeedUnit: "Case (48 rolls)", basis: "2-week supply\nfor 3 people\n= 1 full case", longDesc: "Toilet paper became a symbol of pandemic preparedness in 2020 for good reason — when supply chains disrupted and stores ran out, households without reserves faced immediate hardship. During any extended emergency, hygiene becomes critical for preventing secondary illness. A minimum 2-week supply per household is recommended, though a month's supply provides much greater comfort during extended emergencies. Store in a dry, climate-controlled environment — moisture is the primary enemy of paper products. Compressed camping toilet paper is extremely space-efficient for go-bags. Baby wipes provide a water-free hygiene option when toilet facilities are unavailable. If plumbing fails, wipes can also be used for personal hygiene, wound cleaning around (not inside) wounds, and surface sanitizing. Include a supply in both your home kit and go-bag." },
  h2: { youNeedQty: 6, youNeedUnit: "Bottles", basis: "2 bottles/location\n× 3 locations = 6", longDesc: "Hand sanitizer with at least 60% alcohol content is an essential hygiene tool during emergencies when clean running water is unavailable for handwashing. The CDC confirms that 60–95% alcohol concentration effectively kills most pathogens, including norovirus, influenza, and most bacteria. Place bottles in every kit location: home first aid kit, go-bag, car emergency kit, workplace kit. Foam sanitizer spreads more easily than gel, making it easier to cover all hand surfaces completely. During extended emergencies without plumbing, using hand sanitizer before food preparation and after sanitation activities dramatically reduces illness transmission within your household. Note that hand sanitizer is not effective against Clostridioides difficile (C. diff) or cryptosporidium — soap and water is necessary for these pathogens when available." },
  h3: { youNeedQty: 6, youNeedUnit: "Bars", basis: "2 bars/person\n× 3 people = 6 bars", longDesc: "Bar soap is superior to liquid soap for emergency preparedness in several ways: longer shelf life, no pump mechanism to fail, less packaging volume per cleaning, and better performance in cold water. Antibacterial bar soap (Dial, Safeguard) adds protection against bacteria during emergency sanitation when water quality is uncertain. Store-bought bar soap has an indefinite shelf life when kept dry — a bar that's dried out is still fully effective. Castile soap (Dr. Bronner's) is versatile enough to clean dishes, laundry, and personal hygiene with a single product — ideal for minimizing supplies. Include soap in your go-bag in a sealed zip-lock bag to prevent it from becoming a messy slick when wet. During extended water outages, using minimal water with a soap bar is more effective than hand sanitizer alone for removing dirt and physically washing away pathogens." },
  h4: { youNeedQty: 3, youNeedUnit: "Sets", basis: "1 set per person\n× 3 people = 3", longDesc: "Maintaining oral hygiene during emergencies is more important than many people realize. Dental infections can become life-threatening without access to antibiotics or dental care — bacteria from untreated dental decay can spread to the jaw, neck, and bloodstream. Toothbrush, toothpaste, and dental floss should be included in every emergency kit. Compact travel-size toothbrushes and toothpaste save space in go-bags. Dental floss has emergency utility beyond oral hygiene: it can suture wounds (in extreme scenarios), serve as fishing line, secure gear, and repair straps. Waterless toothbrushing using a small amount of water and spitting (not rinsing extensively) conserves water during outages. Portable dental kits including temporary filling material and dental cement allow management of minor dental emergencies until professional care is available." },
  h5: { youNeedQty: 1, youNeedUnit: "Monthly supply", basis: "1-month supply\nper applicable person", longDesc: "Feminine hygiene products are a critical and often overlooked emergency supply for applicable household members. During Hurricane Katrina and other major disasters, access to feminine hygiene products was identified as a significant health and dignity issue in shelters. Maintain a minimum 1-month supply in your home kit and include a supply in your go-bag. Consider a menstrual cup as a reusable alternative — a single cup lasts years and eliminates the need to stockpile disposables. Individually wrapped products maintain their integrity in go-bags better than bulk packaging. Beyond their primary use, pads and tampons have emergency medical applications: pads can be used as wound dressings for large wounds, and tampons can pack deep puncture wounds temporarily (this is field-expedient and not ideal — proper wound packing gauze is preferable)." },
  h6: { youNeedQty: 2, youNeedUnit: "Boxes", basis: "1 box home kit +\n1 box go-bag = 2 boxes", longDesc: "Heavy-duty garbage bags have extraordinary utility in emergency scenarios far beyond their primary purpose. 55-gallon contractor bags (6-mil thickness) serve as emergency rain ponchos — cut holes for arms and head. They create improvised shelters when draped over structures. They waterproof sensitive equipment like electronics and documents when double-bagged. They serve as emergency toilet waste containers when used with a portable toilet setup. They collect and contain debris during cleanup. They protect sleeping bags from ground moisture. Contractor-grade bags withstand the kind of abuse emergency scenarios impose. Include at least a box of large (30+ gallon) heavy-duty bags in your home kit and 5–10 bags folded in your go-bag. Smaller garbage bags are useful for waste management in shelter-in-place scenarios when trash collection is suspended for extended periods." },
  h7: { youNeedQty: 1, youNeedUnit: "Unit", basis: "1 per household\nfor plumbing failure", longDesc: "A portable sanitation system becomes critical when plumbing is unavailable — a situation that occurs during earthquakes (broken sewer lines), floods (contamination), or prolonged power outages (no pump pressure). The simplest system is a 5-gallon bucket with a tight-fitting lid and pool noodle seat. Line with heavy-duty garbage bags for waste containment. Commercial portable toilet seat attachments (Luggable Loo) fit standard 5-gallon buckets and provide a more stable, comfortable seat. Waste management bags with gelling powder and biocide treatment are available specifically for portable toilets. Separate liquid and solid waste to extend bag capacity. A small amount of cat litter, sawdust, or waste treatment powder between uses controls odor. Properly disposed waste should be bagged, sealed, and deposited in a waste collection site — never buried near water sources." },
  d1: { youNeedQty: 2, youNeedUnit: "Bags", basis: "1 home safe +\n1 go-bag = 2 bags", longDesc: "A waterproof document bag or pouch protects your most critical papers from water, fire, and physical damage during emergencies. After a disaster, access to identification documents, insurance policies, and financial records is critical for accessing emergency assistance, filing insurance claims, proving home ownership, and crossing checkpoints. Pelican and OverBoard make highly rated waterproof cases with airtight seals. A clear pouch allows documents to be read without removing them. Standard documents to include: passports, driver's licenses, Social Security cards, birth certificates, marriage certificate, property deed or mortgage documents, vehicle titles, insurance policies (home, auto, health, life), bank account information, recent tax returns, and medical records. Store originals in a fireproof home safe and copies in your go-bag waterproof pouch." },
  d2: { youNeedQty: 1, youNeedUnit: "Complete set", basis: "1 digital + 1 physical\nset per household", longDesc: "Maintaining current copies of all critical documents is fundamental to emergency preparedness and disaster recovery. After major disasters, people who can quickly produce identification and insurance documentation receive assistance and services far faster than those who cannot. Scan all critical documents at 300 DPI minimum and store in encrypted cloud storage (Google Drive, iCloud, or Dropbox with two-factor authentication) AND on an encrypted USB drive stored with your go-bag. Update your document copies whenever documents are renewed or renewed. Critical documents to copy: passports, driver's licenses, Social Security cards, birth certificates, military discharge papers, marriage and divorce certificates, property deed, mortgage documents, vehicle titles, insurance declarations pages (home, auto, health, life), bank statements, recent tax returns, medical records, vaccination records, and medication lists with dosages." },
  d3: { youNeedQty: 1, youNeedUnit: "Cash reserve", basis: "$300 small bills\nper household minimum", longDesc: "Cash remains king during emergencies. When power fails, card readers stop working. When cellular networks are overwhelmed, digital payment apps fail. When banks are closed or evacuated, ATMs may be empty or offline for days. A minimum $300 cash reserve in small bills ($1, $5, $10, $20 denominations) should be maintained in a waterproof envelope in your home emergency kit. Don't rely on ATM access in the days immediately following a disaster — local banks may be closed or ATMs depleted within hours of an emergency announcement. Consider keeping $50–$100 in small bills in your go-bag and vehicle emergency kit as well. Store cash in a fireproof, waterproof container at home. Inform a trusted family member of its location. Replenish immediately after any use so you're never caught with an empty emergency fund." },
  d4: { youNeedQty: 2, youNeedUnit: "Drives", basis: "1 home +\n1 offsite backup = 2", longDesc: "An encrypted USB drive containing digital copies of all critical documents is a compact, waterproof backup that can be carried anywhere. Use VeraCrypt (free, open-source) or BitLocker (Windows built-in) to encrypt the drive with a strong password — this protects sensitive financial and identification information if the drive is lost. Quality USB drives from SanDisk, Samsung, and Kingston are reliable and affordable. 32GB is sufficient for all document scans plus photos, medical records, and household inventory images. Keep one drive with your go-bag and store a second at a trusted offsite location (parent's home, bank safety deposit box). Update both drives whenever you update your physical document copies — set a calendar reminder every 6 months. Include a printed quick-start card inside your document bag reminding you of the encryption password hint." },
  c1: { youNeedQty: 2, youNeedUnit: "Banks", basis: "1 per adult\n+ 1 spare = 2+ units", longDesc: "A high-capacity solar power bank is among the most critical items in a modern emergency kit. Smartphones are now our primary emergency communication, navigation, and information tool — keeping them charged during extended outages is essential. A 20,000mAh battery bank can charge a modern smartphone 4–6 times. Solar recharging capability provides renewable power — a panel capable of 5+ watts will meaningfully recharge the bank in 4–8 hours of direct sunlight. Anker, RAVPower, and Goal Zero make top-rated options. Include both USB-A and USB-C ports to accommodate all current devices. Keep your power bank topped off — store at 50–70% charge to maximize battery longevity. Include the charging cables for your specific devices in a waterproof bag with the power bank." },
  c2: { youNeedQty: 1, youNeedUnit: "Pair", basis: "1 pair per household\nfor family communication", longDesc: "FRS/GMRS two-way radios provide communication within a family or small group without any infrastructure — no cell towers, no internet, no power grid required. When cellular networks fail (which happens almost immediately in major disasters due to overload or tower damage), two-way radios become the only reliable short-range communication tool. Motorola T800 and Midland GXT1000 are top-rated consumer GMRS radios with 30+ mile rated range (2–5 miles realistic in urban environments). Channel 1 FRS is the most widely monitored emergency channel. A GMRS license ($35 for 10 years, no test required, covers entire household) is legally required for radios above 0.5W output. Program your family's primary and backup channels before an emergency. Include a family code word for security. Keep radios charged and test them monthly." },
  c3: { youNeedQty: 3, youNeedUnit: "Lists", basis: "1 per person\n(in their go-bag) = 3", longDesc: "A printed emergency contact list is a critical backup when phones are dead, lost, or damaged. Modern reliance on smartphones means most people cannot recall phone numbers from memory — including their own family members'. A laminated printed list (lamination protects against water damage) should include: immediate family cell numbers, out-of-area family contact (primary emergency contact), home address and neighborhood, work addresses and numbers, children's school contacts, primary care physician and specialists, nearest hospital, insurance information with policy numbers, utility emergency numbers (gas, electric, water), and local emergency management contact. Store one list in every go-bag, wallet, and vehicle. Update annually or whenever contact information changes. Include your medical information (blood type, allergies, medications) on the reverse side." },
  c4: { youNeedQty: 2, youNeedUnit: "Lanterns", basis: "1 per sleeping area\n+ 1 common area = 2", longDesc: "Solar lanterns provide sustainable, renewable lighting during extended power outages without consuming battery stockpiles. LuminAID and MPOWERD Luci are industry leaders — their inflatable silicone lanterns charge in 7–12 hours of direct sunlight and provide 6–50+ hours of light depending on the brightness setting. The inflatable design packs flat in go-bags. Some models include USB charging capability for phones, combining lantern and power bank functions. For indoor use, a 200-lumen lantern adequately illuminates a room for activities. Use lower settings to extend runtime. Hang lanterns from tent ridgelines or doorways to maximize light distribution. For car kits, a compact solar lantern provides roadside lighting without draining the vehicle battery. Charge your solar lanterns outdoors in direct sunlight every 3 months to maintain battery capacity." },
  s1: { youNeedQty: 3, youNeedUnit: "Blankets", basis: "1 per person\n× 3 people = 3", longDesc: "Emergency Mylar (space) blankets are among the highest value-to-weight items in any emergency kit. A single blanket weighs less than 1 ounce and folds to the size of a playing card, yet reflects up to 90% of body heat — preventing hypothermia in cold environments where a regular blanket would be unavailable. SOL (Survive Outdoors Longer) and Swiss Safe produce superior heavy-duty versions that don't tear as easily as ultra-cheap alternatives. Beyond warmth, Mylar blankets have multiple emergency applications: they create reflective emergency signals visible to aircraft, provide shade to prevent heat stroke in hot environments (reflective side out), waterproof improvised shelters, and line sleeping bags for additional warmth. Keep one in every go-bag, vehicle emergency kit, and winter coat pocket. Dispose of after use — they're not effectively reusable once crinkled." },
  s2: { youNeedQty: 3, youNeedUnit: "Bags", basis: "1 per person\n× 3 people = 3", longDesc: "A quality cold-weather sleeping bag is essential for extended displacement scenarios — sheltering in a vehicle, at an emergency shelter, or outdoors when evacuated. A 0°F temperature rating handles most North American climate scenarios including unexpected cold snaps. Mummy bags are significantly more thermally efficient than rectangular bags, reducing the volume of air your body must heat. Down fill is lighter and more compressible than synthetic but loses insulation when wet — synthetic fill maintains warmth even when damp, making it more practical for emergency kits. REI Co-op Trailbreak, Kelty Cosmic, and Coleman North Rim are good value options. Compress your sleeping bag in its stuff sack but avoid long-term compression storage, which reduces loft over time. Keep sleeping bags dry — store in breathable bags when not in use." },
  s3: { youNeedQty: 3, youNeedUnit: "Ponchos", basis: "1 per person\n× 3 people = 3", longDesc: "Waterproof rain protection is critical during evacuation scenarios, outdoor shelter situations, and emergency work in wet conditions. Hypothermia risk increases dramatically when clothing becomes wet — wet clothing loses 90% of its insulating value. Disposable emergency ponchos (available in bulk for under $2 each) are lightweight enough to include in every go-bag and vehicle kit. For more demanding scenarios, a quality reusable waterproof jacket with sealed seams and a hood provides far superior protection. Frogg Toggs and Columbia make excellent emergency-ready waterproof jackets at reasonable prices. Include waterproof pants for complete coverage. Gaiters prevent water intrusion over boot tops when wading through shallow flood water. Keep ponchos in an accessible outer pocket of your go-bag — you'll want them immediately, not buried at the bottom." },
  s4: { youNeedQty: 9, youNeedUnit: "Sets", basis: "3 days × 3 people\n= 9 sets of clothes", longDesc: "A 3-day clothing supply per person in your go-bag ensures you have appropriate attire for the conditions you may encounter during evacuation or extended displacement. Focus on function over fashion: moisture-wicking base layers that dry quickly, an insulating mid-layer, and a waterproof outer layer. Include sturdy work pants or heavy-duty jeans that can withstand physical labor during debris removal. At least two pairs of moisture-wicking socks per day prevent blisters during extended walking. A warm hat and gloves add minimal weight but significant warmth in cold conditions. Update your seasonal emergency clothing annually — clothes that fit last year may not fit this year, and climate-appropriate gear varies significantly between summer and winter scenarios. Store in vacuum-sealed bags to minimize bulk and protect from moisture." },
  s5: { youNeedQty: 3, youNeedUnit: "Pairs", basis: "1 pair per person\n× 3 people = 3 pairs", longDesc: "Sturdy footwear is a critical safety item immediately following an earthquake or structural collapse. Glass, broken concrete, exposed rebar, and sharp metal debris are everywhere in post-earthquake environments — bare feet or thin-soled shoes lead to severe injuries that can incapacitate you precisely when you need to move quickly. Earthquake preparedness experts specifically recommend keeping a pair of sturdy shoes under your bed — if shaking wakes you, you can put them on before standing up in a room potentially covered in broken glass. Steel-toed work boots provide the best protection. At minimum, keep shoes accessible enough to put on within 30 seconds. Ensure your emergency footwear fits well — blisters during a multi-day evacuation can become serious. Replace shoes every 2–3 years as rubber compounds degrade." },
  s6: { youNeedQty: 1, youNeedUnit: "Tent", basis: "1 four-person tent\nper household", longDesc: "An emergency tent provides critical shelter when your home is uninhabitable — after earthquake damage, fire, flooding, or during extended displacement when emergency shelters are overcrowded or unavailable. For a family of three, a 4-person tent provides comfortable sleeping space plus gear storage. REI Co-op Half Dome, MSR Hubba Hubba NX, and Coleman Sundome are reliable options across different price points. Look for: a full rainfly that extends to the ground, sealed seams, a bathtub-style floor (eliminates ground moisture intrusion), sufficient headroom for dressing, and a vestibule for gear storage. Practice setting up your tent before an emergency — a first-time setup in the dark and rain during a disaster is extremely stressful. Inspect tent poles and seams annually. Reapply seam sealer every 2–3 years to maintain waterproofing." },
  g1: { youNeedQty: 3, youNeedUnit: "Bags", basis: "1 per person\n× 3 people = 3 bags", longDesc: "A pre-packed 72-hour go-bag is the cornerstone of evacuation preparedness. It should be ready to grab in 30 seconds — when evacuation orders are issued, you may have minutes, not hours. A 40–50 liter backpack comfortably holds supplies for one person for 72 hours. The bag itself should be comfortable to carry for extended distances, durable, and water-resistant. Internal frame backpacks distribute weight more comfortably for long distances. Ready America, Sustain Supply Co., and Guardian Survival Gear offer quality pre-built 72-hour kits as a starting point to customize. Keep your go-bag near your front door or in your vehicle. Share the bag's location with all household members. Inspect and refresh contents every 6 months — replacing expired food and medications, updating documents, and seasonally adjusting clothing." },
  g2: { youNeedQty: 1, youNeedUnit: "Map set", basis: "County + region maps\nper household kit", longDesc: "Paper maps remain essential emergency navigation tools for two scenarios modern GPS users never anticipate: cellular network failure (GPS apps require data download) and electronic device failure (dead batteries or physical damage). When evacuating under stress in unfamiliar conditions, a physical map provides reliable navigation without technology dependence. Include: a detailed county road map showing all road names including secondary roads, a regional map covering a 100-mile radius from your home, and a street map of your evacuation destination if staying with family or friends. Highlight primary and secondary evacuation routes with permanent marker before a disaster. Update maps every 2–3 years as roads change. Waterproof map cases protect paper maps. Consider a laminated map for durability. Practice reading your paper maps regularly so you're competent before an emergency requires it." },
  g3: { youNeedQty: 2, youNeedUnit: "Compasses", basis: "1 go-bag +\n1 vehicle kit = 2", longDesc: "A baseplate compass works entirely without batteries, GPS signals, or electronic infrastructure — making it the most reliable navigation tool available during major disasters. The Suunto A-10 and Silva Ranger are excellent entry-level orienteering compasses accurate to within 2 degrees. A compass is most valuable when used in combination with a paper map — learning to orient a map and take bearings is a skill that takes an afternoon to learn and could be critical in an emergency. In wildfire evacuation scenarios where smoke reduces visibility to near zero, a compass and map combination enables navigation when visual landmarks are obscured. Attach your compass to your go-bag exterior with a carabiner for immediate access. Store away from magnets (speakers, phones) which can temporarily affect accuracy." },
  g4: { youNeedQty: 15, youNeedUnit: "Masks", basis: "5 masks per person\n× 3 people = 15", longDesc: "N95 respirator masks in your go-bag specifically protect against airborne hazards encountered during evacuation scenarios. Wildfire evacuations frequently involve driving and walking through heavy smoke containing particulate matter, carbon monoxide, and toxic combustion byproducts from burning synthetic materials. Volcanic ash evacuation requires respiratory protection against fine silica particles that cause permanent lung damage. Post-earthquake environments contain concrete dust and potential asbestos fibers from damaged older buildings. Having readily accessible N95 masks in your go-bag means you can begin respiratory protection immediately without searching through your kit. Pre-open one mask and secure it to the outside of your bag for truly immediate access. Replace masks every 5 years or immediately after any significant contamination exposure." },
  g5: { youNeedQty: 3, youNeedUnit: "Whistles", basis: "1 per person\n(go-bag exterior) = 3", longDesc: "A whistle clipped to the exterior of your go-bag provides immediate signaling capability without opening the bag. In rescue scenarios — building collapse, avalanche, boat overturning — a whistle allows you to signal rescuers even when physically trapped, injured, or weakened. The Fox 40 Micro and ACME Tornado 636 are the loudest compact whistles available, producing 115–120 decibels audible at distances exceeding one mile in open terrain. Use a quality carabiner or snap hook to secure the whistle to an exterior loop — this prevents loss and ensures it's always accessible. The international distress signal is three short blasts, pause, repeat. Teach all household members — including children — the distress signal before an emergency. Include an additional whistle on each child's backpack during any outdoor activity." },
  g6: { youNeedQty: 3, youNeedUnit: "Sets", basis: "1 set per person\nin their go-bag = 3", longDesc: "Laminated identification copies in your go-bag ensure you can prove your identity and access assistance even if your wallet and primary documents are lost or damaged. Without identification, accessing emergency assistance programs, crossing evacuation checkpoints, collecting insurance payouts, and re-entering restricted areas can become impossible or severely delayed. Laminate copies yourself at any office supply store for minimal cost. Include: driver's license or state ID (front and back), passport photo page, Social Security card, insurance cards (health, auto, home), current photo of each household member (helps identify if separated from family), a current photo of each pet with their name, and a home address card with contact numbers. Place in a waterproof zip-lock bag inside your go-bag's top pocket for immediate access at checkpoints." },
};

// How many you "need" per person per day for water calculation
const PEOPLE = 3;
const DAYS = 3;

const ALL_ITEM_COUNT = Object.values(ITEM_EXPANDED).length;

function SupplyItem({ item, onOpenAgent, forceQty, onQtyChange, currentQty }) {
  const [expanded, setExpanded] = useState(false);
  // Use currentQty from parent (single source of truth); forceQty used by Check All
  const qty = currentQty;

  useEffect(() => {
    if (forceQty !== undefined) onQtyChange(item.id, forceQty);
  }, [forceQty]);
  const expanded_data = ITEM_EXPANDED[item.id] || {};
  const img = ITEM_IMAGES[item.id];
  const youNeed = expanded_data.youNeedQty || 1;
  const youNeedUnit = expanded_data.youNeedUnit || item.unit;
  const basis = expanded_data.basis || "";
  const shortDesc = item.notes || "";
  const longDesc = expanded_data.longDesc || shortDesc;
  const source = item.expiry ? `Source: FEMA Ready.gov` : "Source: FEMA Ready.gov";
  const deficit = Math.max(0, youNeed - qty);
  const isComplete = qty >= youNeed;

  const handleSetQty = (newQty) => {
    if (onQtyChange) onQtyChange(item.id, newQty);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("hero-cart-add", { detail: { item, qty: deficit } }));
  };

  return (
    <div style={{ borderBottom: "1px solid #e0e8ef", background: expanded ? "#f0f7fb" : "white", transition: "background 0.2s" }}>
      {/* Collapsed Row */}
      <div
        className="supply-item-row"
        style={{ display: "grid", gridTemplateColumns: "64px 1fr 140px 160px 1fr 32px", alignItems: "center", gap: 0, padding: "0", cursor: "pointer", minHeight: 56, background: isComplete ? "rgba(42,188,186,0.04)" : "white" }}
        onClick={() => setExpanded(v => !v)}
      >
        {/* Image */}
        <div style={{ width: 56, height: 46, background: "#f5f8fa", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #e0e8ef", flexShrink: 0, overflow: "hidden", position: "relative" }}>
          <img src={img} alt={item.name} style={{ width: 52, height: 42, objectFit: "cover", borderRadius: 2 }} onError={e => { e.target.style.display = "none"; }} />
        </div>
        {/* Name + completed badge */}
        <div id={item.id === "w4" ? "supply-water-filter-name" : undefined} style={{ padding: "0 12px", fontSize: 13, fontWeight: 600, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 8 }}>
          {item.name}
          {isComplete && (
            <span style={{ background: "rgba(42,188,186,0.15)", border: "1px solid rgba(42,188,186,0.4)", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#1a7a78", letterSpacing: 0.5, whiteSpace: "nowrap" }}>✓ Stocked</span>
          )}
        </div>
        {/* You Need */}
        <div className="supply-item-need" style={{ padding: "0 8px", fontSize: 13, color: "#444", borderLeft: "1px solid #e0e8ef", textAlign: "center" }}>
          {youNeed} {youNeedUnit}
        </div>
        {/* You Have (stepper) */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 10px", borderLeft: "1px solid #e0e8ef", justifyContent: "center" }} onClick={e => e.stopPropagation()}>
          <button onClick={e => { e.stopPropagation(); handleSetQty(Math.max(0, qty - 1)); }} style={{ width: 28, height: 28, borderRadius: 4, background: "#2ABCBA", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
          <span style={{ fontSize: 15, fontWeight: 700, minWidth: 24, textAlign: "center", color: isComplete ? "#2ABCBA" : "#1a1a2e" }}>{qty}</span>
          <button id={item.id === "w4" ? "supply-water-filter-plus" : undefined} onClick={e => { e.stopPropagation(); handleSetQty(qty + 1); }} style={{ width: 28, height: 28, borderRadius: 4, background: "#2ABCBA", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        </div>
        {/* Short Description */}
        <div className="supply-item-desc" style={{ padding: "0 12px", fontSize: 12, color: "#555", lineHeight: 1.5, borderLeft: "1px solid #e0e8ef", fontStyle: "italic" }}>{shortDesc}</div>
        {/* Expand arrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 14 }}>
          {expanded ? "▲" : "▼"}
        </div>
      </div>

      {/* Expanded Panel — columns match header: 64px | 1fr | 140px | 160px | 1fr | 32px */}
      {expanded && (
        <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 140px 160px 1fr 32px", gap: 0, background: "#f0f7fb", borderTop: "1px solid #d0e4ef" }}>
          {/* Left col: image area spacer */}
          <div style={{ background: "#e8f3fa" }} />

          {/* Recommended Items col — "Based on:" info */}
          <div style={{ padding: "14px 16px", borderRight: "1px solid #d0e4ef" }}>
            {basis && (
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                <div style={{ fontSize: 11, color: "#2ABCBA", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>Based on:</div>
                {basis}
              </div>
            )}
          </div>

          {/* You Need col */}
          <div style={{ padding: "14px 10px", borderRight: "1px solid #d0e4ef", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>You need:</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{youNeed}</div>
            <div style={{ fontSize: 10, color: "#888" }}>{youNeedUnit}</div>
          </div>

          {/* You Have col */}
          <div style={{ padding: "14px 10px", borderRight: "1px solid #d0e4ef", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 11, color: "#777" }}>You have:</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: qty >= youNeed ? "#2ABCBA" : "#1a1a2e" }}>{qty} <span style={{ fontSize: 10, fontWeight: 500, color: "#888" }}>{youNeedUnit}</span></div>
            {deficit > 0 && (
              <button onClick={handleAddToCart} style={{ background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.35)", borderRadius: 6, padding: "6px 10px", fontSize: 11, fontWeight: 700, color: "#1a7a78", cursor: "pointer", width: "100%" }}>
                Add {deficit} to cart
              </button>
            )}
            {deficit === 0 && <div style={{ fontSize: 11, color: "#2ABCBA", fontWeight: 700 }}>✓ Stocked</div>}
            <div style={{ fontSize: 9, color: "#2ABCBA", letterSpacing: 1, fontWeight: 700, textTransform: "uppercase", marginTop: 4 }}>Guide me!</div>
            <button
              onClick={e => { e.stopPropagation(); onOpenAgent(item); }}
              style={{ background: "rgba(42,188,186,0.12)", border: "1px solid rgba(42,188,186,0.4)", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#1a6a6a", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%" }}
            >🤖 Agent</button>
          </div>

          {/* Description col — full long desc */}
          <div style={{ padding: "14px 14px 22px", position: "relative" }}>
            <div style={{ fontSize: 12, color: "#444", lineHeight: 1.75 }}>{longDesc}</div>
            <div style={{ position: "absolute", bottom: 6, right: 10, fontSize: 10, color: "#aaa", fontStyle: "italic" }}>{source}</div>
          </div>

          {/* Expand arrow col */}
          <div />
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat, onOpenAgent, allQtys, onQtyChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [forceQtys, setForceQtys] = useState({});
  const label = cat.label.replace(/^[^\w\s]+\s*/, ""); // strip emoji

  const handleCheckAll = (e) => {
    e.stopPropagation();
    const checked = e.target.checked;
    setCheckedAll(checked);
    const newForce = {};
    cat.items.forEach(item => {
      const need = (ITEM_EXPANDED[item.id] || {}).youNeedQty || 1;
      newForce[item.id] = checked ? need : 0;
      onQtyChange(item.id, checked ? need : 0);
    });
    setForceQtys(newForce);
  };

  const handleItemQtyChange = (itemId, qty) => {
    onQtyChange(itemId, qty);
    setForceQtys(prev => ({ ...prev, [itemId]: undefined }));
  };

  const completedCount = cat.items.filter(item => {
    const need = (ITEM_EXPANDED[item.id] || {}).youNeedQty || 1;
    const have = allQtys[item.id] || 0;
    return have >= need;
  }).length;

  return (
    <div style={{ marginBottom: 0, border: "1px solid #dce8f0", borderRadius: 0 }}>
      {/* Category Header — light theme */}
      <div
        className="supply-cat-row"
        style={{ display: "grid", gridTemplateColumns: "64px 1fr 140px 160px 1fr 32px", alignItems: "center", background: "#eaf3f8", borderBottom: "1px solid #c8dce8", cursor: "pointer", minHeight: 38 }}
        onClick={() => setCollapsed(v => !v)}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, color: "#2ABCBA" }}>{collapsed ? "▶" : "▼"}</span>
        </div>
        <div style={{ padding: "0 12px", fontSize: 13, fontWeight: 800, color: "#1a3a50", letterSpacing: 0.5, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          {label}
          <span style={{ fontSize: 10, color: "#888", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{completedCount}/{cat.items.length} stocked</span>
        </div>
        <div style={{ padding: "0 8px", borderLeft: "1px solid #c8dce8", textAlign: "center" }} />
        <div className="supply-cat-checkall" style={{ padding: "0 10px", borderLeft: "1px solid #c8dce8", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }} onClick={e => e.stopPropagation()}>
          <input type="checkbox" checked={checkedAll} onChange={handleCheckAll} style={{ width: 16, height: 16, accentColor: "#2ABCBA", cursor: "pointer" }} title="Check All" />
          <span style={{ fontSize: 11, color: "#2ABCBA", letterSpacing: 0.5, fontWeight: 600 }}>Check All</span>
        </div>
        <div style={{ borderLeft: "1px solid #c8dce8" }} />
        <div />
      </div>

      {/* Items */}
      {!collapsed && cat.items.map((item, idx) => (
        <SupplyItem
          key={item.id}
          item={item}
          onOpenAgent={onOpenAgent}
          forceQty={forceQtys[item.id]}
          onQtyChange={handleItemQtyChange}
          currentQty={allQtys[item.id] || 0}
        />
      ))}
    </div>
  );
}

export default function SuppliesPanel({ onOpenAgent, cartCount, showTutorial, onTutorialComplete, onReadinessChange }) {
  // Single source of truth for all item quantities
  const [allQtys, setAllQtys] = useState({});

  const handleQtyChangeWithTutorial = (itemId, qty) => {
    handleQtyChange(itemId, qty);
    if (window.__supplyTutorialPlusClick) {
      window.__supplyTutorialPlusClick();
    }
  };

  const handleQtyChange = (itemId, qty) => {
    setAllQtys(prev => ({ ...prev, [itemId]: qty }));
  };

  const handleTutorialComplete = ({ resetItemId } = {}) => {
    if (resetItemId) {
      setAllQtys(prev => ({ ...prev, [resetItemId]: 0 }));
    }
    onTutorialComplete && onTutorialComplete();
  };

  const totalItems = Object.keys(ITEM_EXPANDED).length;
  const totalStocked = Object.entries(ITEM_EXPANDED).filter(([id]) => {
    const need = ITEM_EXPANDED[id].youNeedQty || 1;
    return (allQtys[id] || 0) >= need;
  }).length;
  const pct = Math.round((totalStocked / totalItems) * 100);

  useEffect(() => {
    if (onReadinessChange) onReadinessChange(pct);
  }, [pct]);

  return (
    <div style={{ padding: "clamp(12px, 1.5vw, 24px)", maxWidth: 1400, margin: "0 auto", width: "100%", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @media (max-width: 600px) {
          .supply-header-row { display: none !important; }
          .supply-item-row { grid-template-columns: 44px 1fr 100px 32px !important; }
          .supply-item-desc { display: none !important; }
          .supply-item-need { display: none !important; }
          .supply-cat-row { grid-template-columns: 44px 1fr 100px 32px !important; }
          .supply-cat-checkall { display: none !important; }
        }
      `}</style>
      {/* Tutorial overlay */}
      {showTutorial && <SuppliesTutorial onComplete={handleTutorialComplete} />}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "#1a1a2e", marginBottom: 4 }}>Supplies</h2>
        <div style={{ fontSize: 13, color: "rgba(42,188,186,0.85)", fontWeight: 500 }}>Your personalized Hero Home Supply Manager</div>
      </div>

      {/* Progress Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#2ABCBA" }}>{totalStocked}</div>
          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Items Stocked</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#E26332" }}>{totalItems - totalStocked}</div>
          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Remaining</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>{totalItems}</div>
          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Total Items</div>
        </div>
        <div id="supply-readiness-stat" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Supply Readiness</div>
          <div style={{ height: 6, background: "rgba(0,0,0,0.07)", borderRadius: 3, marginBottom: 6 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 3, transition: "width 0.4s" }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#2ABCBA" }}>{pct}%</div>
        </div>
      </div>

      {/* Column Headers — light theme */}
      <div className="supply-header-row" style={{ display: "grid", gridTemplateColumns: "64px 1fr 140px 160px 1fr 32px", background: "#dce8f0", borderRadius: "6px 6px 0 0", overflow: "hidden", border: "1px solid #c8dce8", borderBottom: "none" }}>
        <div />
        <div id="supply-recommended-header" style={{ padding: "10px 12px", fontSize: 11, fontWeight: 800, color: "#1a3a50", letterSpacing: 2, textTransform: "uppercase" }}>Recommended Items</div>
        <div style={{ padding: "10px 8px", fontSize: 11, fontWeight: 800, color: "#1a3a50", letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", borderLeft: "1px solid #c8dce8" }}>You Need</div>
        <div style={{ padding: "10px 10px", fontSize: 11, fontWeight: 800, color: "#1a3a50", letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", borderLeft: "1px solid #c8dce8" }}>You Have</div>
        <div style={{ padding: "10px 12px", fontSize: 11, fontWeight: 800, color: "#1a3a50", letterSpacing: 1.5, textTransform: "uppercase", borderLeft: "1px solid #c8dce8" }}>Description</div>
        <div />
      </div>

      {/* Categories */}
      <div style={{ border: "1px solid #c8dce8", borderTop: "none" }}>
        {SUPPLY_CATEGORIES.map((cat) => (
          <CategorySection key={cat.id} cat={cat} onOpenAgent={onOpenAgent} allQtys={allQtys} onQtyChange={handleQtyChangeWithTutorial} />
        ))}
      </div>
    </div>
  );
}