import React from "react";

export default function ScoreBoard({ scores, onAddPoint, isAwardable }) {
  const users = ["31", "32", "33", "56", "35", "36", "57"];

  return (
    <div
      className="card"
      style={{
        padding: "2rem 1.5rem",
        height: "100%",
        borderTop: "6px solid #fbbf24",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          color: "var(--text-heading)",
        }}
      >
        BẢNG ĐIỂM
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {users.map((user) => (
          <div
            key={user}
            className={`scoreboard-item ${isAwardable ? "awardable" : ""}`}
            onClick={() => isAwardable && onAddPoint(user)}
          >
            <div className="scoreboard-user">Tiểu đội {user}</div>
            <div className="scoreboard-score">{scores[user]} đ</div>
          </div>
        ))}
      </div>
    </div>
  );
}
