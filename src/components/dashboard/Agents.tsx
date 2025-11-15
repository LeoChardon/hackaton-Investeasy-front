import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Activity, Clock, Mail, RefreshCw, Linkedin, Twitter } from 'lucide-react'

export default function Agents() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Monitoring agent</h2>
              <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-green-900/30 text-green-300">
                <Activity size={14} /> Enabled (mock)
              </span>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Keywords</div>
                <div className="flex flex-wrap gap-2">
                  {['bankable', 'market traction', 'Investeasy', 'startup idea'].map((k) => (
                    <span key={k} className="text-sm px-2.5 py-1 rounded-full border border-[var(--border)] text-zinc-200">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Channels</div>
                <div className="flex items-center gap-4 text-zinc-200">
                  <span className="inline-flex items-center gap-2"><Linkedin size={16} /> LinkedIn</span>
                  <span className="inline-flex items-center gap-2"><Twitter size={16} /> X</span>
                </div>
                <div className="mt-3 text-xs text-zinc-400">Frequency: every 6h - Rate limit: 10 emails/day (mock)</div>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Playbook</div>
                <div className="text-white">Cold outreach v1</div>
                <div className="text-sm text-zinc-300">Personalized intro + value prop</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Last run</div>
                <div className="flex items-center gap-2 text-white"><RefreshCw size={14} /> 2h ago</div>
                <div className="text-sm text-zinc-300">3 prospects discovered</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Next run</div>
                <div className="flex items-center gap-2 text-white"><Clock size={14} /> in ~4h</div>
                <div className="text-sm text-zinc-300">Auto, or trigger manually</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Activity (mock)</h3>
            <ul className="space-y-3 text-sm">
              {[
                { t: '08:12', m: 'Queued 2 LinkedIn posts matching "bankable"' },
                { t: '08:15', m: 'Parsed 2 landing pages; extracted emails' },
                { t: '08:17', m: 'Generated 2 outreach emails (Cold outreach v1)' },
                { t: '08:20', m: 'Sent 1 email - 1 pending approval' },
              ].map((log, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 text-zinc-400 tabular-nums">{log.t}</span>
                  <span className="text-zinc-200">{log.m}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-zinc-200">
                <RefreshCw size={14} /> Run now (mock)
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm">
                <Mail size={14} /> Send test email
              </button>
            </div>
          </div>
        </section>


    )
}
