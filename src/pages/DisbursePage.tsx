import { useState } from 'react'

interface PaymentRow {
  id: string
  receiver: string
  amount: string
  memo: string
}

export default function DisbursePage() {
  const [rows, setRows] = useState<PaymentRow[]>([
    { id: '1', receiver: '', amount: '', memo: '' }
  ])
  const [asset, setAsset] = useState('USDC')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const addRow = () => setRows(r => [...r, { id: Date.now().toString(), receiver: '', amount: '', memo: '' }])
  const removeRow = (id: string) => setRows(r => r.filter(row => row.id !== id))
  const updateRow = (id: string, field: keyof PaymentRow, value: string) =>
    setRows(r => r.map(row => row.id === id ? { ...row, [field]: value } : row))

  const total = rows.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setResult(`✅ Batch of ${rows.length} payments submitted successfully.`)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">New Disbursement</h1>
        <p className="text-gray-400 text-sm">Configure and send a batch of payments</p>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-400">Asset</label>
        <select value={asset} onChange={e => setAsset(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500">
          {['USDC', 'EURC', 'XLM'].map(a => <option key={a}>{a}</option>)}
        </select>
        <span className="ml-auto text-sm text-gray-400">Total: <span className="text-white font-medium">${total.toFixed(2)} {asset}</span></span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-[1fr_120px_1fr_36px] gap-2 text-xs text-gray-400 px-1">
          <span>Receiver Wallet ID</span><span>Amount</span><span>Memo</span><span />
        </div>

        {rows.map(row => (
          <div key={row.id} className="grid grid-cols-[1fr_120px_1fr_36px] gap-2">
            <input value={row.receiver} onChange={e => updateRow(row.id, 'receiver', e.target.value)}
              placeholder="G..." required
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-purple-500" />
            <input value={row.amount} onChange={e => updateRow(row.id, 'amount', e.target.value)}
              placeholder="0.00" type="number" step="0.01" min="0.01" required
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
            <input value={row.memo} onChange={e => updateRow(row.id, 'memo', e.target.value)}
              placeholder="Optional memo"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
            <button type="button" onClick={() => removeRow(row.id)}
              className="text-gray-600 hover:text-red-400 transition-colors text-lg leading-none">×</button>
          </div>
        ))}

        <button type="button" onClick={addRow}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          + Add recipient
        </button>

        <div className="pt-2">
          <button type="submit" disabled={submitting}
            className="bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors">
            {submitting ? 'Submitting…' : `Send ${rows.length} payment${rows.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-300 text-sm">{result}</div>
      )}
    </div>
  )
}
