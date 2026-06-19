import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
  LineChart, Line, ScatterChart, Scatter,
} from "recharts"

// ── Returns by Regime data ────────────────────────────────────────────
const regimeData = [
  { x: 0,   label: "Expansion", value: 0.4  },
  { x: 1,   value: 0.5  },
  { x: 2,   value: 0.55 },
  { x: 3,   value: 0.45 },
  { x: 4,   label: "Stagflation", value: 0.3 },
  { x: 5,   value: 0.28 },
  { x: 6,   value: 0.32 },
  { x: 7,   label: "Recession", value: 2.1  },
  { x: 8,   value: 2.05 },
  { x: 9,   value: 2.0  },
  { x: 10,  label: "Recovery", value: 2.2  },
  { x: 11,  value: 2.15 },
  { x: 12,  value: 2.1  },
  { x: 13,  label: "Reflation", value: 0.65 },
  { x: 14,  value: 0.6  },
]

const regimeRegions = [
  { label: "Expansion",  startX: 0,  endX: 3,  stats: { code: "Expa", sh: "0.48", hit: "69.8%", n: 29  } },
  { label: "Stagflation",startX: 4,  endX: 6,  stats: { code: "Stag", sh: "0.46", hit: "70.8%", n: 41  } },
  { label: "Recession",  startX: 7,  endX: 9,  stats: { code: "Rece", sh: "2.05", hit: "99.8%", n: 77  } },
  { label: "Recovery",   startX: 10, endX: 12, stats: { code: "Reco", sh: "2.17", hit: "98.8%", n: 85  } },
  { label: "Reflation",  startX: 13, endX: 14, stats: { code: "Refl", sh: "0.66", hit: "85.2%", n: 74  } },
]

// ── Volatility Skew data ──────────────────────────────────────────────
const skewData = [
  { moneyness: -25, vol: 23.5 },
  { moneyness: -15, vol: 18.2 },
  { moneyness: -10, vol: 14.8 },
  { moneyness:   0, vol: 12.0 },
  { moneyness:  10, vol: 9.5  },
  { moneyness:  15, vol: 7.8  },
  { moneyness:  25, vol: 5.2  },
]

const tenorCards = [
  { tenor: "1W",  atm: "16.4%", rr: "0.30" },
  { tenor: "1M",  atm: "17.3%", rr: "0.64" },
  { tenor: "3M",  atm: "9.9%",  rr: "0.9"  },
  { tenor: "6M",  atm: "10.6%", rr: "1.12" },
  { tenor: "1Y",  atm: "19.7%", rr: "1.69" },
]

// ── Custom Tooltip ─────────────────────────────────────────────────────
const RegimeTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1a1d27] border border-white/10 rounded px-2.5 py-1.5 text-xs">
        <p className="text-white font-semibold">{payload[0].value.toFixed(2)}%</p>
      </div>
    )
  }
  return null
}

const SkewTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1a1d27] border border-white/10 rounded px-2.5 py-1.5 text-xs">
        <p className="text-gray-400">Moneyness: {payload[0]?.payload?.moneyness}</p>
        <p className="text-white font-semibold">IV: {payload[0]?.value?.toFixed(1)}%</p>
      </div>
    )
  }
  return null
}

// ── Regime stat cards ──────────────────────────────────────────────────
function RegimeStats() {
  return (
    <div className="flex justify-between mt-3 px-1">
      {regimeRegions.map((r) => (
        <div key={r.label} className="flex flex-col gap-0.5 min-w-[64px]">
          <p className="text-[10px] text-gray-500">{r.stats.code}</p>
          <p className="text-[11px] text-white font-semibold">Sh {r.stats.sh}</p>
          <p className="text-[10px] text-gray-400">{r.stats.hit} hit</p>
          <p className="text-[10px] text-gray-500">n={r.stats.n}</p>
        </div>
      ))}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────
export default function EURUSDAnalysis() {
  return (
    <div className="bg-[#0f1117] rounded-xl p-5 w-full font-sans grid grid-cols-2 gap-10">

      {/* ── Left Panel: Returns by Regime ── */}
      <div className="flex flex-col">
        <h3 className="text-white text-sm font-semibold mb-0.5">
          EURUSD Returns by Regime
        </h3>
        <p className="text-gray-500 text-[11px] mb-3">
          Average monthly return conditional on the macro regime (10-year sample).
        </p>

        <div className="flex-1 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={regimeData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="returnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4aa8ff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4aa8ff" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e2330" vertical={false} />
              <XAxis
                dataKey="x"
                tick={false}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#4b5563", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={[-2, 6]}
                ticks={[-2, 0, 2, 4, 6]}
              />
              <ReferenceLine y={0} stroke="#2a2f3a" strokeWidth={1} />
              <Tooltip content={<RegimeTooltip />} cursor={{ stroke: "#4aa8ff", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4aa8ff"
                strokeWidth={1.5}
                fill="url(#returnGrad)"
                dot={false}
                activeDot={{ r: 3, fill: "#4aa8ff", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Regime labels below chart */}
        <div className="flex justify-between px-1 mt-1">
          {regimeRegions.map((r) => (
            <p key={r.label} className="text-[10px] text-gray-500">{r.label}</p>
          ))}
        </div>

        <RegimeStats />
      </div>

      {/* ── Right Panel: Volatility Skew ── */}
      <div className="flex flex-col">
        <h3 className="text-white text-sm font-semibold mb-0.5">
          EURUSD Volatility Skew
        </h3>
        <p className="text-gray-500 text-[11px] mb-3">
          Implied volatility across moneyness for 5 tenors. Negative 25LRR = put richer (skew bearish).
        </p>

        <div className="flex-1 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={skewData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#1e2330" vertical={false} />
              <XAxis
                dataKey="moneyness"
                tick={{ fill: "#4b5563", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                ticks={[-25, -15, 0, 10, 15, 25]}
              />
              <YAxis
                tick={{ fill: "#4b5563", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 24]}
                ticks={[0, 6, 12, 18, 24]}
              />
              <Tooltip content={<SkewTooltip />} cursor={{ stroke: "#4aa8ff", strokeWidth: 1 }} />

              {/* Dashed trend line */}
              <Line
                type="linear"
                dataKey="vol"
                stroke="#4aa8ff"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                dot={(props) => {
                  const { cx, cy, index } = props
                  if (index === 0 || index === skewData.length - 1) {
                    return (
                      <circle
                        key={`dot-${index}`}
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#4aa8ff"
                        stroke="none"
                      />
                    )
                  }
                  return <g key={`dot-${index}`} />
                }}
                activeDot={{ r: 3, fill: "#4aa8ff", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tenor cards */}
        <div className="flex justify-between mt-3">
          {tenorCards.map((t) => (
            <div key={t.tenor} className="flex flex-col gap-0.5 items-center">
              <p className="text-[10px] text-gray-500 font-medium">{t.tenor}</p>
              <p className="text-[11px] text-white font-semibold">ATM {t.atm}</p>
              <p className="text-[10px] text-green-400">RR {t.rr}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
