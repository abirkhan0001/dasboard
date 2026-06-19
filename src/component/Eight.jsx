import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts"

// ── Sparkline data (trend line at top) ────────────────────────────────
const trendData = [
  { i: 0, v: 3.8 }, { i: 1, v: 3.6 }, { i: 2, v: 3.7 },
  { i: 3, v: 3.9 }, { i: 4, v: 4.0 }, { i: 5, v: 4.1 },
  { i: 6, v: 4.2 }, { i: 7, v: 4.3 }, { i: 8, v: 4.4 },
  { i: 9, v: 4.5 },
]

// ── Model vs Actual (last 8) ──────────────────────────────────────────
const modelData = [
  { i: 0, forecast: 3.6, actual: 3.5 },
  { i: 1, forecast: 3.7, actual: 3.6 },
  { i: 2, forecast: 3.8, actual: 3.8 },
  { i: 3, forecast: 3.9, actual: 3.7 },
  { i: 4, forecast: 4.0, actual: 3.9 },
  { i: 5, forecast: 4.1, actual: 4.0 },
  { i: 6, forecast: 4.2, actual: 4.1 },
  { i: 7, forecast: 4.3, actual: 4.2 },
]

const drivers = [
  { label: "Consumer Spending",  value: "+1.6", positive: true  },
  { label: "Business Investment",value: "+0.5", positive: true  },
  { label: "Net Exports",        value: "-0.3", positive: false },
  { label: "Government",         value: "+5.6", positive: true  },
]

const ModelTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1a1d27] border border-white/10 rounded px-2.5 py-1.5 text-[11px]">
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function RealGDPCard() {
  return (
    <div className="bg-[#0f1117] rounded-2xl p-5 w-full max-w-sm font-sans flex flex-col gap-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-[13px]">Us • Second Quarter</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
            Live
          </span>
          <span className="text-[12px] text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
            +2.2 Vs Cons.
          </span>
        </div>
      </div>

      {/* ── Title + main value ── */}
      <div>
        <p className="text-gray-300 text-sm mb-1">Real GDP</p>
        <div className="flex items-baseline gap-2">
          <span className="text-white text-5xl font-bold tracking-tight">4.5</span>
          <span className="text-gray-400 text-sm">%QoQ SASR</span>
        </div>
      </div>

      {/* ── Nowcast / Consensus / Prior ── */}
      <div className="flex gap-6">
        {[
          { label: "Nowcast",   val: "4.3" },
          { label: "Consensus", val: "2.1" },
          { label: "Prior",     val: "3.1" },
        ].map(({ label, val }) => (
          <div key={label}>
            <p className="text-gray-500 text-[11px] mb-0.5">{label}</p>
            <p className="text-white text-lg font-semibold">{val}</p>
          </div>
        ))}
      </div>

      {/* ── Trend sparkline ── */}
      <div className="h-16 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#4aa8ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Model vs Actual ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-[12px]">Model Vs Actual • Last 8</span>
          <span className="text-blue-400 text-[12px] font-semibold">8/8 In Range</span>
        </div>

        <div className="h-24 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={modelData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <Tooltip content={<ModelTooltip />} cursor={false} />
              {/* Forecast — solid blue with dots */}
              <Line
                type="monotone"
                dataKey="forecast"
                name="Forecast"
                stroke="#4aa8ff"
                strokeWidth={2}
                dot={{ r: 4, fill: "#4aa8ff", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              {/* Actual — dashed gray with dots */}
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#6b7280"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 4, fill: "#6b7280", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-[2px] bg-[#4aa8ff] rounded" />
            <span className="text-gray-400 text-[11px]">Forecast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-[2px] bg-[#6b7280] rounded" style={{ backgroundImage: "repeating-linear-gradient(to right, #6b7280 0, #6b7280 4px, transparent 4px, transparent 8px)" }} />
            <span className="text-gray-400 text-[11px]">Actual</span>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Component Drivers ── */}
      <div>
        <p className="text-white text-sm font-semibold mb-3">Component Drivers</p>
        <div className="flex flex-col gap-2.5">
          {drivers.map(({ label, value, positive }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-gray-400 text-[13px]">{label}</span>
              <span className={`text-[13px] font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Model Confidence ── */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-[13px]">Model Confidence</span>
        <div className="flex items-center gap-2">
          {/* Progress bar */}
          <div className="w-24 h-2 bg-[#1e2330] rounded-full overflow-hidden">
            <div className="h-full bg-[#4aa8ff] rounded-full" style={{ width: "74%" }} />
          </div>
          <span className="text-gray-300 text-[13px]">74%</span>
        </div>
      </div>

    </div>
  )
}
