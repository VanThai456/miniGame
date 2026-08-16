import React from "react";

export default function ResultScreen({ scores }) {
  // Determine winner(s)
  let maxScore = -1;
  let winners = [];

  Object.entries(scores).forEach(([team, score]) => {
    if (score > maxScore) {
      maxScore = score;
      winners = [team];
    } else if (score === maxScore) {
      winners.push(team);
    }
  });

  return (
    <div className="card text-center" style={{ padding: "4rem 2rem" }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🏆</div>
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          color: "var(--correct-border)",
        }}
      ></h1>
      <p
        style={{
          fontSize: "1.5rem",
          color: "var(--text-main)",
          marginBottom: "2rem",
        }}
      >
        Tiểu đội xuất sắc nhất là:
      </p>

      <div
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color: "var(--accent-color)",
          marginBottom: "1rem",
          textShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        Tiểu đội {winners.join(" và Tiểu đội ")}
      </div>

      <div style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>
        Với {maxScore} điểm
      </div>
    </div>
  );
}
