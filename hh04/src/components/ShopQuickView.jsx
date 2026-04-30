import { useState } from "react";

export default function ShopQuickView({ item, allItems, onClose, onAddToCart }) {
  const [youHave, setYouHave] = useState(0);
  const [buyQty, setBuyQty] = useState(1);

  // Pick 4 random other items as suggestions
  const suggestions = allItems
    .filter(i => i.id !== item.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  // Parse bullet points from desc — split on ". " for multiple sentences
  const bullets = item.desc
    ? item.desc.split(/(?<=\.)\s+(?=[A-Z])/).filter(Boolean)
    : [];

  const handleAddToCart = () => {
    if (buyQty > 0) {
      onAddToCart(item, buyQty);
      onClose();
    }
  };

  const handleSuggestionAdd = (suggItem) => {
    onAddToCart(suggItem, 1);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 400, padding: 16
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: 16, width: "100%", maxWidth: 860,
          maxHeight: "92vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "slideUp 0.25s ease"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Back button */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center" }}>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#555", display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
          >← Back</button>
        </div>

        {/* Main product area */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: 420 }}>
          {/* Left: Image */}
          <div style={{ background: "#f8f9fb", display: "flex", alignItems: "center", justifyContent: "center", padding: 32, borderRight: "1px solid rgba(0,0,0,0.06)", minHeight: 380 }}>
            <img
              src={item.img}
              alt={item.name}
              style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain" }}
            />
          </div>

          {/* Right: Details */}
          <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 12, color: "#2ABCBA", fontWeight: 500 }}>
              First Aid › {item.category.replace(/[^\w\s]/g, "").trim()} › {item.brand}
            </div>

            {/* Title */}
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.3 }}>{item.name}</div>

            {/* Price + Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <span style={{ background: "#f5c518", borderRadius: 4, padding: "3px 10px", fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>{item.price}</span>
                <span style={{ fontSize: 13, color: "#555", fontWeight: 600, marginLeft: 8 }}>Target</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#f5c518", fontSize: 16 }}>★★★★★</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>5.0</span>
                <span style={{ fontSize: 12, color: "#888" }}>(523)</span>
              </div>
            </div>

            {/* Bullets */}
            <ul style={{ paddingLeft: 18, margin: "4px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 13, color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>{b}</li>
              ))}
              {bullets.length === 0 && (
                <li style={{ fontSize: 13, color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>{item.desc}</li>
              )}
            </ul>

            {/* You need / You have / Buy stepper */}
            <div style={{ background: "#e8f6fb", border: "1px solid rgba(42,188,186,0.25)", borderRadius: 10, padding: "16px 20px", marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
              {/* You need */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>You need:</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>2</span>
              </div>
              {/* You have */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>You have:</span>
                <Stepper value={youHave} onChange={setYouHave} min={0} />
              </div>
              {/* BUY */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>BUY:</span>
                <Stepper value={buyQty} onChange={setBuyQty} min={0} highlight />
              </div>
              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                style={{ marginTop: 4, width: "100%", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 700, padding: "13px", cursor: "pointer", letterSpacing: 0.5 }}
              >Add to Cart</button>
              {/* Why link */}
              <div style={{ textAlign: "center", fontSize: 12, color: "#2ABCBA", cursor: "pointer", fontStyle: "italic" }}>Why do I need this product?</div>
            </div>
          </div>
        </div>

        {/* Other items to consider */}
        <div style={{ padding: "24px 28px 32px", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>Other items to consider</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {suggestions.map(s => (
              <div key={s.id} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 10, overflow: "hidden", position: "relative", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                {/* + button */}
                <button
                  onClick={() => handleSuggestionAdd(s)}
                  style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 6, background: "#2ABCBA", border: "none", color: "#fff", fontSize: 18, fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 2px 6px rgba(42,188,186,0.4)" }}
                >+</button>
                {/* Image */}
                <div style={{ background: "#f8f9fb", height: 130, display: "flex", alignItems: "center", justifyContent: "center", padding: 10 }}>
                  <img src={s.img} alt={s.name} style={{ maxHeight: 110, maxWidth: "100%", objectFit: "contain" }} />
                </div>
                {/* Info */}
                <div style={{ padding: "10px 12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                    <span style={{ background: "#f5c518", borderRadius: 3, padding: "1px 7px", fontSize: 13, fontWeight: 800, color: "#1a1a2e" }}>{s.price}</span>
                    <span style={{ fontSize: 11, color: "#555", fontWeight: 600 }}>Target</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.4 }}>{s.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ value, onChange, min = 0, highlight }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{ width: 30, height: 30, borderRadius: 6, background: highlight ? "#2ABCBA" : "#b0d8e8", border: "none", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      >−</button>
      <span style={{ minWidth: 32, textAlign: "center", fontSize: 16, fontWeight: 800, color: "#1a1a2e", background: highlight ? "rgba(42,188,186,0.12)" : "rgba(0,0,0,0.06)", borderRadius: 4, padding: "2px 8px" }}>{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        style={{ width: 30, height: 30, borderRadius: 6, background: highlight ? "#2ABCBA" : "#b0d8e8", border: "none", color: "#fff", fontSize: 18, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      >+</button>
    </div>
  );
}