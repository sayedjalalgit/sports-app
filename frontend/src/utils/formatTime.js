export const formatMatchTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-BD', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dhaka',
  })
}

export const formatMatchDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-BD', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Dhaka',
  })
}