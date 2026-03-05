const PRIMARY_PANORAMA_IMAGE = "https://herohome.neocities.org/360controlCenter8k.jpeg";
const FALLBACK_PANORAMA_IMAGE = "https://pannellum.org/images/alma.jpg";
let activePanoramaImage = PRIMARY_PANORAMA_IMAGE;

const scenes = [
  {
    id: "kitchen",
    name: "Kitchen",
    panorama: activePanoramaImage,
    entry: { yaw: 15, pitch: -2 },
    hotspots: [
      {
        id: "kitchen-extinguisher",
        yaw: 45,
        pitch: -6,
        title: "Fire Extinguisher Under Sink",
        type: "html",
        content:
          "<h4>Kitchen Fire Checklist</h4><ul><li>Keep extinguisher visible and accessible.</li><li>Know PASS: Pull, Aim, Squeeze, Sweep.</li><li>Never use water on oil fires.</li></ul>",
      },
      {
        id: "kitchen-go-living",
        yaw: -125,
        pitch: -1,
        title: "Go to Living Room",
        type: "scene",
        targetSceneId: "living-room",
      },
    ],
  },
  {
    id: "living-room",
    name: "Living Room",
    panorama: activePanoramaImage,
    entry: { yaw: -20, pitch: 0 },
    hotspots: [
      {
        id: "living-medkit",
        yaw: 35,
        pitch: -7,
        title: "Family First-Aid Station",
        type: "iframe",
        content: "https://www.ready.gov/kit",
      },
      {
        id: "living-go-bedroom",
        yaw: -80,
        pitch: -3,
        title: "Go to Bedroom",
        type: "scene",
        targetSceneId: "bedroom",
      },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    panorama: activePanoramaImage,
    entry: { yaw: 10, pitch: 1 },
    hotspots: [
      {
        id: "bedroom-go-bag",
        yaw: 72,
        pitch: -5,
        title: "Go-Bag by Bed",
        type: "html",
        content:
          "<h4>Go-Bag Essentials</h4><p>Water, medications, flashlight, batteries, N95 masks, and a 3-day food supply.</p>",
      },
      {
        id: "bedroom-go-bathroom",
        yaw: -105,
        pitch: -2,
        title: "Go to Bathroom",
        type: "scene",
        targetSceneId: "bathroom",
      },
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    panorama: activePanoramaImage,
    entry: { yaw: 165, pitch: 0 },
    hotspots: [
      {
        id: "bath-water",
        yaw: 25,
        pitch: -10,
        title: "Water Storage Tip",
        type: "html",
        content: "<p>Store at least 1 gallon of water per person per day for 3+ days.</p>",
      },
      {
        id: "bath-go-garage",
        yaw: -140,
        pitch: -2,
        title: "Go to Garage",
        type: "scene",
        targetSceneId: "garage",
      },
    ],
  },
  {
    id: "garage",
    name: "Garage",
    panorama: activePanoramaImage,
    entry: { yaw: -60, pitch: 0 },
    hotspots: [
      {
        id: "garage-tools",
        yaw: 60,
        pitch: -7,
        title: "Utility Shutoff Tools",
        type: "iframe",
        content: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html",
      },
      {
        id: "garage-go-backyard",
        yaw: -110,
        pitch: -2,
        title: "Go to Backyard",
        type: "scene",
        targetSceneId: "backyard",
      },
    ],
  },
  {
    id: "backyard",
    name: "Backyard",
    panorama: activePanoramaImage,
    entry: { yaw: 10, pitch: -1 },
    hotspots: [
      {
        id: "backyard-meetup",
        yaw: 38,
        pitch: -8,
        title: "Family Meeting Point",
        type: "html",
        content: "<p>Assign a clear outdoor meetup location and practice drills quarterly.</p>",
      },
      {
        id: "backyard-go-frontyard",
        yaw: -95,
        pitch: -1,
        title: "Go to Front Yard",
        type: "scene",
        targetSceneId: "front-yard",
      },
    ],
  },
  {
    id: "front-yard",
    name: "Front Yard",
    panorama: activePanoramaImage,
    entry: { yaw: -10, pitch: 0 },
    hotspots: [
      {
        id: "front-evac-route",
        yaw: 49,
        pitch: -6,
        title: "Evacuation Route Plan",
        type: "html",
        content: "<p>Keep two evacuation routes and share them with all household members.</p>",
      },
      {
        id: "front-go-basement",
        yaw: -122,
        pitch: -2,
        title: "Go to Basement",
        type: "scene",
        targetSceneId: "basement",
      },
    ],
  },
  {
    id: "basement",
    name: "Basement",
    panorama: activePanoramaImage,
    entry: { yaw: 35, pitch: 0 },
    hotspots: [
      {
        id: "base-shelter",
        yaw: 82,
        pitch: -8,
        title: "Storm Shelter Supplies",
        type: "html",
        content: "<p>Stock weather radio, blankets, backup power, and sanitation supplies.</p>",
      },
      {
        id: "base-go-kids",
        yaw: -82,
        pitch: -2,
        title: "Go to Kids Room",
        type: "scene",
        targetSceneId: "kids-room",
      },
    ],
  },
  {
    id: "kids-room",
    name: "Kids Room",
    panorama: activePanoramaImage,
    entry: { yaw: -10, pitch: 1 },
    hotspots: [
      {
        id: "kids-contact",
        yaw: 30,
        pitch: -7,
        title: "Emergency Contact Card",
        type: "html",
        content:
          "<p>Create wallet-sized contact cards for each child with emergency numbers.</p>",
      },
      {
        id: "kids-go-office",
        yaw: -130,
        pitch: -2,
        title: "Go to Home Office",
        type: "scene",
        targetSceneId: "home-office",
      },
    ],
  },
  {
    id: "home-office",
    name: "Home Office",
    panorama: activePanoramaImage,
    entry: { yaw: 0, pitch: 0 },
    hotspots: [
      {
        id: "office-docs",
        yaw: 65,
        pitch: -5,
        title: "Important Document Backup",
        type: "html",
        content: "<p>Backup insurance, IDs, and medical records to encrypted cloud + USB.</p>",
      },
    ],
  },
];

const state = {
  viewer: null,
  activeSceneId: scenes[0].id,
  autoRotateTimeout: null,
  gazeThreshold: 18,
  visitedHotspots: JSON.parse(sessionStorage.getItem("hh-visited") || "{}"),
  sceneLoadTimeout: null,
  fallbackApplied: false,
};

const elements = {
  landing: document.getElementById("landing"),
  tour: document.getElementById("tour"),
  summary: document.getElementById("summary"),
  startTour: document.getElementById("start-tour"),
  sceneTitle: document.getElementById("scene-title"),
  sceneProgress: document.getElementById("scene-progress"),
  roomList: document.getElementById("room-list"),
  toggleMap: document.getElementById("toggle-map"),
  panel: document.getElementById("content-panel"),
  panelTitle: document.getElementById("panel-title"),
  panelBody: document.getElementById("panel-body"),
  closePanel: document.getElementById("close-panel"),
  transition: document.getElementById("transition"),
  summaryStats: document.getElementById("summary-stats"),
  restart: document.getElementById("restart"),
  loadingState: document.getElementById("loading-state"),
  loadingMessage: document.getElementById("loading-message"),
};

function setLoadingState(isLoading, message = "Loading 360 scene…") {
  if (!elements.loadingState || !elements.loadingMessage) return;
  elements.loadingMessage.textContent = message;
  elements.loadingState.classList.toggle("hidden", !isLoading);
}

function armSceneLoadTimeout(context) {
  clearTimeout(state.sceneLoadTimeout);
  state.sceneLoadTimeout = setTimeout(() => {
    if (state.fallbackApplied) {
      setLoadingState(false);
      return;
    }
    applyFallbackPanorama();
  }, 8000);
}

function clearSceneLoadTimeout() {
  clearTimeout(state.sceneLoadTimeout);
  state.sceneLoadTimeout = null;
}

function applyFallbackPanorama() {
  setLoadingState(true, "Primary panorama unavailable. Loading fallback scene…");
  state.fallbackApplied = true;
  activePanoramaImage = FALLBACK_PANORAMA_IMAGE;
  scenes.forEach((scene) => {
    scene.panorama = FALLBACK_PANORAMA_IMAGE;
  });

  if (state.viewer) {
    try {
      state.viewer.destroy();
    } catch (error) {
      // no-op
    }
    state.viewer = null;
  }

  initViewer();
}

function getScene(sceneId) {
  return scenes.find((scene) => scene.id === sceneId);
}

function markVisited(hotspotId) {
  state.visitedHotspots[hotspotId] = true;
  sessionStorage.setItem("hh-visited", JSON.stringify(state.visitedHotspots));
}

function isVisited(hotspotId) {
  return Boolean(state.visitedHotspots[hotspotId]);
}

function angularDiff(a, b) {
  const diff = Math.abs(((a - b + 540) % 360) - 180);
  return diff;
}

function hotspotIsInGaze(hotspot, currentYaw, currentPitch) {
  const yawDiff = angularDiff(hotspot.yaw, currentYaw);
  const pitchDiff = Math.abs(hotspot.pitch - currentPitch);
  return Math.sqrt(yawDiff ** 2 + pitchDiff ** 2) <= state.gazeThreshold;
}

function updateHotspotGlow() {
  const scene = getScene(state.activeSceneId);
  if (!scene || !state.viewer) return;
  const yaw = state.viewer.getYaw();
  const pitch = state.viewer.getPitch();

  scene.hotspots.forEach((hotspot) => {
    const node = document.querySelector(`[data-hotspot-id="${hotspot.id}"]`);
    if (!node) return;
    node.classList.toggle("in-gaze", hotspotIsInGaze(hotspot, yaw, pitch));
    node.classList.toggle("visited", isVisited(hotspot.id));
  });
}

function closePanel() {
  elements.panel.classList.remove("open");
  elements.panel.setAttribute("aria-hidden", "true");
  elements.panelBody.innerHTML = "";
}

function openContent(hotspot) {
  markVisited(hotspot.id);
  updateProgress();
  elements.panelTitle.textContent = hotspot.title;
  if (hotspot.type === "iframe") {
    elements.panelBody.innerHTML = `<iframe title="${hotspot.title}" src="${hotspot.content}" loading="lazy"></iframe>`;
  } else {
    elements.panelBody.innerHTML = hotspot.content;
  }
  elements.panel.classList.add("open");
  elements.panel.setAttribute("aria-hidden", "false");
}

function maybeShowSummary() {
  const interactiveHotspots = scenes.flatMap((scene) =>
    scene.hotspots.filter((hotspot) => hotspot.type !== "scene")
  );
  const visitedCount = interactiveHotspots.filter((hotspot) => isVisited(hotspot.id)).length;
  if (visitedCount !== interactiveHotspots.length) return;

  elements.tour.classList.add("hidden");
  elements.summary.classList.remove("hidden");
  const score = Math.round((visitedCount / interactiveHotspots.length) * 100);
  elements.summaryStats.textContent = `You visited ${visitedCount} of ${interactiveHotspots.length} preparedness hotspots. Hero score: ${score}%.`;
}

function onHotspotClick(hotspot) {
  if (!state.viewer) return;
  state.viewer.lookAt(hotspot.pitch, hotspot.yaw, 900);

  if (hotspot.type === "scene") {
    setTimeout(() => goToScene(hotspot.targetSceneId), 600);
    return;
  }

  setTimeout(() => {
    openContent(hotspot);
    updateHotspotGlow();
    maybeShowSummary();
  }, 650);
}

function updateProgress() {
  const scene = getScene(state.activeSceneId);
  if (!scene) return;

  const interactiveHotspots = scene.hotspots.filter((hotspot) => hotspot.type !== "scene");
  const visitedCount = interactiveHotspots.filter((hotspot) => isVisited(hotspot.id)).length;

  elements.sceneTitle.textContent = scene.name;
  elements.sceneProgress.textContent = `${visitedCount} / ${interactiveHotspots.length} hotspots visited`;
}

function renderRoomList() {
  elements.roomList.innerHTML = "";
  scenes.forEach((scene) => {
    const button = document.createElement("button");
    button.className = "room-item";
    button.textContent = scene.name;
    if (scene.id === state.activeSceneId) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      goToScene(scene.id);
      elements.roomList.classList.add("hidden");
    });
    elements.roomList.appendChild(button);
  });
}

function buildSceneConfig(scene) {
  return {
    [scene.id]: {
      title: scene.name,
      type: "equirectangular",
      panorama: scene.panorama,
      hotSpots: scene.hotspots.map((hotspot) => ({
        pitch: hotspot.pitch,
        yaw: hotspot.yaw,
        cssClass: "custom-hotspot",
        createTooltipFunc: (hotSpotDiv) => {
          hotSpotDiv.classList.add("hotspot-dot");
          hotSpotDiv.dataset.hotspotId = hotspot.id;
          hotSpotDiv.innerHTML = `<span>${hotspot.title}</span>`;
          hotSpotDiv.addEventListener("click", () => onHotspotClick(hotspot));
        },
      })),
    },
  };
}

function goToScene(sceneId) {
  const scene = getScene(sceneId);
  if (!scene || !state.viewer) return;

  closePanel();
  setLoadingState(true, `Loading ${scene.name}…`);
  armSceneLoadTimeout(`scene transition to ${scene.name}`);
  elements.transition.classList.remove("hidden");

  setTimeout(() => {
    state.activeSceneId = sceneId;
    state.viewer.loadScene(scene.id, scene.entry.pitch, scene.entry.yaw, 1000);
    updateProgress();
    renderRoomList();
    clearTimeout(state.autoRotateTimeout);
    state.viewer.startAutoRotate(2);
    state.autoRotateTimeout = setTimeout(() => state.viewer.stopAutoRotate(), 2600);
    setTimeout(() => elements.transition.classList.add("hidden"), 350);
  }, 180);
}

function initViewer() {
  const firstScene = getScene(state.activeSceneId);
  setLoadingState(true, `Loading ${firstScene.name}…`);
  armSceneLoadTimeout(`initial load: ${firstScene.name}`);
  state.viewer = window.pannellum.viewer("viewer", {
    default: {
      firstScene: firstScene.id,
      sceneFadeDuration: 800,
      autoLoad: true,
      showControls: true,
      mouseZoom: true,
    },
    scenes: scenes.reduce((acc, scene) => ({ ...acc, ...buildSceneConfig(scene) }), {}),
  });

  state.viewer.on("load", () => {
    const active = getScene(state.activeSceneId);
    state.viewer.setPitch(active.entry.pitch);
    state.viewer.setYaw(active.entry.yaw);
    state.viewer.startAutoRotate(2);
    clearTimeout(state.autoRotateTimeout);
    state.autoRotateTimeout = setTimeout(() => state.viewer.stopAutoRotate(), 2600);
    clearSceneLoadTimeout();
    setLoadingState(false);
  });

  state.viewer.on("error", () => {
    if (state.fallbackApplied) {
      clearSceneLoadTimeout();
      setLoadingState(false);
      return;
    }
    applyFallbackPanorama();
  });

  state.viewer.on("animatefinished", updateHotspotGlow);
  state.viewer.on("mouseup", updateHotspotGlow);
  state.viewer.on("touchend", updateHotspotGlow);
  setInterval(updateHotspotGlow, 250);

  updateProgress();
  renderRoomList();
}

elements.startTour?.addEventListener("click", () => {
  elements.landing.classList.add("hidden");
  elements.tour.classList.remove("hidden");
  if (!state.viewer) {
    initViewer();
  }
});

elements.toggleMap?.addEventListener("click", () => {
  elements.roomList.classList.toggle("hidden");
});

elements.closePanel?.addEventListener("click", closePanel);

elements.restart?.addEventListener("click", () => {
  state.visitedHotspots = {};
  sessionStorage.removeItem("hh-visited");
  state.activeSceneId = scenes[0].id;
  elements.summary.classList.add("hidden");
  elements.tour.classList.remove("hidden");
  goToScene(state.activeSceneId);
});
