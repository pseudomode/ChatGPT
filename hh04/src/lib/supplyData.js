export const SUPPLY_CATEGORIES = [
  {
    id: "water",
    label: "💧 Water",
    items: [
      { id: "w1", name: "Drinking / Sanitation Water", priority: "HIGH", qty1: "1 gal/day", unit: "gallon/day", cost: "$1.50", notes: "Store in cool, dark place. Food-grade containers.", expiry: "6 months" },
      { id: "w2", name: "Water Storage Container (large)", priority: "HIGH", qty1: "7 gal", unit: "container", cost: "$20–$40", notes: "BPA-free, stackable containers preferred.", expiry: "Replace every 5 years" },
      { id: "w3", name: "Water Purification Tablets", priority: "MEDIUM", qty1: "1 pack", unit: "pack", cost: "$8–$12", notes: "Treat 25 quarts per pack.", expiry: "4 years" },
      { id: "w4", name: "Water Filter (portable)", priority: "MEDIUM", qty1: "1", unit: "unit", cost: "$20–$90", notes: "LifeStraw or Sawyer Squeeze recommended.", expiry: "Per manufacturer" },
      { id: "w5", name: "Collapsible Water Jug", priority: "LOW", qty1: "1–2", unit: "jug", cost: "$10–$15", notes: "For transporting water during evacuation.", expiry: "As needed" },
    ]
  },
  {
    id: "food",
    label: "🥫 Food",
    items: [
      { id: "f1", name: "Non-Perishable Canned Goods", priority: "HIGH", qty1: "9 cans", unit: "cans", cost: "$1–$3/can", notes: "Beans, soups, vegetables, tuna, fruit.", expiry: "2–5 years" },
      { id: "f2", name: "Ready-to-Eat Meals (MREs)", priority: "HIGH", qty1: "3", unit: "meals/day", cost: "$8–$15", notes: "Full 3-day supply minimum.", expiry: "5 years" },
      { id: "f3", name: "Energy / Protein Bars", priority: "HIGH", qty1: "1 box", unit: "box", cost: "$15–$25", notes: "High calorie, compact. Great for go-bags.", expiry: "1–2 years" },
      { id: "f4", name: "Dried Fruits & Nuts", priority: "HIGH", qty1: "2 lbs", unit: "lbs", cost: "$8–$15", notes: "High energy, no cooking required.", expiry: "6–12 months" },
      { id: "f5", name: "Rice / Oats / Pasta (dry)", priority: "HIGH", qty1: "5 lbs", unit: "lbs", cost: "$5–$10", notes: "Vacuum-seal for longer storage.", expiry: "5–10 years" },
      { id: "f6", name: "Peanut Butter", priority: "HIGH", qty1: "2 jars", unit: "jars", cost: "$4–$6", notes: "High calorie, protein-rich.", expiry: "1–2 years" },
      { id: "f7", name: "Salt, Sugar, Honey", priority: "MEDIUM", qty1: "Small supply", unit: "pack", cost: "$5–$10", notes: "Honey never expires.", expiry: "Indefinite (honey)" },
      { id: "f8", name: "Infant Formula / Baby Food", priority: "MEDIUM", qty1: "As needed", unit: "cans", cost: "$15–$25", notes: "Only if applicable.", expiry: "Per label" },
      { id: "f9", name: "Comfort / Morale Foods", priority: "LOW", qty1: "1 week supply", unit: "assorted", cost: "$10–$20", notes: "Chocolate, coffee, tea, candy. Boosts morale.", expiry: "Per label" },
    ]
  },
  {
    id: "kitchen",
    label: "🍳 Kitchen & Cooking",
    items: [
      { id: "k1", name: "Manual Can Opener", priority: "HIGH", qty1: "1", unit: "unit", cost: "$5–$12", notes: "Keep with food supplies.", expiry: "Indefinite" },
      { id: "k2", name: "Camp Stove + Fuel Canisters", priority: "HIGH", qty1: "1 stove + 3 canisters", unit: "set", cost: "$40–$100", notes: "Use outdoors only. Store fuel away from heat.", expiry: "Fuel: 5–10 years" },
      { id: "k3", name: "Waterproof Matches / Lighter", priority: "MEDIUM", qty1: "2+", unit: "pack/lighter", cost: "$3–$8", notes: "Store in zip-lock bag.", expiry: "Indefinite" },
      { id: "k4", name: "Mess Kit / Plates & Utensils", priority: "MEDIUM", qty1: "1 set/person", unit: "set", cost: "$10–$25", notes: "Collapsible silicone preferred.", expiry: "Indefinite" },
      { id: "k5", name: "Portable BBQ Grill", priority: "LOW", qty1: "1", unit: "unit", cost: "$30–$80", notes: "Outdoor cooking backup.", expiry: "Indefinite" },
      { id: "k6", name: "Aluminum Foil (heavy-duty)", priority: "LOW", qty1: "1 roll", unit: "roll", cost: "$5–$8", notes: "Cooking, sun shield, signal.", expiry: "Indefinite" },
      { id: "k7", name: "Reusable Water Bottles", priority: "LOW", qty1: "1/person", unit: "bottle", cost: "$10–$25", notes: "BPA-free, insulated preferred.", expiry: "Replace if damaged" },
    ]
  },
  {
    id: "firstaid",
    label: "🩺 First Aid & Medical",
    items: [
      { id: "m1", name: "First Aid Kit (comprehensive)", priority: "HIGH", qty1: "1", unit: "kit", cost: "$25–$60", notes: "ANSI-rated kit. Check contents every 6 months.", expiry: "Check annually" },
      { id: "m2", name: "Prescription Medications (30-day supply)", priority: "HIGH", qty1: "30 days", unit: "days", cost: "Varies", notes: "Rotate stock to keep current.", expiry: "Per prescription" },
      { id: "m3", name: "Pain Relievers (Ibuprofen / Tylenol)", priority: "HIGH", qty1: "1 bottle", unit: "bottle", cost: "$5–$10", notes: "Both types recommended.", expiry: "2–3 years" },
      { id: "m4", name: "Antihistamines (Benadryl)", priority: "HIGH", qty1: "1 pack", unit: "pack", cost: "$8–$12", notes: "For allergic reactions.", expiry: "2–3 years" },
      { id: "m5", name: "Antiseptic Wipes & Ointment", priority: "HIGH", qty1: "1 box + tube", unit: "set", cost: "$5–$12", notes: "Neosporin + alcohol wipes.", expiry: "2–3 years" },
      { id: "m6", name: "Tourniquet (CAT or SOFTT-W)", priority: "HIGH", qty1: "1–2", unit: "unit", cost: "$25–$35", notes: "Life-saving for severe bleeding. Train to use it.", expiry: "5 years" },
      { id: "m7", name: "CPR Face Shield / Mask", priority: "MEDIUM", qty1: "1", unit: "unit", cost: "$5–$15", notes: "Pair with CPR training.", expiry: "5 years" },
      { id: "m8", name: "Thermometer", priority: "MEDIUM", qty1: "1", unit: "unit", cost: "$10–$25", notes: "Digital preferred.", expiry: "Replace if broken" },
      { id: "m9", name: "Blood Pressure Monitor", priority: "MEDIUM", qty1: "1", unit: "unit", cost: "$30–$60", notes: "Essential for chronic conditions.", expiry: "Replace if faulty" },
      { id: "m10", name: "Eye Wash Solution", priority: "MEDIUM", qty1: "1 bottle", unit: "bottle", cost: "$5–$10", notes: "For chemical or debris exposure.", expiry: "2 years" },
      { id: "m11", name: "N95 / KN95 Masks", priority: "HIGH", qty1: "10 per person", unit: "masks", cost: "$1–$3 each", notes: "For smoke, dust, biohazards.", expiry: "5 years" },
      { id: "m12", name: "Nitrile Gloves (box)", priority: "HIGH", qty1: "1 box", unit: "box", cost: "$10–$20", notes: "For first aid and sanitation tasks.", expiry: "5 years" },
    ]
  },
  {
    id: "tools",
    label: "🔧 Tools & Safety",
    items: [
      { id: "t1", name: "Flashlight (LED)", priority: "HIGH", qty1: "2", unit: "flashlight", cost: "$10–$30", notes: "Keep extra batteries. Headlamps highly recommended.", expiry: "Batteries: 10 years" },
      { id: "t2", name: "Battery-Powered / Hand-Crank Radio", priority: "HIGH", qty1: "1", unit: "unit", cost: "$20–$60", notes: "NOAA weather alerts. Hand-crank = no batteries needed.", expiry: "Replace batteries annually" },
      { id: "t3", name: "Extra Batteries (AA, AAA, 9V)", priority: "HIGH", qty1: "1 pack each", unit: "packs", cost: "$10–$20", notes: "Store in cool, dry place.", expiry: "10 years" },
      { id: "t4", name: "Multi-tool / Swiss Army Knife", priority: "HIGH", qty1: "1", unit: "unit", cost: "$20–$60", notes: "Leatherman or Victorinox preferred.", expiry: "Indefinite" },
      { id: "t5", name: "Duct Tape", priority: "HIGH", qty1: "1 roll", unit: "roll", cost: "$5–$10", notes: "Structural repairs, sealing, securing.", expiry: "Indefinite" },
      { id: "t6", name: "Work Gloves (leather/cut-resistant)", priority: "MEDIUM", qty1: "1 pair/person", unit: "pair", cost: "$10–$25", notes: "For debris removal and heavy work.", expiry: "As needed" },
      { id: "t7", name: "Whistle (loud, pea-less)", priority: "HIGH", qty1: "1/person", unit: "whistle", cost: "$5–$10", notes: "Signal for rescue. Attach to go-bag.", expiry: "Indefinite" },
      { id: "t8", name: "Fire Extinguisher (ABC rated)", priority: "HIGH", qty1: "1–2", unit: "unit", cost: "$40–$80", notes: "One in kitchen, one in garage.", expiry: "12 years (check annually)" },
      { id: "t9", name: "Rope / Paracord (50ft+)", priority: "MEDIUM", qty1: "50 ft", unit: "feet", cost: "$8–$15", notes: "550 paracord is versatile.", expiry: "Indefinite" },
      { id: "t10", name: "Crowbar / Pry Bar", priority: "MEDIUM", qty1: "1", unit: "unit", cost: "$15–$30", notes: "For trapped doors after earthquake.", expiry: "Indefinite" },
    ]
  },
  {
    id: "hygiene",
    label: "🧼 Hygiene & Sanitation",
    items: [
      { id: "h1", name: "Toilet Paper (extra supply)", priority: "HIGH", qty1: "1 case", unit: "case", cost: "$20–$30", notes: "At least 2-week supply.", expiry: "Indefinite" },
      { id: "h2", name: "Hand Sanitizer", priority: "HIGH", qty1: "2 bottles", unit: "bottles", cost: "$3–$8", notes: "60%+ alcohol. Multiple locations.", expiry: "3 years" },
      { id: "h3", name: "Soap (bar or liquid)", priority: "HIGH", qty1: "6 bars / 2 bottles", unit: "units", cost: "$8–$15", notes: "Bar soap lasts longer.", expiry: "2–3 years" },
      { id: "h4", name: "Toothbrush & Toothpaste", priority: "MEDIUM", qty1: "1 set/person", unit: "set", cost: "$5–$10", notes: "Include floss.", expiry: "1–2 years" },
      { id: "h5", name: "Feminine Hygiene Products", priority: "MEDIUM", qty1: "As needed", unit: "supply", cost: "$8–$15", notes: "1-month supply recommended.", expiry: "5 years" },
      { id: "h6", name: "Garbage Bags (heavy-duty)", priority: "MEDIUM", qty1: "1 box", unit: "box", cost: "$10–$20", notes: "Waste management, waterproofing, shelter.", expiry: "Indefinite" },
      { id: "h7", name: "Portable Toilet / Bucket w/ Lid", priority: "LOW", qty1: "1", unit: "unit", cost: "$20–$60", notes: "When plumbing is unavailable.", expiry: "Indefinite" },
    ]
  },
  {
    id: "documents",
    label: "📄 Documents & Finance",
    items: [
      { id: "d1", name: "Waterproof Document Bag / Folder", priority: "HIGH", qty1: "1", unit: "bag", cost: "$10–$25", notes: "For IDs, passports, insurance docs.", expiry: "Replace if damaged" },
      { id: "d2", name: "Copies of Important Documents", priority: "HIGH", qty1: "1 set", unit: "set", cost: "Free", notes: "ID, passport, insurance, property docs. Store digitally too.", expiry: "Update annually" },
      { id: "d3", name: "Emergency Cash (small bills)", priority: "HIGH", qty1: "$200–$500", unit: "cash", cost: "Face value", notes: "ATMs may be down. Keep in safe.", expiry: "N/A" },
      { id: "d4", name: "USB Drive with Digital Copies", priority: "MEDIUM", qty1: "1–2", unit: "drive", cost: "$5–$15", notes: "Encrypted backup of critical documents.", expiry: "Replace every 5 years" },
    ]
  },
  {
    id: "comms",
    label: "📡 Communication",
    items: [
      { id: "c1", name: "Battery / Solar Phone Charger", priority: "HIGH", qty1: "1–2", unit: "unit", cost: "$20–$60", notes: "20,000mAh+ capacity recommended.", expiry: "Replace battery every 2–3 years" },
      { id: "c2", name: "Two-Way Radios (walkie-talkies)", priority: "MEDIUM", qty1: "2", unit: "pair", cost: "$30–$80", notes: "GMRS radios reach 1–30 miles.", expiry: "Replace batteries annually" },
      { id: "c3", name: "Emergency Contact List (printed)", priority: "HIGH", qty1: "1 per person", unit: "list", cost: "Free", notes: "Include out-of-area contacts.", expiry: "Update annually" },
      { id: "c4", name: "Solar Lantern", priority: "LOW", qty1: "1–2", unit: "unit", cost: "$15–$40", notes: "Doubles as phone charger on some models.", expiry: "Replace if solar panel fails" },
    ]
  },
  {
    id: "shelter",
    label: "🏕️ Shelter & Clothing",
    items: [
      { id: "s1", name: "Emergency Mylar Blankets", priority: "HIGH", qty1: "1/person", unit: "blanket", cost: "$2–$5", notes: "Retain 90% body heat. Lightweight.", expiry: "5 years" },
      { id: "s2", name: "Sleeping Bag (rated for cold)", priority: "MEDIUM", qty1: "1/person", unit: "bag", cost: "$30–$100", notes: "At least 0°F rated.", expiry: "Inspect annually" },
      { id: "s3", name: "Rain Poncho / Waterproof Jacket", priority: "HIGH", qty1: "1/person", unit: "unit", cost: "$10–$40", notes: "Disposable ponchos for go-bag.", expiry: "Inspect annually" },
      { id: "s4", name: "Change of Clothes (3-day supply)", priority: "MEDIUM", qty1: "3 sets/person", unit: "sets", cost: "Varies", notes: "Rotate seasonally.", expiry: "Update as needed" },
      { id: "s5", name: "Sturdy Closed-Toe Shoes", priority: "HIGH", qty1: "1 pair/person", unit: "pair", cost: "$40–$100", notes: "Near bed for nighttime earthquake.", expiry: "As needed" },
      { id: "s6", name: "Tent (2–4 person)", priority: "LOW", qty1: "1", unit: "tent", cost: "$50–$200", notes: "For extended displacement.", expiry: "Inspect annually" },
    ]
  },
  {
    id: "gokit",
    label: "🎒 Go-Bag Essentials",
    items: [
      { id: "g1", name: "Backpack / Duffel Bag (72-hr kit)", priority: "HIGH", qty1: "1/person", unit: "bag", cost: "$30–$80", notes: "Pre-packed and ready to grab.", expiry: "Inspect every 6 months" },
      { id: "g2", name: "Map of Local Area (paper)", priority: "HIGH", qty1: "1", unit: "map", cost: "$5–$10", notes: "GPS may be unavailable.", expiry: "Update if area changes" },
      { id: "g3", name: "Compass", priority: "MEDIUM", qty1: "1", unit: "unit", cost: "$5–$20", notes: "Works without power.", expiry: "Indefinite" },
      { id: "g4", name: "Dust / N95 Mask (extra)", priority: "HIGH", qty1: "5/person", unit: "masks", cost: "$1–$3 each", notes: "For go-bag.", expiry: "5 years" },
      { id: "g5", name: "Emergency Whistle (go-bag)", priority: "HIGH", qty1: "1/person", unit: "whistle", cost: "$5–$10", notes: "Clip to bag exterior.", expiry: "Indefinite" },
      { id: "g6", name: "Copies of IDs and Docs", priority: "HIGH", qty1: "1 set", unit: "set", cost: "Free", notes: "Laminated copies or waterproof bag.", expiry: "Update annually" },
    ]
  }
];

export const ALL_SUPPLIES = SUPPLY_CATEGORIES.flatMap(cat =>
  cat.items.map(item => ({ ...item, category: cat.id, categoryLabel: cat.label }))
);

export const PRIORITY_CONFIG = {
  HIGH: { color: "#E26332", bg: "rgba(226,99,50,0.1)", border: "rgba(226,99,50,0.3)", label: "🔴 HIGH" },
  MEDIUM: { color: "#f0c040", bg: "rgba(240,192,64,0.1)", border: "rgba(240,192,64,0.3)", label: "🟡 MED" },
  LOW: { color: "#2ABCBA", bg: "rgba(42,188,186,0.1)", border: "rgba(42,188,186,0.3)", label: "🟢 LOW" },
};