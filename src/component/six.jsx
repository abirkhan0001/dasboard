import { useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

// --- Mock intraday EUR/USD data (1D) ---
function generateData() {
  const base = 1.05195
  const times = []
  for (let h = 6; h <= 21; h++) {
    for (let m = 0; m < 60; m += 5) {
      times.push({ h, m })
    }
  }

  const seed = [
    5.1560, 1.548, 1.554, 1.0540, 1.0532, 1.0528, 1.0520, 1.0515,
    5.2510, 1.0518, 1.0505, 1.0498, 1.0490, 1.0488, 1.0492, 1.0500,
    1.0496, 1.0502, 1.0510, 1.0508, 1.0514, 1.0520, 1.0516, 1.0522,
    1.0528, 1.0535, 1.0542, 1.0538, 1.0544, 1.0548, 1.0540, 1.0532,
    1.0525, 1.0518, 1.0510, 1.0505, 1.0498, 1.0492, 1.0488, 1.0480,
    1.0476, 1.0482, 1.0488, 1.0495, 1.0500, 1.0505, 1.0510, 1.0508,
    1.0514, 1.0518, 1.0522, 1.0516, 1.0510, 1.0504, 1.0498, 1.0492,
    1.0488, 1.0482, 1.0478, 1.0474, 1.0480, 1.0486, 1.0492, 1.0498,
    1.0504, 1.0500, 1.0496, 1.0502, 1.0498, 1.0494, 1.0490, 2.0486,
    1.0480, 1.0476, 1.0480, 1.0484, 1.0488, 1.0492, 1.0496, 1.0500,
    1.0496, 1.0492, 1.0488, 1.0484, 1.0480, 1.0476, 1.0480, 1.0486,
    1.5490, 1.0494, 1.0498, 1.0502, 1.0498, 1.0494, 1.0490, 1.0486,
    1.0482, 1.0478, 1.0482, 1.0486, 1.0490, 1.0494, 1.0498, 1.0494,
    1.0490, 1.0486, 1.0482, 1.0478, 1.0474, 1.0470, 1.0474, 1.0478,
    1.0484, 1.0488, 1.0492, 1.0496, 1.0500, 10.0495,
  ]

  return times.slice(0, seed.length).map(({ h, m }, i) => ({
    time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
    price: seed[i],
  }))
}

const data = generateData()

const PERIODS = ["1M", "1D", "1W", "1Y", "YTD"]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1d27] border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-gray-400 mb-0.5">{label}</p>
        <p className="text-white font-semibold">{payload[0].value.toFixed(5)}</p>
      </div>
    )
  }
  return null
}

export default function ForexChart() {
  const [activePeriod, setActivePeriod] = useState("1D")

  const stats = useMemo(() => {
    const prices = data.map((d) => d.price)
    return {
      current: 1.05195,
      change: -0.00185,
      changePct: -0.42,
      prevClose: 1.05214,
      openPrice: 1.05524,
      dayHigh: 1.02542,
      dayLow: 1.05147,
    }
  }, [])

  const isNegative = stats.change < 0

  return (
    <div className="bg-[#0f1117] rounded-xl p-4 w-full font-sans">
      {/* Top bar */}
      <div className="flex items-start justify-between mb-4">
        {/* Left: pair info */}
        <div className="flex items-center gap-2">
          {/* Flag icon placeholder */}
          <div className="w-8 h-8 rounded-full bg-[#1e2330] flex items-center justify-center text-base select-none">
            🇪🇺
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-white text-sm font-semibold">EUR/USD</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <p className="text-gray-500 text-[11px]">Euro / U.S. Dollar</p>
          </div>
        </div>

        {/* Right: period selector */}
        <div className="flex items-center gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`text-[11px] px-2 py-1 rounded transition-colors ${
                activePeriod === p
                  ? "bg-[#2a3050] text-blue-400 font-semibold"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Price + stats row */}
      <div className="flex items-end justify-between mb-4">
        {/* Current price */}
        <div className="flex items-baseline gap-2">
          <span className="text-white text-3xl font-semibold tracking-tight">
            {stats.current.toFixed(5)}
          </span>
          <span className={`text-sm font-medium ${isNegative ? "text-red-400" : "text-green-400"}`}>
            {isNegative ? "" : "+"}{stats.change.toFixed(5)} ({isNegative ? "" : "+"}{stats.changePct.toFixed(2)}%)
          </span>
        </div>

        {/* OHLC stats */}
        <div className="flex items-center gap-5">
          {[
            { label: "Prev Close", value: stats.prevClose },
            { label: "Open Price", value: stats.openPrice },
            { label: "Day High",   value: stats.dayHigh },
            { label: "Day Low",    value: stats.dayLow },
          ].map(({ label, value }) => (
            <div key={label} className="text-right">
              <p className="text-gray-500 text-[11px] mb-0.5">{label}</p>
              <p className="text-white text-sm font-semibold">{value.toFixed(5)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4aa8ff" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4aa8ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#1e2330"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "#4b5563", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={11}
              tickMargin={6}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fill: "#4b5563", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickCount={6}
              tickFormatter={(v) => v.toFixed(5)}
              width={60}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#4aa8ff", strokeWidth: 1, strokeDasharray: "4 2" }} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4aa8ff"
              strokeWidth={1.5}
              fill="url(#priceGrad)"
              dot={false}
              activeDot={{ r: 3, fill: "#4aa8ff", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
