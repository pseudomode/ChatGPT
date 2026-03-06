const project = {
  defaultScene: "aerial",
  ui: {
    logoPath: "hh01/icons/logo_herohome_small_589.png",
    logoAlignX: "left",
    logoAlignY: "top",
    logoSize: 72,
  },
  scenes: {
    aerial: { id: "aerial", title: "Aerial Island", sourceType: "multires", tileBasePath: "hh01/tiles/0-360_aerial_island_8k", pitch: 4, yaw: 0, hfov: 105, hotSpots: [], mapping: { tessellation: 64, uvScaleX: 1, uvScaleY: 1 } },
    patio: { id: "patio", title: "Patio Entry", sourceType: "multires", tileBasePath: "hh01/tiles/2-360_patioentry_8k", pitch: -6, yaw: 18, hfov: 100, hotSpots: [], mapping: { tessellation: 64, uvScaleX: 1, uvScaleY: 1 } },
    control: { id: "control", title: "Control Center", sourceType: "multires", tileBasePath: "hh01/tiles/3-360_controlcenter02_8k", pitch: 0, yaw: 0, hfov: 100, hotSpots: [], mapping: { tessellation: 64, uvScaleX: 1, uvScaleY: 1 } },
    bedroom: { id: "bedroom", title: "Bedroom Suite", sourceType: "multires", tileBasePath: "hh01/tiles/7-360bedroom8k", pitch: -4, yaw: 18, hfov: 100, hotSpots: [], mapping: { tessellation: 64, uvScaleX: 1, uvScaleY: 1 } },
    pool: { id: "pool", title: "Pool Deck", sourceType: "multires", tileBasePath: "hh01/tiles/9-360pool8k", pitch: -6, yaw: 12, hfov: 105, hotSpots: [], mapping: { tessellation: 64, uvScaleX: 1, uvScaleY: 1 } },
  },
};

const logoOptions = [
  "hh01/icons/logo_herohome_large01.png",
  "hh01/icons/logo_herohome_small_589.png",
];

const state = {
  viewer: null,
  selectedSceneId: project.defaultScene,
  selectedHotspotId: null,
  hotspotDrag: null,
  dragNavigationEnabled: true,
  editorPopup: null,
  rebuildToken: 0,
};

const $ = (id) => document.getElementById(id);
const els = {
  dragNavEnabled: $("dragNavEnabled"),
  authorMode: $("authorMode"),
  cursorCoords: $("cursorCoords"),
  sceneSelect: $("sceneSelect"),
  sceneTitle: $("sceneTitle"),
  panoPath: $("panoPath"),
  panoFile: $("panoFile"),
  sphereTessellation: $("sphereTessellation"),
  uvScaleX: $("uvScaleX"),
  uvScaleY: $("uvScaleY"),
  viewPano: $("viewPano"),
  replacePano: $("replacePano"),
  deletePano: $("deletePano"),
  logoSelect: $("logoSelect"),
  logoPath: $("logoPath"),
  logoAlignX: $("logoAlignX"),
  logoAlignY: $("logoAlignY"),
  logoSize: $("logoSize"),
  applyHeader: $("applyHeader"),
  headerLogo: $("headerLogo"),
  linkTarget: $("linkTarget"),
  transitionFade: $("transitionFade"),
  hotspotSelect: $("hotspotSelect"),
  dragEditEnabled: $("dragEditEnabled"),
  hotspotType: $("hotspotType"),
  hotspotText: $("hotspotText"),
  hotspotPitch: $("hotspotPitch"),
  hotspotYaw: $("hotspotYaw"),
  hotspotTargetScene: $("hotspotTargetScene"),
  targetPitch: $("targetPitch"),
  targetYaw: $("targetYaw"),
  targetHfov: $("targetHfov"),
  hotspotFade: $("hotspotFade"),
  iframeUrl: $("iframeUrl"),
  iframeTitle: $("iframeTitle"),
  iframeShowHeader: $("iframeShowHeader"),
  iframeWidth: $("iframeWidth"),
  iframeHeight: $("iframeHeight"),
  iframeBorderSize: $("iframeBorderSize"),
  iframeBorderColor: $("iframeBorderColor"),
  iframeRadius: $("iframeRadius"),
  applyHotspot: $("applyHotspot"),
  deleteHotspot: $("deleteHotspot"),
  copyJson: $("copyJson"),
  exportProject: $("exportProject"),
  statusText: $("statusText"),
  fadeLayer: $("sceneFadeLayer"),
  iframeOverlay: $("iframeOverlay"),
  iframeHeader: $("iframeHeader"),
  iframeHeaderTitle: $("iframeHeaderTitle"),
  iframePanel: $("iframePanel"),
  closeIframe: $("closeIframe"),
  openEditorWindow: $("openEditorWindow"),
  dockEditorBack: $("dockEditorBack"),
  editorDock: $("editorDock"),
  editorPanel: document.querySelector(".editor-panel"),
  quickSceneBar: $("quickSceneBar"),
};

function setStatus(msg) { els.statusText.textContent = msg; }
function getSceneIds() { return Object.keys(project.scenes); }
function getScene(id = state.selectedSceneId) { return project.scenes[id]; }
function uniqueId(prefix) { return `${prefix}-${Math.random().toString(36).slice(2, 8)}`; }

function seedData() {
  project.scenes.aerial.hotSpots.push(
    { id: "aerial-info", type: "info", pitch: 2, yaw: 1, text: "Center Island overview." },
    { id: "aerial-link", type: "scene", pitch: 16, yaw: 28, text: "Go to Pool", targetScene: "pool", transition: { fade: 900 } }
  );
  project.scenes.control.hotSpots.push({
    id: "control-iframe", type: "iframe", pitch: -6, yaw: -27, text: "Open embedded site",
    iframe: { url: "https://wikipedia.org", title: "Embedded Site", showHeader: true, width: 640, height: 400, borderSize: 1, borderColor: "#94a3b8", radius: 14 },
  });
}

function hotspotClass(type) { return type === "scene" ? "scene" : type === "iframe" ? "iframe" : "info"; }
function hotspotIcon(type) { return type === "scene" ? "➜" : type === "iframe" ? "⌘" : "i"; }

function applyHeaderUi() {
  const { logoPath, logoAlignX, logoAlignY, logoSize } = project.ui;
  els.headerLogo.src = logoPath;
  els.headerLogo.style.width = `${Number(logoSize)}px`;

  els.headerLogo.style.left = logoAlignX === "left" ? "0" : logoAlignX === "center" ? "50%" : "auto";
  els.headerLogo.style.right = logoAlignX === "right" ? "0" : "auto";
  els.headerLogo.style.transform = logoAlignX === "center" ? "translateX(-50%)" : "none";

  els.headerLogo.style.top = logoAlignY === "top" ? "0" : logoAlignY === "center" ? "50%" : "auto";
  els.headerLogo.style.bottom = logoAlignY === "bottom" ? "0" : "auto";
  if (logoAlignY === "center") {
    els.headerLogo.style.transform += " translateY(-50%)";
  }
}

function populateLogoOptions() {
  els.logoSelect.innerHTML = "";
  logoOptions.forEach((path) => {
    const option = document.createElement("option");
    option.value = path;
    option.textContent = path.split("/").pop();
    els.logoSelect.append(option);
  });
  els.logoSelect.value = project.ui.logoPath;
  els.logoPath.value = project.ui.logoPath;
  els.logoAlignX.value = project.ui.logoAlignX;
  els.logoAlignY.value = project.ui.logoAlignY;
  els.logoSize.value = project.ui.logoSize;
  applyHeaderUi();
}

function showIframeOverlay(config) {
  const width = Number(config.width || 640);
  const height = Number(config.height || 400);
  const borderSize = Number(config.borderSize || 1);
  const radius = Number(config.radius || 14);

  els.iframeOverlay.classList.remove("hidden");
  els.iframeOverlay.setAttribute("aria-hidden", "false");
  els.iframeOverlay.style.width = `${width}px`;
  els.iframeOverlay.style.height = `${height}px`;
  els.iframeOverlay.style.border = `${borderSize}px solid ${config.borderColor || "#94a3b8"}`;
  els.iframeOverlay.style.borderRadius = `${radius}px`;
  els.iframeHeader.style.display = config.showHeader ? "flex" : "none";
  els.iframeHeaderTitle.textContent = config.title || "Embedded Site";
  els.iframePanel.src = config.url || "https://wikipedia.org";
  els.iframePanel.style.height = config.showHeader ? "calc(100% - 45px)" : "100%";
}

function transitionToScene(spot) {
  const fade = Number(spot.transition?.fade ?? 900);
  const target = spot.targetScene || state.selectedSceneId;
  els.fadeLayer.style.transitionDuration = `${fade}ms`;
  els.fadeLayer.style.opacity = "0.45";

  setTimeout(() => {
    state.viewer.loadScene(
      target,
      spot.targetPitch === undefined ? undefined : Number(spot.targetPitch),
      spot.targetYaw === undefined ? undefined : Number(spot.targetYaw),
      spot.targetHfov === undefined ? undefined : Number(spot.targetHfov)
    );
    els.fadeLayer.style.opacity = "0";
  }, Math.max(100, Math.round(fade / 2)));
}

function makePannellumSpot(sceneId, spot) {
  const spotConfig = {
    id: spot.id,
    pitch: spot.pitch,
    yaw: spot.yaw,
    createTooltipFunc: (div, args) => {
      div.className = `hotspot ${hotspotClass(args.type)} ${els.dragEditEnabled.checked ? "editable" : ""}`;
      div.textContent = hotspotIcon(args.type);
      div.dataset.hotspotId = args.id;
      div.title = args.text || args.id;

      div.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        state.selectedHotspotId = args.id;
        syncHotspotEditor();

        const hs = getScene(sceneId).hotSpots.find((h) => h.id === args.id);
        if (!hs) return;
        if (hs.type === "iframe" && hs.iframe) showIframeOverlay(hs.iframe);
        if (hs.type === "scene") transitionToScene(hs);
      });

      div.addEventListener("pointerdown", (event) => {
        if (!els.dragEditEnabled.checked) return;
        event.preventDefault();
        event.stopPropagation();
        div.setPointerCapture(event.pointerId);
        div.classList.add("dragging");
        state.hotspotDrag = { pointerId: event.pointerId, sceneId, hotspotId: args.id, element: div };
      });
    },
    createTooltipArgs: { id: spot.id, text: spot.text, type: spot.type },
  };

  if (spot.type === "info") {
    spotConfig.type = "info";
    spotConfig.text = spot.text;
  }

  return spotConfig;
}

async function createTiledEquirect(src, uvX, uvY, tessellation) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  await img.decode();

  const targetWidth = Math.max(1024, Math.round(tessellation * 64));
  const targetHeight = Math.round(targetWidth / 2);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");

  const tileW = targetWidth / uvX;
  const tileH = targetHeight / uvY;
  for (let y = 0; y < uvY; y += 1) {
    for (let x = 0; x < uvX; x += 1) {
      ctx.drawImage(img, x * tileW, y * tileH, tileW + 1, tileH + 1);
    }
  }
  return canvas.toDataURL("image/jpeg", 0.92);
}

async function sceneToPannellum(scene) {
  const base = {
    title: scene.title,
    pitch: scene.pitch,
    yaw: scene.yaw,
    hfov: scene.hfov,
    hotSpots: scene.hotSpots.map((spot) => makePannellumSpot(scene.id, spot)),
  };

  if (scene.sourceType === "multires") {
    return {
      ...base,
      type: "multires",
      multiRes: {
        basePath: scene.tileBasePath,
        path: "/%l/%s/%y/%x",
        fallbackPath: "/1/%s/0/0",
        extension: "jpg",
        tileResolution: 512,
        maxLevel: 3,
        cubeResolution: 2048,
      },
    };
  }

  const uvX = Number(scene.mapping?.uvScaleX || 1);
  const uvY = Number(scene.mapping?.uvScaleY || 1);
  const tess = Number(scene.mapping?.tessellation || 64);

  let panoSrc = scene.panorama;
  if (uvX !== 1 || uvY !== 1 || tess !== 64) {
    panoSrc = await createTiledEquirect(scene.panorama, uvX, uvY, tess);
  }

  return {
    ...base,
    type: "equirectangular",
    panorama: panoSrc,
  };
}

async function buildPannellumConfig() {
  const scenes = {};
  for (const id of getSceneIds()) {
    scenes[id] = await sceneToPannellum(getScene(id));
  }

  return {
    default: {
      firstScene: state.selectedSceneId,
      autoLoad: true,
      showControls: true,
      mouseZoom: true,
      keyboardZoom: true,
      draggable: state.dragNavigationEnabled,
      sceneFadeDuration: 0,
    },
    scenes,
  };
}

async function rebuildViewer(sceneToLoad = state.selectedSceneId) {
  const token = ++state.rebuildToken;
  document.getElementById("viewer").innerHTML = "";
  const config = await buildPannellumConfig();
  if (token !== state.rebuildToken) return;

  state.viewer = window.pannellum.viewer("viewer", config);

  state.viewer.on("scenechange", (id) => {
    state.selectedSceneId = id;
    syncSceneControls();
    syncHotspotList();
    syncHotspotEditor();
    renderQuickSceneBar();
  });

  if (sceneToLoad && getScene(sceneToLoad)) {
    state.viewer.loadScene(sceneToLoad);
  }

  bindViewerInteractions();
  renderQuickSceneBar();
}

function bindViewerInteractions() {
  const viewerEl = document.getElementById("viewer");

  viewerEl.onpointermove = (event) => {
    if (!state.viewer) return;
    const coords = state.viewer.mouseEventToCoords(event);
    if (!coords) return;
    const [pitch, yaw] = coords;
    els.cursorCoords.textContent = `Cursor: pitch ${pitch.toFixed(3)} / yaw ${yaw.toFixed(3)}`;
  };

  viewerEl.onclick = (event) => {
    if (els.authorMode.value === "navigate") return;
    if (event.target && event.target.classList && event.target.classList.contains("hotspot")) return;
    const coords = state.viewer.mouseEventToCoords(event);
    if (!coords) return;
    const [pitch, yaw] = coords;

    const type = els.authorMode.value === "add-link" ? "scene" : els.authorMode.value === "add-iframe" ? "iframe" : "info";
    const newSpot = { id: uniqueId(type), type, pitch: Number(pitch.toFixed(3)), yaw: Number(yaw.toFixed(3)), text: "New hotspot" };

    if (type === "scene") {
      newSpot.targetScene = els.linkTarget.value || state.selectedSceneId;
      newSpot.transition = { fade: Number(els.transitionFade.value || 900) };
    }

    if (type === "iframe") {
      newSpot.iframe = {
        url: els.iframeUrl.value || "https://wikipedia.org",
        title: els.iframeTitle.value || "Embedded Site",
        showHeader: els.iframeShowHeader.checked,
        width: Number(els.iframeWidth.value || 640),
        height: Number(els.iframeHeight.value || 400),
        borderSize: Number(els.iframeBorderSize.value || 1),
        borderColor: els.iframeBorderColor.value || "#94a3b8",
        radius: Number(els.iframeRadius.value || 14),
      };
    }

    const scene = getScene();
    scene.hotSpots.push(newSpot);
    state.viewer.addHotSpot(makePannellumSpot(scene.id, newSpot), scene.id);
    state.selectedHotspotId = newSpot.id;
    syncHotspotList();
    syncHotspotEditor();
    setStatus(`Added ${type} hotspot ${newSpot.id} at pitch ${newSpot.pitch}, yaw ${newSpot.yaw}.`);
  };

  if (!window.__tourPointerBound) {
    window.addEventListener("pointermove", (event) => {
      if (!state.hotspotDrag || !els.dragEditEnabled.checked || !state.viewer) return;
      if (state.hotspotDrag.sceneId !== state.selectedSceneId) return;

      const coords = state.viewer.mouseEventToCoords(event);
      if (!coords) return;
      const [pitch, yaw] = coords;
      const scene = getScene();
      const spot = scene.hotSpots.find((h) => h.id === state.hotspotDrag.hotspotId);
      if (!spot) return;

      spot.pitch = Number(pitch.toFixed(3));
      spot.yaw = Number(yaw.toFixed(3));
      state.selectedHotspotId = spot.id;
      syncHotspotEditor();
      state.viewer.removeHotSpot(spot.id, scene.id);
      state.viewer.addHotSpot(makePannellumSpot(scene.id, spot), scene.id);
    });

    window.addEventListener("pointerup", (event) => {
      if (state.hotspotDrag && state.hotspotDrag.pointerId === event.pointerId) {
        state.hotspotDrag.element.classList.remove("dragging");
        state.hotspotDrag = null;
      }
    });

    window.__tourPointerBound = true;
  }
}

function renderQuickSceneBar() {
  els.quickSceneBar.innerHTML = "";
  getSceneIds().forEach((sceneId) => {
    const scene = getScene(sceneId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-scene-btn";
    if (sceneId === state.selectedSceneId) button.classList.add("active");
    const label = scene.title.slice(0, 12);
    button.textContent = label;
    button.title = scene.title;
    button.addEventListener("click", () => {
      state.selectedSceneId = sceneId;
      if (state.viewer) state.viewer.loadScene(sceneId);
      renderQuickSceneBar();
    });
    els.quickSceneBar.append(button);
  });
}

function syncSceneLists() {
  [els.sceneSelect, els.linkTarget, els.hotspotTargetScene].forEach((select) => {
    select.innerHTML = "";
    getSceneIds().forEach((id) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = project.scenes[id].title;
      select.append(option);
    });
  });
}

function scenePathSummary(scene) {
  return scene.sourceType === "multires" ? `${scene.tileBasePath} (multires tiles)` : scene.panorama;
}

function syncSceneControls() {
  const scene = getScene();
  if (!scene) return;
  els.sceneSelect.value = scene.id;
  els.sceneTitle.value = scene.title;
  els.panoPath.value = scenePathSummary(scene);
  els.sphereTessellation.value = Number(scene.mapping?.tessellation || 64);
  els.uvScaleX.value = Number(scene.mapping?.uvScaleX || 1);
  els.uvScaleY.value = Number(scene.mapping?.uvScaleY || 1);
}

function syncHotspotList() {
  const scene = getScene();
  els.hotspotSelect.innerHTML = "";
  scene.hotSpots.forEach((h) => {
    const option = document.createElement("option");
    option.value = h.id;
    option.textContent = `${h.type} :: ${h.id}`;
    els.hotspotSelect.append(option);
  });

  if (!scene.hotSpots.length) {
    state.selectedHotspotId = null;
    return;
  }

  if (!state.selectedHotspotId || !scene.hotSpots.some((h) => h.id === state.selectedHotspotId)) {
    state.selectedHotspotId = scene.hotSpots[0].id;
  }

  els.hotspotSelect.value = state.selectedHotspotId;
}

function syncHotspotEditor() {
  const scene = getScene();
  const h = scene.hotSpots.find((spot) => spot.id === state.selectedHotspotId);
  if (!h) return;

  els.hotspotSelect.value = h.id;
  els.hotspotType.value = h.type;
  els.hotspotText.value = h.text || "";
  els.hotspotPitch.value = h.pitch;
  els.hotspotYaw.value = h.yaw;
  els.hotspotTargetScene.value = h.targetScene || getSceneIds()[0];
  els.targetPitch.value = h.targetPitch ?? "";
  els.targetYaw.value = h.targetYaw ?? "";
  els.targetHfov.value = h.targetHfov ?? "";
  els.hotspotFade.value = h.transition?.fade ?? 900;

  const iframe = h.iframe || {};
  els.iframeUrl.value = iframe.url || "https://wikipedia.org";
  els.iframeTitle.value = iframe.title || "Embedded Site";
  els.iframeShowHeader.checked = iframe.showHeader !== false;
  els.iframeWidth.value = iframe.width || 640;
  els.iframeHeight.value = iframe.height || 400;
  els.iframeBorderSize.value = iframe.borderSize || 1;
  els.iframeBorderColor.value = iframe.borderColor || "#94a3b8";
  els.iframeRadius.value = iframe.radius || 14;
}

async function applyHotspotEdits() {
  const scene = getScene();
  const h = scene.hotSpots.find((spot) => spot.id === state.selectedHotspotId);
  if (!h) return;

  h.type = els.hotspotType.value;
  h.text = els.hotspotText.value;
  h.pitch = Number(els.hotspotPitch.value || 0);
  h.yaw = Number(els.hotspotYaw.value || 0);

  if (h.type === "scene") {
    h.targetScene = els.hotspotTargetScene.value;
    h.targetPitch = els.targetPitch.value === "" ? undefined : Number(els.targetPitch.value);
    h.targetYaw = els.targetYaw.value === "" ? undefined : Number(els.targetYaw.value);
    h.targetHfov = els.targetHfov.value === "" ? undefined : Number(els.targetHfov.value);
    h.transition = { fade: Number(els.hotspotFade.value || 900) };
    delete h.iframe;
  } else if (h.type === "iframe") {
    h.iframe = {
      url: els.iframeUrl.value,
      title: els.iframeTitle.value,
      showHeader: els.iframeShowHeader.checked,
      width: Number(els.iframeWidth.value || 640),
      height: Number(els.iframeHeight.value || 400),
      borderSize: Number(els.iframeBorderSize.value || 1),
      borderColor: els.iframeBorderColor.value || "#94a3b8",
      radius: Number(els.iframeRadius.value || 14),
    };
    delete h.targetScene;
  } else {
    delete h.targetScene;
    delete h.iframe;
  }

  await rebuildViewer(scene.id);
  syncHotspotList();
  syncHotspotEditor();
  setStatus(`Applied edits to hotspot ${h.id}.`);
}

async function exportProjectFiles() {
  const files = ["entry.html", "assets/styles.css", "assets/viewer.js"];
  const extraPanoramas = getSceneIds().map((id) => getScene(id)).filter((scene) => scene.sourceType === "equirectangular").map((scene) => scene.panorama).filter((p) => p && !p.startsWith("blob:"));

  const data = new Map();
  for (const file of files) {
    const r = await fetch(file);
    data.set(file, await r.text());
  }
  data.set("project-data.json", JSON.stringify({ project, exportedAt: new Date().toISOString() }, null, 2));

  for (const pano of extraPanoramas) {
    try {
      const r = await fetch(pano);
      if (r.ok) data.set(pano, await r.blob());
    } catch (_e) {
      setStatus(`Skipped panorama fetch ${pano}`);
    }
  }

  if (window.showDirectoryPicker) {
    try {
      const dir = await window.showDirectoryPicker();
      for (const [path, content] of data.entries()) {
        const parts = path.split("/");
        const file = parts.pop();
        let current = dir;
        for (const part of parts) current = await current.getDirectoryHandle(part, { create: true });
        const fh = await current.getFileHandle(file, { create: true });
        const w = await fh.createWritable();
        await w.write(content);
        await w.close();
      }
      setStatus("Export complete to selected directory.");
      return;
    } catch (e) {
      setStatus(`Directory export cancelled or failed: ${e.message}`);
      return;
    }
  }

  const zip = new window.JSZip();
  for (const [path, content] of data.entries()) zip.file(path, content);
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pannellum-tour-project.zip";
  a.click();
  URL.revokeObjectURL(url);
  setStatus("Directory Picker unavailable; downloaded ZIP.");
}

function dockEditorPanel() {
  if (!els.editorPanel || !els.editorDock) return;
  els.editorDock.appendChild(els.editorPanel);
  els.editorPanel.classList.remove("is-popped-out");
  els.dockEditorBack.classList.add("hidden");
  if (state.editorPopup && !state.editorPopup.closed) state.editorPopup.close();
  state.editorPopup = null;
}

function popOutEditorPanel() {
  if (!els.editorPanel) return;
  if (state.editorPopup && !state.editorPopup.closed) {
    state.editorPopup.focus();
    return;
  }

  const popup = window.open("", "pannellumEditorWindow", "width=560,height=980,resizable=yes,scrollbars=yes");
  if (!popup) {
    setStatus("Popup blocked by browser. Please allow popups for this site.");
    return;
  }

  const basePath = window.location.href.replace(/[^/]*$/, "");
  popup.document.write(`<!DOCTYPE html><html><head><title>Pannellum Editor</title><link rel="stylesheet" href="${basePath}assets/styles.css"></head><body style="margin:0;background:#020617;"><div id="popupDock" style="padding:12px;"></div></body></html>`);
  popup.document.close();

  popup.document.getElementById("popupDock").appendChild(els.editorPanel);
  els.dockEditorBack.classList.remove("hidden");
  state.editorPopup = popup;

  popup.addEventListener("beforeunload", () => {
    if (els.editorDock && els.editorPanel && !els.editorDock.contains(els.editorPanel)) {
      els.editorDock.appendChild(els.editorPanel);
    }
    els.dockEditorBack.classList.add("hidden");
    state.editorPopup = null;
  });
}

function setupCollapsibleSections() {
  document.querySelectorAll(".collapsible-section > legend").forEach((legend) => {
    legend.addEventListener("click", () => {
      const section = legend.parentElement;
      section.classList.toggle("collapsed");
    });
  });
}

function bindControls() {
  els.openEditorWindow.addEventListener("click", popOutEditorPanel);
  els.dockEditorBack.addEventListener("click", dockEditorPanel);

  els.dragNavEnabled.addEventListener("change", () => {
    state.dragNavigationEnabled = els.dragNavEnabled.checked;
    rebuildViewer(state.selectedSceneId);
    setStatus(`Panorama drag navigation ${state.dragNavigationEnabled ? "enabled" : "disabled"}.`);
  });

  els.sceneSelect.addEventListener("change", () => {
    state.selectedSceneId = els.sceneSelect.value;
    state.viewer.loadScene(state.selectedSceneId);
    renderQuickSceneBar();
  });

  els.viewPano.addEventListener("click", () => state.viewer.loadScene(state.selectedSceneId));

  els.replacePano.addEventListener("click", async () => {
    const scene = getScene();
    scene.title = els.sceneTitle.value.trim() || scene.title;
    scene.mapping = {
      tessellation: Number(els.sphereTessellation.value || 64),
      uvScaleX: Number(els.uvScaleX.value || 1),
      uvScaleY: Number(els.uvScaleY.value || 1),
    };

    const file = els.panoFile.files && els.panoFile.files[0];
    const typedPath = els.panoPath.value.trim();

    if (file) {
      scene.sourceType = "equirectangular";
      scene.panorama = URL.createObjectURL(file);
      delete scene.tileBasePath;
    } else if (typedPath && !typedPath.includes("(multires tiles)")) {
      scene.sourceType = "equirectangular";
      scene.panorama = typedPath;
      delete scene.tileBasePath;
    }

    syncSceneLists();
    await rebuildViewer(scene.id);
    renderQuickSceneBar();
    setStatus(`Updated scene ${scene.id}. Tessellation ${scene.mapping.tessellation}, UV ${scene.mapping.uvScaleX}/${scene.mapping.uvScaleY}.`);
  });

  els.applyHeader.addEventListener("click", () => {
    project.ui.logoPath = els.logoPath.value.trim() || els.logoSelect.value;
    project.ui.logoAlignX = els.logoAlignX.value;
    project.ui.logoAlignY = els.logoAlignY.value;
    project.ui.logoSize = Number(els.logoSize.value || 72);
    applyHeaderUi();
    setStatus("Header logo settings applied.");
  });

  els.logoSelect.addEventListener("change", () => {
    els.logoPath.value = els.logoSelect.value;
  });

  els.deletePano.addEventListener("click", async () => {
    if (getSceneIds().length <= 1) return setStatus("Cannot delete the last remaining scene.");
    delete project.scenes[state.selectedSceneId];
    state.selectedSceneId = getSceneIds()[0];
    syncSceneLists();
    await rebuildViewer(state.selectedSceneId);
    syncSceneControls();
    syncHotspotList();
    syncHotspotEditor();
    renderQuickSceneBar();
    setStatus("Scene deleted.");
  });

  els.hotspotSelect.addEventListener("change", () => {
    state.selectedHotspotId = els.hotspotSelect.value;
    syncHotspotEditor();
  });

  els.applyHotspot.addEventListener("click", applyHotspotEdits);

  els.deleteHotspot.addEventListener("click", async () => {
    const scene = getScene();
    scene.hotSpots = scene.hotSpots.filter((h) => h.id !== state.selectedHotspotId);
    state.selectedHotspotId = null;
    await rebuildViewer(scene.id);
    syncHotspotList();
    syncHotspotEditor();
    setStatus("Hotspot deleted.");
  });

  els.copyJson.addEventListener("click", async () => {
    const json = JSON.stringify(project, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      setStatus("Project JSON copied.");
    } catch (_e) {
      setStatus(`Clipboard blocked. JSON length ${json.length}.`);
    }
  });

  els.exportProject.addEventListener("click", () => exportProjectFiles().catch((e) => setStatus(`Export failed: ${e.message}`)));

  els.closeIframe.addEventListener("click", () => {
    els.iframeOverlay.classList.add("hidden");
    els.iframeOverlay.setAttribute("aria-hidden", "true");
    els.iframePanel.src = "about:blank";
  });
}

async function initialize() {
  seedData();
  populateLogoOptions();
  setupCollapsibleSections();
  syncSceneLists();
  syncSceneControls();
  await rebuildViewer(state.selectedSceneId);
  syncHotspotList();
  syncHotspotEditor();
  bindControls();
  renderQuickSceneBar();
  setStatus("Ready. Adjust tessellation / UV for equirectangular scenes, use quick scene bar, and pop out editor as needed.");
  window.__tourState = state;
}

initialize();
