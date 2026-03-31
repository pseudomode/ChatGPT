const CATEGORY_OPTIONS = [
  {
    id: "all",
    label: "All available keys",
    keys: [
      "major:Cb", "major:Gb", "major:Db", "major:Ab", "major:Eb", "major:Bb", "major:F", "major:C",
      "major:G", "major:D", "major:A", "major:E", "major:B", "major:F#", "major:C#",
      "minor:Ab", "minor:Eb", "minor:Bb", "minor:F", "minor:C", "minor:G", "minor:D", "minor:A",
      "minor:E", "minor:B", "minor:F#", "minor:C#", "minor:G#", "minor:D#", "minor:A#",
    ],
  },
  {
    id: "jazz",
    label: "Common jazz keys",
    keys: ["major:F", "major:Bb", "major:Eb", "major:Ab", "major:Db", "major:C", "major:G", "major:D"],
  },
  {
    id: "blues",
    label: "Common blues keys",
    keys: ["major:C", "major:F", "major:G", "major:Bb", "major:Eb", "major:A", "major:D", "major:E"],
  },
  {
    id: "band",
    label: "Band and brass section keys",
    keys: ["major:Bb", "major:Eb", "major:F", "major:Ab", "major:C", "major:Db", "major:G"],
  },
  {
    id: "sharp",
    label: "Sharp-side keys",
    keys: ["major:C", "major:G", "major:D", "major:A", "major:E", "major:B", "major:F#", "major:C#"],
  },
  {
    id: "flat",
    label: "Flat-side keys",
    keys: ["major:Cb", "major:Gb", "major:Db", "major:Ab", "major:Eb", "major:Bb", "major:F", "major:C"],
  },
  {
    id: "minor",
    label: "Minor Keys",
    keys: [
      "minor:Ab", "minor:Eb", "minor:Bb", "minor:F", "minor:C", "minor:G", "minor:D", "minor:A",
      "minor:E", "minor:B", "minor:F#", "minor:C#", "minor:G#", "minor:D#", "minor:A#",
    ],
  },
];

const KEY_DEFINITIONS = [
  { id: "major:Cb", tonic: "Cb", mode: "major", signatureKey: "Cb" },
  { id: "major:Gb", tonic: "Gb", mode: "major", signatureKey: "Gb" },
  { id: "major:Db", tonic: "Db", mode: "major", signatureKey: "Db" },
  { id: "major:Ab", tonic: "Ab", mode: "major", signatureKey: "Ab" },
  { id: "major:Eb", tonic: "Eb", mode: "major", signatureKey: "Eb" },
  { id: "major:Bb", tonic: "Bb", mode: "major", signatureKey: "Bb" },
  { id: "major:F", tonic: "F", mode: "major", signatureKey: "F" },
  { id: "major:C", tonic: "C", mode: "major", signatureKey: "C" },
  { id: "major:G", tonic: "G", mode: "major", signatureKey: "G" },
  { id: "major:D", tonic: "D", mode: "major", signatureKey: "D" },
  { id: "major:A", tonic: "A", mode: "major", signatureKey: "A" },
  { id: "major:E", tonic: "E", mode: "major", signatureKey: "E" },
  { id: "major:B", tonic: "B", mode: "major", signatureKey: "B" },
  { id: "major:F#", tonic: "F#", mode: "major", signatureKey: "F#" },
  { id: "major:C#", tonic: "C#", mode: "major", signatureKey: "C#" },
  { id: "minor:Ab", tonic: "Ab", mode: "minor", signatureKey: "Cb" },
  { id: "minor:Eb", tonic: "Eb", mode: "minor", signatureKey: "Gb" },
  { id: "minor:Bb", tonic: "Bb", mode: "minor", signatureKey: "Db" },
  { id: "minor:F", tonic: "F", mode: "minor", signatureKey: "Ab" },
  { id: "minor:C", tonic: "C", mode: "minor", signatureKey: "Eb" },
  { id: "minor:G", tonic: "G", mode: "minor", signatureKey: "Bb" },
  { id: "minor:D", tonic: "D", mode: "minor", signatureKey: "F" },
  { id: "minor:A", tonic: "A", mode: "minor", signatureKey: "C" },
  { id: "minor:E", tonic: "E", mode: "minor", signatureKey: "G" },
  { id: "minor:B", tonic: "B", mode: "minor", signatureKey: "D" },
  { id: "minor:F#", tonic: "F#", mode: "minor", signatureKey: "A" },
  { id: "minor:C#", tonic: "C#", mode: "minor", signatureKey: "E" },
  { id: "minor:G#", tonic: "G#", mode: "minor", signatureKey: "B" },
  { id: "minor:D#", tonic: "D#", mode: "minor", signatureKey: "F#" },
  { id: "minor:A#", tonic: "A#", mode: "minor", signatureKey: "C#" },
];
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];
const DEGREE_NAMES = ["1 / Tonic", "2 / Supertonic", "3 / Mediant", "4 / Subdominant", "5 / Dominant", "6 / Submediant", "7 / Leading tone"];
const LETTER_TO_SEMITONE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const WRITTEN_RANGE = { low: 60, high: 84 };
const NOTES_PER_SYSTEM = 8;
const STAFF_TOP = 54;
const STAFF_STEP = 11;
const KEY_SIGNATURE_ORDER = {
  sharp: ["F", "C", "G", "D", "A", "E", "B"],
  flat: ["B", "E", "A", "D", "G", "C", "F"],
};

const FINGERINGS = {
  trumpet: {
    "C": "Open",
    "C#": "1-2-3",
    "Db": "1-2-3",
    "D": "1-3",
    "D#": "2-3",
    "Eb": "2-3",
    "E": "1-2",
    "F": "1",
    "F#": "2",
    "Gb": "2",
    "G": "Open",
    "G#": "2-3",
    "Ab": "2-3",
    "A": "1-2",
    "A#": "1",
    "Bb": "1",
    "B": "2",
    "Cb": "2",
  },
  horn: {
    "C": "Open",
    "C#": "2",
    "Db": "2",
    "D": "1",
    "D#": "2",
    "Eb": "2",
    "E": "Open",
    "F": "1",
    "F#": "2",
    "Gb": "2",
    "G": "Open",
    "G#": "2-3",
    "Ab": "2-3",
    "A": "1-2",
    "A#": "1",
    "Bb": "1",
    "B": "2",
    "Cb": "2",
  },
};

const DOUBLE_HORN_NOTE_FINGERINGS = {
  C4: { fingering: "Open", side: "F side" },
  "C#4": { fingering: "2", side: "F side" },
  Db4: { fingering: "2", side: "F side" },
  D4: { fingering: "1", side: "F side" },
  "D#4": { fingering: "2", side: "F side" },
  Eb4: { fingering: "2", side: "F side" },
  E4: { fingering: "Open", side: "F side" },
  "E#4": { fingering: "1", side: "F side" },
  F4: { fingering: "1", side: "F side" },
  "F#4": { fingering: "2", side: "F side" },
  Gb4: { fingering: "2", side: "F side" },
  G4: { fingering: "Open", side: "Bb side" },
  "G#4": { fingering: "2-3", side: "Bb side" },
  Ab4: { fingering: "2-3", side: "Bb side" },
  A4: { fingering: "1-2", side: "Bb side" },
  "A#4": { fingering: "1", side: "Bb side" },
  Bb4: { fingering: "1", side: "Bb side" },
  B4: { fingering: "2", side: "Bb side" },
  Cb4: { fingering: "2", side: "Bb side" },
  C5: { fingering: "Open", side: "Bb side" },
  "C#5": { fingering: "2", side: "Bb side" },
  Db5: { fingering: "2", side: "Bb side" },
  D5: { fingering: "1", side: "Bb side" },
  "D#5": { fingering: "2", side: "Bb side" },
  Eb5: { fingering: "2", side: "Bb side" },
  E5: { fingering: "Open", side: "Bb side" },
  "E#5": { fingering: "Open", side: "Bb side" },
  F5: { fingering: "1", side: "Bb side" },
  "F#5": { fingering: "2", side: "Bb side" },
  Gb5: { fingering: "2", side: "Bb side" },
  G5: { fingering: "Open", side: "Bb side" },
  "G#5": { fingering: "2-3", side: "Bb side" },
  Ab5: { fingering: "2-3", side: "Bb side" },
  A5: { fingering: "1-2", side: "Bb side" },
  "A#5": { fingering: "1", side: "Bb side" },
  Bb5: { fingering: "1", side: "Bb side" },
  B5: { fingering: "2", side: "Bb side" },
  Cb5: { fingering: "2", side: "Bb side" },
  C6: { fingering: "Open", side: "Bb side" },
};

const TRUMPET_NOTE_FINGERINGS = {
  "F#3": "1-2-3",
  Gb3: "1-2-3",
  G3: "1-3",
  Ab3: "1-2",
  "G#3": "1-2",
  A3: "1-2",
  "A#3": "1",
  Bb3: "1",
  B3: "2",
  Cb4: "2",
  C4: "Open",
  "C#4": "1-2-3",
  Db4: "1-2-3",
  D4: "1-3",
  "D#4": "2-3",
  Eb4: "2-3",
  E4: "1-2",
  "E#4": "1",
  F4: "1",
  "F#4": "2",
  Gb4: "2",
  G4: "Open",
  "G#4": "2-3",
  Ab4: "2-3",
  A4: "1-2",
  "A#4": "1",
  Bb4: "1",
  B4: "2",
  Cb4: "2",
  C5: "Open",
  "C#5": "1-2",
  Db5: "1-2",
  D5: "1-3",
  "D#5": "2-3",
  Eb5: "2-3",
  E5: "1-2",
  "E#5": "1",
  F5: "1",
  "F#5": "2",
  Gb5: "2",
  G5: "Open",
  "G#5": "2-3",
  Ab5: "2-3",
  A5: "1-2",
  "A#5": "1",
  Bb5: "1",
  B5: "2",
  Cb5: "2",
  C6: "Open",
  "C#6": "1-2",
  Db6: "1-2",
  D6: "1-3",
  "D#6": "2-3",
  Eb6: "2-3",
  E6: "1-2",
  "E#6": "1",
  F6: "1",
  "F#6": "2",
  Gb6: "2",
  G6: "Open",
  C7: "Open",
};

const INSTRUMENTS = {
  trumpet: {
    name: "Bb Trumpet",
    shortName: "Trumpet",
    transposition: 2,
    description: "Written notes sound a major second lower than written.",
    clef: "treble",
    clefSymbol: "&#119070;",
    displayOctaveShift: 0,
  },
  horn: {
    name: "French Horn in F",
    shortName: "French Horn",
    transposition: 7,
    description: "Written notes sound a perfect fifth lower than written.",
    clef: "treble",
    clefSymbol: "&#119070;",
    displayOctaveShift: 0,
  },
  doubleHorn: {
    name: "Double French Horn in F/Bb",
    shortName: "Double Horn",
    transposition: 7,
    description: "Written notes sound a perfect fifth lower than written, with Bb-side options in the middle and upper register.",
    clef: "treble",
    clefSymbol: "&#119070;",
    displayOctaveShift: 0,
  },
};

const WRITTEN_KEY_MAP = {
  trumpet: {
    "major:Cb": "major:Db",
    "major:Gb": "major:Ab",
    "major:Db": "major:Eb",
    "major:Ab": "major:Bb",
    "major:Eb": "major:F",
    "major:Bb": "major:C",
    "major:F": "major:G",
    "major:C": "major:D",
    "major:G": "major:A",
    "major:D": "major:E",
    "major:A": "major:B",
    "major:E": "major:F#",
    "major:B": "major:C#",
    "major:F#": "major:Ab",
    "major:C#": "major:Eb",
    "minor:Ab": "minor:Bb",
    "minor:Eb": "minor:F",
    "minor:Bb": "minor:C",
    "minor:F": "minor:G",
    "minor:C": "minor:D",
    "minor:G": "minor:A",
    "minor:D": "minor:E",
    "minor:A": "minor:B",
    "minor:E": "minor:F#",
    "minor:B": "minor:C#",
    "minor:F#": "minor:G#",
    "minor:C#": "minor:D#",
    "minor:G#": "minor:A#",
    "minor:D#": "minor:F",
    "minor:A#": "minor:C",
  },
  horn: {
    "major:Cb": "major:Gb",
    "major:Gb": "major:Db",
    "major:Db": "major:Ab",
    "major:Ab": "major:Eb",
    "major:Eb": "major:Bb",
    "major:Bb": "major:F",
    "major:F": "major:C",
    "major:C": "major:G",
    "major:G": "major:D",
    "major:D": "major:A",
    "major:A": "major:E",
    "major:E": "major:B",
    "major:B": "major:F#",
    "major:F#": "major:C#",
    "major:C#": "major:Ab",
    "minor:Ab": "minor:Eb",
    "minor:Eb": "minor:Bb",
    "minor:Bb": "minor:F",
    "minor:F": "minor:C",
    "minor:C": "minor:G",
    "minor:G": "minor:D",
    "minor:D": "minor:A",
    "minor:A": "minor:E",
    "minor:E": "minor:B",
    "minor:B": "minor:F#",
    "minor:F#": "minor:C#",
    "minor:C#": "minor:G#",
    "minor:G#": "minor:D#",
    "minor:D#": "minor:A#",
    "minor:A#": "minor:C",
  },
  doubleHorn: {
    "major:Cb": "major:Gb",
    "major:Gb": "major:Db",
    "major:Db": "major:Ab",
    "major:Ab": "major:Eb",
    "major:Eb": "major:Bb",
    "major:Bb": "major:F",
    "major:F": "major:C",
    "major:C": "major:G",
    "major:G": "major:D",
    "major:D": "major:A",
    "major:A": "major:E",
    "major:E": "major:B",
    "major:B": "major:F#",
    "major:F#": "major:C#",
    "major:C#": "major:Ab",
    "minor:Ab": "minor:Eb",
    "minor:Eb": "minor:Bb",
    "minor:Bb": "minor:F",
    "minor:F": "minor:C",
    "minor:C": "minor:G",
    "minor:G": "minor:D",
    "minor:D": "minor:A",
    "minor:A": "minor:E",
    "minor:E": "minor:B",
    "minor:B": "minor:F#",
    "minor:F#": "minor:C#",
    "minor:C#": "minor:G#",
    "minor:G#": "minor:D#",
    "minor:D#": "minor:A#",
    "minor:A#": "minor:C",
  },
};

const state = {
  instrument: "trumpet",
  category: "all",
  key: "major:C",
  theme: "light",
  showChromatic: false,
};

const keyLibrary = buildKeyLibrary();
const categorySelect = document.querySelector("#category-select");
const keySelect = document.querySelector("#key-select");
const themeToggle = document.querySelector("#theme-toggle");
const chromaticToggle = document.querySelector("#chromatic-toggle");
const notesGrid = document.querySelector("#notes-grid");
const rangePill = document.querySelector("#range-pill");
const concertKeyHeading = document.querySelector("#concert-key-heading");
const concertScale = document.querySelector("#concert-scale");
const writtenKeyHeading = document.querySelector("#written-key-heading");
const writtenScale = document.querySelector("#written-scale");
const noteCount = document.querySelector("#note-count");
const rangeDescription = document.querySelector("#range-description");

renderCategoryOptions();
renderKeyOptions();
bindEvents();
applyTheme();
applyChromaticToggle();
render();

function bindEvents() {
  document.querySelectorAll(".toggle-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.instrument = button.dataset.instrument;
      document.querySelectorAll(".toggle-button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      render();
    });
  });

  categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    const visibleKeys = getVisibleKeys();
    if (!visibleKeys.includes(state.key)) {
      state.key = visibleKeys[0];
    }
    renderKeyOptions();
    render();
  });

  keySelect.addEventListener("change", (event) => {
    state.key = event.target.value;
    render();
  });

  themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
  });

  chromaticToggle.addEventListener("click", () => {
    state.showChromatic = !state.showChromatic;
    applyChromaticToggle();
    render();
  });
}

function renderCategoryOptions() {
  categorySelect.innerHTML = CATEGORY_OPTIONS.map(
    (category) => `<option value="${category.id}">${category.label}</option>`
  ).join("");
  categorySelect.value = state.category;
}

function renderKeyOptions() {
  const visibleKeys = getVisibleKeys();
  keySelect.innerHTML = visibleKeys
    .map((keyId) => {
      const keyData = keyLibrary[keyId];
      return `<option value="${keyId}">${keyData.label}</option>`;
    })
    .join("");
  keySelect.value = state.key;
}

function render() {
  const instrument = INSTRUMENTS[state.instrument];
  const concertKey = keyLibrary[state.key];
  const writtenKeyId = WRITTEN_KEY_MAP[state.instrument][state.key];
  const writtenKey = keyLibrary[writtenKeyId];
  const notes = buildNoteDirectory(concertKey, writtenKey, instrument);

  rangePill.textContent = `${instrument.name}: written range ${formatSimpleNote(WRITTEN_RANGE.low)} to ${formatSimpleNote(WRITTEN_RANGE.high)}. ${instrument.description}`;
  concertKeyHeading.textContent = concertKey.label;
  concertScale.textContent = `Concert scale: ${concertKey.scaleNames.join(" - ")}`;
  writtenKeyHeading.textContent = writtenKey.label;
  writtenScale.textContent = `Written scale: ${writtenKey.scaleNames.join(" - ")}`;
  noteCount.textContent = `${notes.length} scale notes`;
  rangeDescription.textContent = `${instrument.name} uses ${writtenKey.label.toLowerCase()} for this concert key.`;

  const chromaticNotes = state.showChromatic ? buildChromaticNoteDirectory(writtenKey, instrument) : [];
  notesGrid.innerHTML = buildStaffMarkup(notes, writtenKey, instrument, {
    startIndex: 1,
    titlePrefix: "Staff",
    chromatic: false,
  }) + (chromaticNotes.length
    ? buildStaffMarkup(chromaticNotes, writtenKey, instrument, {
        startIndex: Math.ceil(notes.length / NOTES_PER_SYSTEM) + 1,
        titlePrefix: "Chromatic Staff",
        chromatic: true,
      })
    : "");
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
  themeToggle.setAttribute("aria-pressed", String(state.theme === "dark"));
}

function applyChromaticToggle() {
  chromaticToggle.classList.toggle("is-active", state.showChromatic);
  chromaticToggle.setAttribute("aria-pressed", String(state.showChromatic));
  if (chromaticToggle.querySelector) {
    const stateLabel = chromaticToggle.querySelector(".toggle-state");
    if (stateLabel) {
      stateLabel.textContent = state.showChromatic ? "On" : "Off";
    }
  }
}

function getVisibleKeys() {
  return CATEGORY_OPTIONS.find((category) => category.id === state.category).keys;
}

function buildNoteDirectory(concertKey, writtenKey, instrument) {
  const notes = [];
  const concertScaleByPitchClass = buildPitchClassLookup(concertKey.scaleNames);
  const writtenScaleByPitchClass = buildPitchClassLookup(writtenKey.scaleNames);

  for (let writtenMidi = WRITTEN_RANGE.low; writtenMidi <= WRITTEN_RANGE.high; writtenMidi += 1) {
    const concertMidi = writtenMidi - instrument.transposition;
    const concertPitchClass = normalizePitchClass(concertMidi);
    const concertScaleMatch = concertScaleByPitchClass[concertPitchClass];
    if (!concertScaleMatch) {
      continue;
    }

    const writtenPitchClass = normalizePitchClass(writtenMidi);
    const writtenScaleMatch = writtenScaleByPitchClass[writtenPitchClass];
    if (!writtenScaleMatch) {
      continue;
    }

    const writtenName = writtenScaleMatch.name;
    const writtenLabel = formatLabeledNote(writtenMidi, writtenName);
    const concertLabel = formatLabeledNote(concertMidi, concertScaleMatch.name);
    const fingeringInfo = getFingeringForNote(state.instrument, writtenLabel, writtenName);
    const degreeIndex = concertScaleMatch.degree;

    notes.push({
      writtenMidi,
      writtenLabel,
      concertLabel,
      fingering: fingeringInfo.fingering,
      fingeringAnnotation: fingeringInfo.annotation,
      fingeringPattern: buildFingeringPattern(fingeringInfo.fingering),
      fourthValvePressed: fingeringInfo.fourthValvePressed,
      showFourthValve: fingeringInfo.showFourthValve,
      degreeName: DEGREE_NAMES[degreeIndex],
      degreeNumber: degreeIndex + 1,
      isTonic: degreeIndex === 0,
    });
  }

  return notes;
}

function buildKeyLibrary() {
  return KEY_DEFINITIONS.reduce((library, definition) => {
    library[definition.id] = {
      id: definition.id,
      name: definition.tonic,
      label: `${definition.tonic} ${definition.mode}`,
      mode: definition.mode,
      signatureKey: definition.signatureKey,
      scaleNames: buildScale(definition.tonic, definition.mode === "minor" ? MINOR_INTERVALS : MAJOR_INTERVALS),
    };
    return library;
  }, {});
}

function buildScale(tonicName, intervals) {
  const tonic = parseNoteName(tonicName);
  const tonicLetterIndex = LETTERS.indexOf(tonic.letter);

  return intervals.map((interval, degreeIndex) => {
    const letter = LETTERS[(tonicLetterIndex + degreeIndex) % LETTERS.length];
    const targetPitchClass = normalizePitchClass(tonic.pitchClass + interval);
    const naturalPitchClass = LETTER_TO_SEMITONE[letter];
    let accidentalValue = targetPitchClass - naturalPitchClass;
    if (accidentalValue > 6) {
      accidentalValue -= 12;
    }
    if (accidentalValue < -6) {
      accidentalValue += 12;
    }
    return `${letter}${accidentalToString(accidentalValue)}`;
  });
}

function buildPitchClassLookup(scaleNames) {
  return scaleNames.reduce((lookup, name, degree) => {
    lookup[normalizePitchClass(parseNoteName(name).pitchClass)] = { name, degree };
    return lookup;
  }, {});
}

function parseNoteName(name) {
  const match = /^([A-G])([#b]{0,2})$/.exec(name);
  const letter = match[1];
  const accidentalText = match[2];
  const accidental = accidentalText.split("").reduce((sum, symbol) => sum + (symbol === "#" ? 1 : -1), 0);

  return {
    letter,
    accidental,
    pitchClass: LETTER_TO_SEMITONE[letter] + accidental,
  };
}

function accidentalToString(value) {
  if (value > 0) {
    return "#".repeat(value);
  }
  if (value < 0) {
    return "b".repeat(Math.abs(value));
  }
  return "";
}

function normalizePitchClass(value) {
  return ((value % 12) + 12) % 12;
}

function formatSimpleNote(midi) {
  const defaults = {
    0: "C",
    1: "Db",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "Gb",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B",
  };
  return formatLabeledNote(midi, defaults[normalizePitchClass(midi)]);
}

function formatLabeledNote(midi, name) {
  const parsed = parseNoteName(name);
  const octave = (midi - LETTER_TO_SEMITONE[parsed.letter] - parsed.accidental) / 12 - 1;
  return `${name}${octave}`;
}

function normalizeForFingering(name) {
  const parsed = parseNoteName(name);
  const pitchClass = normalizePitchClass(parsed.pitchClass);
  const pitchClassToName = {
    0: "C",
    1: "Db",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "Gb",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B",
  };

  return pitchClassToName[pitchClass];
}

function getFingeringForNote(instrumentName, writtenLabel, writtenName) {
  if (instrumentName === "trumpet") {
    return {
      fingering: TRUMPET_NOTE_FINGERINGS[writtenLabel] || TRUMPET_NOTE_FINGERINGS[enharmonicLabel(writtenLabel)] || "See chart",
      annotation: "",
      fourthValvePressed: false,
      showFourthValve: false,
    };
  }

  if (instrumentName === "doubleHorn") {
    const info = DOUBLE_HORN_NOTE_FINGERINGS[writtenLabel] || DOUBLE_HORN_NOTE_FINGERINGS[enharmonicLabel(writtenLabel)];
    return {
      fingering: info ? info.fingering : "See chart",
      annotation: info ? info.side : "",
      fourthValvePressed: Boolean(info && info.side === "Bb side"),
      showFourthValve: true,
    };
  }

  const fingeringName = normalizeForFingering(writtenName);
  return {
    fingering: FINGERINGS[instrumentName][fingeringName] || "See chart",
    annotation: "F side",
    fourthValvePressed: false,
    showFourthValve: false,
  };
}

function enharmonicLabel(label) {
  const noteName = getNoteNamePart(label);
  const parsed = parseNoteName(noteName);
  const octave = label.match(/-?\d+$/)[0];
  const pitchClass = normalizePitchClass(parsed.pitchClass);
  const pitchClassToName = {
    0: "C",
    1: "Db",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "Gb",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B",
  };

  return `${pitchClassToName[pitchClass]}${octave}`;
}

function buildStaffMarkup(notes, writtenKey, instrument, options) {
  const systems = options.chromatic ? chunkChromatic(notes, NOTES_PER_SYSTEM) : chunk(notes, NOTES_PER_SYSTEM);
  const keySignatureMarkup = buildKeySignatureMarkup(writtenKey.signatureKey, instrument.clef);

  return systems
    .map((systemNotes, index) => {
      const start = systemNotes[0];
      const end = systemNotes[systemNotes.length - 1];
      const trackHeight = getSystemTrackHeight(systemNotes, instrument);
      return `
        <section class="staff-system${systemNotes.some((note) => note.isTonic) ? " is-tonic-start" : ""}${options.chromatic ? " is-chromatic" : ""}">
          <div class="staff-header">
            <span class="staff-cue">${options.titlePrefix} ${options.startIndex + index}</span>
            <span>${start.writtenLabel} to ${end.writtenLabel}</span>
          </div>
          <div class="staff-track" style="height: ${trackHeight}px;">
            <div class="staff-clef staff-clef-${instrument.clef}" aria-hidden="true">${instrument.clefSymbol}</div>
            <div class="staff-lines" aria-hidden="true"></div>
            <div class="key-signature" aria-hidden="true">${keySignatureMarkup}</div>
            <div class="staff-notes" style="grid-template-columns: repeat(${systemNotes.length}, minmax(0, 1fr));">
              ${systemNotes.map((note) => buildNoteMarkup(note, options.chromatic)).join("")}
            </div>
          </div>
        </section>
      `;
    })
    .join("");
}

function buildNoteMarkup(note, isChromatic) {
  const noteName = getNoteNamePart(note.writtenLabel);
  const accidental = getAccidentalText(noteName);
  const noteY = getNoteY(note.writtenLabel);
  const ledgerLines = getLedgerLineMarkup(note.writtenLabel);
  const visibleFingeringPattern = note.fingeringPattern;
  const showFourthValve = note.showFourthValve;
  const showChromaticFourthValve = isChromatic && note.showFourthValve;
  const chromaticRows = isChromatic
    ? [
        ...(showChromaticFourthValve
          ? [`<span class="finger-circle finger-circle-fourth${note.fourthValvePressed ? " is-pressed" : ""}"></span>`]
          : []),
        ...visibleFingeringPattern.map(
          (isPressed) => `<span class="finger-circle${isPressed ? " is-pressed" : ""}"></span>`
        ),
      ]
    : [];

  return `
    <div class="note-slot" style="--note-y: ${noteY}px;">
      ${ledgerLines}
      <div class="staff-note${note.isTonic ? " is-tonic" : ""}">
        ${accidental ? `<span class="note-accidental">${accidental}</span>` : ""}
        <span class="staff-notehead"></span>
        <span class="staff-stem"></span>
      </div>
      <div class="fingering-stack" aria-label="Fingering ${note.fingering}">
        ${isChromatic
          ? chromaticRows.join("")
          : `${showFourthValve ? `<span class="finger-circle finger-circle-fourth${note.fourthValvePressed ? " is-pressed" : ""}"></span>` : ""}${visibleFingeringPattern
              .map((isPressed) => `<span class="finger-circle${isPressed ? " is-pressed" : ""}"></span>`)
              .join("")}`}
      </div>
      <div class="note-text" style="top: ${noteY + (isChromatic ? (showFourthValve ? 116 : 98) : (showFourthValve ? 136 : 116))}px;">
        <p class="written-note">${note.writtenLabel}</p>
        <p class="concert-note">${note.concertLabel}</p>
        ${note.fingeringAnnotation ? `<p class="fingering-code">${formatFingeringCode(note.fingering, note.fingeringAnnotation)}</p>` : `<p class="fingering-code">${formatFingeringCode(note.fingering, "")}</p>`}
        <span class="degree-pill">${note.degreeNumber}</span>
      </div>
    </div>
  `;
}

function getNoteY(writtenLabel) {
  return getRenderedNoteY(writtenLabel, INSTRUMENTS[state.instrument]);
}

function getLedgerLineMarkup(writtenLabel) {
  const { letter, octave } = parseLabeledNote(writtenLabel);
  const position = getStaffPosition(letter, octave, INSTRUMENTS[state.instrument]);
  const lines = [];

  if (position < 0) {
    for (let ledger = -2; ledger >= position; ledger -= 2) {
      lines.push(`<span class="ledger-line" style="top: ${STAFF_TOP + (8 - ledger) * STAFF_STEP}px;"></span>`);
    }
  }

  if (position > 8) {
    for (let ledger = 10; ledger <= position; ledger += 2) {
      lines.push(`<span class="ledger-line" style="top: ${STAFF_TOP + (8 - ledger) * STAFF_STEP}px;"></span>`);
    }
  }

  return lines.join("");
}

function getSystemTrackHeight(systemNotes, instrument) {
  const lowestNoteBottom = Math.max(
    ...systemNotes.map((note) => {
      const noteY = getRenderedNoteY(note.writtenLabel, instrument);
      return noteY + (note.showFourthValve ? 214 : 178);
    })
  );
  return Math.max(270, Math.ceil(lowestNoteBottom));
}

function getRenderedNoteY(writtenLabel, instrument) {
  const { letter, octave } = parseLabeledNote(writtenLabel);
  const position = getStaffPosition(letter, octave, instrument);
  return STAFF_TOP + (8 - position) * STAFF_STEP;
}

function buildChromaticNoteDirectory(writtenKey, instrument) {
  const notes = [];
  const chromaticRange = getChromaticRangeForInstrument(instrument);
  const accidentalPreference = getAccidentalPreference(writtenKey.signatureKey);

  for (let writtenMidi = chromaticRange.low; writtenMidi <= chromaticRange.high; writtenMidi += 1) {
    const writtenName = getChromaticNoteName(writtenMidi, accidentalPreference, writtenKey.scaleNames);
    const writtenLabel = formatLabeledNote(writtenMidi, writtenName);
    const concertMidi = writtenMidi - instrument.transposition;
    const concertName = getChromaticNoteName(concertMidi, accidentalPreference, []);
    const concertLabel = formatLabeledNote(concertMidi, concertName);
    const fingeringInfo = getFingeringForNote(state.instrument, writtenLabel, writtenName);

    notes.push({
      writtenMidi,
      writtenLabel,
      concertLabel,
      fingering: fingeringInfo.fingering,
      fingeringAnnotation: fingeringInfo.annotation,
      fingeringPattern: buildFingeringPattern(fingeringInfo.fingering),
      fourthValvePressed: fingeringInfo.fourthValvePressed,
      showFourthValve: fingeringInfo.showFourthValve,
      degreeName: "Chromatic",
      degreeNumber: "#",
      isTonic: false,
    });
  }

  return notes;
}

function getChromaticRangeForInstrument(instrument) {
  const bounds = instrument.clef === "bass"
    ? { lowPosition: -3, highPosition: 11, reference: { octave: 3, letter: "G" } }
    : { lowPosition: -3, highPosition: 11, reference: { octave: 4, letter: "E" } };

  return {
    low: getMidiFromStaffPosition(bounds.lowPosition, instrument, bounds.reference),
    high: getMidiFromStaffPosition(bounds.highPosition, instrument, bounds.reference),
  };
}

function getMidiFromStaffPosition(position, instrument, reference) {
  const referenceIndex = reference.octave * 7 + LETTERS.indexOf(reference.letter);
  const diatonicIndex = referenceIndex + position - (instrument.displayOctaveShift || 0) * 7;
  const octave = Math.floor(diatonicIndex / 7);
  const letter = LETTERS[((diatonicIndex % 7) + 7) % 7];
  const naturalMidi = 12 * (octave + 1) + LETTER_TO_SEMITONE[letter];

  return naturalMidi;
}

function getAccidentalPreference(signatureKey) {
  if (["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"].includes(signatureKey)) {
    return "flat";
  }
  return "sharp";
}

function getChromaticNoteName(midi, preference, preferredNames) {
  const pitchClass = normalizePitchClass(midi);
  const preferredMatch = preferredNames.find((name) => normalizePitchClass(parseNoteName(name).pitchClass) === pitchClass);
  if (preferredMatch) {
    return preferredMatch;
  }

  const names = preference === "flat"
    ? ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return names[pitchClass];
}

function buildFingeringPattern(fingering) {
  if (fingering === "Open") {
    return [false, false, false];
  }

  const pressed = fingering.split("-").map((value) => Number(value));
  return [3, 2, 1].map((fingerNumber) => pressed.includes(fingerNumber));
}

function parseLabeledNote(label) {
  const match = /^([A-G])([#b]{0,2})(-?\d+)$/.exec(label);
  return {
    letter: match[1],
    accidental: match[2],
    octave: Number(match[3]),
  };
}

function getStaffPosition(letter, octave, instrument) {
  const reference = instrument.clef === "bass"
    ? { octave: 3, letter: "G" }
    : { octave: 4, letter: "E" };
  const shiftedOctave = octave + (instrument.displayOctaveShift || 0);

  return shiftedOctave * 7 + LETTERS.indexOf(letter) - (reference.octave * 7 + LETTERS.indexOf(reference.letter));
}

function getNoteNamePart(label) {
  return label.replace(/-?\d+$/, "");
}

function getAccidentalText(noteName) {
  const accidental = noteName.slice(1);
  if (!accidental) {
    return "";
  }
  return accidental.replace(/#/g, "&#9839;").replace(/b/g, "&#9837;");
}

function chunk(values, size) {
  const groups = [];
  for (let index = 0; index < values.length; index += size) {
    groups.push(values.slice(index, index + size));
  }
  return groups;
}

function chunkChromatic(values, size) {
  const groups = chunk(values, size);
  if (groups.length >= 2 && groups[groups.length - 1].length === 1) {
    groups[groups.length - 2] = groups[groups.length - 2].concat(groups[groups.length - 1]);
    groups.pop();
  }
  return groups;
}

function buildKeySignatureMarkup(keyName, clef) {
  const signature = getKeySignature(keyName);
  const positions = clef === "bass"
    ? {
        sharp: [6, 3, 7, 4, 8, 5, 2],
        flat: [2, 5, 8, 3, 0, 7, 6],
      }
    : {
        sharp: [8, 5, 9, 6, 3, 7, 4],
        flat: [4, 7, 3, 6, 2, 5, 8],
      };

  return KEY_SIGNATURE_ORDER[signature.type]
    .slice(0, signature.count)
    .map((_, index) => {
      const top = STAFF_TOP + (8 - positions[signature.type][index]) * STAFF_STEP;
      return `<span class="key-signature-note" style="top: ${top}px;">${signature.type === "sharp" ? "&#9839;" : "&#9837;"}</span>`;
    })
    .join("");
}

function getKeySignature(keyName) {
  const sharpKeys = ["G", "D", "A", "E", "B", "F#", "C#"];
  const flatKeys = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];

  if (sharpKeys.includes(keyName)) {
    return { type: "sharp", count: sharpKeys.indexOf(keyName) + 1 };
  }

  if (flatKeys.includes(keyName)) {
    return { type: "flat", count: flatKeys.indexOf(keyName) + 1 };
  }

  return { type: "sharp", count: 0 };
}

function formatFingeringCode(fingering, annotation) {
  const code = fingering === "Open" ? "0" : fingering.replace(/-/g, "");
  return annotation ? `${annotation}: ${code}` : code;
}
