import { useState, useEffect, useRef } from "react";

// Tutorial blurb definitions
const BLURBS = [
  {
    id: 1,
    text: "This is your personalized Hero Home Supplies Manager.",
    anchorId: "supply-recommended-header",
    placement: "left",
  },
  {
    id: 2,
    text: "Click any item to expand it and see why you need it for emergency preparedness.",
    anchorId: "supply-water-filter-name",
    placement: "right",
  },
  {
    id: 3,
    text: "Manage your inventory by adding any items you already have or want to purchase.",
    anchorId: "supply-water-filter-plus",
    placement: "right",
  },
  {
    id: 4,
    text: "Go ahead, give it a try. Add a Water Filter if you already have one at home.",
    anchorId: "supply-water-filter-plus",
    placement: "right",
    waitForClick: true,
  },
  {
    id: 5,
    text: "Well done! Your Supply rating increased. Every step you take in the journey to become a hero matters.",
    anchorId: "supply-readiness-stat",
    placement: "right",
  },
  {
    id: 6,
    text: "Our Hero Rating System will help develop your heroic character and help you receive rewards.",
    anchorId: "hero-rating-badge",
    placement: "left",
  },
];

function getAnchorRect(anchorId) {
  const el = document.getElementById(anchorId);
  if (!el) return null;
  return el.getBoundingClientRect();
}

function Popover({ blurb, onNext, onDone, isLast, waitingForClick }) {
  const [rect, setRect] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let tries = 0;
    const tryFind = () => {
      const r = getAnchorRect(blurb.anchorId);
      if (r && r.width > 0) {
        setRect(r);
        setTimeout(() => setVisible(true), 50);
      } else if (tries < 20) {
        tries++;
        setTimeout(tryFind, 150);
      }
    };
    tryFind();
  }, [blurb.anchorId]);

  if (!rect) return null;

  const GAP = 12;
  const POP_W = 280;
  const POP_H = 130;

  let top = rect.top + rect.height / 2 - POP_H / 2;
  let left;

  if (blurb.placement === "left") {
    left = rect.left - POP_W - GAP;
  } else {
    left = rect.right + GAP;
  }

  // Clamp to viewport
  top = Math.max(80, Math.min(top, window.innerHeight - POP_H - 16));
  left = Math.max(8, Math.min(left, window.innerWidth - POP_W - 8));

  return (
    <>
      {/* Dark overlay with cutout */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.45)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: waitingForClick ? "none" : "auto",
        }}
        onClick={waitingForClick ? undefined : onNext}
      />
      {/* Highlight ring around anchor */}
      <div
        style={{
          position: "fixed",
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          borderRadius: 8,
          border: "2px solid #2ABCBA",
          boxShadow: "0 0 0 4px rgba(42,188,186,0.25)",
          zIndex: 901,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Popover bubble */}
      <div
        style={{
          position: "fixed",
          top,
          left,
          width: POP_W,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
          border: "1px solid rgba(42,188,186,0.3)",
          zIndex: 902,
          padding: "16px 18px 12px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s, transform 0.3s",
          pointerEvents: "auto",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Step indicator */}
        <div style={{ fontSize: 10, fontWeight: 700, color: "#2ABCBA", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          STEP {blurb.id} OF {BLURBS.length}
        </div>
        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [blurb.placement === "left" ? "right" : "left"]: -10,
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            [blurb.placement === "left" ? "borderLeft" : "borderRight"]: "10px solid #fff",
            filter: "drop-shadow(1px 0 1px rgba(0,0,0,0.08))",
          }}
        />
        <p style={{ fontSize: 13, color: "#1a1a2e", lineHeight: 1.6, margin: "0 0 14px" }}>
          {blurb.text}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {waitingForClick ? (
            <span style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", fontStyle: "italic" }}>Click any + button above ↑</span>
          ) : isLast ? (
            <button
              onClick={onDone}
              style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, padding: "7px 16px", cursor: "pointer" }}
            >Got it! 🎉</button>
          ) : (
            <button
              onClick={onNext}
              style={{ background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", border: "none", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, padding: "7px 16px", cursor: "pointer" }}
            >Next →</button>
          )}
        </div>
      </div>
    </>
  );
}

export default function SuppliesTutorial({ onComplete, onPlusClicked }) {
  const [step, setStep] = useState(0);
  const [waitingForClick, setWaitingForClick] = useState(false);

  const blurb = BLURBS[step];

  // Blurb 4 waits for a + click
  useEffect(() => {
    if (blurb?.waitForClick) {
      setWaitingForClick(true);
    } else {
      setWaitingForClick(false);
    }
  }, [step]);

  // When a + button is clicked during blurb 4, advance to blurb 5
  useEffect(() => {
    if (waitingForClick && onPlusClicked) {
      // onPlusClicked is a callback we listen for from parent
    }
  }, [onPlusClicked, waitingForClick]);

  const handleNext = () => {
    if (step < BLURBS.length - 1) {
      setStep(s => s + 1);
    }
  };

  const handlePlusClickedDuringBlurb4 = () => {
    if (waitingForClick) {
      setWaitingForClick(false);
      setStep(4); // advance to blurb 5 (index 4)
    }
  };

  // Expose handler via ref pattern — parent calls this
  useEffect(() => {
    window.__supplyTutorialPlusClick = handlePlusClickedDuringBlurb4;
    return () => { delete window.__supplyTutorialPlusClick; };
  }, [waitingForClick]);

  const handleDone = () => {
    onComplete({ resetItemId: "w4" });
  };

  return (
    <Popover
      blurb={blurb}
      onNext={handleNext}
      onDone={handleDone}
      isLast={step === BLURBS.length - 1}
      waitingForClick={waitingForClick}
    />
  );
}