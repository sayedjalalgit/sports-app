import { useEffect, useState } from 'react'
import BottomNav from '../../components/BottomNav'

export default function HighlightsScreen() {
  const [highlights, setHighlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchHighlights()
  }, [])

  const fetchHighlights = async () => {
  try {
    const res = await fetch('https://www.scorebat.com/video-api/v3/feed/')
    const data = await res.json()
    if (data.response && data.response.length > 0) {
      setHighlights(data.response.slice(0, 20))
    } else {
      loadFallbackHighlights()
    }
  } catch (err) {
    loadFallbackHighlights()
  } finally {
    setLoading(false)
  }
}

const loadFallbackHighlights = () => {
  setHighlights([
    {
      title: 'Manchester City vs Arsenal - Premier League Highlights',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      competition: { name: 'Premier League' },
      embed: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" frameborder="0" allowfullscreen></iframe>'
    },
    {
      title: 'Real Madrid vs Barcelona - La Liga Highlights',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      competition: { name: 'La Liga' },
      embed: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" frameborder="0" allowfullscreen></iframe>'
    },
    {
      title: 'Bayern Munich vs Dortmund - Bundesliga Highlights',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      competition: { name: 'Bundesliga' },
      embed: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" frameborder="0" allowfullscreen></iframe>'
    },
    {
      title: 'PSG vs Marseille - Ligue 1 Highlights',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      competition: { name: 'Ligue 1' },
      embed: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" frameborder="0" allowfullscreen></iframe>'
    },
    {
      title: 'Liverpool vs Chelsea - FA Cup Highlights',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      competition: { name: 'FA Cup' },
      embed: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" frameborder="0" allowfullscreen></iframe>'
    },
  ])
}

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>Cosmo<span style={styles.green}>Sports</span></div>
        <span style={styles.headerTitle}>Highlights</span>
      </div>

      {selected && (
        <div style={styles.playerWrapper}>
          <div
            dangerouslySetInnerHTML={{ __html: selected.embed }}
            style={styles.player}
          />
          <button style={styles.closeBtn} onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
      )}

      <div style={styles.content}>
        {loading ? (
          <p style={styles.loadingText}>Loading highlights...</p>
        ) : highlights.length === 0 ? (
          <p style={styles.loadingText}>No highlights available</p>
        ) : (
          highlights.map((item, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => setSelected(item)}
            >
              <div style={styles.thumb}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={styles.thumbImg}
                />
                <div style={styles.playBtn}>▶</div>
              </div>
              <div style={styles.info}>
                <p style={styles.matchTitle}>{item.title}</p>
                <p style={styles.competition}>{item.competition?.name}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav active="highlights" />
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
  playerWrapper: {
    position: 'sticky',
    top: '57px',
    zIndex: 99,
    background: '#000',
  },
  player: {
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
  },
  closeBtn: {
    width: '100%',
    background: 'var(--bg-card)',
    color: 'var(--color-text-secondary)',
    padding: '8px',
    fontSize: '13px',
    border: 'none',
    cursor: 'pointer',
  },
  content: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  loadingText: {
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    padding: '40px',
  },
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--border-radius)',
    border: '0.5px solid var(--color-border)',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    gap: '12px',
    padding: '10px',
  },
  thumb: {
    position: 'relative',
    width: '120px',
    height: '72px',
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden',
    background: 'var(--bg-secondary)',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.7)',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: '#fff',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '6px',
  },
  matchTitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text)',
    lineHeight: '1.4',
  },
  competition: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
}