const STATS = [
  { label: 'Total Disbursed',  value: '$2,400,000', sub: 'all time', color: 'text-purple-400' },
  { label: 'Payments (30d)',   value: '1,847',       sub: 'last 30 days', color: 'text-green-400' },
  { label: 'Success Rate',     value: '99.3%',       sub: '30-day avg', color: 'text-green-400' },
  { label: 'Avg Latency',      value: '8.2s',        sub: 'confirmation time', color: 'text-blue-400' },
]

const RECENT = [
  { id: 'PAY-001', receiver: 'GABC...XYZ', amount: '$120.00', status: 'Completed', time: '2 min ago' },
  { id: 'PAY-002', receiver: 'GDEF...UVW', amount: '$85.50',  status: 'Completed', time: '5 min ago' },
  { id: 'PAY-003', receiver: 'GHIJ...RST', amount: '$200.00', status: 'Pending',   time: '8 min ago' },
  { id: 'PAY-004', receiver: 'GKLM...OPQ', amount: '$50.00', status: 'Completed', time: '12 min ago' },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-white via-violet-100 to-slate-400 bg-clip-text text-transparent">
          Overview
        </h1>
        <p className="text-slate-400 text-sm">Disbursement analytics and recent activity</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/40 p-4 ring-1 ring-white/5">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-base font-semibold mb-3">Recent Payments</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/25 ring-1 ring-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-white/10 bg-slate-900/40">
                {['ID', 'Receiver', 'Amount', 'Status', 'Time'].map(h => (
                  <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map(r => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-violet-500/5 transition-colors">
                  <td className="py-3 pr-4 font-mono text-purple-400 text-xs">{r.id}</td>
                  <td className="py-3 pr-4 font-mono text-xs">{r.receiver}</td>
                  <td className="py-3 pr-4 text-green-400">{r.amount}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      r.status === 'Completed' ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'
                    }`}>{r.status}</span>
                  </td>
                  <td className="py-3 text-xs text-gray-500">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
