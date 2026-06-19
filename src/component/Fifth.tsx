const liquidations = [
  { price: "$68,200", label: "SHORTS 5 - 10X",  type: "short" as const, pct: 88, amount: "$421M" },
  { price: "$68,800", label: "SHORTS 10 - 20X", type: "short" as const, pct: 72, amount: "$421M" },
  { price: "$65,400", label: "SHORTS 25 - 50X", type: "short" as const, pct: 55, amount: "$421M" },
  { price: "$63,100", label: "LONGS 10 - 25X",  type: "long"  as const, pct: 42, amount: "$421M" },
  { price: "$61,500", label: "LONGS 10 - 25X",  type: "long"  as const, pct: 60, amount: "$421M" },
  { price: "$60,200", label: "SHORTS 5 - 10X",  type: "short" as const, pct: 30, amount: "$421M" },
  { price: "$59,800", label: "LONGS < 5X",       type: "long"  as const, pct: 22, amount: "$421M" },
];

export default function CryptoLiquidationZone() {
  return (
    <div className="bg-[#1a1d27] rounded-xl p-4 w-full font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm font-semibold">Crypto Liquidation Zone</h2>
        <span className="flex items-center gap-1 text-[11px] text-gray-400 bg-[#252836] border border-white/10 px-2 py-1 rounded-md">
          {/* magnet icon — swap with your icon library if needed */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 15A6 6 0 1 0 18 15"/>
            <line x1="6" y1="15" x2="6" y2="20"/>
            <line x1="18" y1="15" x2="18" y2="20"/>
            <line x1="9" y1="20" x2="6" y2="20"/>
            <line x1="15" y1="20" x2="18" y2="20"/>
          </svg>
          Magnet Zone
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1.5">
        {liquidations.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Price */}
            <span className="text-[11px] font-medium text-gray-300 w-14 text-right shrink-0">
              {row.price}
            </span>

            {/* Bar */}
            <div className="flex-1 h-[22px] relative">
              <div
                className={`h-full rounded flex items-center px-2 text-[10px] font-semibold whitespace-nowrap transition-all ${
                  row.type === "short"
                    ? "bg-green-500 text-green-900"
                    : "bg-red-500 text-red-950"
                }`}
                style={{ width: `${row.pct}%` }}
              >
                {row.label}
              </div>
            </div>

            {/* Amount */}
            <span className="text-[11px] font-medium text-gray-400 w-10 text-right shrink-0">
              {row.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex gap-6 mt-4 pt-3 border-t border-white/10">
        <div>
          <p className="text-[11px] text-gray-500 mb-0.5">Total Shorts At Risk</p>
          <p className="text-sm font-semibold text-green-400">$5412M (Above Spot)</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-500 mb-0.5">Total Longs At Risk</p>
          <p className="text-sm font-semibold text-red-400">$4520M (Below Spot)</p>
        </div>
      </div>
    </div>
  );
}
