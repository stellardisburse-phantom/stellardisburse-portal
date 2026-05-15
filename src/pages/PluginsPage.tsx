import { useState } from 'react'

interface Plugin {
  name: string
  event: string
  enabled: boolean
  description: string
}

const DEFAULT_PLUGINS: Plugin[] = [
  { name: 'kyc-check', event: 'pre-disbursement', enabled: true, description: 'Verifies receiver KYC status before payment' },
  { name: 'sanctions-screen', event: 'pre-disbursement', enabled: true, description: 'Screens receiver against OFAC sanctions list' },
  { name: 'slack-notify', event: 'post-disbursement', enabled: false, description: 'Posts payment confirmation to Slack channel' },
  { name: 'analytics-log', event: 'post-disbursement', enabled: true, description: 'Logs payment to analytics pipeline' },
  { name: 'failure-alert', event: 'on-failure', enabled: true, description: 'Sends alert email on payment failure' },
]

const EVENT_COLORS: Record<string, string> = {
  'pre-disbursement':  'bg-blue-900/40 text-blue-300',
  'post-disbursement': 'bg-green-900/40 text-green-300',
  'on-failure':        'bg-red-900/40 text-red-300',
}

export default function PluginsPage() {
  const [plugins, setPlugins] = useState(DEFAULT_PLUGINS)

  const toggle = (name: string) =>
    setPlugins(ps => ps.map(p => p.name === name ? { ...p, enabled: !p.enabled } : p))

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">Compliance Plugins</h1>
        <p className="text-gray-400 text-sm">Manage hook plugins that run at each stage of the disbursement lifecycle.</p>
      </div>

      <div className="space-y-3">
        {plugins.map(p => (
          <div key={p.name} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-sm font-medium text-white">{p.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${EVENT_COLORS[p.event]}`}>{p.event}</span>
              </div>
              <p className="text-xs text-gray-400">{p.description}</p>
            </div>
            <button
              onClick={() => toggle(p.name)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                p.enabled ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                p.enabled ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        ))}
      </div>

      <div className="border border-dashed border-gray-700 rounded-xl p-4 text-center text-sm text-gray-500">
        + Install custom plugin via <code className="font-mono text-gray-400">sdk.hooks.register()</code>
      </div>
    </div>
  )
}
