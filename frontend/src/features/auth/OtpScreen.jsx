import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure, resetLoading } from './auth.slice'
import api from '../../services/api'

export default function OtpScreen() {
  const [otp, setOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(30)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error } = useSelector((state) => state.auth)
  const phone = location.state?.phone

  useEffect(() => {
    if (!phone) navigate('/login')
    dispatch(resetLoading())
  }, [])

  useEffect(() => {
    if (resendTimer === 0) return
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendTimer])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert('Please enter 6 digit OTP')
      return
    }
    dispatch(loginStart())
    try {
      const res = await api.post('/auth/verify-otp', { phone, otp })
      dispatch(loginSuccess(res.data.data))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Invalid OTP'))
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    await api.post('/auth/send-otp', { phone })
    setResendTimer(30)
    setOtp('')
  }

  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={() => navigate('/login')}>← Back</button>

      <div style={styles.top}>
        <div style={styles.logo}>Cosmo<span style={styles.logoGreen}>Sports</span></div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Enter OTP</h2>
        <p style={styles.subtitle}>
          We sent a 6-digit code to{' '}
          <span style={styles.phone}>{phone}</span>
        </p>

        <p style={styles.hint}>Check your backend terminal for the OTP code</p>

        <input
          style={styles.otpInput}
          type="text"
          placeholder="000000"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 6)
            setOtp(val)
          }}
          maxLength={6}
        />

        <p style={styles.otpCount}>{otp.length}/6 digits entered</p>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={{
            ...styles.button,
            opacity: otp.length !== 6 || loading ? 0.5 : 1,
            cursor: otp.length !== 6 || loading ? 'not-allowed' : 'pointer'
          }}
          onClick={handleVerify}
          disabled={otp.length !== 6 || loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          style={{
            ...styles.resend,
            opacity: resendTimer > 0 ? 0.5 : 1
          }}
          onClick={handleResend}
          disabled={resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
        </button>
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
    position: 'relative',
  },
  back: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    fontSize: '15px',
    cursor: 'pointer',
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
    marginBottom: '8px',
  },
  hint: {
    color: 'var(--color-primary)',
    fontSize: '12px',
    marginBottom: '16px',
  },
  phone: {
    color: 'var(--color-primary)',
    fontWeight: '500',
  },
  otpInput: {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-sm)',
    padding: '16px',
    color: 'var(--color-text)',
    fontSize: '28px',
    letterSpacing: '12px',
    textAlign: 'center',
    marginBottom: '8px',
  },
  otpCount: {
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '16px',
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
    marginBottom: '12px',
    border: 'none',
  },
  resend: {
    width: '100%',
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    fontSize: '14px',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
  },
}