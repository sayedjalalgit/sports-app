import { useNavigate } from 'react-router-dom'

const tabs = [
  { id: 'home', label: 'Home', icon: '⚽', path: '/' },
  { id: 'highlights', label: 'Highlights', icon: '▶', path: '/highlights' },
  { id: 'matches', label: 'Matches', icon: '📅', path: '/matches' },
  { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
]

export default function BottomNav({ active }) {
  const navigate = useNavigate()

  return (
    <div style={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          style={{
            ...styles.tab,
            ...(active === tab.id ? styles.tabActive : {})
          }}
          onClick={() => navigate(tab.path)}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span style={styles.label}>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    background: 'var(--bg-secondary)',
    borderTop: '0.5px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0 16px',
    zIndex: 200,
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: 'transparent',
    padding: '6px 16px',
    flex: 1,
    cursor: 'pointer',
  },
  tabActive: {
    borderTop: '2px solid var(--color-primary)',
  },
  icon: {
    fontSize: '20px',
  },
  label: {
    fontSize: '10px',
    color: 'var(--color-text-secondary)',
  },
}