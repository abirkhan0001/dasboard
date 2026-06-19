import React from "react";

const marketData = [
  {
    label: "Dow Fut",
    value: "39 585,98",
    change: "+0.01%",
    positive: true,
    points: [100, 18, 22, 15, 17, 12, 10, 8],
  },
  {
    label: "Spx Fut",
    value: "5 253,17",
    change: "+0.28%",
    positive: true,
    points: [22, 20, 18, 20, 15, 12, 10, 7],
  },
  {
    label: "Nasdaq Fut",
    value: "12 345,67",
    change: "+0.45%",
    positive: true,
    points: [24, 20, 22, 16, 18, 13, 9, 6],
  },
  {
    label: "Russell 2000",
    value: "1 800,92",
    change: "+0.18%",
    positive: true,
    points: [18, 22, 17, 20, 14, 16, 11, 9],
  },
  {
    label: "FTSE 100",
    value: "7 120,50",
    change: "+0.22%",
    positive: true,
    points: [20, 18, 22, 19, 16, 18, 13, 11],
  },
  {
    label: "DAX 30",
    value: "15 450,80",
    change: "+0.33%",
    positive: true,
    points: [22, 25, 20, 22, 17, 14, 11, 8],
  },
];

const Sparkline = ({ points, positive }) => {
  const width = 100;
  const height = 30;
  const maxY = Math.max(...points);
  const minY = Math.min(...points);
  const range = maxY - minY || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - minY) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const color = positive ? "#3fb950" : "#f85149";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: 30, display: "block", marginTop: 8 }}
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MarketCard = ({ label, value, change, positive, points }) => {
  const color = positive ? "#3fb950" : "#f85149";
  const arrow = positive ? "▲" : "▼";

  return (
    <div
      style={{
        background: "#161b22",
        borderRadius: 8,
        padding: "12px 14px 8px",
        // border: "0.5px solid #2a2f3a",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "#8b949e",
          fontWeight: 500,
          letterSpacing: "0.3px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#e6edf3",
          letterSpacing: "0.5px",
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 11, color, display: "flex", alignItems: "center", gap: 3 }}>
        {arrow} {change}
      </span>
      <Sparkline points={points} positive={positive} />
    </div>
  );
};

const MarketTickerGrid = () => {
  return (
    <div
      style={{
        background: "#0f1117",
        borderRadius: 12,
        padding: 12,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}
    >
      {marketData.map((item) => (
        <MarketCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export default MarketTickerGrid;