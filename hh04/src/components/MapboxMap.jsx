export default function MapboxMap({ center = [34.05, -118.24], zoom = 10, height = 300 }) {
  const MAPBOX_TOKEN = "*****Ent3erKeyHere*******";
  const STYLE_ID = "***EnterHere***";
  const [lon, lat] = [center[1], center[0]];
  const h = typeof height === "number" ? height : 300;
  const w = 800;

  const url = `https://api.mapbox.com/styles/v1/${STYLE_ID}/static/${lon},${lat},${zoom},0/${w}x${h}@2x?access_token=${MAPBOX_TOKEN}`;

  return (
    <div style={{ width: "100%", height: h, overflow: "hidden", background: "#0d1928" }}>
      <img
        src={url}
        alt="Map"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}