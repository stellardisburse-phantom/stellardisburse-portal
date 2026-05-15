import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

const NAV = [
  { to: '/', label: 'Overview' },
  { to: '/disburse', label: 'Disburse' },
  { to: '/payments', label: 'Payments' },
  { to: '/plugins', label: 'Plugins' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex relative">
      <div
        className="pointer-events-none fixed inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(168,85,247,0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(34,211,238,0.08) 0%, transparent 35%)',
        }}
      />
      <aside className="relative z-10 w-56 border-r border-white/10 bg-slate-950/70 backdrop-blur-xl flex flex-col py-6 px-3 shrink-0 shadow-xl shadow-black/20">
        <div className="px-3 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white text-xs font-bold shadow-glow ring-1 ring-white/20">
              SD
            </span>
            <span className="font-bold text-base text-white tracking-tight">StellarDisburse</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug pl-11 -mt-1">SDP extension portal</p>
        </div>
        <nav className="flex flex-col gap-0.5 px-1">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                pathname === n.to
                  ? 'bg-white/10 text-white font-medium ring-1 ring-violet-400/35 shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-3 pt-6 border-t border-white/5">
          <div className="text-[11px] text-slate-600 font-mono">v0.1.0 · testnet</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur-md px-6 py-3.5 flex items-center justify-between gap-4">
          <span className="text-sm text-slate-400">Operator console</span>
          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-900/40 ring-1 ring-white/15 hover:from-violet-500 hover:to-fuchsia-500 transition-all"
          >
            Connect Wallet
          </button>
        </header>
        <main className="flex-1 px-5 sm:px-8 py-8">
          <div className="portal-main max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
