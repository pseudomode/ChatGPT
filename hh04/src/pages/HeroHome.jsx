import { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import SuppliesPanel from "../components/SuppliesPanel";
import LessonModal from "../components/LessonModal";
import ShopQuickView from "../components/ShopQuickView";
import ProfilePage from "../components/ProfilePage";

const SUPPLIES = [
{ id: 1, name: "Eveready Batteries", brand: "Eveready", icon: "⚡", category: "Power", owned: false },
{ id: 2, name: "First Aid Kit", brand: "Johnson & Johnson", icon: "🩹", category: "Medical", owned: true },
{ id: 3, name: "Water Purifier", brand: "LifeStraw", icon: "💧", category: "Water", owned: false },
{ id: 4, name: "Emergency Radio", brand: "Midland", icon: "📻", category: "Communication", owned: false },
{ id: 5, name: "Flashlight", brand: "Maglite", icon: "🔦", category: "Light", owned: true },
{ id: 6, name: "Fire Extinguisher", brand: "Kidde", icon: "🧯", category: "Fire Safety", owned: false },
{ id: 7, name: "N95 Masks (20pk)", brand: "3M", icon: "😷", category: "Health", owned: false },
{ id: 8, name: "Emergency Blankets", brand: "SOL", icon: "🛡️", category: "Shelter", owned: true },
{ id: 9, name: "Food Rations (3-day)", brand: "FEMA Kit", icon: "🥫", category: "Food", owned: false },
{ id: 10, name: "Whistle & Signal", brand: "Fox 40", icon: "🔔", category: "Signaling", owned: false },
{ id: 11, name: "Multi-Tool", brand: "Leatherman", icon: "🔧", category: "Tools", owned: true },
{ id: 12, name: "Waterproof Bag", brand: "SealLine", icon: "🎒", category: "Storage", owned: false }];

const BASE_IMG = "https://herohome.neocities.org/Base44/01/images/products/";
const GEN_IMG = "https://media.base44.com/images/public/69a6417e6f00bff3da12ccd4/";

// Kit membership — which tabs each product belongs to
// HOME, CAR, EVAC — products can belong to multiple
const SHOP_ITEMS = [
  // ── Existing products ────────────────────────────────────────────────────
  { id: "p1",  name: "MYFAK Mini First Aid Kit",              brand: "MyMedic",     kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$91.96",    img: BASE_IMG + "prod_mini-first-aid-kit.png",        desc: "Over 62 lifesaving first aid items in our most compact MyFAK™ yet. Hypalon MOLLE panel, folding page design, FREE training course included.",   badge: "🔴 HIGH", url: "https://mymedic.com/collections/best-sellers/products/myfak-mini-first-aid-kit?variant=39510710747232" },
  { id: "p2",  name: "MYFAK First Aid Kit",                   brand: "MyMedic",     kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$169.95",   img: BASE_IMG + "prod_red-myfak-ifak.png",            desc: "115+ life-saving first aid supplies. Folding page design, durable Hypalon MOLLE panel. FREE training course included.",                          badge: "🔴 HIGH", url: "https://mymedic.com/products/myfak-firstaidkit" },
  { id: "p3",  name: "MYFAK Pro Waterproof First Aid Kit",    brand: "MyMedic",     kits: ["HOME"], category: "🩺 First Aid", price: "$349.95",   img: BASE_IMG + "prod_myfak-hard-case-3-4.png",       desc: "Waterproof, dustproof, crushproof. 140+ first aid and trauma supplies. HSA/FSA approved. FREE training course included.",                        badge: "🔴 HIGH", url: "https://mymedic.com/products/myfak-waterproof-first-aid-kit" },
  { id: "p4",  name: "MEDIC Portable Med Kit",                brand: "MyMedic",     kits: ["HOME"], category: "🩺 First Aid", price: "$1,499.95", img: BASE_IMG + "prod_Medic-Red-3-4-left.png",        desc: "450+ quality first aid and trauma supplies. Treats 10+ people. Like having a hospital on your back. Lifetime guarantee.",                        badge: "🔴 HIGH", url: "https://mymedic.com/products/the-medic-portable-medical-kit" },
  { id: "p5",  name: "RECON Emergency Med Kit",               brand: "MyMedic",     kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$279.00",   img: BASE_IMG + "prod_Recon-Red-3-4.png",             desc: "200+ life-saving first aid supplies. Military-grade materials. HSA/FSA approved. FREE training course included.",                                badge: "🔴 HIGH", url: "https://mymedic.com/products/recon-first-aid-kit" },
  { id: "p6",  name: "Emergency Mylar Space Blanket (4-pack)",brand: "SOL",         kits: ["HOME","CAR","EVAC"], category: "🏕️ Shelter",   price: "$6.99",     img: BASE_IMG + "prod_spaceblanket.jpg",              desc: "Retains up to 90% of body heat. Multi-purpose survival tool — shelter, ground cover, hypothermia prevention.",                                   badge: "🔴 HIGH", url: "https://a.co/d/0bB4wXfu" },
  { id: "p7",  name: "CPR Face Mask (6-pack)",                brand: "Generic",     kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$6.99",     img: BASE_IMG + "prod_cpr_facemask.jpg",              desc: "Compact CPR face shields, lightweight and portable. Ideal for homes, workplaces, schools, and travel.",                                          badge: "🔴 HIGH", url: "https://a.co/d/08sjBnGK" },
  { id: "p8",  name: "New Skin Liquid Bandage",               brand: "New Skin",    kits: ["HOME","CAR"], category: "🩺 First Aid", price: "$5.99",     img: BASE_IMG + "prod_newskin.jpg",                   desc: "Antiseptic waterproof bandage for scrapes, minor cuts and wounds. Seals out germs and forms a tough, protective barrier.",                       badge: "🟡 MED",  url: "https://a.co/d/0j9dFiW7" },
  { id: "p9",  name: "Finger Splint (4-pack)",                brand: "Generic",     kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$6.99",     img: BASE_IMG + "prod_fingersplint.jpg",              desc: "Relieves finger pain from arthritis, tendonitis, sprains. Stabilizes and immobilizes injured fingers.",                                          badge: "🟡 MED",  url: "https://a.co/d/060ObZMj" },
  { id: "p10", name: "Waterproof First Aid Trauma Kit",       brand: "Generic",     kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$52.99",    img: BASE_IMG + "prod_WaterproofTraumaKit.jpg",       desc: "Easy-access, well-organized interior with labeled pockets. Fully waterproof trauma kit.",                                                        badge: "🔴 HIGH", url: "https://a.co/d/0d5zNH8z" },
  { id: "p11", name: "Mini First Aid Care Kit",               brand: "Generic",     kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$8.99",     img: BASE_IMG + "prod_miniFirstaidkit.jpg",           desc: "150+ professional-grade medical supplies. Bandages, gloves, tourniquet and more. 100% latex free.",                                             badge: "🟡 MED",  url: "https://a.co/d/09V0BVvu" },
  { id: "p12", name: "Medical Tool Kit",                      brand: "EMS XTRM",    kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$14.99",    img: BASE_IMG + "prod_medicTools.jpg",                desc: "First Responder EMT Tactical Kit with essential medical tools. Adjustable belt pouch for easy access.",                                          badge: "🟡 MED",  url: "https://a.co/d/03bvQwIb" },
  { id: "p13", name: "Instant Cold Pack (6-pack)",            brand: "Generic",     kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$9.99",     img: BASE_IMG + "prod_cleverColdPack6.jpg",           desc: "Squeeze to activate — instantly ice cold. No freezer needed. Perfect for any first aid kit.",                                                    badge: "🟡 MED",  url: "https://a.co/d/040s8hdA" },
  { id: "p14", name: "Advil 200mg / 100 Coated Tablets",     brand: "Advil",       kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$10.98",    img: BASE_IMG + "prod_advil100.jpg",                  desc: "Ibuprofen 200mg pain reliever and fever reducer. 100 coated tablets for headache, backache, menstrual and joint pain.",                         badge: "🟡 MED",  url: "https://a.co/d/0iJ19WXn" },
  { id: "p15", name: "Alocane Max Burn Gel 2.5 fl oz",       brand: "Alocane",     kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$7.67",     img: BASE_IMG + "prod_alocane.jpg",                   desc: "4% Lidocaine maximum strength burn and itch relief gel. Infused with aloe vera. Fast-absorbing.",                                                badge: "🟡 MED",  url: "https://a.co/d/08x000R2" },
  { id: "p16", name: "Nitrile Exam Gloves (100 ct)",         brand: "Schneider",   kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$7.49",     img: BASE_IMG + "prod_nitrileGloves100.jpg",          desc: "Medical-grade exam gloves. Powder-free, latex-free. Essential for first aid and sanitation.",                                                    badge: "🔴 HIGH", url: "https://a.co/d/0hLNnwT7" },
  { id: "p17", name: "BAND-AID Assorted Bandages (2-pack)",  brand: "Band-Aid",    kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$17.08",    img: BASE_IMG + "prod_bandaids2.jpg",                 desc: "Twin pack of two 100-count boxes of flexible fabric bandages in assorted sizes for cuts, scrapes, and burns.",                                  badge: "🔴 HIGH", url: "" },
  { id: "p18", name: "3M Nexcare Medical Tape",              brand: "3M Nexcare",  kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$5.49",     img: BASE_IMG + "prod_3M_NexcareTape.jpg",            desc: "Gentle on skin medical tape. Secures bandages and dressings without irritation.",                                                                badge: "🟡 MED",  url: "" },
  { id: "p19", name: "Aquaphor Lip Repair",               brand: "Aquaphor",   kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$6.99",  img: BASE_IMG + "prod_aquaphorLipRepair.jpg",       desc: "Soothes and heals dry, chapped lips. Essential for go-bags and emergency kits.",                                        badge: "🟢 LOW",  url: "" },
  { id: "p20", name: "CeraVe Sunscreen SPF 30",           brand: "CeraVe",     kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$14.99", img: BASE_IMG + "prod_ceraveSunscreen30.jpg",       desc: "Broad spectrum SPF 30 sunscreen. Protects against UVA/UVB rays during outdoor emergency operations.",                    badge: "🟡 MED",  url: "" },
  { id: "p21", name: "Tourniquet",                        brand: "Pakcan",     kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$18.99", img: BASE_IMG + "prod_Pakcan Tourniquet.jpg",        desc: "Reliable one-handed tourniquet for severe limb bleeding. Compact and lightweight for any emergency kit.",                  badge: "🔴 HIGH", url: "" },
  { id: "p22", name: "Cortizone-10 Anti-Itch Cream",      brand: "Cortizone",  kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$7.99",  img: BASE_IMG + "prod_corizone10.jpg",              desc: "Maximum strength 1% hydrocortisone. Relieves insect bites, rashes, and skin irritation.",                                 badge: "🟡 MED",  url: "" },
  { id: "p23", name: "Neosporin Antibiotic Ointment 1oz", brand: "Neosporin",  kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$8.49",  img: BASE_IMG + "prod_neosporin1oz.jpg",            desc: "Triple antibiotic ointment prevents infection in cuts, scrapes, and burns. 1oz tube.",                                    badge: "🔴 HIGH", url: "" },
  { id: "p24", name: "Alcohol Prep Pads",                 brand: "Curad",      kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$4.99",  img: BASE_IMG + "prod_curadAlcoholPrepPads.jpg",    desc: "Sterile 70% isopropyl alcohol prep pads. Cleans skin before injections and wound care.",                                 badge: "🔴 HIGH", url: "" },
  { id: "p25", name: "Hand Sanitizer (6-pack)",           brand: "Germ-X",     kits: ["HOME","CAR","EVAC"], category: "🧼 Hygiene",   price: "$12.99", img: BASE_IMG + "prod_germx6pk.jpg",                desc: "Advanced hand sanitizer with moisturizers. 6-pack for home, car, and go-bag placement.",                                 badge: "🔴 HIGH", url: "" },
  { id: "p26", name: "Bonine Motion Sickness (16 ct)",    brand: "Bonine",     kits: ["CAR","EVAC"], category: "🩺 First Aid", price: "$9.99",  img: BASE_IMG + "prod_bonine16.jpg",                desc: "Non-drowsy motion sickness relief. 16 chewable tablets for evacuation travel.",                                          badge: "🟡 MED",  url: "" },
  { id: "p27", name: "Eye Wash Solution",                 brand: "PhysiCare",  kits: ["HOME","EVAC"], category: "🩺 First Aid", price: "$6.99",  img: BASE_IMG + "prod_PhysCareEyewash.jpg",         desc: "Sterile saline eye wash for flushing debris, chemicals, and smoke irritants from eyes.",                                 badge: "🔴 HIGH", url: "" },
  { id: "p28", name: "Gauze Roll Bandage",                brand: "Band-Aid",   kits: ["HOME","CAR","EVAC"], category: "🩺 First Aid", price: "$5.99",  img: BASE_IMG + "prod_bandaidGuazeRoll.jpg",        desc: "Sterile gauze roll for wrapping wounds, securing dressings, and managing bleeding.",                                      badge: "🔴 HIGH", url: "" },
  { id: "p29", name: "Hero Home First Aid Backpack",      brand: "Hero Home",  kits: ["HOME","EVAC"], category: "🎒 Go-Bag",   price: "$89.99", img: BASE_IMG + "prod_firstaid_backpack_hh02_.jpg", desc: "Hero Home branded emergency first aid backpack. Pre-organized with essential trauma and first aid supplies.",               badge: "🔴 HIGH", url: "" },
  { id: "p30", name: "Hero Home Mini First Aid Kit",      brand: "Hero Home",  kits: ["HOME","CAR","EVAC"], category: "🎒 Go-Bag",   price: "$34.99", img: BASE_IMG + "prod_firstaid_mini_hh01_.jpg",     desc: "Compact Hero Home branded first aid kit. Essential supplies in a portable, lightweight case.",                            badge: "🔴 HIGH", url: "" },
  { id: "p31", name: "Hero Home Hard Case First Aid Kit", brand: "Hero Home",  kits: ["HOME"], category: "🎒 Go-Bag",   price: "$59.99", img: BASE_IMG + "prod_firstaid_hardcase_hh01_.jpg", desc: "Rugged hard-shell Hero Home first aid kit. Waterproof and crush-proof for extreme conditions.",                          badge: "🔴 HIGH", url: "" },
  { id: "p32", name: "Hero Home Mini First Aid Kit v2",   brand: "Hero Home",  kits: ["HOME","CAR","EVAC"], category: "🎒 Go-Bag",   price: "$29.99", img: BASE_IMG + "prod_firstaid_mini_hh02_.jpg",     desc: "Second edition Hero Home mini kit with updated supply selection for everyday carry.",                                    badge: "🔴 HIGH", url: "" },

  // ── HOME Kit items (FEMA/Ready.gov recommended) ───────────────────────────
  { id: "h1",  name: "3-Day Emergency Food Supply Kit",      brand: "FEMA Ready", kits: ["HOME"], category: "🥫 Food & Water", price: "$49.99", img: GEN_IMG + "2e276ce3f_generated_image.png", desc: "FEMA-recommended 3-day food supply for one person. Includes shelf-stable meals, energy bars, and water pouches. No cooking required.", badge: "🔴 HIGH", url: "" },
  { id: "h2",  name: "Home Water Storage Kit (55-Gallon)",   brand: "WaterBOB",   kits: ["HOME"], category: "💧 Water",         price: "$34.99", img: GEN_IMG + "2577b6045_generated_image.png", desc: "FEMA recommends 1 gallon per person per day. This 55-gallon emergency water storage system fits in any standard bathtub and keeps water fresh up to 16 weeks.", badge: "🔴 HIGH", url: "" },
  { id: "h3",  name: "Portable Power Station 500W",          brand: "Jackery",    kits: ["HOME"], category: "⚡ Power",         price: "$299.99", img: GEN_IMG + "215cf4752_generated_image.png", desc: "FEMA recommends backup power for medical devices, lighting, and communication. 500Wh capacity with AC outlets, USB-C, and solar charging input.", badge: "🔴 HIGH", url: "" },
  { id: "h4",  name: "NOAA Emergency Weather Alert Radio",   brand: "Midland",    kits: ["HOME","CAR","EVAC"], category: "📻 Communication", price: "$39.99", img: GEN_IMG + "91d11346c_generated_image.png", desc: "FEMA and Ready.gov essential item. Hand-crank + solar + battery NOAA weather alert radio with USB phone charger and LED flashlight.", badge: "🔴 HIGH", url: "" },
  { id: "h5",  name: "Emergency Document Organizer",         brand: "Pelican",    kits: ["HOME","EVAC"], category: "📄 Documents", price: "$24.99", img: GEN_IMG + "0281bc321_generated_image.png", desc: "FEMA recommends waterproof storage of critical documents. Fireproof and waterproof organizer holds passports, insurance docs, Social Security cards, and more.", badge: "🔴 HIGH", url: "" },
  { id: "h6",  name: "Emergency Escape Rope Ladder (2-Story)",brand: "ResQLadder", kits: ["HOME"], category: "🪜 Escape",       price: "$54.99", img: GEN_IMG + "666cfe9c4_generated_image.png", desc: "FEMA recommends a home escape plan with 2 exits per room. Anti-slip rungs, 13-ft length, holds up to 1,000 lbs. Deploys in seconds from a window.", badge: "🔴 HIGH", url: "" },
  { id: "h7",  name: "Home Water Filter System",             brand: "LifeStraw",  kits: ["HOME"], category: "💧 Water",         price: "$69.99", img: GEN_IMG + "fa5472e03_generated_image.png", desc: "Ready.gov recommends water filtration as a core preparedness item. Gravity-fed filter for family of 4, removes 99.9999% of bacteria and protozoa from 4,755 gallons.", badge: "🔴 HIGH", url: "" },
  { id: "h8",  name: "Emergency Sleeping Bags (2-Pack)",     brand: "SOL",        kits: ["HOME","EVAC"], category: "🏕️ Shelter",   price: "$29.99", img: GEN_IMG + "fcf0fce32_generated_image.png", desc: "FEMA shelter-in-place supplies include emergency bedding. Reflective bivy bags retain 90% body heat. Compact and waterproof.", badge: "🟡 MED",  url: "" },
  { id: "h9",  name: "N95 Respirator Masks (20-Pack)",       brand: "3M",         kits: ["HOME","EVAC"], category: "😷 Protection", price: "$22.99", img: GEN_IMG + "fb0c5186f_generated_image.png", desc: "CDC and FEMA recommend N95 masks for wildfire smoke, dust, and airborne hazards. NIOSH-approved. Adjustable nose clip for secure fit.", badge: "🔴 HIGH", url: "" },
  { id: "h10", name: "Camp Stove with Fuel Canister",        brand: "MSR",        kits: ["HOME","EVAC"], category: "🍳 Cooking",    price: "$44.99", img: GEN_IMG + "ebd58b0ee_generated_image.png", desc: "FEMA recommends an alternate cooking source. Compact canister stove boils 1L in 3.5 min. Includes windscreen and 2 fuel canisters.", badge: "🔴 HIGH", url: "" },

  // ── CAR Kit items (FEMA/AAA recommended) ─────────────────────────────────
  { id: "c1",  name: "Heavy-Duty Jumper Cables (20 ft)",     brand: "AAA",        kits: ["CAR"], category: "🚗 Car Emergency", price: "$27.99", img: GEN_IMG + "ce1f58894_generated_image.png", desc: "AAA and FEMA recommend jumper cables in every vehicle emergency kit. Heavy-duty 4-gauge copper clad, 20-ft reach for large vehicle gaps.", badge: "🔴 HIGH", url: "" },
  { id: "c2",  name: "Emergency Roadside Triangle Kit (3-pk)",brand: "Wagan",      kits: ["CAR"], category: "🚗 Car Emergency", price: "$19.99", img: GEN_IMG + "dea424055_generated_image.png", desc: "FEMA roadside emergency kit essential. 3 DOT-approved reflective triangles with hard case. Warn oncoming traffic of a stalled vehicle at night or in poor visibility.", badge: "🔴 HIGH", url: "" },
  { id: "c3",  name: "Tire Inflator & Sealant Kit",           brand: "JACO",       kits: ["CAR"], category: "🚗 Car Emergency", price: "$32.99", img: GEN_IMG + "de7bbca35_generated_image.png", desc: "Ready.gov vehicle kit must-have. Portable 12V air compressor + tire sealant handles flats and low pressure without a spare tire change.", badge: "🔴 HIGH", url: "" },
  { id: "c4",  name: "Car Emergency Survival Kit",            brand: "Lifeline",   kits: ["CAR"], category: "🚗 Car Emergency", price: "$39.99", img: GEN_IMG + "9fac71ee3_generated_image.png", desc: "AAA-recommended 42-piece roadside emergency kit. Jumper cables, tow rope, poncho, first aid, gloves, flashlight, and safety vest in a compact bag.", badge: "🔴 HIGH", url: "" },
  { id: "c5",  name: "LED Headlamp (2-Pack)",                 brand: "Black Diamond", kits: ["CAR","EVAC"], category: "🔦 Lighting", price: "$24.99", img: GEN_IMG + "b48e1842f_generated_image.png", desc: "FEMA recommends a flashlight in every emergency kit. Hands-free LED headlamp with 3 modes, 300 lumens, and water-resistant. 2-pack for car and go-bag.", badge: "🔴 HIGH", url: "" },
  { id: "c6",  name: "Two-Way GMRS Radios (Pair)",            brand: "Midland",    kits: ["CAR","EVAC","HOME"], category: "📡 Communication", price: "$49.99", img: GEN_IMG + "9e3ca6a64_generated_image.png", desc: "FEMA recommends communication devices that work without cell towers. 30-mile range, 22 channels, weather alert, and rechargeable batteries. Works car-to-car during evacuations.", badge: "🔴 HIGH", url: "" },
  { id: "c7",  name: "MRE Meals (3-Day Supply, 9 meals)",    brand: "XMRE",       kits: ["CAR","EVAC"], category: "🥫 Food",        price: "$54.99", img: GEN_IMG + "936c9a45e_generated_image.png", desc: "FEMA recommends 3-day food supply in your car kit. Military-grade MREs require no cooking or refrigeration. 5-year shelf life. 1,200+ calories per meal.", badge: "🔴 HIGH", url: "" },

  // ── EVAC Kit items (FEMA Go-Bag / 72-hr kit) ─────────────────────────────
  { id: "e1",  name: "72-Hour Emergency Go-Bag Backpack",     brand: "Ready America", kits: ["EVAC"], category: "🎒 Go-Bag",  price: "$79.99", img: GEN_IMG + "f3aaae8c1_generated_image.png", desc: "FEMA 72-hour evacuation kit for 1 person. Includes food bars, water pouches, emergency blanket, poncho, whistle, light stick, first aid kit, and N95 mask.", badge: "🔴 HIGH", url: "" },
];



const HEADER_NAV = [
  { id: "supplies", label: "SUPPLIES" },
  { id: "shop", label: "SHOP" },
  { id: "education", label: "EDUCATION" },
];

const MOBILE_NAV_ITEMS = [
  { id: "supplies", icon: "🎒", label: "Supplies" },
  { id: "shop", icon: "🛒", label: "Shop" },
  { id: "education", icon: "📚", label: "Education" },
  { id: "resources", icon: "🔗", label: "Resources" },
  { id: "community", icon: "👥", label: "Community" },
];


const EDUCATION_TOPICS = [
{ id: "cpr", icon: "❤️", title: "CPR Basics", level: "Essential", time: "8 min" },
{ id: "wound", icon: "🩸", title: "Wound Treatment", level: "Essential", time: "5 min" },
{ id: "fire", icon: "🔥", title: "Kitchen Fire Safety", level: "Essential", time: "4 min" },
{ id: "choking", icon: "👶", title: "Helping a Choking Child", level: "Essential", time: "6 min" },
{ id: "flood", icon: "🌊", title: "Flood Response", level: "Advanced", time: "10 min" },
{ id: "earthquake", icon: "🌪️", title: "Earthquake Protocol", level: "Advanced", time: "12 min" },
{ id: "wildfire", icon: "🔶", title: "Wildfire Evacuation", level: "Advanced", time: "9 min" },
{ id: "shelter", icon: "🏕️", title: "Emergency Shelter-in-Place", level: "Essential", time: "7 min" },
{ id: "water", icon: "💧", title: "Water Safety & Purification", level: "Essential", time: "6 min" },
{ id: "comms", icon: "📡", title: "Emergency Communications", level: "Advanced", time: "8 min" },
{ id: "mental", icon: "🧠", title: "Mental Health in Disasters", level: "Essential", time: "10 min" },
{ id: "pets", icon: "🐾", title: "Emergency Planning for Pets", level: "Essential", time: "5 min" }];


export default function HeroHome() {
  const [phase, setPhase] = useState("landing");
  const [activeNav, setActiveNav] = useState("supplies");

  useEffect(() => {
    const handler = (e) => setActiveNav(e.detail || "supplies");
    window.addEventListener("hero-navigate", handler);
    return () => window.removeEventListener("hero-navigate", handler);
  }, []);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [formData, setFormData] = useState({ email: "", address: "Los Angeles, California", adults: 1, children: 0 });
  const [chatMessages, setChatMessages] = useState([
  { role: "agent", text: "Hello! I'm your Hero Agent. Ask me anything about emergency preparedness, supplies, or your home safety." }]
  );
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [agentDrawerOpen, setAgentDrawerOpen] = useState(false);
  const [shopQuickView, setShopQuickView] = useState(null);
  const [shopKitTab, setShopKitTab] = useState("ALL");
  const [headerAgentInput, setHeaderAgentInput] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // profile is just another nav option — no separate state needed
  const [completedLessons, setCompletedLessons] = useState({});
  const [lessonResults, setLessonResults] = useState({}); // { topicId: { passed, score } }
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [supplyReadiness, setSupplyReadiness] = useState(0); // driven by SuppliesPanel local state
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [alertCartNotif, setAlertCartNotif] = useState(null);
  const [heroRatingOpen, setHeroRatingOpen] = useState(false);
  const [showSuppliesTutorial, setShowSuppliesTutorial] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      setCartItems(prev => {
        const existing = prev.find(c => c.item.id === e.detail.item.id);
        if (existing) return prev.map(c => c.item.id === e.detail.item.id ? { ...c, qty: c.qty + e.detail.qty } : c);
        return [...prev, e.detail];
      });
      setCartOpen(true);
    };
    window.addEventListener("hero-cart-add", handler);
    return () => window.removeEventListener("hero-cart-add", handler);
  }, []);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(42,188,186,0.06), transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Supply readiness is driven by SuppliesPanel local state via onReadinessChange callback

  const lessonCount = EDUCATION_TOPICS.length;
  const completedCount = Object.keys(completedLessons).length;
  const eduPct = Math.round((completedCount / lessonCount) * 100);
  const heroRating = Math.min(100, Math.round((supplyReadiness + eduPct) / 2));

  const toggleLesson = (id) => {
    setCompletedLessons(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      return next;
    });
  };

  const handleLessonComplete = (topicId, passed, score) => {
    setLessonResults(prev => ({ ...prev, [topicId]: { passed, score } }));
    if (passed) {
      setCompletedLessons(prev => ({ ...prev, [topicId]: true }));
    } else {
      setCompletedLessons(prev => { const n = { ...prev }; delete n[topicId]; return n; });
    }
  };

  const openAgentWithMessage = (msg) => {
    if (msg) setChatInput(msg);
    setAgentDrawerOpen(true);
  };

  const sendHeaderAgent = () => {
    if (!headerAgentInput.trim()) return;
    const msg = headerAgentInput.trim();
    setHeaderAgentInput("");
    // On non-home pages, open the drawer; on home page, show inline in bento
    if (activeNav !== "home") setAgentDrawerOpen(true);
    setChatMessages(prev => [...prev, { role: "user", text: msg }]);
    setChatLoading(true);
    import("@/api/base44Client").then(({ base44 }) => {
      base44.integrations.Core.InvokeLLM({
        prompt: `You are Hero Agent, an AI-powered emergency preparedness guide. The user's address is "${formData.address || "Hero Home Island, CA"}" with ${formData.adults} adults and ${formData.children} children. Answer concisely.\n\nUser: ${msg}`
      }).then(reply => {
        setChatMessages(prev => [...prev, { role: "agent", text: reply }]);
        setChatLoading(false);
      }).catch(() => {
        setChatMessages(prev => [...prev, { role: "agent", text: "Sorry, couldn't connect. Try again." }]);
        setChatLoading(false);
      });
    });
  };

  // Alert → Supplies mapping
  const ALERT_SUPPLY_MAP = {
    wildfire: ["m11", "g4", "t1", "t2", "t3", "s3", "g1", "w1", "w3", "t8", "m1"],
    fire: ["t8", "m11", "g4", "t1", "m1", "s3", "w1"],
    flood: ["w1", "w2", "w3", "w4", "w5", "s1", "s2", "s3", "d1", "h6", "h7", "g1", "t1", "t2"],
    earthquake: ["m1", "m6", "t4", "t10", "t1", "t2", "w1", "f1", "f2", "k1", "k2", "s5", "t8"],
    wind: ["t5", "t1", "t2", "t3", "s3", "w1"],
    tornado: ["s1", "s2", "t1", "t2", "w1", "f1", "m1", "g1"],
    hurricane: ["w1", "w2", "f1", "f2", "t1", "t2", "t3", "m1", "s3", "h1", "h2", "d1", "g1"],
    tsunami: ["g1", "g2", "w1", "f1", "t1", "t2", "s3", "d1"],
    hazmat: ["m11", "g4", "m12", "h2", "s3", "t1"],
    smoke: ["m11", "g4", "t2", "w1"],
    heat: ["w1", "w2", "w5", "s3", "m3", "c1"],
    winter: ["s1", "s2", "s4", "t3", "f1", "f3", "k2", "t1", "c1"],
    ice: ["s5", "t3", "f1", "t1", "s1"],
    default: ["w1", "f1", "m1", "t1", "t2", "t3", "g1"],
  };

  const handleSuppliesFromAlerts = () => {
    // Determine which alert keywords apply
    const activeAlertTexts = noaaAlerts.length > 0
      ? noaaAlerts.map(a => ((a.properties?.event || "") + " " + (a.properties?.headline || "")).toLowerCase())
      : ["wildfire watch", "flood watch", "wind advisory"];

    const keywords = Object.keys(ALERT_SUPPLY_MAP).filter(kw =>
      kw !== "default" && activeAlertTexts.some(t => t.includes(kw))
    );
    if (keywords.length === 0) keywords.push("default");

    const itemIds = new Set();
    keywords.forEach(kw => ALERT_SUPPLY_MAP[kw].forEach(id => itemIds.add(id)));

    // Find all supply items from supplyData matching the IDs
    import("@/lib/supplyData").then(({ ALL_SUPPLIES }) => {
      const toAdd = [];
      itemIds.forEach(id => {
        const item = ALL_SUPPLIES.find(s => s.id === id);
        if (!item) return;
        // Check if already stocked — we don't have access to allQtys here, so we check cartItems
        // and skip if user already has it in the cart. The "stocked" check is best-effort via cart.
        const alreadyInCart = cartItems.find(c => c.item.id === id);
        if (!alreadyInCart) {
          toAdd.push({ item, qty: 1 });
        }
      });

      if (toAdd.length === 0) {
        setAlertCartNotif({ count: 0, msg: "All alert-related supplies are already in your cart!" });
      } else {
        // Add to cart
        setCartItems(prev => {
          const next = [...prev];
          toAdd.forEach(({ item, qty }) => {
            const existing = next.find(c => c.item.id === item.id);
            if (existing) existing.qty += qty;
            else next.push({ item, qty });
          });
          return next;
        });
        setAlertCartNotif({ count: toAdd.length, msg: `${toAdd.length} alert-related supplies added to your cart!` });
      }
      setTimeout(() => setAlertCartNotif(null), 4000);
    });
  };

  // Weather state
  const [noaaData, setNoaaData] = useState(null);
  const [noaaAlerts, setNoaaAlerts] = useState([]);
  const [noaaLoading, setNoaaLoading] = useState(false);
  const [noaaError, setNoaaError] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const fetchNOAAWeather = useCallback(async () => {
    setNoaaLoading(true);
    setNoaaError(null);
    try {
      const lat = 34.05;
      const lon = -118.24;
      const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
        headers: { "User-Agent": "HeroHomeApp/1.0 (contact@herohome.app)" }
      });
      const pointJson = await pointRes.json();
      const { forecast: forecastUrl, relativeLocation } = pointJson.properties;
      const [fcRes, alertRes] = await Promise.all([
        fetch(forecastUrl, { headers: { "User-Agent": "HeroHomeApp/1.0" } }),
        fetch(`https://api.weather.gov/alerts/active?point=${lat},${lon}`, { headers: { "User-Agent": "HeroHomeApp/1.0" } })
      ]);
      const fcJson = await fcRes.json();
      const alertJson = await alertRes.json();
      setForecastData(fcJson.properties.periods.slice(0, 7));
      setNoaaData({ location: relativeLocation?.properties?.city || "Los Angeles", lat, lon });
      setNoaaAlerts(alertJson.features?.slice(0, 5) || []);
    } catch (e) {
      setNoaaError("Could not load NOAA data. Check your connection.");
    }
    setNoaaLoading(false);
  }, []);

  useEffect(() => { fetchNOAAWeather(); }, [fetchNOAAWeather]);

  // ─── UI Overlays ─────────────────────────────────────────────────────────────

  const renderLanding = () =>
  <div style={styles.overlay}>
      <div style={styles.landingCard}>
        <div>
          <div style={styles.logoGlow}>
            <img
            src="https://media.base44.com/images/public/69a6417e6f00bff3da12ccd4/572df7cb1_logo_herohome_large05a.png"
            alt="Hero Home"
            style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto 8px" }} />
            <div style={styles.logoSub}>EMERGENCY COMMAND SYSTEM</div>
          </div>
          <p style={styles.tagline}>
            Become the hero of your own home. Your journey begins here.
          </p>
          <div style={styles.divider} />
        </div>
        <div>
          <button style={styles.primaryBtn} onClick={() => setPhase("signup")}>
            Begin Your Journey →
          </button>
          <div style={styles.hint}>Click to Begin</div>
        </div>
      </div>
    </div>;


  const renderSignup = () =>
  <div style={styles.overlay}>
      <div style={{ ...styles.landingCard }}>
        <div>
          <div style={styles.stepBadge}>STEP 1 OF 5</div>
          <h2 style={styles.cardTitle}>Create Your Free Account</h2>
          <p style={styles.cardSub}>Join the Hero Home community</p>
          <input
          style={styles.input}
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div>
          <button style={styles.primaryBtn} onClick={() => setPhase("onboarding")}>
            Continue with Email →
          </button>
          <div style={styles.orDivider}><span>or continue with</span></div>
          <div style={styles.socialRow}>
            <button style={styles.socialBtn}>🔵 Google</button>
            <button style={styles.socialBtn}>📘 Facebook</button>
          </div>
        </div>
      </div>
    </div>;


  const renderOnboarding = () =>
  <div style={styles.overlay}>
      <div style={styles.agentCard}>
        <div>
          <div style={styles.agentHeader}>
            <div style={styles.agentAvatar}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={styles.agentName}>HERO AGENT</div>
              <div style={styles.agentStatus}>● ONLINE</div>
            </div>
            <button style={styles.backBtn} onClick={() => setPhase("signup")}>← Back</button>
          </div>
          <div style={styles.agentMessage}>
            "Welcome to <span style={styles.highlight}>Hero Home</span>. We are going to first help you manage your emergency and disaster supplies. Let me ask you a few questions."
          </div>
        </div>
        <button style={styles.primaryBtn} onClick={() => setPhase("q1")}>
          Ready, let's go →
        </button>
      </div>
    </div>;


  const renderQ1 = () =>
  <div style={styles.overlay}>
      <div style={styles.agentCard}>
        <div>
          <div style={styles.agentHeader}>
            <div style={styles.agentAvatar}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={styles.agentName}>HERO AGENT</div>
              <div style={styles.agentStatus}>● ONLINE</div>
            </div>
            <div style={styles.stepBadge}>QUESTION 1/3</div>
            <button style={styles.backBtn} onClick={() => setPhase("onboarding")}>← Back</button>
          </div>
          <div style={styles.agentMessage}>"Where do you live?"</div>
          <input
          style={styles.input}
          placeholder="Enter your home address..."
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        </div>
        <button style={styles.primaryBtn} onClick={() => setPhase("q2")}>
          Confirm Location →
        </button>
      </div>
    </div>;


  const renderQ2 = () =>
  <div style={styles.overlay}>
      <div style={styles.agentCard}>
        <div>
          <div style={styles.agentHeader}>
            <div style={styles.agentAvatar}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={styles.agentName}>HERO AGENT</div>
              <div style={styles.agentStatus}>● ONLINE</div>
            </div>
            <div style={styles.stepBadge}>QUESTION 2/3</div>
            <button style={styles.backBtn} onClick={() => setPhase("q1")}>← Back</button>
          </div>
          <div style={styles.agentMessage}>"How many people are in your household?"</div>
          <div style={styles.counterRow}>
            <div style={styles.counter}>
              <div style={styles.counterLabel}>Adults</div>
              <div style={styles.counterControls}>
                <button style={styles.counterBtn} onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}>−</button>
                <span style={styles.counterVal}>{formData.adults}</span>
                <button style={styles.counterBtn} onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}>+</button>
              </div>
            </div>
            <div style={styles.counter}>
              <div style={styles.counterLabel}>Children</div>
              <div style={styles.counterControls}>
                <button style={styles.counterBtn} onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}>−</button>
                <span style={styles.counterVal}>{formData.children}</span>
                <button style={styles.counterBtn} onClick={() => setFormData({ ...formData, children: formData.children + 1 })}>+</button>
              </div>
            </div>
          </div>
        </div>
        <button style={styles.primaryBtn} onClick={() => setPhase("q3")}>
          That's right →
        </button>
      </div>
    </div>;


  const renderQ3 = () =>
  <div style={styles.overlay}>
      <div style={styles.agentCard}>
        <div>
          <div style={styles.agentHeader}>
            <div style={styles.agentAvatar}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={styles.agentName}>HERO AGENT</div>
              <div style={styles.agentStatus}>● ONLINE</div>
            </div>
            <div style={styles.stepBadge}>QUESTION 3/3</div>
            <button style={styles.backBtn} onClick={() => setPhase("q2")}>← Back</button>
          </div>
          <div style={styles.agentMessage}>"That's all we need! Let's start making your home a <span style={styles.highlight}>Hero Home</span>."</div>
          <div style={styles.summaryBox}>
            <div style={styles.summaryRow}><span>📍</span> {formData.address || "Hero Home Island, CA"}</div>
            <div style={styles.summaryRow}><span>👨‍👩‍👧</span> {formData.adults} Adults, {formData.children} Children</div>
            <div style={styles.summaryRow}><span>🛡️</span> Hazard analysis: Wildfire, Earthquake, Flood</div>
          </div>
        </div>
        <button style={styles.primaryBtn} onClick={() => setPhase("dashboard")}>
          Activate My Hero System →
        </button>
      </div>
    </div>;


  const renderDashboard = () =>
  <div style={styles.dashWrapper}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,188,186,0.07) 0%, transparent 70%)", top: -100, left: -100, animation: "blob 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(50,137,226,0.06) 0%, transparent 70%)", bottom: -50, right: 200, animation: "blob2 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(226,99,50,0.04) 0%, transparent 70%)", top: "40%", right: -80, animation: "blob 28s ease-in-out infinite reverse" }} />
      </div>
      {/* Mouse spotlight */}
      <div ref={spotlightRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, transition: "background 0.1s" }} />
      {/* Top Bar — 2 rows on desktop */}
      <div style={{ ...styles.topBar, zIndex: 20, height: "auto", flexDirection: "column", padding: 0 }}>
        {/* Row 1: Logo | Nav Links | Search | Actions */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "0 20px", height: 64, gap: 0 }}>
          {/* Logo */}
          <div style={{ flexShrink: 0, marginRight: 20 }}>
            <img src="https://media.base44.com/images/public/69a6417e6f00bff3da12ccd4/572df7cb1_logo_herohome_large05a.png" alt="Hero Home" style={{ height: 34, display: "block" }} />
          </div>

          {/* Desktop nav links */}
          <div className="header-nav-links" style={{ display: "flex", alignItems: "center", gap: 4, marginRight: 20, flexShrink: 0 }}>
            {HEADER_NAV.map(nav => (
              <button
                key={nav.id}
                onClick={() => setActiveNav(nav.id)}
                style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: activeNav === nav.id ? "rgba(42,188,186,0.12)" : "transparent", color: activeNav === nav.id ? "#2ABCBA" : "rgba(0,0,0,0.55)", fontWeight: activeNav === nav.id ? 700 : 600, fontSize: 13, cursor: "pointer", letterSpacing: 1, fontFamily: "'Inter', sans-serif", transition: "all 0.15s" }}
              >{nav.label}</button>
            ))}
          </div>

          {/* Search bar — flex:1 to fill remaining space */}
          <div style={{ flex: 1, position: "relative" }}>
            <input
              style={{ width: "100%", padding: "9px 40px 9px 16px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 24, fontSize: 13, color: "#1a1a2e", fontFamily: "'Inter', sans-serif", outline: "none" }}
              placeholder="Ask Anything! I am here to guide you..."
              value={headerAgentInput}
              onChange={e => setHeaderAgentInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendHeaderAgent()}
            />
            <button onClick={sendHeaderAgent} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "rgba(0,0,0,0.35)", padding: 0 }}>🔍</button>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 12, flexShrink: 0 }}>
            {/* Hero Rating */}
            <div id="hero-rating-badge" onClick={() => setHeroRatingOpen(true)} className="top-bar-score" style={{ background: "rgba(42,188,186,0.07)", border: "1px solid rgba(42,188,186,0.25)", borderRadius: 8, padding: "5px 12px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 9, color: "rgba(0,0,0,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>Hero Rating</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#2ABCBA", lineHeight: 1 }}>{heroRating}%</div>
            </div>
            <button style={{ ...styles.iconBtn, position: "relative" }} title="Cart" onClick={() => setCartOpen(v => !v)}>
              🛒
              {cartItems.length > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, background: "#E26332", color: "#fff", borderRadius: "50%", fontSize: 9, fontWeight: 800, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartItems.length}</span>
              )}
            </button>
            <button style={{ ...styles.iconBtn, background: activeNav === "profile" ? "rgba(42,188,186,0.12)" : "rgba(0,0,0,0.04)", border: activeNav === "profile" ? "1px solid rgba(42,188,186,0.4)" : "1px solid rgba(0,0,0,0.08)", color: activeNav === "profile" ? "#2ABCBA" : "inherit" }} title="Profile" onClick={() => setActiveNav("profile")}>👤</button>
            <button className="mobile-nav-btn" style={{ ...styles.iconBtn, fontSize: 18 }} onClick={() => setMobileNavOpen(v => !v)}>{mobileNavOpen ? "✕" : "☰"}</button>
          </div>
        </div>
      </div>

      {/* Profile — rendered inside content panel, header stays visible */}

      {/* Alert Cart Notification */}
      {alertCartNotif && (
        <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: "#fff", border: "1px solid rgba(42,188,186,0.4)", borderRadius: 10, padding: "14px 22px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 12, animation: "slideUp 0.3s ease", minWidth: 280 }}>
          <span style={{ fontSize: 24 }}>{alertCartNotif.count > 0 ? "🛒" : "✅"}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{alertCartNotif.count > 0 ? "Supplies Added!" : "Already Covered"}</div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>{alertCartNotif.msg}</div>
          </div>
          {alertCartNotif.count > 0 && (
            <button onClick={() => { setCartOpen(true); setAlertCartNotif(null); }} style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 700, padding: "8px 14px", cursor: "pointer" }}>View →</button>
          )}
        </div>
      )}

      {/* Hero Rating Modal */}
      {heroRatingOpen && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250 }} onClick={() => setHeroRatingOpen(false)}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 480, width: "90%", padding: "28px 32px", boxShadow: "0 24px 60px rgba(0,0,0,0.2)", animation: "slideUp 0.25s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(42,188,186,0.8)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Your Score</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>Hero Rating Breakdown</div>
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#2ABCBA" }}>{heroRating}%</div>
            </div>

            {/* Supply Readiness */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>🎒 Supply Readiness</div>
                  <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)" }}>Based on FEMA-recommended inventory items stocked</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#2ABCBA" }}>{supplyReadiness}%</div>
              </div>
              <div style={{ height: 8, background: "rgba(0,0,0,0.07)", borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${supplyReadiness}%`, background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 4, transition: "width 0.5s" }} />
              </div>
            </div>

            {/* Education */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>📚 Education Progress</div>
                  <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)" }}>{completedCount} of {lessonCount} lessons passed</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#3289E2" }}>{eduPct}%</div>
              </div>
              <div style={{ height: 8, background: "rgba(0,0,0,0.07)", borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${eduPct}%`, background: "linear-gradient(90deg, #3289E2, #2ABCBA)", borderRadius: 4, transition: "width 0.5s" }} />
              </div>
            </div>

            <div style={{ background: "rgba(42,188,186,0.06)", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "rgba(0,0,0,0.6)", lineHeight: 1.6, marginBottom: 20 }}>
              Your Hero Rating is calculated as the average of your Supply Readiness and Education Progress. Complete more lessons and stock more supplies to improve your score.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setHeroRatingOpen(false); setActiveNav("supplies"); }} style={{ flex: 1, background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "12px", cursor: "pointer" }}>Improve Supplies →</button>
              <button onClick={() => { setHeroRatingOpen(false); setActiveNav("education"); }} style={{ flex: 1, background: "rgba(50,137,226,0.1)", border: "1px solid rgba(50,137,226,0.3)", borderRadius: 8, color: "#3289E2", fontSize: 13, fontWeight: 700, padding: "12px", cursor: "pointer" }}>Start Lessons →</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, background: "rgba(255,255,255,0.99)", borderBottom: "1px solid rgba(42,188,186,0.2)", zIndex: 50, padding: "8px 0", animation: "slideUp 0.2s ease" }}>
          {MOBILE_NAV_ITEMS.map(item => (
            <button key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 24px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
              onClick={() => { setActiveNav(item.id); setMobileNavOpen(false); }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: activeNav === item.id ? "#2ABCBA" : "rgba(0,0,0,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>{item.label}</span>
            </button>
          ))}
          <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "4px 24px" }} />
          <button style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 24px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onClick={() => { setCartOpen(true); setMobileNavOpen(false); }}>
            <span style={{ fontSize: 18 }}>🛒</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>Cart {cartItems.length > 0 ? `(${cartItems.length})` : ""}</span>
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 24px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onClick={() => { setActiveNav("profile"); setMobileNavOpen(false); }}>
            <span style={{ fontSize: 18 }}>👤</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: activeNav === "profile" ? "#2ABCBA" : "rgba(0,0,0,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>Profile</span>
          </button>
        </div>
      )}

      {/* Content Panel — no sidebar, full width */}
      <div className="content-panel-full" style={{ ...styles.contentPanel, left: 0, zIndex: 10 }}>
        <>
          {activeNav === "profile" && (
            <ProfilePage
              formData={formData}
              heroRating={heroRating}
              supplyReadiness={supplyReadiness}
              eduPct={eduPct}
              completedCount={completedCount}
              lessonCount={lessonCount}
              noaaData={noaaData}
              noaaAlerts={noaaAlerts}
              noaaLoading={noaaLoading}
              noaaError={noaaError}
              forecastData={forecastData}
              fetchNOAAWeather={fetchNOAAWeather}
              onClose={() => setActiveNav("supplies")}
            />
          )}
          {activeNav === "supplies" && renderSuppliesPanel()}
          {activeNav === "shop" && renderShopPanel()}
          {activeNav === "education" && renderEducationPanel()}
          {activeNav === "resources" && renderResourcesPanel()}
          {activeNav === "community" && renderCommunityPanel()}
        </>
      </div>

      {/* Global Hero Agent Drawer */}
      {agentDrawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 450 }} onClick={() => setAgentDrawerOpen(false)}>
          <div style={{ position: "fixed", bottom: 0, right: 0, width: "clamp(320px, 33.333%, 100%)", background: "#ffffff", borderTop: "2px solid rgba(42,188,186,0.3)", borderLeft: "1px solid rgba(42,188,186,0.2)", borderRadius: "20px 20px 0 0", boxShadow: "0 -8px 40px rgba(0,0,0,0.15)", padding: 24, maxHeight: "60vh", display: "flex", flexDirection: "column", animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2ABCBA", letterSpacing: 3, textTransform: "uppercase" }}>🤖 Hero Agent</div>
                <div style={{ fontSize: 10, color: "rgba(42,188,186,0.7)", marginTop: 2 }}>● ONLINE — Emergency Preparedness Guide</div>
              </div>
              <button onClick={() => setAgentDrawerOpen(false)} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 20, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "rgba(0,0,0,0.5)" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, minHeight: 0, marginBottom: 16 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: msg.role === "user" ? "12px 12px 0 12px" : "0 12px 12px 12px", background: msg.role === "user" ? "rgba(50,137,226,0.1)" : "rgba(42,188,186,0.07)", border: msg.role === "user" ? "1px solid rgba(50,137,226,0.2)" : "1px solid rgba(42,188,186,0.15)", fontSize: 13, color: "#1a1a2e", lineHeight: 1.6 }}>
                    {msg.role === "user" ? msg.text : (
                      <ReactMarkdown className="agent-markdown">{msg.text}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && <div style={{ fontSize: 12, color: "rgba(42,188,186,0.7)" }}>Hero Agent is thinking...</div>}
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <input style={{ flex: 1, padding: "11px 14px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#1a1a2e" }} placeholder="Ask Hero Agent anything..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChatMessage()} autoFocus />
              <button onClick={sendChatMessage} disabled={chatLoading} style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "11px 20px", cursor: "pointer" }}>Send →</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{ position: "absolute", inset: 0, zIndex: 200 }} onClick={() => setCartOpen(false)}>
          <div style={{ position: "absolute", top: 72, right: 0, width: "clamp(300px, 360px, 100%)", bottom: 0, background: "#fff", borderLeft: "1px solid rgba(42,188,186,0.2)", boxShadow: "-8px 0 40px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", animation: "slideUp 0.25s ease" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e", letterSpacing: 1 }}>🛒 My Cart ({cartItems.length})</div>
              <button onClick={() => setCartOpen(false)} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 20, width: 30, height: 30, cursor: "pointer", fontSize: 15, color: "rgba(0,0,0,0.5)" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {cartItems.length === 0 && <div style={{ textAlign: "center", color: "rgba(0,0,0,0.35)", fontSize: 13, paddingTop: 40 }}>Your cart is empty</div>}
              {cartItems.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#f8f9fb", borderRadius: 8, border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{c.item.name}</div>
                    <div style={{ fontSize: 11, color: "#2ABCBA" }}>Qty: {c.qty}</div>
                  </div>
                  <button onClick={() => setCartItems(prev => prev.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.3)", fontSize: 14 }}>✕</button>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div style={{ padding: 16, borderTop: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
                <button
                  style={{ width: "100%", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "13px", cursor: "pointer", letterSpacing: 1 }}
                  onClick={() => window.open(`https://www.amazon.com/s?k=${encodeURIComponent(cartItems[0]?.item?.name + " emergency supply")}`, "_blank")}
                >
                  Shop on Amazon →
                </button>
                <button onClick={() => setCartItems([])} style={{ width: "100%", marginTop: 8, background: "none", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, color: "rgba(0,0,0,0.5)", fontSize: 12, padding: "9px", cursor: "pointer" }}>Clear Cart</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Hero Agent FAB — fixed to viewport, hidden on home page */}
      {activeNav !== "home" && (
        <div style={{ position: "fixed", bottom: agentDrawerOpen ? 86 : 28, right: 28, zIndex: 500, transition: "bottom 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
          <button
            onClick={() => setAgentDrawerOpen(v => !v)}
            style={{ width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", boxShadow: "0 4px 20px rgba(42,188,186,0.45)", cursor: "pointer", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}
            title="Hero Agent"
          >🤖</button>
        </div>
      )}

      {/* Supply Detail Modal */}
      {selectedSupply &&
    <div style={styles.modal} onClick={() => setSelectedSupply(null)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>{selectedSupply.icon}</div>
            <h3 style={styles.modalTitle}>{selectedSupply.name}</h3>
            <div style={styles.modalBrand}>{selectedSupply.brand}</div>
            <div style={styles.modalCategory}>{selectedSupply.category}</div>
            <p style={styles.modalDesc}>
              Essential for emergency preparedness. FEMA and Red Cross recommend every household have this item stocked with at least a 72-hour supply. Hero Home will remind you when it's time to restock.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.primaryBtn} onClick={() => setSelectedSupply(null)}>Add to My Inventory</button>
              <button style={{ ...styles.secondaryBtn }} onClick={() => setSelectedSupply(null)}>Close</button>
            </div>
          </div>
        </div>
    }
    </div>;


  const sendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setAgentDrawerOpen(true);
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);
    try {
      const { base44 } = await import("@/api/base44Client");
      const reply = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Hero Agent, an AI-powered emergency preparedness guide for the Hero Home app. The user's address is "${formData.address || "Hero Home Island, CA"}" with ${formData.adults} adults and ${formData.children} children. Answer concisely and helpfully.\n\nUser: ${userMsg}`
      });
      setChatMessages((prev) => [...prev, { role: "agent", text: reply }]);
    } catch (e) {
      setChatMessages((prev) => [...prev, { role: "agent", text: "Sorry, I couldn't connect. Please try again." }]);
    }
    setChatLoading(false);
  };

  const renderHomePanel = () =>
  <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "clamp(12px,1.5vw,20px)", overflow: "hidden", boxSizing: "border-box" }}>
      <div style={{ marginBottom: 12, flexShrink: 0 }}>
        <h2 style={styles.panelTitle}>Home</h2>
        <div style={styles.panelSub}>Your personalized Emergency Command Center</div>
      </div>

      {/* 2-column bento: Hero Agent (left wide) + Quick Stats (right) */}
      <div className="home-bento-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>

        {/* Hero Agent Chat */}
        <div className="hero-card" style={{ ...styles.bentoCard, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
            <div>
              <div style={styles.homeCardLabel}>Hero Agent</div>
              <div style={{ fontSize: 10, color: "rgba(42,188,186,0.7)", letterSpacing: 1 }}>● ONLINE — Emergency Preparedness Guide</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
            {chatMessages.slice(-6).map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "88%", padding: "8px 12px", borderRadius: msg.role === "user" ? "12px 12px 0 12px" : "0 12px 12px 12px", background: msg.role === "user" ? "rgba(50,137,226,0.1)" : "rgba(42,188,186,0.08)", border: msg.role === "user" ? "1px solid rgba(50,137,226,0.2)" : "1px solid rgba(42,188,186,0.15)", fontSize: 13, color: "#1a1a2e", lineHeight: 1.55 }}>
                  {msg.role === "user" ? msg.text : (
                    <ReactMarkdown className="agent-markdown">{msg.text}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && <div style={{ fontSize: 12, color: "rgba(42,188,186,0.7)", paddingLeft: 4 }}>Hero Agent is thinking...</div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ flex: 1, padding: "10px 14px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#1a1a2e" }}
              placeholder="Ask Hero Agent anything..."
              value={headerAgentInput}
              onChange={e => setHeaderAgentInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendHeaderAgent()}
            />
            <button onClick={sendHeaderAgent} disabled={chatLoading} style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px 18px", cursor: "pointer" }}>Send →</button>
          </div>
        </div>

        {/* Right column: quick stats + alert summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Hero Rating card */}
          <div className="hero-card" style={{ ...styles.bentoCard, cursor: "pointer" }} onClick={() => setHeroRatingOpen(true)}>
            <div style={styles.homeCardLabel}>🏅 Hero Rating</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: "#2ABCBA", lineHeight: 1, marginBottom: 10 }}>{heroRating}%</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(0,0,0,0.45)", marginBottom: 3 }}><span>🎒 Supplies</span><span style={{ fontWeight: 700 }}>{supplyReadiness}%</span></div>
                <div style={{ height: 5, background: "rgba(0,0,0,0.07)", borderRadius: 3 }}><div style={{ height: "100%", width: `${supplyReadiness}%`, background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 3 }} /></div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(0,0,0,0.45)", marginBottom: 3 }}><span>📚 Education</span><span style={{ fontWeight: 700 }}>{eduPct}%</span></div>
                <div style={{ height: 5, background: "rgba(0,0,0,0.07)", borderRadius: 3 }}><div style={{ height: "100%", width: `${eduPct}%`, background: "linear-gradient(90deg, #3289E2, #2ABCBA)", borderRadius: 3 }} /></div>
              </div>
            </div>
          </div>

          {/* Active Alerts summary */}
          <div className="hero-card" style={{ ...styles.bentoCard, flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={styles.homeCardLabel}>⚠️ Active Alerts</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              {(noaaAlerts.length > 0 ? noaaAlerts.slice(0, 3) : [
                { properties: { event: "Wildfire Watch", senderName: "NWS", severity: "Severe" } },
                { properties: { event: "Flood Watch", senderName: "NOAA", severity: "Moderate" } },
                { properties: { event: "Wind Advisory", senderName: "NWS", severity: "Minor" } },
              ]).map((alert, i) => {
                const p = alert.properties || {};
                const color = p.severity === "Extreme" ? "#8b0000" : p.severity === "Severe" ? "#E26332" : p.severity === "Moderate" ? "#b87333" : "#2ABCBA";
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", background: "rgba(255,255,255,0.6)", borderRadius: 6, borderLeft: `3px solid ${color}` }}>
                    <span style={{ fontSize: 13 }}>{p.severity === "Severe" || p.severity === "Extreme" ? "🔴" : "🟡"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a2e" }}>{p.event || "Alert"}</div>
                      <div style={{ fontSize: 9, color: "rgba(0,0,0,0.45)" }}>{p.senderName || "NWS"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={handleSuppliesFromAlerts} style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 7, color: "#fff", fontSize: 11, fontWeight: 700, padding: "9px 12px", cursor: "pointer", textAlign: "center" }}>
              🎒 GET ALERT SUPPLIES
            </button>
          </div>
        </div>

      </div>
    </div>;


  const renderStatusPanel = () =>
  <div style={{ ...styles.panel }}>
      <div style={styles.panelHeader}>
        <h2 style={styles.panelTitle}>Hero Status</h2>
        <div style={styles.panelSub}>Your journey from recruit to veteran hero</div>
      </div>
      <div className="thirds-2-1" style={{ alignItems: "start", gap: 20 }}>
        <div>
          <div style={styles.statusCard}>
            <div style={styles.rankBadge}>🛡️</div>
            <div style={styles.rankTitle}>HERO IN TRAINING</div>
            <div style={styles.xpBar}><div style={{ ...styles.xpFill, width: "25%" }} /></div>
            <div style={styles.xpLabel}>250 / 1000 XP to <strong>Guardian</strong></div>
          </div>
          <div style={styles.journeyPath}>
        {["Recruit", "Hero in Training", "Guardian", "Protector", "Veteran Hero"].map((rank, i) =>
          <div key={rank} style={styles.journeyStep}>
            <div style={{ ...styles.journeyDot, ...(i < 2 ? styles.journeyDotDone : i === 2 ? styles.journeyDotNext : {}) }} />
            <div style={styles.journeyLabel}>{rank}</div>
          </div>
          )}
      </div>
        </div>
        <div>
          <h3 style={styles.sectionTitle}>Community Leaderboard</h3>
          <div style={styles.leaderboard}>
            {[{ name: "Alex M.", score: 1850, badge: "🥇" }, { name: "Sarah K.", score: 1420, badge: "🥈" }, { name: "You", score: heroRating, badge: "🛡️", isMe: true }, { name: "Chris P.", score: 180, badge: "⭐" }].map((u) =>
          <div key={u.name} style={{ ...styles.leaderRow, ...(u.isMe ? styles.leaderRowMe : {}) }}>
                <span style={styles.leaderBadge}>{u.badge}</span>
                <span style={styles.leaderName}>{u.name}</span>
                <span style={styles.leaderScore}>{u.score} XP</span>
              </div>
          )}
          </div>
        </div>
      </div>
    </div>;


  const renderSuppliesPanel = () => (
    <SuppliesPanel
      onOpenAgent={(item) => {
        setChatInput(`Tell me everything about "${item.name}" for emergency preparedness — how much I need, how to use it, where to buy it, and how to store it properly.`);
        setAgentDrawerOpen(true);
      }}
      showTutorial={showSuppliesTutorial}
      onTutorialComplete={() => {
        setShowSuppliesTutorial(false);
      }}
      onReadinessChange={setSupplyReadiness}
    />
  );


  const renderShopPanel = () => {
    const filteredItems = shopKitTab === "ALL"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter(item => item.kits && item.kits.includes(shopKitTab));

    return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <h2 style={styles.panelTitle}>Shop</h2>
        <div style={styles.panelSub}>Curated emergency supplies — FEMA &amp; Ready.gov recommended</div>
      </div>

      {/* Kit tabs */}
      <div style={{ display: "flex", justifyContent: "flex-start", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        {["ALL", "HOME", "CAR", "EVAC"].map((tab) => (
          <button
            key={tab}
            style={{ padding: "10px 26px", borderRadius: 8, border: shopKitTab === tab ? "1px solid rgba(42,188,186,0.5)" : "1px solid rgba(0,0,0,0.1)", background: shopKitTab === tab ? "rgba(42,188,186,0.1)" : "#ffffff", color: shopKitTab === tab ? "#2ABCBA" : "rgba(0,0,0,0.55)", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, transition: "all 0.15s" }}
            onClick={() => setShopKitTab(tab)}
          >{tab}</button>
        ))}
      </div>
      <div style={{ textAlign: "left", fontSize: 13, color: "rgba(0,0,0,0.45)", marginBottom: 20, lineHeight: 1.6 }}>
        {shopKitTab === "HOME" && "FEMA recommends a 2-week supply of essentials for your home. Start here first."}
        {shopKitTab === "CAR" && "AAA & Ready.gov recommend a vehicle emergency kit at all times. Be prepared on the road."}
        {shopKitTab === "EVAC" && "FEMA 72-hour go-bag essentials for rapid evacuation. Grab and go."}
        {shopKitTab === "ALL" && <>All products across HOME, CAR, and EVAC kits. Start with your <strong>HOME</strong> first.</>}
        {!["HOME","CAR","EVAC","ALL"].includes(shopKitTab) && "Select a kit type above to filter products."}
      </div>

      {/* 6-per-row desktop, 4 tablet, 3 mobile */}
      <div className="shop-grid-responsive" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
        {filteredItems.map((item) =>
          <div key={item.id} data-shop-card style={{ background: "#fff", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", position: "relative" }} onClick={() => setShopQuickView(item)}>
            {/* Image area */}
            <div style={{ background: "#f8f9fb", position: "relative", paddingBottom: "80%", overflow: "hidden" }}>
              <img
                src={item.img}
                alt={item.name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 10 }}
                onError={e => { e.target.closest('[data-shop-card]').style.display = "none"; }}
              />
              <button
                onClick={e => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("hero-cart-add", { detail: { item, qty: 1 } })); }}
                style={{ position: "absolute", top: 6, right: 6, width: 28, height: 28, borderRadius: 7, background: "#2ABCBA", border: "none", color: "#fff", fontSize: 18, fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, boxShadow: "0 2px 8px rgba(42,188,186,0.4)" }}
              >+</button>
            </div>
            {/* Info area */}
            <div style={{ padding: "8px 10px 12px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ background: "#f5c518", borderRadius: 4, padding: "1px 6px", fontSize: 13, fontWeight: 800, color: "#1a1a2e" }}>{item.price}</span>
                <span style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>{item.brand}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3, marginBottom: 6 }}>{item.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ color: "#f5c518", fontSize: 11, letterSpacing: -1 }}>★★★★★</span>
                <span style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>5.0</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {shopQuickView && (
        <ShopQuickView
          item={shopQuickView}
          allItems={SHOP_ITEMS}
          onClose={() => setShopQuickView(null)}
          onAddToCart={(item, qty) => {
            window.dispatchEvent(new CustomEvent("hero-cart-add", { detail: { item, qty } }));
          }}
        />
      )}
    </div>
    );
  };


  const renderEducationPanel = () => {
    const statCard = (val, label, color) => (
      <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: color || "#2ABCBA" }}>{val}</div>
        <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
      </div>
    );
    return (
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>Education</h2>
          <div style={styles.panelSub}>Master essential life-saving skills — complete lessons to improve your Hero Rating</div>
        </div>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.2fr", gap: 10, marginBottom: 24, alignItems: "start" }}>
          {statCard(completedCount, "Completed")}
          {statCard(lessonCount - completedCount, "Remaining", "#E26332")}
          {statCard(lessonCount, "Total Lessons")}
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Progress</div>
            <div style={{ height: 6, background: "rgba(0,0,0,0.07)", borderRadius: 3, marginBottom: 6 }}>
              <div style={{ height: "100%", width: `${eduPct}%`, background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 3, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#2ABCBA" }}>{eduPct}%</div>
          </div>
        </div>
        <div className="thirds-3">
          {EDUCATION_TOPICS.map((t) => {
            const result = lessonResults[t.id];
            const hasAttempted = !!result;
            const passed = result?.passed;
            const retake = hasAttempted && !passed;
            let btnBg = "rgba(42,188,186,0.1)";
            let btnBorder = "1px solid rgba(42,188,186,0.3)";
            let btnColor = "#2ABCBA";
            let btnLabel = "Start Lesson →";
            if (passed) { btnBg = "rgba(42,188,186,0.12)"; btnBorder = "1px solid rgba(42,188,186,0.4)"; btnColor = "#1a7a78"; btnLabel = "✓ Passed"; }
            else if (retake) { btnBg = "rgba(240,210,80,0.15)"; btnBorder = "1px solid rgba(220,180,50,0.5)"; btnColor = "#8a6e00"; btnLabel = "↩ Retake"; }
            return (
              <div key={t.id} style={{ ...styles.eduCard, position: "relative", ...(passed ? { border: "1px solid rgba(42,188,186,0.3)", background: "rgba(42,188,186,0.03)" } : retake ? { border: "1px solid rgba(240,210,80,0.4)", background: "rgba(255,248,200,0.35)" } : {}) }}>
                {passed && (
                  <div style={{ position: "absolute", top: 10, right: 10, background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 2px 8px rgba(42,188,186,0.4)" }}>⭐</div>
                )}
                <div style={styles.eduIcon}>{t.icon}</div>
                <div style={styles.eduTitle}>{t.title}</div>
                <div style={styles.eduMeta}>
                  <span style={{ ...styles.eduLevel, ...(t.level === "Essential" ? styles.eduEssential : styles.eduAdvanced) }}>{t.level}</span>
                  <span style={styles.eduTime}>⏱ {t.time}</span>
                </div>
                {hasAttempted && (
                  <div style={{ fontSize: 11, color: passed ? "#2ABCBA" : "#8a6e00", marginBottom: 8, fontWeight: 600 }}>
                    {passed ? `Score: ${result.score}/5 ✓` : `Score: ${result.score}/5 — Need 4 to pass`}
                  </div>
                )}
                <button style={{ background: btnBg, border: btnBorder, borderRadius: 4, color: btnColor, fontSize: 12, padding: "8px 16px", cursor: "pointer", width: "100%", fontWeight: 700, letterSpacing: 1 }}
                  onClick={() => setActiveLessonId(t.id)}>
                  {btnLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };







  const renderResourcesPanel = () =>
  <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <h2 style={styles.panelTitle}>Resources</h2>
        <div style={styles.panelSub}>Official emergency organizations & useful links</div>
      </div>
      <div className="thirds-3">
        {[
      { icon: "🏛️", name: "FEMA", desc: "Federal Emergency Management Agency", url: "https://fema.gov" },
      { icon: "🩺", name: "CDC", desc: "Centers for Disease Control", url: "https://cdc.gov" },
      { icon: "🔴", name: "Red Cross", desc: "American Red Cross", url: "https://redcross.org" },
      { icon: "🌡️", name: "NWS", desc: "National Weather Service", url: "https://weather.gov" },
      { icon: "📞", name: "911 Guide", desc: "When and how to call 911", url: "#" },
      { icon: "🏥", name: "SAMHSA", desc: "Mental health crisis support", url: "https://samhsa.gov" }].
      map((r) =>
      <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" style={styles.resourceCard}>
            <div style={styles.resourceIcon}>{r.icon}</div>
            <div style={styles.resourceName}>{r.name}</div>
            <div style={styles.resourceDesc}>{r.desc}</div>
          </a>
      )}
      </div>
    </div>;


  const renderCommunityPanel = () =>
  <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <h2 style={styles.panelTitle}>My Community</h2>
        <div style={styles.panelSub}>Compete, compare, and protect your circle</div>
      </div>
      <button style={{ ...styles.primaryBtn, maxWidth: 240, marginBottom: 20 }}>+ Invite Friends & Family</button>
      <div style={styles.friendsList}>
        {[
      { name: "Alex Martinez", rank: "Veteran Hero", score: 1850, avatar: "👨" },
      { name: "Sarah Kim", rank: "Protector", score: 1420, avatar: "👩" },
      { name: "Chris Park", rank: "Hero in Training", score: 180, avatar: "🧑" }].
      map((f) =>
      <div key={f.name} style={styles.friendCard}>
            <div style={styles.friendAvatar}>{f.avatar}</div>
            <div style={styles.friendInfo}>
              <div style={styles.friendName}>{f.name}</div>
              <div style={styles.friendRank}>{f.rank}</div>
            </div>
            <div style={styles.friendScore}>{f.score} XP</div>
          </div>
      )}
      </div>
    </div>;


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #f4f6f9; overflow: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(42,188,186,0.4); border-radius: 2px; }
        input::placeholder { color: rgba(0,0,0,0.3); }
        input:focus { outline: none; border-color: #2ABCBA !important; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(60px); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes glow { 0%, 100% { text-shadow: 0 0 20px rgba(42,188,186,0.5); } 50% { text-shadow: 0 0 40px rgba(42,188,186,0.9); } }
        @keyframes scan { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
        @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.05); } 66% { transform: translate(-20px,30px) scale(0.95); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-40px,20px) scale(1.08); } 66% { transform: translate(25px,-35px) scale(0.93); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .agent-markdown { font-size: 13px; color: #1a1a2e; line-height: 1.65; }
        .agent-markdown p { margin: 0 0 8px; }
        .agent-markdown p:last-child { margin-bottom: 0; }
        .agent-markdown ul, .agent-markdown ol { margin: 6px 0 8px 18px; padding: 0; }
        .agent-markdown li { margin-bottom: 4px; }
        .agent-markdown strong { font-weight: 700; color: #1a1a2e; }
        .agent-markdown h1, .agent-markdown h2, .agent-markdown h3 { font-weight: 700; margin: 10px 0 6px; color: #1a1a2e; }
        .agent-markdown h1 { font-size: 15px; }
        .agent-markdown h2 { font-size: 14px; }
        .agent-markdown h3 { font-size: 13px; }
        .agent-markdown code { background: rgba(42,188,186,0.1); border-radius: 3px; padding: 1px 5px; font-size: 12px; }
        .agent-markdown hr { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 8px 0; }
        /* ── Rule of Thirds: Home Dashboard (no-scroll, 3×3 strict grid) ── */
        .bento-thirds {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: 2fr 1fr;
          gap: 14px;
          flex: 1;
          min-height: 0;
        }
        .bt-main  { grid-column: 1 / 3; grid-row: 1 / 3; }
        .bt-r3    { grid-column: 1;     grid-row: 3; }
        .bt-r4    { grid-column: 2;     grid-row: 3; }
        /* ── Rule of Thirds: Scrollable panel content ── */
        .thirds-2-1  { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
        .thirds-1-2  { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
        .thirds-3    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        /* ── Shared card transitions ── */
        .hero-card { transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s cubic-bezier(0.16,1,0.3,1); }
        .hero-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(42,188,186,0.28), 0 0 20px rgba(42,188,186,0.06) !important; }
        @media (max-width: 1100px) {
          .thirds-2-1 { grid-template-columns: 1fr !important; }
          .thirds-1-2 { grid-template-columns: 1fr !important; }
          .thirds-3   { grid-template-columns: repeat(2, 1fr) !important; }
        }
        /* Home bento: 2-col desktop, 1-col mobile */
        @media (max-width: 600px) {
          .home-bento-grid { grid-template-columns: 1fr !important; }
        }
        /* Shop grid: 6 desktop, 4 tablet, 3 mobile */
        .shop-grid-responsive { grid-template-columns: repeat(6, 1fr) !important; }
        @media (max-width: 1200px) {
          .shop-grid-responsive { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 720px) {
          .bento-thirds { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .bt-main, .bt-r3, .bt-r4 { grid-column: 1 !important; grid-row: auto !important; min-height: 180px; }
          .bt-main { min-height: 260px; }
          .thirds-3 { grid-template-columns: 1fr !important; }
          .shop-grid-responsive { grid-template-columns: repeat(3, 1fr) !important; }
          .header-nav-links { display: none !important; }
        }
        @media (max-width: 600px) {
          .app-root-wrapper { height: auto !important; min-height: 100vh; overflow: visible !important; }
          .content-panel-full { left: 0 !important; position: relative !important; top: auto !important; right: auto !important; bottom: auto !important; overflow-y: visible !important; min-height: calc(100vh - 64px); }
          .top-bar-score { display: none !important; }
          .shop-grid-responsive { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 601px) {
          .app-root-wrapper { height: 100vh; overflow: hidden; }
        }
        @media (min-width: 721px) {
          .mobile-nav-btn { display: none !important; }
        }
      `}</style>
      <div style={{ width: "100vw", fontFamily: "'Inter', sans-serif", position: "relative" }} className="app-root-wrapper">
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #f0f4f8 0%, #e8f0f8 100%)" }} />

        {/* Phase renders */}
        {phase === "landing" && renderLanding()}
        {phase === "signup" && renderSignup()}
        {phase === "onboarding" && renderOnboarding()}
        {phase === "q1" && renderQ1()}
        {phase === "q2" && renderQ2()}
        {phase === "q3" && renderQ3()}
        {phase === "dashboard" && renderDashboard()}

        {/* Lesson Modal */}
        {activeLessonId && (
          <LessonModal
            topicId={activeLessonId}
            onClose={() => setActiveLessonId(null)}
            onComplete={handleLessonComplete}
          />
        )}


      </div>
    </>);

}



// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(240,244,248,0.88)", backdropFilter: "blur(8px)", zIndex: 10
  },
  landingCard: {
    background: "rgba(255,255,255,0.98)",
    border: "1px solid rgba(42,188,186,0.3)", borderRadius: 12, padding: "40px 48px 28px",
    maxWidth: 500, width: "90%", textAlign: "center", animation: "fadeIn 0.5s ease",
    boxShadow: "0 0 40px rgba(42,188,186,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
    minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between"
  },
  logoGlow: { marginBottom: 24 },
  logoIcon: { fontSize: 56, marginBottom: 8 },
  logoTitle: { fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: 4 },
  logoSub: { fontSize: 11, color: "rgba(42,188,186,0.8)", letterSpacing: 6, marginTop: 8, fontWeight: 600, textTransform: "uppercase" },
  tagline: { fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.7, marginBottom: 20 },
  divider: { height: 1, background: "linear-gradient(90deg, transparent, rgba(42,188,186,0.4), transparent)", margin: "16px 0" },
  subText: { fontSize: 13, color: "rgba(0,0,0,0.45)", marginBottom: 28 },
  primaryBtn: {
    background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 6,
    color: "#fff", fontSize: 14, fontWeight: 700, padding: "14px 28px", cursor: "pointer",
    width: "100%", letterSpacing: 1, transition: "all 0.2s", textTransform: "uppercase",
    boxShadow: "0 4px 20px rgba(42,188,186,0.3)"
  },
  hint: { fontSize: 11, color: "rgba(0,0,0,0.3)", marginTop: 20, letterSpacing: 2, textTransform: "uppercase" },
  stepBadge: {
    background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.4)",
    borderRadius: 4, padding: "4px 12px", fontSize: 10, color: "#2ABCBA",
    letterSpacing: 3, display: "inline-block", marginBottom: 16, fontWeight: 700, textTransform: "uppercase"
  },
  backBtn: {
    background: "transparent", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6,
    color: "rgba(0,0,0,0.45)", fontSize: 12, padding: "4px 10px", cursor: "pointer",
    fontFamily: "'Inter', sans-serif"
  },
  cardTitle: { fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: 0.5 },
  cardSub: { fontSize: 14, color: "rgba(0,0,0,0.5)", marginBottom: 24 },
  input: {
    width: "100%", padding: "12px 16px", background: "rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, color: "#1a1a2e",
    fontSize: 14, marginBottom: 14, fontFamily: "'Inter', sans-serif"
  },
  orDivider: {
    textAlign: "center", color: "rgba(0,0,0,0.3)", fontSize: 12, margin: "16px 0",
    display: "flex", alignItems: "center", gap: 12
  },
  socialRow: { display: "flex", gap: 12 },
  socialBtn: {
    flex: 1, padding: "12px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 8, color: "rgba(0,0,0,0.65)", fontSize: 13, cursor: "pointer"
  },
  agentCard: {
    background: "rgba(255,255,255,0.98)",
    border: "1px solid rgba(42,188,186,0.25)", borderRadius: 12, padding: "32px 36px 28px",
    maxWidth: 520, width: "90%", animation: "fadeIn 0.5s ease",
    boxShadow: "0 0 40px rgba(42,188,186,0.1)",
    minHeight: 420, maxWidth: 500, display: "flex", flexDirection: "column", justifyContent: "space-between"
  },
  agentHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
  agentAvatar: { fontSize: 28, background: "rgba(42,188,186,0.1)", borderRadius: 8, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(42,188,186,0.4)" },
  agentName: { fontSize: 11, fontWeight: 700, color: "#2ABCBA", letterSpacing: 3, textTransform: "uppercase" },
  agentStatus: { fontSize: 10, color: "#2ABCBA", animation: "pulse 2s infinite", letterSpacing: 1 },
  agentMessage: { fontSize: 15, color: "rgba(0,0,0,0.7)", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic", borderLeft: "3px solid #2ABCBA", paddingLeft: 16 },
  highlight: { color: "#2ABCBA", fontStyle: "normal", fontWeight: 700 },
  counterRow: { display: "flex", gap: 16, marginBottom: 24 },
  counter: { flex: 1, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, textAlign: "center" },
  counterLabel: { fontSize: 11, color: "rgba(0,0,0,0.45)", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" },
  counterControls: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16 },
  counterBtn: { background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.4)", borderRadius: 6, color: "#2ABCBA", fontSize: 18, width: 36, height: 36, cursor: "pointer" },
  counterVal: { fontSize: 28, fontWeight: 800, color: "#2ABCBA", minWidth: 40, textAlign: "center" },
  summaryBox: { background: "rgba(0,0,0,0.03)", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 8, padding: 16, marginBottom: 20 },
  summaryRow: { display: "flex", gap: 12, color: "rgba(0,0,0,0.7)", fontSize: 14, marginBottom: 10, alignItems: "center" },
  supplyGridMini: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 },
  supplyMini: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 6, padding: 12, textAlign: "center", cursor: "pointer" },
  supplyMiniIcon: { fontSize: 24, marginBottom: 4 },
  supplyMiniName: { fontSize: 10, color: "rgba(255,255,255,0.6)", lineHeight: 1.3 },

  // Dashboard
  dashWrapper: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", zIndex: 10 },
  topBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    flexShrink: 0
  },
  topLogo: { fontSize: 16, fontWeight: 700, color: "#1a1a2e", letterSpacing: 2 },
  heroScore: { display: "flex", alignItems: "center", gap: 14 },
  scoreLabel: { fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: 3, textTransform: "uppercase" },
  scoreVal: { fontSize: 28, fontWeight: 800, color: "#2ABCBA" },
  scoreBadge: { fontSize: 11, background: "rgba(42,188,186,0.08)", border: "1px solid rgba(42,188,186,0.3)", borderRadius: 4, padding: "4px 12px", color: "#2ABCBA", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" },
  topRight: { display: "flex", gap: 10 },
  iconBtn: { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, fontSize: 20, width: 42, height: 42, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  sideNav: {
    position: "absolute", left: 0, top: 72, bottom: 0, width: 200,
    background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
    borderRight: "1px solid rgba(0,0,0,0.08)",
    display: "flex", flexDirection: "column", padding: "20px 0", gap: 2, overflowY: "auto"
  },
  navItem: {
    display: "flex", flexDirection: "row", alignItems: "center",
    width: "100%", padding: "12px 20px", border: "none", background: "transparent",
    borderLeft: "3px solid transparent",
    cursor: "pointer", gap: 12, transition: "all 0.15s", textAlign: "left"
  },
  navItemActive: { background: "rgba(42,188,186,0.07)", borderLeft: "3px solid #2ABCBA" },
  navIcon: { fontSize: 18, width: 22, textAlign: "center", flexShrink: 0 },
  navLabel: { fontSize: 12, color: "rgba(0,0,0,0.55)", letterSpacing: 1.5, fontWeight: 600, textTransform: "uppercase" },
  contentPanel: {
    position: "absolute", left: 0, top: 64, right: 0, bottom: 0,
    background: "#f4f6f9",
    overflowY: "scroll",
    display: "flex", flexDirection: "column"
  },
  panel: { padding: "clamp(16px, 2vw, 28px)", maxWidth: 1400, margin: "0 auto", width: "100%" },
  panelHeader: { marginBottom: 24 },
  panelTitle: { fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase", color: "#1a1a2e", WebkitTextFillColor: "unset" },
  panelSub: { fontSize: 13, color: "rgba(42,188,186,0.8)", letterSpacing: 1 },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: "rgba(42,188,186,0.9)", marginBottom: 14, marginTop: 24, letterSpacing: 3, textTransform: "uppercase" },

  // Home Panel
  homeMasterGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: 14, alignItems: "start", marginTop: 14 },
  widgetColumn: { display: "none" },
  widgetCard: { display: "none" },
  widgetCardActive: {},
  widgetIcon: {},
  widgetLabel: {},
  homeCenterCol: { display: "flex", flexDirection: "column", gap: 14 },
  bentoCard: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
    overflow: "hidden",
    position: "relative"
  },
  homeCard: {
    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 10, padding: 18,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)"
  },
  homeCardLabel: { fontSize: 12, fontWeight: 700, color: "#2ABCBA", marginBottom: 4, letterSpacing: 2, textTransform: "uppercase" },
  homeCardSub: { fontSize: 12, color: "rgba(0,0,0,0.4)", marginBottom: 12 },
  aiHomePlaceholder: {
    background: "rgba(0,0,0,0.03)", borderRadius: 8, padding: 10, textAlign: "center",
    border: "1px solid rgba(42,188,186,0.15)"
  },
  aiHomeLabel: { fontSize: 11, color: "rgba(0,0,0,0.55)", lineHeight: 1.5 },
  aiHomeSub: { fontSize: 10, color: "rgba(42,188,186,0.5)" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 4 },
  statCard: {
    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "12px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1)"
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statVal: { fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 2 },
  statLabel: { fontSize: 11, color: "rgba(0,0,0,0.45)", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" },
  statBar: { height: 3, background: "rgba(0,0,0,0.07)", borderRadius: 2 },
  statFill: { height: "100%", background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 2, transition: "width 0.5s" },
  statSub: { fontSize: 10, color: "rgba(226,99,50,0.8)", marginTop: 4 },
  hazardList: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 },
  hazard: { fontSize: 16 },
  alertBanner: { background: "rgba(226,99,50,0.08)", border: "1px solid rgba(226,99,50,0.25)", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#c0501a", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  alertBtn: { background: "rgba(42,188,186,0.15)", border: "1px solid rgba(42,188,186,0.4)", borderRadius: 4, color: "#2ABCBA", fontSize: 11, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap", fontWeight: 700, letterSpacing: 1 },

  // Agent side column
  agentSideCol: {
    display: "flex", flexDirection: "column", gap: 10,
    background: "rgba(13,25,48,0.9)", border: "1px solid rgba(42,188,186,0.15)",
    borderRadius: 10, padding: 16, height: "100%", minHeight: 500
  },
  agentSideHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6, borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 12 },
  agentSideAvatar: { fontSize: 24, background: "rgba(42,188,186,0.1)", borderRadius: 8, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(42,188,186,0.3)" },
  agentSideName: { fontSize: 11, fontWeight: 700, color: "#2ABCBA", letterSpacing: 3, textTransform: "uppercase" },
  agentSideStatus: { fontSize: 10, color: "#2ABCBA", animation: "pulse 2s infinite", letterSpacing: 1 },
  agentSideChatArea: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, minHeight: 300, maxHeight: 340 },
  agentSideInput: { display: "flex", gap: 8 },
  agentSideInputBox: { flex: 1, padding: "10px 12px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 6, color: "#1a1a2e", fontSize: 13, fontFamily: "'Inter', sans-serif" },
  agentSideSendBtn: { background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 6, color: "#fff", fontSize: 14, fontWeight: 700, width: 40, cursor: "pointer" },
  chatUserBubble: { display: "flex", justifyContent: "flex-end" },
  chatUserText: { background: "rgba(50,137,226,0.12)", border: "1px solid rgba(50,137,226,0.2)", borderRadius: "12px 12px 0 12px", padding: "8px 12px", fontSize: 13, color: "#1a1a2e", maxWidth: "85%", lineHeight: 1.5 },
  chatAgentBubbleInline: { display: "flex", flexDirection: "column" },
  chatAgentLabelInline: { fontSize: 10, color: "rgba(42,188,186,0.7)", letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" },
  chatAgentTextInline: { background: "rgba(42,188,186,0.06)", border: "1px solid rgba(42,188,186,0.15)", borderRadius: "0 10px 10px 10px", padding: "8px 12px", fontSize: 13, color: "#1a1a2e", lineHeight: 1.5, maxWidth: "90%" },

  // Status Panel
  statusCard: { background: "#ffffff", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 10, padding: 28, textAlign: "center", marginBottom: 24 },
  rankBadge: { fontSize: 64, marginBottom: 12 },
  rankTitle: { fontSize: 18, fontWeight: 800, color: "#1a1a2e", letterSpacing: 4, marginBottom: 16, textTransform: "uppercase" },
  xpBar: { height: 6, background: "rgba(0,0,0,0.07)", borderRadius: 3, marginBottom: 8 },
  xpFill: { height: "100%", background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 3 },
  xpLabel: { fontSize: 13, color: "rgba(0,0,0,0.45)" },
  journeyPath: { display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 24 },
  journeyStep: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 },
  journeyDot: { width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.07)", border: "2px solid rgba(0,0,0,0.12)" },
  journeyDotDone: { background: "#2ABCBA", border: "2px solid #2ABCBA", boxShadow: "0 0 10px rgba(42,188,186,0.3)" },
  journeyDotNext: { background: "rgba(42,188,186,0.2)", border: "2px solid #2ABCBA", animation: "pulse 2s infinite" },
  journeyLabel: { fontSize: 10, color: "rgba(0,0,0,0.45)", textAlign: "center", letterSpacing: 0.5 },
  leaderboard: { display: "flex", flexDirection: "column", gap: 8 },
  leaderRow: { display: "flex", alignItems: "center", gap: 12, background: "#f8f9fb", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 6, padding: "12px 16px" },
  leaderRowMe: { background: "rgba(42,188,186,0.07)", border: "1px solid rgba(42,188,186,0.25)" },
  leaderBadge: { fontSize: 24 },
  leaderName: { flex: 1, fontSize: 14, color: "#1a1a2e" },
  leaderScore: { fontSize: 14, fontWeight: 700, color: "#2ABCBA" },

  // Supplies Panel
  supplyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 },
  supplyCard: { background: "rgba(13,25,48,0.9)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 16, cursor: "pointer", textAlign: "center", transition: "all 0.2s" },
  supplyOwned: { background: "rgba(42,188,186,0.08)", borderColor: "rgba(42,188,186,0.3)" },
  supplyIcon: { fontSize: 40, marginBottom: 10 },
  supplyName: { fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 4, lineHeight: 1.3 },
  supplyBrand: { fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 8 },
  ownedBadge: { fontSize: 11, color: "#2ABCBA", background: "rgba(42,188,186,0.1)", borderRadius: 20, padding: "3px 10px", fontWeight: 700 },
  needsBadge: { fontSize: 11, color: "#E26332", background: "rgba(226,99,50,0.1)", borderRadius: 20, padding: "3px 10px" },

  // Shop Panel
  shopBanner: { background: "rgba(42,188,186,0.07)", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 10, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" },
  shopBannerText: {},
  shopBannerTitle: { fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 },
  shopBannerSub: { fontSize: 13, color: "rgba(0,0,0,0.55)", maxWidth: 400 },
  partnerRow: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
  partnerBadge: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "8px 16px", fontSize: 13, color: "rgba(0,0,0,0.6)" },
  shopCard: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: 16, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  shopPrice: { fontSize: 14, fontWeight: 800, color: "#2ABCBA", margin: "8px 0" },
  shopBtn: { background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.35)", borderRadius: 4, color: "#2ABCBA", fontSize: 12, padding: "7px 14px", cursor: "pointer", width: "100%", fontWeight: 700, letterSpacing: 1 },
  secondaryBtn: { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 6, color: "#1a1a2e", fontSize: 14, fontWeight: 600, padding: "12px 24px", cursor: "pointer", flex: 1 },

  // Education Panel
  eduGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
  eduCard: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: 20, transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  eduLocked: { opacity: 0.45 },
  eduIcon: { fontSize: 44, marginBottom: 12 },
  eduTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 },
  eduMeta: { display: "flex", gap: 8, marginBottom: 12, alignItems: "center" },
  eduLevel: { fontSize: 10, borderRadius: 4, padding: "3px 10px", fontWeight: 700, letterSpacing: 1 },
  eduEssential: { background: "rgba(42,188,186,0.1)", color: "#2ABCBA", border: "1px solid rgba(42,188,186,0.3)" },
  eduAdvanced: { background: "rgba(50,137,226,0.1)", color: "#3289E2", border: "1px solid rgba(50,137,226,0.3)" },
  eduTime: { fontSize: 11, color: "rgba(0,0,0,0.4)" },
  lockBadge: { fontSize: 12, color: "rgba(0,0,0,0.35)" },
  eduBtn: { background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.3)", borderRadius: 4, color: "#2ABCBA", fontSize: 12, padding: "8px 16px", cursor: "pointer", width: "100%", fontWeight: 700, letterSpacing: 1 },

  // Agent Panel
  chatArea: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: 20, marginBottom: 16, minHeight: 300, maxHeight: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  chatBubbleAgent: { display: "flex", flexDirection: "column" },
  chatAgentLabel: { fontSize: 10, color: "rgba(42,188,186,0.8)", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" },
  chatText: { background: "rgba(42,188,186,0.06)", border: "1px solid rgba(42,188,186,0.15)", borderRadius: "0 12px 12px 12px", padding: "12px 16px", fontSize: 14, color: "#1a1a2e", lineHeight: 1.6, maxWidth: "85%" },
  chatSuggestions: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  suggestionChip: { background: "rgba(42,188,186,0.07)", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 20, padding: "7px 14px", fontSize: 12, color: "rgba(42,188,186,0.9)", cursor: "pointer", letterSpacing: 0.5 },
  chatInputRow: { display: "flex", gap: 12 },
  chatInputBox: { flex: 1, padding: "13px 16px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, color: "#1a1a2e", fontSize: 14, fontFamily: "'Inter', sans-serif" },
  sendBtn: { background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "13px 22px", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" },

  // Weather Panel
  weatherCard: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: 24, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  weatherMain: { display: "flex", alignItems: "center", gap: 20, marginBottom: 20 },
  weatherIcon: { fontSize: 72 },
  weatherTemp: { fontSize: 48, fontWeight: 800, color: "#1a1a2e" },
  weatherLoc: { fontSize: 13, color: "rgba(42,188,186,0.8)", letterSpacing: 1 },
  weatherDesc: { fontSize: 13, color: "rgba(0,0,0,0.5)" },
  weatherGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12 },
  weatherStat: { background: "rgba(0,0,0,0.03)", borderRadius: 6, padding: 12, textAlign: "center" },
  weatherStatLabel: { fontSize: 11, color: "rgba(0,0,0,0.4)", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" },
  weatherStatVal: { fontSize: 14, fontWeight: 700, color: "#1a1a2e" },
  alertsList: { display: "flex", flexDirection: "column", gap: 12 },
  alertItem: { display: "flex", gap: 16, background: "rgba(194,80,80,0.08)", border: "1px solid rgba(194,80,80,0.25)", borderRadius: 8, padding: 16 },
  alertDot: { fontSize: 18, flexShrink: 0 },
  alertTitle: { fontSize: 13, fontWeight: 700, color: "#8b1a1a", marginBottom: 4, letterSpacing: 0.5 },
  alertDesc: { fontSize: 12, color: "rgba(139,26,26,0.7)" },

  // Resources
  resourceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 },
  resourceCard: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: 20, textDecoration: "none", display: "block", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  resourceIcon: { fontSize: 44, marginBottom: 12 },
  resourceName: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 6 },
  resourceDesc: { fontSize: 12, color: "rgba(0,0,0,0.5)" },

  // Community
  friendsList: { marginTop: 20, display: "flex", flexDirection: "column", gap: 12 },
  friendCard: { display: "flex", alignItems: "center", gap: 16, background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  friendAvatar: { fontSize: 30, background: "rgba(42,188,186,0.1)", borderRadius: 8, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(42,188,186,0.2)" },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: 600, color: "#1a1a2e" },
  friendRank: { fontSize: 12, color: "rgba(42,188,186,0.8)", letterSpacing: 0.5 },
  friendScore: { fontSize: 16, fontWeight: 800, color: "#2ABCBA" },

  // Modal
  modal: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modalCard: { background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, padding: 36, maxWidth: 400, width: "90%", textAlign: "center", animation: "slideUp 0.3s ease", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" },
  modalIcon: { fontSize: 72, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 },
  modalBrand: { fontSize: 13, color: "rgba(0,0,0,0.45)", marginBottom: 4 },
  modalCategory: { fontSize: 11, background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.3)", borderRadius: 4, padding: "3px 12px", color: "#2ABCBA", display: "inline-block", marginBottom: 16, fontWeight: 700, letterSpacing: 2 },
  modalDesc: { fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.7, marginBottom: 24 },
  modalActions: { display: "flex", gap: 12 }
};