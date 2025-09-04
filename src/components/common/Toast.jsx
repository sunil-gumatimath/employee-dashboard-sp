import { useEffect } from 'react'
import './Toast.css'

const Toast = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000) // 4 seconds default

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">
        {icons[type] || icons.info}
      </div>
      <div className="toast-content">
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        &times;
      </button>
    </div>
  )
}

export default Toast