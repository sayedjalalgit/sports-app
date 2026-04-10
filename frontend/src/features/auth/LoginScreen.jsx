import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginFailure } from './auth.slice'
import api from '../../services/api'

export default function LoginScreen() {
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSendOTP = async () => {
    if (!phone || phone.length < 11) return
    dispatch(loginStart())
    try {
      await api.post('/auth/send-otp', { phone })
      navigate('/otp', { state: { phone } })
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Failed to send OTP'))
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <div style={styles.logo}>Cosmo<span style={styles.logoGreen}>Sports</span></div>
        <p style={styles.tagline}>Bangladesh's premium sports app</p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Enter your mobile number to continue</p>

        <div style={styles.inputWrapper}>
          <span style={styles.flag}>🇧🇩</span>
          <span style={styles.code}>+880</span>
          <input
            style={styles.input}
            type="tel"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={{
            ...styles.button,
            opacity: phone.length < 11 || loading ? 0.5 : 1
          }}
          onClick={handleSendOTP}
          disabled={phone.length < 11 || loading}
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>

        <p style={styles.terms}>
          By continuing you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '24px',
  },
  top: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--color-text)',
    letterSpacing: '-1px',
  },
  logoGreen: {
    color: 'var(--color-primary)',
  },
  tagline: {
    color: 'var(--color-text-secondary)',
    fontSize: '14px',
    marginTop: '6px',
  },
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--border-radius)',
    padding: '28px',
    border: '0.5px solid var(--color-border)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '6px',
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: '14px',
    marginBottom: '24px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--border-radius-sm)',
    border: '0.5px solid var(--color-border)',
    padding: '14px 16px',
    marginBottom: '16px',
    gap: '8px',
  },
  flag: {
    fontSize: '20px',
  },
  code: {
    color: 'var(--color-text-secondary)',
    fontSize: '15px',
    fontWeight: '500',
  },
  input: {
    background: 'transparent',
    color: 'var(--color-text)',
    fontSize: '16px',
    flex: 1,
    letterSpacing: '1px',
  },
  error: {
    color: 'var(--color-danger)',
    fontSize: '13px',
    marginBottom: '12px',
  },
  button: {
    width: '100%',
    background: 'var(--color-primary)',
    color: '#000',
    fontSize: '16px',
    fontWeight: '600',
    padding: '16px',
    borderRadius: 'var(--border-radius-sm)',
    transition: 'var(--transition)',
    marginBottom: '16px',
  },
  terms: {
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    textAlign: 'center',
  },
}