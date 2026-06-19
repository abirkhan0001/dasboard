const trendData = [
  { points: [20, 16, 22, 14, 18, 12, 16, 10], positive: true },
  { points: [10, 14, 12, 18, 16, 20, 18, 22], positive: false },
  { points: [22, 18, 24, 16, 20, 14, 18, 12], positive: true },
  { points: [12, 16, 14, 20, 18, 22, 20, 24], positive: false },
  { points: [18, 14, 20, 12, 16, 10, 14, 8],  positive: true },
  { points: [8,  12, 10, 16, 14, 18, 16, 20], positive: false },
  { points: [20, 16, 22, 14, 18, 12, 16, 10], positive: true },
]

function Sparkline({ points, positive }) {
  const width = 120
  const height = 32
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width
      const y = height - ((p - min) / range) * (height - 6) - 3
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full h-8"
    >
      <polyline
        points={coords}
        fill="none"
        stroke={positive ? "#4aa8ff" : "#6b7280"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TenWeekTrend() {
  return (
    <div className="bg-[#0f1117] rounded-xl px-5 py-4 w-full">
      <p className="text-[#e6edf3] text-[15px] font-medium mb-3">10W Trend</p>

      <div className="border-t border-[#2a2f3a] mb-3" />

      <div className="flex flex-col gap-2.5">
        {trendData.map((item, i) => (
          <Sparkline key={i} points={item.points} positive={item.positive} />
        ))}
      </div>
    </div>
  )
}
