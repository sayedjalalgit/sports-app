import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../auth/auth.slice'
import BottomNav from '../../components/BottomNav'

export default function ProfileScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>Cosmo<span style={styles.green}>Sports</span></div>
        <span style={styles.headerTitle}>Profile</span>
      </div>

      <div style={styles.content}>
        <div style={styles.avatarBox}>
          <div style={styles.avatar}>
            {user?.phone?.slice(-2)}
          </div>
          <p style={styles.phone}>{user?.phone}</p>
          <div style={styles.planBadge}>Free Plan</div>
        </div>

        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.rowLabel}>Phone</span>
            <span style={styles.rowValue}>{user?.phone}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.row}>
            <span style={styles.rowLabel}>Plan</span>
            <span style={styles.rowValue}>Free</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.row}>
            <span style={styles.rowLabel}>Member since</span>
            <span style={styles.rowValue}>
              {new Date(user?.created_at).toLocaleDateString('en-BD')}
            </span>
          </div>
        </div>

        <div style={styles.upgradeCard}>
          <p style={styles.upgradeTitle}>Upgrade to Premium</p>
          <p style={styles.upgradeSubtitle}>
            Watch live matches for just Tk 20 per match
          </p>
          <button style={styles.upgradeBtn}>
            Get Premium
          </button>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <BottomNav active="profile" />
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
  headerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
  },
  content: {
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '700',
    color: '#000',
  },
  phone: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--color-text)',
  },
  planBadge: {
    background: 'var(--bg-card)',
    border: '0.5px solid var(--color-border)',
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
  },
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--border-radius)',
    border: '0.5px solid var(--color-border)',
    padding: '4px 16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
  },
  rowLabel: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
  },
  rowValue: {
    fontSize: '14px',
    color: 'var(--color-text)',
    fontWeight: '500',
  },
  divider: {
    height: '0.5px',
    background: 'var(--color-border)',
  },
  upgradeCard: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--border-radius)',
    border: '0.5px solid var(--color-primary)',
    padding: '20px',
    textAlign: 'center',
  },
  upgradeTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: '6px',
  },
  upgradeSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    marginBottom: '16px',
  },
  upgradeBtn: {
    background: 'var(--color-primary)',
    color: '#000',
    fontWeight: '600',
    fontSize: '15px',
    padding: '12px 32px',
    borderRadius: 'var(--border-radius-sm)',
    border: 'none',
    cursor: 'pointer',
  },
  logoutBtn: {
    width: '100%',
    background: 'transparent',
    border: '0.5px solid var(--color-danger)',
    color: 'var(--color-danger)',
    padding: '14px',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
  },
}