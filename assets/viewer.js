const viewerElement = document.getElementById("viewer");

if (viewerElement) {
  const panoramaUrl = viewerElement.dataset.panorama;
  const initialPitch = Number(viewerElement.dataset.pitch || 0);
  const initialYaw = Number(viewerElement.dataset.yaw || 0);

  window.pannellum.viewer("viewer", {
    type: "equirectangular",
    panorama: panoramaUrl,
    autoLoad: true,
    showZoomCtrl: true,
    showFullscreenCtrl: true,
    pitch: initialPitch,
    yaw: initialYaw,
    minPitch: -20,
    maxPitch: 20,
    minYaw: -20,
    maxYaw: 20,
  });
}
