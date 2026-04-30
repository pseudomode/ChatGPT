export const LESSONS = {
  cpr: {
    title: "CPR Basics",
    icon: "❤️",
    slides: [
      {
        title: "What is CPR?",
        content: "Cardiopulmonary Resuscitation (CPR) is an emergency procedure that combines chest compressions and rescue breaths to maintain blood flow to the brain and heart when someone's heart has stopped beating.",
        visual: "🫀",
        tip: "CPR can double or triple a cardiac arrest victim's chance of survival."
      },
      {
        title: "Recognize Cardiac Arrest",
        content: "Before starting CPR, confirm: (1) The person is unresponsive — tap their shoulders and shout 'Are you okay?'. (2) They are not breathing normally — look for no breath or only gasping. (3) Call 911 immediately or have someone else call while you begin CPR.",
        visual: "🚨",
        tip: "Every second counts. Brain damage begins within 4–6 minutes without oxygen."
      },
      {
        title: "Hand Placement",
        content: "Place the heel of your hand on the center of the chest — on the lower half of the breastbone (sternum). Place your other hand on top, interlace your fingers, and keep your fingers lifted off the chest. Keep your arms straight and shoulders directly above your hands.",
        visual: "🤲",
        tip: "Correct hand placement prevents rib fractures and maximizes compression effectiveness."
      },
      {
        title: "Chest Compressions",
        content: "Push hard and fast: compress at least 2 inches deep at a rate of 100–120 compressions per minute. Allow the chest to fully recoil between compressions — don't lean on the chest. A helpful rhythm: the beat of 'Stayin' Alive' by the Bee Gees is exactly 100 BPM.",
        visual: "💪",
        tip: "Effective compressions are the most critical part of CPR. Don't stop except to give breaths."
      },
      {
        title: "Rescue Breaths",
        content: "After every 30 compressions, give 2 rescue breaths: tilt the head back, lift the chin, pinch the nose closed, and breathe into the mouth for 1 second until you see the chest rise. If you're untrained or uncomfortable, hands-only CPR (compressions only) is also effective.",
        visual: "💨",
        tip: "For children under 1 year, cover both mouth and nose. Use only 2 fingers for compressions."
      },
      {
        title: "Continue Until Help Arrives",
        content: "Continue the 30:2 ratio (compressions to breaths) until: an AED is available and ready to use, the person begins breathing normally, a trained responder takes over, or you are physically unable to continue. If an AED is nearby, use it as soon as possible.",
        visual: "⚡",
        tip: "AEDs are designed for anyone to use — they give voice instructions and analyze the heart rhythm automatically."
      }
    ],
    quiz: [
      {
        question: "At what rate should you perform chest compressions?",
        options: ["60–80 per minute", "100–120 per minute", "140–160 per minute", "80–100 per minute"],
        answer: 1
      },
      {
        question: "How deep should chest compressions be for an adult?",
        options: ["At least 1 inch", "At least 2 inches", "At least 3 inches", "As deep as possible"],
        answer: 1
      },
      {
        question: "What is the correct compression-to-breath ratio for adult CPR?",
        options: ["15:2", "30:2", "50:2", "20:2"],
        answer: 1
      },
      {
        question: "Where should you place your hands for chest compressions?",
        options: ["On the upper chest near the throat", "On the lower half of the breastbone (sternum)", "On the left side of the chest over the heart", "On the stomach"],
        answer: 1
      },
      {
        question: "What should you do FIRST when you find an unresponsive person?",
        options: ["Begin chest compressions immediately", "Give 2 rescue breaths", "Call 911 and confirm unresponsiveness", "Look for an AED"],
        answer: 2
      }
    ]
  },
  wound: {
    title: "Wound Treatment",
    icon: "🩸",
    slides: [
      { title: "Assess the Wound", content: "Before treating, determine the wound type: minor cuts and scrapes, deep lacerations, puncture wounds, or avulsions (tissue torn away). Severe bleeding from a deep wound is a life-threatening emergency — call 911 immediately. Wear gloves if available to protect yourself.", visual: "🔍", tip: "Never remove an embedded object from a wound — it may be plugging a blood vessel." },
      { title: "Stop the Bleeding", content: "Apply firm, direct pressure with a clean cloth or sterile gauze. Hold continuously for 10–15 minutes without lifting to check — this disrupts clot formation. If blood soaks through, add more material on top rather than removing it. Elevate the wound above heart level if possible.", visual: "🩹", tip: "For limb wounds with severe bleeding, a tourniquet 2–3 inches above the wound can be life-saving." },
      { title: "Clean the Wound", content: "Once bleeding is controlled, rinse the wound thoroughly under clean running water for at least 5 minutes. Remove visible debris with clean tweezers if necessary. Do NOT use hydrogen peroxide or iodine — they damage tissue and slow healing. Mild soap around (not inside) the wound is acceptable.", visual: "💧", tip: "Proper cleaning is the single most effective way to prevent wound infection." },
      { title: "Apply Antiseptic & Cover", content: "Apply a thin layer of antibiotic ointment (Neosporin or Bacitracin) to prevent infection. Cover with an appropriately sized sterile bandage or gauze and medical tape. Change the dressing daily or whenever it becomes wet or dirty. Keep the wound moist — it heals faster than a dry wound.", visual: "🏥", tip: "Butterfly strips can hold wound edges together for small but deep cuts instead of stitches." },
      { title: "Signs of Infection", content: "Watch for infection over the next 24–72 hours: increasing redness, warmth, swelling, or pain. Pus or cloudy discharge, red streaks spreading from the wound, fever above 101°F, or swollen lymph nodes are all warning signs requiring medical attention immediately.", visual: "⚠️", tip: "Infections can develop within 24 hours. Check wounds daily." },
      { title: "When to Seek Emergency Care", content: "Go to the ER or call 911 for: wounds longer than ½ inch or very deep, wounds that won't stop bleeding after 15 minutes of pressure, animal or human bites, puncture wounds from rusty objects, wounds with visible bone, tendon, or fat, or facial wounds that may affect appearance.", visual: "🚑", tip: "Tetanus shots should be updated every 10 years, or within 5 years for deep/dirty wounds." }
    ],
    quiz: [
      { question: "What should you do if blood soaks through the bandage?", options: ["Remove and replace the bandage", "Add more material on top without removing", "Apply hydrogen peroxide", "Increase pressure by squeezing harder"], answer: 1 },
      { question: "How long should you rinse a wound under running water?", options: ["30 seconds", "1–2 minutes", "At least 5 minutes", "10 minutes"], answer: 2 },
      { question: "Which antiseptic should you NOT use on a wound?", options: ["Neosporin", "Bacitracin", "Hydrogen peroxide", "Antibiotic ointment"], answer: 2 },
      { question: "A wound longer than what size typically requires medical attention?", options: ["¼ inch", "½ inch", "1 inch", "2 inches"], answer: 1 },
      { question: "What does a red streak spreading from a wound indicate?", options: ["Normal healing", "Scar formation", "Infection spreading — seek immediate care", "The wound is closing properly"], answer: 2 }
    ]
  },
  fire: {
    title: "Kitchen Fire Safety",
    icon: "🔥",
    slides: [
      { title: "The #1 Cause of Home Fires", content: "Cooking is the leading cause of home fires and injuries in the US, responsible for nearly 50% of all home fires. Most kitchen fires start on the stovetop, not in the oven. The most common cause: leaving cooking unattended. Never leave the kitchen when something is on the stove.", visual: "🍳", tip: "Set a timer as a reminder whenever you step away from the kitchen." },
      { title: "Grease Fires — Never Use Water", content: "Grease fires (Class K) are the most dangerous kitchen fires. NEVER throw water on a grease fire — it causes a violent steam explosion that spreads burning oil. To extinguish: slide a lid over the pan to cut off oxygen, turn off the heat, and leave the lid on until completely cool. Or use a Class K or ABC extinguisher.", visual: "🚫", tip: "A box of baking soda can smother small grease fires — salt also works in a pinch." },
      { title: "Using a Fire Extinguisher", content: "Remember PASS: Pull the pin, Aim the nozzle at the base of the fire, Squeeze the handle, Sweep side to side. Only fight a fire if it's small (contained to one object), you have a clear exit behind you, the extinguisher is rated for that fire type, and you've called 911 first.", visual: "🧯", tip: "Position yourself 6–8 feet from the fire. Never let the fire get between you and the exit." },
      { title: "Oven & Microwave Fires", content: "For an oven fire: keep the door CLOSED — this starves the fire of oxygen. Turn off the heat and wait for it to extinguish. For a microwave fire: keep the door closed, unplug or turn off the circuit, and let it cool completely. Never open the door until the fire is out.", visual: "♨️", tip: "A foil-lined oven or leftover food debris are common ignition sources. Clean your oven regularly." },
      { title: "Prevent Kitchen Fires", content: "Prevention is everything: Stay in the kitchen when frying, grilling, or broiling. Keep flammables (towels, paper, plastic) away from the stove. Clean grease buildup from stovetops and hoods regularly. Never cook while tired, distracted, or under the influence. Keep a lid nearby when cooking with oil.", visual: "✅", tip: "Wear close-fitting sleeves when cooking — loose clothing is a leading cause of burns." },
      { title: "When to Evacuate", content: "If a fire grows beyond the pan, fills the kitchen with smoke, or you cannot control it within seconds — GET OUT. Close doors behind you to slow spread. Crawl low under smoke. Never re-enter a burning building. Call 911 from outside. Your life is worth more than any possession.", visual: "🚪", tip: "Practice your home escape plan twice a year with your household." }
    ],
    quiz: [
      { question: "What should you NEVER do with a grease fire?", options: ["Cover it with a lid", "Use a Class K extinguisher", "Pour water on it", "Turn off the heat"], answer: 2 },
      { question: "What does the 'P' in PASS stand for when using an extinguisher?", options: ["Push", "Pull the pin", "Point", "Press"], answer: 1 },
      { question: "What should you do if a fire starts inside your oven?", options: ["Open the oven and use water", "Keep the door closed and turn off the heat", "Pull the oven away from the wall", "Throw baking soda inside immediately"], answer: 1 },
      { question: "Where do most kitchen fires start?", options: ["In the oven", "In the microwave", "On the stovetop", "From the toaster"], answer: 2 },
      { question: "When should you attempt to fight a fire yourself?", options: ["Always — it's your home", "Only if it's small, contained, and you have a clear exit", "Only if you have water nearby", "Never — always evacuate"], answer: 1 }
    ]
  },
  choking: {
    title: "Helping a Choking Child",
    icon: "👶",
    slides: [
      { title: "Recognize Choking", content: "A choking child may: clutch their throat with one or both hands (universal choking sign), be unable to cry, speak, or make sounds, have a weak or silent cough, turn blue or purple around the lips, or have a high-pitched wheeze. A child who is coughing forcefully is NOT fully choking — encourage them to keep coughing.", visual: "🤫", tip: "If the child can cough, cry, or speak, do NOT perform the Heimlich — let them cough it out." },
      { title: "For Infants Under 1 Year", content: "Hold the infant face-down on your forearm, supporting the head. Give 5 firm back blows between the shoulder blades with the heel of your hand. Flip face-up and give 5 chest thrusts with 2 fingers on the center of the chest. Alternate until the object is expelled or the infant loses consciousness.", visual: "👶", tip: "Never perform abdominal thrusts on infants — their organs can be easily damaged." },
      { title: "For Children 1 Year and Older", content: "Kneel or stand behind the child. Wrap your arms around their waist. Make a fist with one hand and place the thumb side against the abdomen, just above the navel and well below the breastbone. Grab your fist with the other hand. Give quick, firm upward thrusts — inward and upward.", visual: "🫂", tip: "For a large or obese child, use chest thrusts instead of abdominal thrusts if your arms can't wrap around." },
      { title: "If the Child Becomes Unconscious", content: "Lower the child carefully to the floor. Call 911 if not already done. Begin CPR — but before giving rescue breaths, look inside the mouth. If you can see an object, remove it. NEVER perform a blind finger sweep — this can push the object deeper. Only remove what you can clearly see.", visual: "⚠️", tip: "Even after successful removal, have the child examined by a doctor — internal injury may have occurred." },
      { title: "Prevention — Common Choking Hazards", content: "High-risk foods for young children: grapes, hot dogs, nuts, popcorn, hard candy, raw carrots, and large chunks of meat. Cut food into pieces smaller than ½ inch. Supervise mealtimes. Keep small objects (coins, batteries, toy parts) out of reach. Children under 4 should not have hard, round, or sticky foods.", visual: "🚫", tip: "Button batteries are especially dangerous — they cause chemical burns within 2 hours if swallowed." }
    ],
    quiz: [
      { question: "What is the universal sign of choking?", options: ["Coughing loudly", "Hands clutched around the throat", "Turning red in the face", "Crying loudly"], answer: 1 },
      { question: "How many back blows do you give an infant before switching to chest thrusts?", options: ["2", "3", "5", "10"], answer: 2 },
      { question: "Where should you place your fist for the Heimlich maneuver on a child?", options: ["On the chest", "Just above the navel and below the breastbone", "On the lower abdomen", "On the upper chest"], answer: 1 },
      { question: "If a child is coughing strongly, what should you do?", options: ["Perform the Heimlich immediately", "Give back blows", "Encourage them to keep coughing", "Call 911 right away"], answer: 2 },
      { question: "Why should you NEVER perform a blind finger sweep on a choking child?", options: ["It wastes time", "It can push the object deeper", "It causes pain", "It only works on adults"], answer: 1 }
    ]
  },
  flood: {
    title: "Flood Response",
    icon: "🌊",
    slides: [
      { title: "Types of Floods", content: "Flash floods develop within 6 hours of heavy rain and are the deadliest flood type — they can produce walls of water 10–20 feet high with little warning. River floods develop over days. Coastal floods come from storm surges. Urban flooding occurs when drainage systems overwhelm city streets.", visual: "🌊", tip: "Flash floods can occur even miles from where it's raining. Never ignore flood warnings." },
      { title: "Before a Flood — Prepare Now", content: "Know your flood zone (FEMA flood maps). Create a family emergency plan and go-bag. Move valuables to higher floors. Install check valves in plumbing. Waterproof your basement. Sign up for local emergency alerts. Know your evacuation routes — have two planned in case one is blocked.", visual: "🗺️", tip: "Keep your car's gas tank above half during flood season — gas stations may be closed after a flood." },
      { title: "Never Walk or Drive Through Flood Water", content: "Just 6 inches of fast-moving water can knock an adult off their feet. 12 inches of moving water can carry away a small vehicle. 2 feet of rushing water can sweep away most SUVs. The water may be hiding downed power lines, open manholes, debris, or washed-out road surfaces.", visual: "🚗", tip: "'Turn Around, Don't Drown' — more than half of all flood deaths occur in vehicles." },
      { title: "If Trapped Indoors", content: "Move to the highest floor or roof if water is rising. Signal for help from a window. Do not enter the attic unless you have a way to escape — people become trapped. Avoid electrical equipment if wet or standing in water. If you must move through water, use a stick to check depth and ground stability.", visual: "🏠", tip: "Keep a hammer or hatchet in your attic in case you need to break through the roof." },
      { title: "After a Flood", content: "Return home only when authorities say it's safe. Wear rubber boots and gloves — floodwater contains sewage, chemicals, and debris. Document all damage with photos before cleaning. Discard all food that has contacted floodwater. Check for structural damage before entering. Run water taps to check for contamination.", visual: "🧹", tip: "Mold begins growing within 24–48 hours after water damage. Start drying immediately." }
    ],
    quiz: [
      { question: "How many inches of fast-moving water can knock an adult off their feet?", options: ["2 inches", "6 inches", "12 inches", "24 inches"], answer: 1 },
      { question: "How quickly do flash floods develop after heavy rain?", options: ["Within 6 hours", "Within 24 hours", "Within 48 hours", "Over several days"], answer: 0 },
      { question: "What should you do if trapped on an upper floor by rising water?", options: ["Go to the basement", "Move to the highest point and signal for help", "Try to swim out", "Enter the attic and seal the door"], answer: 1 },
      { question: "When should you return home after a flood?", options: ["As soon as the rain stops", "When water levels look low", "Only when authorities say it's safe", "After 24 hours"], answer: 2 },
      { question: "How soon does mold begin growing after water damage?", options: ["Within 24–48 hours", "Within 1 week", "After 2 weeks", "After the area dries completely"], answer: 0 }
    ]
  },
  earthquake: {
    title: "Earthquake Protocol",
    icon: "🌪️",
    slides: [
      { title: "Drop, Cover, and Hold On", content: "The moment you feel shaking: DROP to your hands and knees (prevents being knocked down). Take COVER under a sturdy desk or table, or against an interior wall away from windows. HOLD ON until the shaking stops. If no table is nearby, cover your head and neck with your arms.", visual: "⬇️", tip: "The 'Triangle of Life' theory (hiding beside furniture) is NOT endorsed by safety experts — Drop, Cover, Hold On is the proven method." },
      { title: "During the Shaking", content: "Stay where you are — most injuries occur when people try to move or run during shaking. Stay away from windows, exterior walls, and heavy furniture that could topple. If in bed, stay there and protect your head with a pillow. If outside, move away from buildings, streetlights, and utility wires.", visual: "🏠", tip: "Doorframes are NOT safer than other spots — this is an outdated myth." },
      { title: "After the Shaking Stops", content: "Expect aftershocks — drop, cover, and hold on again when they occur. Check yourself and others for injuries. If in a damaged building, exit carefully — use stairs, never elevators. Watch for hazards: gas leaks (smell of rotten eggs), downed power lines, structural damage, and fire.", visual: "👀", tip: "Put on sturdy shoes before walking through debris — broken glass is everywhere after earthquakes." },
      { title: "Gas Leaks & Fire Hazards", content: "If you smell gas or hear hissing: do not use any switches, lighters, or open flames. Open windows and leave immediately. Shut off the gas at the meter if you know how and it's safe to do so. Report to the gas company from outside. Do not re-enter until cleared by officials. Gas leaks are a leading post-earthquake fire cause.", visual: "⚡", tip: "Know where your gas shutoff valve is and keep a wrench nearby." },
      { title: "Prepare Before an Earthquake", content: "Secure heavy furniture and appliances to walls with straps. Store heavy items low. Keep emergency supplies accessible. Know how to shut off utilities. Create a family meeting point. Practice Drop, Cover, Hold On drills. Identify safe spots in each room. Keep shoes under the bed in earthquake-prone areas.", visual: "🛡️", tip: "California's Great ShakeOut is the world's largest earthquake drill — join it to practice." }
    ],
    quiz: [
      { question: "What is the correct earthquake response action?", options: ["Run outside immediately", "Stand in a doorway", "Drop, Cover, and Hold On", "Hide under the bed"], answer: 2 },
      { question: "Why should you NOT run outside during an earthquake?", options: ["It's too far", "Most injuries occur from moving during shaking", "The door may be blocked", "Aftershocks could start"], answer: 1 },
      { question: "What does the smell of rotten eggs after an earthquake indicate?", options: ["Sewage backup", "A gas leak", "Mold growth", "Chemical spill"], answer: 1 },
      { question: "What should you put on before walking through earthquake debris?", options: ["Gloves", "A helmet", "Sturdy shoes", "A dust mask"], answer: 2 },
      { question: "What phenomenon should you expect after the main earthquake shaking stops?", options: ["Aftershocks", "Floods", "Tornadoes", "Lightning"], answer: 0 }
    ]
  },
  wildfire: {
    title: "Wildfire Evacuation",
    icon: "🔶",
    slides: [
      { title: "Know Your Evacuation Zone", content: "Most counties use a zone system: Zone 1 = Evacuate immediately. Zone 2 = Be ready to leave at a moment's notice. Zone 3 = Be aware and monitor. Sign up for your county's emergency alert system. Know your zone before a fire happens. Have two planned evacuation routes from your home.", visual: "🗺️", tip: "Download your county's emergency alert app now — don't wait for a fire to set it up." },
      { title: "Go Early — Don't Wait", content: "The most dangerous mistake in wildfires is waiting too long to evacuate. Leave as soon as an evacuation order or warning is issued for your zone. Roads jam, visibility drops to near zero, and fire can outrun a car. Pre-evacuation means you go before orders — this is always the safest choice.", visual: "🚗", tip: "Wildfires can move at 14 mph in open terrain and much faster in high winds." },
      { title: "Before You Leave — 15-Minute Checklist", content: "Close all windows and doors (slows fire entry). Shut off gas. Leave exterior lights on (makes home visible in smoke). Move flammable patio furniture inside. Put your go-bag, medications, pets, and important documents in the car. Text your family your evacuation route. Wear long sleeves, long pants, and a N95 mask.", visual: "📋", tip: "Pre-pack your go-bag now — in an emergency you'll have 5 minutes, not 15." },
      { title: "While Evacuating", content: "Follow official evacuation routes — don't try shortcuts. Watch for emergency vehicles. If caught in fire on the road: pull off to the side away from heavy vegetation, turn off the engine, turn on hazard lights, get on the floor and cover up with a blanket or coat, stay in the car until the fire passes.", visual: "🚒", tip: "Avoid driving through active smoke — zero visibility causes multi-car accidents on evacuation routes." },
      { title: "After the Fire — Returning Safely", content: "Return ONLY when authorities permit. Wear N95 masks and protective clothing. Avoid ash — it contains toxic heavy metals. Don't use tap water until cleared. Watch for hazards: weakened trees, hot spots, and downed power lines. Document everything for insurance. Never use generators or grills indoors.", visual: "🏚️", tip: "Wildfire ash can remain toxic for weeks. Always use gloves and N95 when cleaning." }
    ],
    quiz: [
      { question: "When is the safest time to evacuate during a wildfire?", options: ["When you see flames", "Only when Zone 1 orders are issued", "As soon as a warning or order is issued for your zone", "When the roads are clear"], answer: 2 },
      { question: "How fast can wildfires move in open terrain?", options: ["2 mph", "5 mph", "14 mph", "30 mph"], answer: 2 },
      { question: "What should you do if you're caught in a wildfire while driving?", options: ["Keep driving as fast as possible", "Pull over, turn off engine, get on floor, stay in car", "Get out and run", "Open the windows for air"], answer: 1 },
      { question: "Why is wildfire ash dangerous even after the fire?", options: ["It's slippery", "It contains toxic heavy metals", "It attracts animals", "It causes allergies only"], answer: 1 },
      { question: "What should you close before evacuating your home?", options: ["Only the front door", "All windows and doors", "Just the garage", "Only interior doors"], answer: 1 }
    ]
  },
  shelter: {
    title: "Emergency Shelter-in-Place",
    icon: "🏕️",
    slides: [
      { title: "What is Shelter-in-Place?", content: "Shelter-in-place means staying inside your home or building for protection from an outdoor threat: chemical spill, hazardous material release, biological threat, nuclear incident, or severe weather. It is NOT the same as evacuation — you are creating a safe sealed environment indoors.", visual: "🏠", tip: "A well-sealed room is surprisingly effective protection against most airborne hazards." },
      { title: "Choose Your Safe Room", content: "Select an interior room on the highest floor (for chemical spills — chemicals are heavier than air and stay low). Choose a room with the fewest windows and doors. Bring everyone inside including pets. Close all windows and doors immediately. Turn off all HVAC systems — they pull outside air in.", visual: "🚪", tip: "For nuclear events, the center of a concrete or brick building on a middle floor offers the most protection." },
      { title: "Seal the Room", content: "Use pre-cut plastic sheeting and duct tape to seal all windows, door gaps, vents, electrical outlets, and any opening to the outside. Seal from the inside. Close fireplace dampers. Turn off exhaust fans. A sealed room can maintain safe air for several hours — most hazardous cloud events pass within 2–5 hours.", visual: "🔒", tip: "Pre-cut and label your plastic sheeting before an emergency. Store with duct tape in your safe room." },
      { title: "Supplies to Have Ready", content: "Keep in your shelter-in-place room: at least 1 gallon of water per person, food for 72 hours, battery-powered or hand-crank radio, flashlights and extra batteries, first aid kit, N95 masks, medications, phone charger, blankets, sanitation supplies (bucket, bags, hand sanitizer).", visual: "🎒", tip: "Check and rotate your shelter supplies every 6 months along with your smoke detector batteries." },
      { title: "Monitor & When to Leave", content: "Monitor your NOAA weather radio or local emergency alerts for the all-clear. Do NOT leave until authorities officially announce it is safe. When leaving: open windows and doors to ventilate before entering other parts of the building. If you feel dizzy or ill, move to fresh air immediately and call 911.", visual: "📻", tip: "Never assume it's safe because it smells fine — many toxic gases are odorless and colorless." }
    ],
    quiz: [
      { question: "Why should you choose a room on a HIGHER floor for chemical shelter-in-place?", options: ["Better reception", "Chemical vapors are heavier than air and stay low", "More windows for monitoring", "Easier to signal rescuers"], answer: 1 },
      { question: "What should you do with HVAC systems during shelter-in-place?", options: ["Turn them on for air circulation", "Turn them off — they pull outside air in", "Set them to recirculate mode", "Open all vents"], answer: 1 },
      { question: "How long can most hazardous chemical cloud events last?", options: ["30 minutes", "2–5 hours", "12 hours", "24 hours"], answer: 1 },
      { question: "What material is used to seal windows and doors during shelter-in-place?", options: ["Wet towels", "Aluminum foil", "Plastic sheeting and duct tape", "Cardboard and tape"], answer: 2 },
      { question: "When is it safe to leave your shelter-in-place location?", options: ["When the smell goes away", "After 2 hours automatically", "Only when authorities officially announce it's safe", "When power is restored"], answer: 2 }
    ]
  },
  water: {
    title: "Water Safety & Purification",
    icon: "💧",
    slides: [
      { title: "Why Water Becomes Unsafe", content: "During emergencies, water supplies can become contaminated through: broken pipes allowing sewage intrusion, flooding that overwhelms treatment plants, power outages disabling water treatment, chemical spills, or biological contamination. Contaminated water can cause cholera, typhoid, hepatitis A, and dysentery.", visual: "⚠️", tip: "Clear water is NOT necessarily safe — bacteria and viruses are invisible." },
      { title: "How Long Can You Store Water?", content: "Store at least 1 gallon per person per day for a minimum of 3 days (ideally 2 weeks). Store-bought sealed water lasts until the printed date. Water stored in food-grade containers lasts 6 months before needing rotation. Keep stored water in a cool, dark place away from chemicals and petroleum products.", visual: "🪣", tip: "Water can also be stored in your water heater tank (40–80 gallons) and toilet tank (not bowl)." },
      { title: "Boiling Water", content: "Boiling is the most reliable purification method. Bring water to a rolling boil for at least 1 minute (3 minutes at elevations above 6,500 feet). Let it cool naturally. This kills bacteria, viruses, and parasites. Boiling does NOT remove chemical contamination, heavy metals, or salt.", visual: "♨️", tip: "Add a pinch of salt to boiled water to improve flat taste from re-oxygenation." },
      { title: "Chemical Treatment", content: "Unscented liquid bleach (5–9% sodium hypochlorite): add 8 drops per gallon of clear water, or 16 drops per gallon of cloudy water. Mix and let stand 30 minutes. The water should have a slight chlorine odor. Water purification tablets (iodine or chlorine) are convenient for go-bags — 1 tablet per quart.", visual: "🧪", tip: "Bleach older than 1 year loses effectiveness. Check the manufacture date on your stored bleach." },
      { title: "Filtration Methods", content: "LifeStraw and Sawyer Squeeze filters remove 99.9999% of bacteria and 99.9% of parasites from any freshwater source — but do NOT remove viruses (important outside the US where viruses are common). For full protection: filter first, then chemically treat. Ceramic filters with activated carbon remove chemicals too.", visual: "🌊", tip: "Never filter saltwater through a portable filter — it will damage the membrane permanently." }
    ],
    quiz: [
      { question: "How long should you boil water at sea level to purify it?", options: ["30 seconds", "1 minute", "5 minutes", "10 minutes"], answer: 1 },
      { question: "How much water should you store per person per day?", options: ["½ gallon", "1 gallon", "2 gallons", "3 gallons"], answer: 1 },
      { question: "What does boiling water NOT remove?", options: ["Bacteria", "Viruses", "Chemical contamination", "Parasites"], answer: 2 },
      { question: "How many drops of unscented bleach should you add per gallon of CLEAR water?", options: ["4 drops", "8 drops", "16 drops", "32 drops"], answer: 1 },
      { question: "What do portable filters like LifeStraw typically NOT remove?", options: ["Bacteria", "Parasites", "Viruses", "Sediment"], answer: 2 }
    ]
  },
  comms: {
    title: "Emergency Communications",
    icon: "📡",
    slides: [
      { title: "When Normal Communication Fails", content: "During major disasters, cell networks fail due to tower damage, power loss, or network congestion from millions of simultaneous calls. SMS/texts often get through when calls don't — they use far less bandwidth. Power outages kill WiFi routers. Plan for communication failure before it happens.", visual: "📵", tip: "Text messages are up to 10x more likely to get through than voice calls during emergencies." },
      { title: "Designate an Out-of-State Contact", content: "Choose one person outside your region as the family communication hub. It's often easier to reach someone in another state than across town after a local disaster. Everyone in your family should have this number memorized — not just stored in their phone. Text updates to this person first.", visual: "👨‍👩‍👧", tip: "Choose someone reliable and calm under pressure. Inform them of their role before any emergency." },
      { title: "Two-Way Radios & GMRS", content: "FRS/GMRS handheld radios (walkie-talkies) work without infrastructure — no towers, no internet, no cell service needed. GMRS radios have ranges of 1–30 miles. Program family channels in advance. Channel 1 (FRS) is the most widely used emergency channel. A GMRS license ($35, no test) is required for high-power use.", visual: "📻", tip: "Midland and Motorola make top-rated GMRS radios. Charge them fully and keep in your go-bag." },
      { title: "NOAA Weather Radio", content: "NOAA Weather Radio All Hazards broadcasts 24/7 on 7 dedicated frequencies. It provides severe weather warnings, natural disaster information, environmental hazards, and national security alerts. A battery-powered or hand-crank NOAA radio is essential — it works when everything else fails.", visual: "🌩️", tip: "Program your NOAA radio's SAME code for your county to receive only local alerts." },
      { title: "Social Media & Emergency Alerts", content: "Register your mobile phone in your area's emergency alert system (Wireless Emergency Alerts arrive automatically). Follow local emergency management on social media. Check in as 'Safe' on Facebook Safety Check when available. Google Person Finder helps locate missing people after disasters.", visual: "📱", tip: "Keep your phone charged above 50% during severe weather warnings. Keep a backup battery." }
    ],
    quiz: [
      { question: "Why are text messages better than calls during emergencies?", options: ["They're free", "They use far less network bandwidth", "They're encrypted", "They work without signal"], answer: 1 },
      { question: "Who should you designate as your family communication contact?", options: ["A neighbor next door", "A local friend", "Someone out of your region", "Your boss"], answer: 2 },
      { question: "What does NOAA Weather Radio broadcast?", options: ["Music and entertainment", "24/7 weather and all-hazard emergency alerts", "Government announcements only", "Local news"], answer: 1 },
      { question: "Which radio channel is most widely used for emergency communication?", options: ["Channel 1 (FRS)", "Channel 7", "Channel 16", "Channel 22"], answer: 0 },
      { question: "What is the SAME code used for in a NOAA weather radio?", options: ["Setting the alarm volume", "Receiving only local county alerts", "Connecting to the internet", "Syncing with your phone"], answer: 1 }
    ]
  },
  mental: {
    title: "Mental Health in Disasters",
    icon: "🧠",
    slides: [
      { title: "Normal Reactions to Abnormal Events", content: "Feeling shocked, anxious, sad, angry, or numb after a disaster is completely normal. Common reactions include: sleep disturbances, difficulty concentrating, irritability, physical symptoms (headaches, fatigue), and intrusive thoughts. These reactions usually improve within 2–4 weeks. They do not mean you are weak.", visual: "💙", tip: "Acknowledging your feelings is the first step to resilience — suppressing them makes recovery harder." },
      { title: "Helping Children Cope", content: "Children mirror adult reactions — staying calm yourself is the most powerful thing you can do. Provide honest, age-appropriate explanations. Maintain routines as much as possible — structure provides safety. Let children talk about their feelings. Limit media exposure to disaster coverage. Give them small tasks to restore a sense of control.", visual: "👧", tip: "Regression (bed-wetting, thumb-sucking) is common in young children after disasters — it's temporary." },
      { title: "Psychological First Aid", content: "PFA is the evidence-based first response to mental health needs: Ensure physical safety first. Provide practical help (food, water, shelter). Listen without pushing people to talk. Connect people with family, friends, and community. Give accurate information. Connect with professional mental health resources if needed.", visual: "🤝", tip: "Simply being present and calm with someone in distress is powerful — you don't need to fix anything." },
      { title: "Signs That Help Is Needed", content: "Seek professional help if you or someone else experiences: symptoms lasting more than 4 weeks, inability to care for oneself or others, thoughts of self-harm or suicide, substance use to cope, severe anxiety or panic attacks, or complete emotional numbing. SAMHSA's crisis line: 1-800-985-5990.", visual: "🆘", tip: "Crisis Text Line: Text HOME to 741741 — available 24/7, free, confidential." },
      { title: "Build Resilience Before Disasters", content: "Resilience is built before crisis: maintain strong social connections, practice stress management (exercise, mindfulness), develop problem-solving skills, maintain perspective through previous hardships, and make preparedness plans as a family. Prepared families experience significantly less psychological trauma after disasters.", visual: "💪", tip: "Community connection is the #1 predictor of post-disaster mental health outcomes." }
    ],
    quiz: [
      { question: "How long do normal stress reactions typically last after a disaster?", options: ["24 hours", "2–4 weeks", "6 months", "They never resolve without treatment"], answer: 1 },
      { question: "What is the most powerful thing adults can do to help children cope with disaster?", options: ["Keep children away from all information", "Stay calm themselves", "Provide detailed explanations of the danger", "Let children watch the news to understand"], answer: 1 },
      { question: "What is SAMHSA's crisis support phone number?", options: ["1-800-273-8255", "1-800-985-5990", "911", "211"], answer: 1 },
      { question: "What does PFA stand for in disaster mental health response?", options: ["Post-Fire Assessment", "Psychological First Aid", "Primary Family Assistance", "Personal Fulfillment Action"], answer: 1 },
      { question: "What is the #1 predictor of post-disaster mental health outcomes?", options: ["Financial stability", "Physical health", "Community connection", "Prior military training"], answer: 2 }
    ]
  },
  pets: {
    title: "Emergency Planning for Pets",
    icon: "🐾",
    slides: [
      { title: "Why Pets Need Their Own Plan", content: "Over 60% of US households have pets, yet most emergency plans ignore them. During Hurricane Katrina, over 250,000 pets were left behind — many people refused to evacuate without their animals, putting themselves at risk. FEMA now requires emergency shelters to accommodate pets. Plan for your pets now.", visual: "🐕", tip: "NEVER leave pets behind assuming you'll be back soon — emergencies are unpredictable." },
      { title: "Pet Emergency Kit", content: "Build a pet go-bag with: 3-day supply of food and water (with collapsible bowls), medications and medical records, carrier or leash and harness, photos of you with your pet (for proving ownership), sanitation supplies (bags, litter, cleaner), comfort items (favorite toy, blanket), and your vet's emergency contact.", visual: "🎒", tip: "Keep a recent photo of you with your pet in case you get separated." },
      { title: "Identification & Microchipping", content: "Ensure your pet has an ID tag with your current phone number at all times. Microchipping ($25–$50) is permanent and dramatically increases reunion rates — 52% of microchipped pets are returned vs. 22% without chips. Keep registration updated when you move or change your number.", visual: "🔖", tip: "Register your microchip on multiple databases — AAHA Universal Pet Microchip Lookup covers most." },
      { title: "Evacuation with Pets", content: "Identify pet-friendly hotels along your evacuation routes in advance. Contact friends or family outside the area who can take you and your pets. Call ahead — many shelters now have separate pet areas. Have carriers for all pets — animals become panicked and may run. Never put pets in the truck bed during evacuation.", visual: "🚗", tip: "Download the American Red Cross Pet First Aid app for emergencies on the road." },
      { title: "Pets Left Behind — What To Do", content: "If you absolutely cannot take your pet: leave them indoors with food and water for 5+ days. Leave a sign on your front door with the number and type of pets inside. Contact local animal control or rescue organizations. Leave collars on with ID tags. Return as soon as safely permitted — animals left alone suffer greatly.", visual: "🏠", tip: "Never chain a pet outside during an evacuation — they cannot escape rising water or fire." }
    ],
    quiz: [
      { question: "How much food and water should a pet go-bag contain?", options: ["1-day supply", "3-day supply", "1-week supply", "2-week supply"], answer: 1 },
      { question: "What percentage of microchipped pets are returned to owners?", options: ["22%", "35%", "52%", "75%"], answer: 2 },
      { question: "What should you leave on your front door if you cannot take your pet?", options: ["Food bowls", "A sign with the number and type of pets inside", "Their carrier", "Their medication"], answer: 1 },
      { question: "What should you NEVER do with a pet during evacuation?", options: ["Use a carrier", "Put them in the truck bed", "Keep them on a leash", "Have their ID tag on"], answer: 1 },
      { question: "Why did many people refuse to evacuate during Hurricane Katrina?", options: ["They didn't believe warnings", "They refused to leave their pets behind", "Roads were blocked", "They had no transportation"], answer: 1 }
    ]
  }
};