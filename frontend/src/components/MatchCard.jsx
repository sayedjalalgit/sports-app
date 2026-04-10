import { formatMatchTime, formatMatchDate } from '../utils/formatTime'

export default function MatchCard({ match }) {
  const isLive = match.strStatus === 'Match Finished' ? false :
    match.strStatus?.includes('HT') ||
    match.strStatus?.includes("'") ||
    match.intHomeScore !== null

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.league}>
          {match.strLeagueBadge && (
            <img src={match.strLeagueBadge} alt="" style={styles.leagueBadge} />
          )}
          <span style={styles.leagueName}>{match.strLeague}</span>
        </div>
        {isLive ? (
          <div style={styles.liveBadge}>
            <span style={styles.liveDot} />
            LIVE
          </div>
        ) : (
          <span style={styles.time}>
            {formatMatchTime(match.strTimestamp)}
          </span>
        )}
      </div>

      <div style={styles.teams}>
        <div style={styles.team}>
          {match.strHomeTeamBadge && (
            <img src={match.strHomeTeamBadge} alt="" style={styles.teamBadge} />
          )}
          <span style={styles.teamName}>{match.strHomeTeam}</span>
        </div>

        <div style={styles.scoreBox}>
          {match.intHomeScore !== null ? (
            <span style={styles.score}>
              {match.intHomeScore} - {match.intAwayScore}
            </span>
          ) : (
            <span style={styles.vs}>VS</span>
          )}
          <span style={styles.date}>{formatMatchDate(match.dateEvent)}</span>
        </div>

        <div style={{ ...styles.team, alignItems: 'flex-end' }}>
          {match.strAwayTeamBadge && (
            <img src={match.strAwayTeamBadge} alt="" style={styles.teamBadge} />
          )}
          <span style={styles.teamName}>{match.strAwayTeam}</span>
        </div>
      </div>

      {match.strVenue && (
        <div style={styles.venue}>{match.strVenue}</div>
      )}
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
    alignItems: 'center',
    marginBottom: '14px',
  },
  league: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  leagueBadge: {
    width: '16px',
    height: '16px',
    objectFit: 'contain',
  },
  leagueName: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '0.5px solid var(--color-live)',
    borderRadius: '4px',
    padding: '3px 8px',
    fontSize: '10px',
    color: 'var(--color-live)',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  liveDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--color-live)',
    display: 'inline-block',
  },
  time: {
    fontSize: '13px',
    color: 'var(--color-primary)',
    fontWeight: '500',
  },
  teams: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    flex: 1,
  },
  teamBadge: {
    width: '36px',
    height: '36px',
    objectFit: 'contain',
  },
  teamName: {
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text)',
    lineHeight: '1.3',
  },
  scoreBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: '70px',
  },
  score: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--color-text)',
    letterSpacing: '2px',
  },
  vs: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    fontWeight: '500',
  },
  date: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
  venue: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '0.5px solid var(--color-border)',
  },
}