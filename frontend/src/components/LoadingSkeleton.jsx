export default function LoadingSkeleton() {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={{ ...styles.shimmer, width: '100px', height: '12px' }} />
        <div style={{ ...styles.shimmer, width: '40px', height: '12px' }} />
      </div>
      <div style={styles.teams}>
        <div style={styles.team}>
          <div style={{ ...styles.shimmer, width: '36px', height: '36px', borderRadius: '50%' }} />
          <div style={{ ...styles.shimmer, width: '80px', height: '12px' }} />
        </div>
        <div style={{ ...styles.shimmer, width: '60px', height: '28px' }} />
        <div style={{ ...styles.shimmer, ...styles.teamRight }}>
          <div style={{ ...styles.shimmer, width: '36px', height: '36px', borderRadius: '50%' }} />
          <div style={{ ...styles.shimmer, width: '80px', height: '12px' }} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--border-radius)',
    padding: '16px',
    border: '0.5px solid var(--color-border)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  teams: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  teamRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    background: 'transparent',
  },
  shimmer: {
    background: 'var(--bg-secondary)',
    borderRadius: '4px',
    animation: 'shimmer 1.5s infinite',
  },
}