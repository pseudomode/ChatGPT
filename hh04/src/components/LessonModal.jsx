import { useState } from "react";
import { LESSONS } from "@/lib/lessonData";

const PASS_THRESHOLD = 4;

export default function LessonModal({ topicId, onClose, onComplete }) {
  const lesson = LESSONS[topicId];
  const [phase, setPhase] = useState("slides"); // slides | quiz | result
  const [slideIndex, setSlideIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!lesson) return null;

  const totalSlides = lesson.slides.length;
  const currentSlide = lesson.slides[slideIndex];

  const handleAnswer = (qIdx, aIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: aIdx }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
    const passed = score >= PASS_THRESHOLD;
    setPhase("result");
    onComplete(topicId, passed, score);
  };

  const score = submitted
    ? lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    : 0;
  const passed = score >= PASS_THRESHOLD;

  const allAnswered = Object.keys(answers).length === lesson.quiz.length;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 16
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 720,
        maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 32px 80px rgba(0,0,0,0.25)", animation: "slideUp 0.3s ease"
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px 16px", borderBottom: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{lesson.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "rgba(42,188,186,0.8)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>
                {phase === "slides" ? `Lesson ${slideIndex + 1} of ${totalSlides}` : phase === "quiz" ? "Knowledge Quiz" : "Results"}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{lesson.title}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 50, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "rgba(0,0,0,0.5)" }}>✕</button>
        </div>

        {/* Progress bar */}
        {phase === "slides" && (
          <div style={{ height: 3, background: "rgba(0,0,0,0.07)", flexShrink: 0 }}>
            <div style={{ height: "100%", width: `${((slideIndex + 1) / totalSlides) * 100}%`, background: "linear-gradient(90deg, #2ABCBA, #3289E2)", transition: "width 0.4s" }} />
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>

          {/* ── SLIDE PHASE ── */}
          {phase === "slides" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "fadeInUp 0.3s ease" }}>
              <div style={{ textAlign: "center", fontSize: 72 }}>{currentSlide.visual}</div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>{currentSlide.title}</h2>
                <p style={{ fontSize: 15, color: "rgba(0,0,0,0.65)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>{currentSlide.content}</p>
              </div>
              {currentSlide.tip && (
                <div style={{ background: "rgba(42,188,186,0.07)", border: "1px solid rgba(42,188,186,0.25)", borderRadius: 10, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
                  <div style={{ fontSize: 13, color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}><strong style={{ color: "#2ABCBA" }}>Pro Tip: </strong>{currentSlide.tip}</div>
                </div>
              )}
            </div>
          )}

          {/* ── QUIZ PHASE ── */}
          {phase === "quiz" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ textAlign: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Knowledge Check</div>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.45)" }}>Answer 4 out of 5 questions correctly to pass</div>
              </div>
              {lesson.quiz.map((q, qIdx) => (
                <div key={qIdx}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>
                    <span style={{ color: "#2ABCBA", marginRight: 8 }}>Q{qIdx + 1}.</span>{q.question}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {q.options.map((opt, aIdx) => {
                      const isSelected = answers[qIdx] === aIdx;
                      const isCorrect = aIdx === q.answer;
                      let bg = "#f8f9fb", border = "1px solid rgba(0,0,0,0.09)", color = "#1a1a2e";
                      if (submitted) {
                        if (isCorrect) { bg = "rgba(42,188,186,0.1)"; border = "1px solid rgba(42,188,186,0.4)"; color = "#1a7a78"; }
                        else if (isSelected && !isCorrect) { bg = "rgba(226,99,50,0.08)"; border = "1px solid rgba(226,99,50,0.4)"; color = "#c0501a"; }
                      } else if (isSelected) {
                        bg = "rgba(42,188,186,0.1)"; border = "1px solid rgba(42,188,186,0.4)"; color = "#1a7a78";
                      }
                      return (
                        <button key={aIdx} onClick={() => handleAnswer(qIdx, aIdx)} style={{
                          padding: "12px 16px", borderRadius: 8, border, background: bg, color,
                          fontSize: 13, textAlign: "left", cursor: submitted ? "default" : "pointer",
                          display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif",
                          transition: "all 0.15s"
                        }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", background: isSelected || (submitted && isCorrect) ? "#2ABCBA" : "rgba(0,0,0,0.08)", border: "2px solid " + (isSelected || (submitted && isCorrect) ? "#2ABCBA" : "rgba(0,0,0,0.15)"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: "#fff" }}>
                            {submitted && isCorrect ? "✓" : submitted && isSelected && !isCorrect ? "✗" : isSelected ? "✓" : ""}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── RESULT PHASE ── */}
          {phase === "result" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{passed ? "🏅" : "📚"}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: passed ? "#2ABCBA" : "#E26332", marginBottom: 8 }}>
                {passed ? "Lesson Passed!" : "Keep Studying"}
              </div>
              <div style={{ fontSize: 15, color: "rgba(0,0,0,0.55)", marginBottom: 24 }}>
                You scored <strong style={{ color: "#1a1a2e" }}>{score} out of 5</strong> questions correctly.
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32 }}>
                {lesson.quiz.map((q, i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: answers[i] === q.answer ? "rgba(42,188,186,0.15)" : "rgba(226,99,50,0.1)", border: `2px solid ${answers[i] === q.answer ? "#2ABCBA" : "#E26332"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    {answers[i] === q.answer ? "✓" : "✗"}
                  </div>
                ))}
              </div>
              {passed ? (
                <div style={{ background: "rgba(42,188,186,0.07)", border: "1px solid rgba(42,188,186,0.25)", borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13, color: "rgba(0,0,0,0.6)" }}>
                  🎉 You've earned Hero Points for completing this lesson!
                </div>
              ) : (
                <div style={{ background: "rgba(226,99,50,0.06)", border: "1px solid rgba(226,99,50,0.2)", borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13, color: "rgba(0,0,0,0.6)" }}>
                  You need 4 correct answers to pass. Review the slides and try again!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#fafafa" }}>
          {phase === "slides" && (
            <>
              <button
                onClick={() => setSlideIndex(i => i - 1)}
                disabled={slideIndex === 0}
                style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", color: slideIndex === 0 ? "rgba(0,0,0,0.25)" : "#1a1a2e", fontSize: 13, fontWeight: 600, cursor: slideIndex === 0 ? "default" : "pointer" }}
              >← Previous</button>
              <div style={{ display: "flex", gap: 6 }}>
                {lesson.slides.map((_, i) => (
                  <div key={i} style={{ width: i === slideIndex ? 20 : 8, height: 8, borderRadius: 4, background: i === slideIndex ? "#2ABCBA" : i < slideIndex ? "rgba(42,188,186,0.4)" : "rgba(0,0,0,0.12)", transition: "all 0.2s" }} />
                ))}
              </div>
              {slideIndex < totalSlides - 1 ? (
                <button onClick={() => setSlideIndex(i => i + 1)} style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Next →
                </button>
              ) : (
                <button onClick={() => setPhase("quiz")} style={{ padding: "10px 22px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Take Quiz →
                </button>
              )}
            </>
          )}

          {phase === "quiz" && (
            <>
              <button onClick={() => setPhase("slides")} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", color: "#1a1a2e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Review Slides</button>
              <button
                onClick={handleSubmitQuiz}
                disabled={!allAnswered || submitted}
                style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: allAnswered && !submitted ? "linear-gradient(135deg, #2ABCBA, #1a9a98)" : "rgba(0,0,0,0.1)", color: allAnswered && !submitted ? "#fff" : "rgba(0,0,0,0.35)", fontSize: 13, fontWeight: 700, cursor: allAnswered && !submitted ? "pointer" : "default" }}
              >
                {submitted ? "Submitted ✓" : `Submit (${Object.keys(answers).length}/5 answered)`}
              </button>
            </>
          )}

          {phase === "result" && (
            <>
              <button onClick={() => { setPhase("slides"); setSlideIndex(0); setAnswers({}); setSubmitted(false); }} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", color: "#1a1a2e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {passed ? "↩ Review Lesson" : "↩ Retake Lesson"}
              </button>
              <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #2ABCBA, #1a9a98)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {passed ? "Done 🎉" : "Close"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}