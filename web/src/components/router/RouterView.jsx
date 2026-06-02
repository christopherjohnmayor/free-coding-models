/**
 * @file web/src/components/router/RouterView.jsx
 * @description Router Dashboard modal — daemon status, start/stop, model health,
 * request log, set management, probe mode, quick-setup card.
 * 📖 M4: Full TUI parity for the router dashboard overlay.
 */
import { useEffect, useState, useCallback } from 'react'
import {
  IconRoute, IconPlayerPlay, IconPlayerStop, IconRefresh,
  IconCopy, IconCheck, IconChevronDown, IconChevronUp,
  IconActivity, IconServer,
} from '@tabler/icons-react'
import styles from './RouterView.module.css'

function formatUptime(seconds) {
  if (!seconds || seconds <= 0) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

function formatNumber(n) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function CircuitBadge({ state }) {
  const cls = state === 'CLOSED' ? styles.circuitClosed
    : state === 'OPEN' ? styles.circuitOpen
    : state === 'HALF_OPEN' ? styles.circuitHalfOpen
    : state === 'AUTH_ERROR' ? styles.circuitAuth
    : styles.circuitUnknown
  return <span className={`${styles.circuitBadge} ${cls}`}>{state?.replace('_', ' ') || '?'}</span>
}

export default function RouterView({ onClose, onToast }) {
  const [status, setStatus] = useState(null)
  const [stats, setStats] = useState(null)
  const [quickSetup, setQuickSetup] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [logExpanded, setLogExpanded] = useState(false)
  const [copied, setCopied] = useState(null)

  const fetchStatus = useCallback(async () => {
    try {
      const resp = await fetch('/api/router/status')
      const data = await resp.json()
      setStatus(data)
      if (data?.ok) {
        const statsResp = await fetch('/api/router/stats')
        const statsData = await statsResp.json()
        if (statsData.ok) setStats(statsData)
      }
    } catch {}
  }, [])

  useEffect(() => {
    void fetchStatus()
    void fetch('/api/router/quick-setup').then(r => r.json()).then(setQuickSetup).catch(() => {})
    const interval = setInterval(fetchStatus, 5000)
    return () => clearInterval(interval)
  }, [fetchStatus])

  const handleStart = async () => {
    setActionLoading(true)
    try {
      const resp = await fetch('/api/router/start', { method: 'POST' })
      const data = await resp.json()
      if (data.ok || data.alreadyRunning) {
        onToast?.('Router daemon started.', 'success')
        await fetchStatus()
      } else {
        onToast?.(`Failed to start: ${data.error || 'unknown'}`, 'error')
      }
    } catch (err) {
      onToast?.(`Start failed: ${err.message}`, 'error')
    } finally { setActionLoading(false) }
  }

  const handleStop = async () => {
    setActionLoading(true)
    try {
      const resp = await fetch('/api/router/stop', { method: 'POST' })
      const data = await resp.json()
      if (data.ok) {
        onToast?.('Router daemon stopped.', 'success')
        setStatus({ ok: false, running: false })
        setStats(null)
      } else {
        onToast?.(`Failed to stop: ${data.error || 'unknown'}`, 'error')
      }
    } catch (err) {
      onToast?.(`Stop failed: ${err.message}`, 'error')
    } finally { setActionLoading(false) }
  }

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  const handleSetProbeMode = async (mode) => {
    try {
      await fetch('/api/router/probe-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ probeMode: mode }),
      })
      onToast?.(`Probe mode set to ${mode}.`, 'info')
      await fetchStatus()
    } catch {}
  }

  const running = status?.ok
  const models = stats?.models || []
  const requestLog = stats?.requestLog || []
  const circuitBreakers = stats?.circuitBreakers || {}

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <IconRoute size={20} stroke={1.5} />
            Router Dashboard
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.body}>
          {/* Hero Card */}
          <div className={`${styles.heroCard} ${running ? styles.heroRunning : styles.heroStopped}`}>
            <div className={styles.heroLeft}>
              <div className={styles.heroStatus}>
                <span className={`${styles.statusDot} ${running ? styles.dotGreen : styles.dotGray}`} />
                <span className={styles.heroLabel}>{running ? 'Running' : 'Stopped'}</span>
              </div>
              {running && (
                <div className={styles.heroMeta}>
                  <span>Port {status.port}</span>
                  <span>·</span>
                  <span>Uptime {formatUptime(status.uptimeSeconds)}</span>
                  <span>·</span>
                  <span>{status.requestsRouted} requests</span>
                </div>
              )}
              {!running && (
                <div className={styles.heroMeta}>
                  Smart failover router — start to route requests to the healthiest model.
                </div>
              )}
            </div>
            <div className={styles.heroActions}>
              {!running ? (
                <button className={styles.startBtn} onClick={handleStart} disabled={actionLoading}>
                  <IconPlayerPlay size={14} />
                  {actionLoading ? 'Starting…' : 'Start Router'}
                </button>
              ) : (
                <button className={styles.stopBtn} onClick={handleStop} disabled={actionLoading}>
                  <IconPlayerStop size={14} />
                  {actionLoading ? 'Stopping…' : 'Stop'}
                </button>
              )}
              <button className={styles.refreshBtn} onClick={fetchStatus} title="Refresh">
                <IconRefresh size={14} />
              </button>
            </div>
          </div>

          {/* Quick Setup */}
          {running && quickSetup && (
            <div className={styles.quickSetup}>
              <h3 className={styles.sectionTitle}>
                <IconCopy size={14} />
                Quick Setup
              </h3>
              <div className={styles.quickRows}>
                {quickSetup.baseUrl && (
                  <div className={styles.quickRow}>
                    <span className={styles.quickLabel}>Base URL</span>
                    <code className={styles.quickValue}>{quickSetup.baseUrl}</code>
                    <button className={styles.copyBtn} onClick={() => handleCopy(quickSetup.baseUrl, 'url')}>
                      {copied === 'url' ? <IconCheck size={12} /> : <IconCopy size={12} />}
                    </button>
                  </div>
                )}
                <div className={styles.quickRow}>
                  <span className={styles.quickLabel}>Model</span>
                  <code className={styles.quickValue}>{quickSetup.model}</code>
                  <button className={styles.copyBtn} onClick={() => handleCopy(quickSetup.model, 'model')}>
                    {copied === 'model' ? <IconCheck size={12} /> : <IconCopy size={12} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Probe Mode */}
          {running && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <IconActivity size={14} />
                Probe Mode
              </h3>
              <div className={styles.probeModes}>
                {['eco', 'balanced', 'aggressive'].map((mode) => (
                  <button
                    key={mode}
                    className={`${styles.probeBtn} ${status?.probeMode === mode ? styles.probeActive : ''}`}
                    onClick={() => handleSetProbeMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Model Health */}
          {running && models.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <IconServer size={14} />
                Model Health ({models.length})
              </h3>
              <div className={styles.modelList}>
                {models.map((m) => {
                  const cb = circuitBreakers[m.key] || {}
                  return (
                    <div key={m.key} className={styles.modelRow}>
                      <span className={styles.modelPriority}>#{m.priority}</span>
                      <span className={styles.modelName} title={m.key}>{m.key}</span>
                      <CircuitBadge state={cb.state || m.state} />
                      <span className={styles.modelScore}>{m.score?.toFixed(2) || '—'}</span>
                      <span className={styles.modelLatency}>
                        {m.last_latency_ms != null ? `${m.last_latency_ms}ms` : '—'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Request Log */}
          {running && requestLog.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle} onClick={() => setLogExpanded(!logExpanded)} style={{ cursor: 'pointer' }}>
                <IconActivity size={14} />
                Request Log ({requestLog.length})
                {logExpanded ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />}
              </h3>
              {logExpanded && (
                <div className={styles.logList}>
                  {requestLog.map((entry, i) => (
                    <div key={i} className={styles.logRow}>
                      <span className={entry.error ? styles.logErr : styles.logOk}>
                        {entry.status || '—'}
                      </span>
                      <span className={styles.logModel}>{entry.model}</span>
                      <span className={styles.logLatency}>
                        {entry.latency_ms != null ? `${entry.latency_ms}ms` : '—'}
                      </span>
                      <span className={styles.logTokens}>
                        {entry.tokens > 0 ? formatNumber(entry.tokens) + ' tok' : ''}
                      </span>
                      {entry.failover && <span className={styles.logFailover}>failover</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
