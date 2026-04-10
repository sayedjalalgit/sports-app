import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFixtures, setLiveMatches, setLoading } from './home.slice'
import api from '../../services/api'
import socket from '../../services/socket'
import MatchCard from '../../components/MatchCard'
import BottomNav from '../../components/BottomNav'
import LoadingSkeleton from '../../components/LoadingSkeleton'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const { fixtures, liveMatches, loading } = useSelector((state) => state.matches)
  const { user } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('live')

  useEffect(() => {
    fetchData()
    socket.connect()
    socket.on('scores:updated', (matches) => {
      dispatch(setLiveMatches(matches))
    })
    return () => {
      socket.off('scores:updated')
      socket.disconnect()
    }
  }, [])

  const fetchData = async () => {
    dispatch(setLoading(true))
    try {
      const [liveRes, fixturesRes] = await Promise.all([
        api.get('/matches/live'),
        api.get('/matches/fixtures'),
      ])
      dispatch(setLiveMatches(liveRes.data.data))
      dispatch(setFixtures(fixturesRes.data.data))
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const matches = activeTab === 'live' ? liveMatches : fixtures

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>Cosmo<span style={styles.green}>Sports</span></div>
        <div style={styles.userBadge}>
          {user?.phone?.slice(-4)}
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'live' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('live')}
        >
          <span style={styles.liveDot} /> Live
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'fixtures' ? styles.tabActive : {}) }}
          onClick={() => setActiveTab('fixtures')}
        >
          Fixtures
        </button>
      </div>

      <div style={styles.content}>
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : matches.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>
              {activeTab === 'live' ? 'No live matches right now' : 'No upcoming fixtures'}
            </p>
            <p style={styles.emptySubtext}>Check back during match time</p>
          </div>
        ) : (
          matches.map((match, index) => (
            <MatchCard key={match.idEvent || index} match={match} />
          ))
        )}
      </div>

      <BottomNav active="home" />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    paddingBottom: '80px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '0.5px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    background: 'var(--bg-primary)',
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  green: {
    color: 'var(--color-primary)',
  },
  userBadge: {
    background: 'var(--bg-card)',
    border: '0.5px solid var(--color-border)',
    borderRadius: '20px',
    padding: '6px 12px',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    padding: '16px 20px 8px',
  },
  tab: {
    background: 'var(--bg-card)',
    border: '0.5px solid var(--color-border)',
    borderRadius: '20px',
    padding: '8px 20px',
    color: 'var(--color-text-secondary)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  tabActive: {
    background: 'var(--color-primary)',
    color: '#000',
    border: '0.5px solid var(--color-primary)',
    fontWeight: '600',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--color-live)',
    display: 'inline-block',
  },
  content: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyText: {
    fontSize: '16px',
    color: 'var(--color-text-secondary)',
    marginBottom: '8px',
  },
  emptySubtext: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
  },
}