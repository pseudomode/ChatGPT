import { useState } from "react";

const WEATHER_IMG = "https://herohome.neocities.org/Base44/01/images/icons/icon_weather_blk01.png";

export default function ProfilePage({
  formData,
  heroRating,
  supplyReadiness,
  eduPct,
  completedCount,
  lessonCount,
  noaaData,
  noaaAlerts,
  noaaLoading,
  noaaError,
  forecastData,
  fetchNOAAWeather,
  onClose,
  onNavigate,
}) {
  const [activeTab, setActiveTab] = useState("myhome");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    fullName: "David Martinez",
    email: formData.email || "david@herohome.app",
    address: formData.address || "Los Angeles, California",
    adults: formData.adults ?? 1,
    children: formData.children ?? 0,
  });

  const tabs = [
    { id: "myhome", label: "My Home", icon: "🏠" },
    { id: "profile", label: "My Account", icon: "👤" },
    { id: "alerts", label: "Active Alerts", icon: "⚠️" },
    { id: "weather", label: "Weather", icon: "⛅" },
  ];

  const alertSeverityColor = (sev) => {
    if (sev === "Extreme") return "#8b0000";
    if (sev === "Severe") return "#c25050";
    if (sev === "Moderate") return "#b87333";
    return "#5a7a50";
  };

  const current = forecastData[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "'Inter', sans-serif", background: "#f4f6f9" }}>
      {/* Sub-header: user info + tabs */}
      <div style={{ background: "rgba(255,255,255,0.98)", borderBottom: "1px solid rgba(0,0,0,0.08)", flexShrink: 0, padding: "0 28px" }}>
        {/* User info row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e" }}>David Martinez</div>
              <div style={{ fontSize: 10, color: "#2ABCBA", fontWeight: 600 }}>Hero — Free Plan • Member since April 2026</div>
            </div>
          </div>

        </div>
        {/* Tabs row */}
        <div style={{ display: "flex", gap: 2 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 18px", border: "none", borderRadius: "0",
                background: "transparent",
                color: activeTab === tab.id ? "#2ABCBA" : "rgba(0,0,0,0.5)",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                borderBottom: activeTab === tab.id ? "2px solid #2ABCBA" : "2px solid transparent",
                fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px", maxWidth: 1000, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Editable fields */}
            {[
              { label: "Full Name", key: "fullName", icon: "👤", type: "text" },
              { label: "Email", key: "email", icon: "📧", type: "email" },
              { label: "Home Address", key: "address", icon: "📍", type: "text" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "#fff", borderRadius: 10, border: `1px solid ${editMode ? "rgba(42,188,186,0.3)" : "rgba(0,0,0,0.07)"}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 22, width: 32 }}>{row.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{row.label}</div>
                  {editMode ? (
                    <input
                      type={row.type}
                      value={editData[row.key]}
                      onChange={e => setEditData(prev => ({ ...prev, [row.key]: e.target.value }))}
                      style={{ width: "100%", fontSize: 14, fontWeight: 600, color: "#1a1a2e", border: "none", outline: "none", background: "transparent", fontFamily: "'Inter', sans-serif", borderBottom: "1px solid rgba(42,188,186,0.5)", paddingBottom: 2 }}
                    />
                  ) : (
                    <div style={{ fontSize: 14, color: "#1a1a2e", fontWeight: 600 }}>{editData[row.key]}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Household — special counter row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "#fff", borderRadius: 10, border: `1px solid ${editMode ? "rgba(42,188,186,0.3)" : "rgba(0,0,0,0.07)"}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 22, width: 32 }}>👨‍👩‍👧</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Household</div>
                {editMode ? (
                  <div style={{ display: "flex", gap: 20 }}>
                    {[{ label: "Adults", key: "adults", min: 1 }, { label: "Children", key: "children", min: 0 }].map(({ label, key, min }) => (
                      <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>{label}:</span>
                        <button onClick={() => setEditData(p => ({ ...p, [key]: Math.max(min, p[key] - 1) }))} style={{ width: 26, height: 26, borderRadius: 4, background: "#2ABCBA", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>−</button>
                        <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{editData[key]}</span>
                        <button onClick={() => setEditData(p => ({ ...p, [key]: p[key] + 1 }))} style={{ width: 26, height: 26, borderRadius: 4, background: "#2ABCBA", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>+</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 14, color: "#1a1a2e", fontWeight: 600 }}>{editData.adults} Adults, {editData.children} Children</div>
                )}
              </div>
            </div>

            {/* Member Since — always read-only */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "#fff", borderRadius: 10, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 22, width: 32 }}>📅</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Member Since</div>
                <div style={{ fontSize: 14, color: "#1a1a2e", fontWeight: 600 }}>April 2026</div>
              </div>
            </div>

            {/* Hero Rating */}
            <div style={{ background: "rgba(42,188,186,0.06)", border: "1px solid rgba(42,188,186,0.2)", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>🏅 Hero Rating</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#2ABCBA" }}>{heroRating}%</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(0,0,0,0.5)", marginBottom: 5 }}>
                  <span>🎒 Supply Readiness</span><span style={{ fontWeight: 700, color: "#2ABCBA" }}>{supplyReadiness}%</span>
                </div>
                <div style={{ height: 7, background: "rgba(0,0,0,0.07)", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${supplyReadiness}%`, background: "linear-gradient(90deg, #2ABCBA, #3289E2)", borderRadius: 4 }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(0,0,0,0.5)", marginBottom: 5 }}>
                  <span>📚 Education ({completedCount}/{lessonCount} lessons)</span><span style={{ fontWeight: 700, color: "#3289E2" }}>{eduPct}%</span>
                </div>
                <div style={{ height: 7, background: "rgba(0,0,0,0.07)", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${eduPct}%`, background: "linear-gradient(90deg, #3289E2, #2ABCBA)", borderRadius: 4 }} />
                </div>
              </div>
            </div>

            <div style={{ padding: "14px 18px", background: "rgba(42,188,186,0.06)", borderRadius: 10, border: "1px solid rgba(42,188,186,0.2)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>🏅</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Membership Tier</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2ABCBA" }}>Hero — Free Plan</div>
              </div>
              <button style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, padding: "9px 18px", cursor: "pointer" }}>Upgrade →</button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ flex: 1, padding: "12px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 13, color: "rgba(0,0,0,0.6)", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>🔒 Change Password</button>
              {editMode ? (
                <button
                  onClick={() => setEditMode(false)}
                  style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >💾 Save</button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  style={{ flex: 1, padding: "12px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 13, color: "rgba(0,0,0,0.6)", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >✏️ Edit Profile</button>
              )}
            </div>
          </div>
        )}

        {/* ── MY HOME TAB ── */}
        {activeTab === "myhome" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ padding: "12px 18px", background: "#f8f9fb", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2ABCBA", letterSpacing: 2, textTransform: "uppercase" }}>My Home</span>
                <span style={{ fontSize: 11, color: "rgba(0,0,0,0.35)" }}>— {formData.address || "Los Angeles, California"}</span>
              </div>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a6417e6f00bff3da12ccd4/f2a827953_David_House_ChatGPT_2.png"
                alt="Your Home"
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[
                { icon: "📍", label: "Location", value: formData.address || "Los Angeles, CA" },
                { icon: "🏅", label: "Hero Rating", value: `${heroRating}%`, heroCard: true },
                { icon: "👨‍👩‍👧", label: "Household", value: `${formData.adults} Adults, ${formData.children} Children` },
                { icon: "🔥", label: "Fire Risk", value: "High — Wildfire Zone" },
                { icon: "🌊", label: "Flood Risk", value: "Moderate — 100yr Flood" },
                { icon: "🌪️", label: "Seismic Risk", value: "High — Near Fault Line" },
              ].map(item => (
                <div key={item.label} style={{ background: "#fff", borderRadius: 10, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", ...(item.heroCard ? { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" } : {}) }}>
                  {item.heroCard ? (
                    <>
                      <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontSize: 28, marginBottom: 4 }}>{item.icon}</div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: "#2ABCBA" }}>{item.value}</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{item.value}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTIVE ALERTS TAB ── */}
        {activeTab === "alerts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", lineHeight: 1.6, marginBottom: 4 }}>
              Current alerts issued for your area by NOAA, USGS & emergency agencies
            </div>
            {(noaaAlerts.length > 0 ? noaaAlerts : [
              { properties: { event: "Wildfire Watch", senderName: "NWS / CAL FIRE", severity: "Severe", headline: "Red flag conditions through Thursday evening. Relative humidity 8-14%, winds 25-40 mph with gusts to 55 mph." } },
              { properties: { event: "Flood Watch", senderName: "NOAA / NWS", severity: "Moderate", headline: "Heavy rainfall possible through Wednesday. 1-2 inches expected, locally up to 3 inches." } },
              { properties: { event: "Wind Advisory", senderName: "NWS", severity: "Minor", headline: "Winds 20-30 mph with gusts up to 45 mph expected Wednesday evening." } },
            ]).map((alert, i) => {
              const props = alert.properties || {};
              const sev = props.severity;
              const color = alertSeverityColor(sev);
              return (
                <div key={i} style={{ borderRadius: 12, border: `1px solid ${color}30`, background: `${color}10`, padding: "18px 22px", borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{sev === "Extreme" ? "🚨" : sev === "Severe" ? "🔴" : "🟡"}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>{props.event || "Alert"}</div>
                      <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)" }}>{props.senderName || "NWS"} · {sev}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color, background: `${color}20`, borderRadius: 4, padding: "3px 10px", letterSpacing: 1 }}>{sev?.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(0,0,0,0.65)", lineHeight: 1.7 }}>{props.headline || ""}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── WEATHER TAB ── */}
        {activeTab === "weather" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>Weather & Alerts</div>
                <div style={{ fontSize: 12, color: "rgba(42,188,186,0.8)" }}>Live NOAA data for {noaaData?.location || formData.address || "your area"}</div>
              </div>
              <button
                onClick={fetchNOAAWeather}
                disabled={noaaLoading}
                style={{ background: "rgba(42,188,186,0.1)", border: "1px solid rgba(42,188,186,0.35)", borderRadius: 8, color: "#2ABCBA", fontSize: 13, fontWeight: 700, padding: "10px 18px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
              >{noaaLoading ? "⏳ Loading..." : "🔄 Refresh NOAA"}</button>
            </div>
            {noaaError && <div style={{ background: "#c25050", borderRadius: 8, padding: "12px 16px", color: "#fff", marginBottom: 16, fontSize: 13 }}>⚠ {noaaError}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {/* Windy map — spans col 1-2, row 1-2 */}
              <div style={{ gridColumn: "1/3", gridRow: "1/3", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", minHeight: 360 }}>
                <iframe
                  width="100%" height="100%"
                  src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=9&overlay=wind&product=ecmwf&level=surface&lat=34.05&lon=-118.24"
                  frameBorder="0"
                  style={{ display: "block", width: "100%", minHeight: 360 }}
                />
              </div>
              {/* Current conditions */}
              <div style={{ gridColumn: 3, gridRow: 1, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                {current ? (
                  <>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>🌡 Current</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 40 }}>{current.isDaytime ? "☀️" : "🌙"}</span>
                      <div>
                        <div style={{ fontSize: 34, fontWeight: 800, color: "#1a1a2e" }}>{current.temperature}°{current.temperatureUnit}</div>
                        <div style={{ fontSize: 11, color: "#2ABCBA" }}>📍 {noaaData?.location || "Los Angeles"}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>{current.shortForecast}</div>
                    <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginTop: 6 }}>💨 {current.windSpeed} {current.windDirection}</div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: 20, color: "rgba(0,0,0,0.4)", fontSize: 13 }}>Refresh to load weather</div>
                )}
              </div>
              {/* Active alerts */}
              <div style={{ gridColumn: 3, gridRow: 2, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflowY: "auto" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>⚠️ Active Alerts</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(noaaAlerts.length > 0 ? noaaAlerts.slice(0, 3) : [
                    { properties: { event: "Wildfire Watch", severity: "Severe" } },
                    { properties: { event: "Wind Advisory", severity: "Minor" } },
                  ]).map((a, i) => {
                    const p = a.properties || {};
                    const color = alertSeverityColor(p.severity);
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "#f8f9fb", borderRadius: 7, borderLeft: `3px solid ${color}` }}>
                        <span style={{ fontSize: 13 }}>{p.severity === "Severe" || p.severity === "Extreme" ? "🔴" : "🟡"}</span>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{p.event || "Alert"}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 7-day forecast */}
              <div style={{ gridColumn: "1/4", gridRow: 3, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.4)", letterSpacing: 1, marginBottom: 14, textTransform: "uppercase" }}>📅 7-Day Forecast</div>
                {forecastData.length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                    {forecastData.map((p, i) => (
                      <div key={i} style={{ textAlign: "center", padding: "10px 4px", background: "#f8f9fb", borderRadius: 8, border: "1px solid rgba(0,0,0,0.07)" }}>
                        <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", marginBottom: 4 }}>{p.name?.slice(0, 3)}</div>
                        <div style={{ fontSize: 20 }}>{p.isDaytime ? "☀️" : "🌙"}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{p.temperature}°</div>
                        <div style={{ fontSize: 9, color: "rgba(0,0,0,0.4)", lineHeight: 1.2, marginTop: 2 }}>{p.shortForecast?.slice(0, 10)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: 20, color: "rgba(0,0,0,0.4)", fontSize: 13 }}>Tap Refresh NOAA to load forecast data</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}