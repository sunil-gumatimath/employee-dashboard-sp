import { useState } from 'react'
import { useToast } from '../../contexts/ToastContext'
import Skeleton from '../../components/common/Skeleton'
import './DashboardPage.css'

// Simple progress bar component
const ProgressBar = ({ value, max, color = '#0d6efd' }) => {
  const percentage = (value / max) * 100
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  )
}
const DashboardPage = () => {
  const { addToast } = useToast()
  const [showSkeleton, setShowSkeleton] = useState(false)

  const toggleSkeleton = () => {
    setShowSkeleton(prev => !prev)
  }

  // Mock data for performance metrics
  const performanceMetrics = [
    { name: 'Project Completion', value: 85, max: 100, color: '#198754' },
    { name: 'Resource Utilization', value: 72, max: 100, color: '#0d6efd' },
    { name: 'Employee Satisfaction', value: 91, max: 100, color: '#ffc107' },
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-left">
            <h2>Dashboard</h2>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p className="stat-value">185</p>
            <p className="stat-description">+12% from last month</p>
          </div>
          <div className="stat-card">
            <h3>Active Employees</h3>
            <p className="stat-value">178</p>
            <p className="stat-description">96% retention rate</p>
          </div>
          <div className="stat-card">
            <h3>New Hires</h3>
            <p className="stat-value">15</p>
            <p className="stat-description">This month</p>
          </div>
          <div className="stat-card">
            <h3>Departments</h3>
            <p className="stat-value">14</p>
            <p className="stat-description">Across the organization</p>
          </div>
        </div>
        
        <div className="metrics-section">
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            {performanceMetrics.map((metric, index) => (
              <div className="metric-card" key={index}>
                <h4>{metric.name}</h4>
                <p className="metric-value">{metric.value}%</p>
                <ProgressBar value={metric.value} max={metric.max} color={metric.color} />
              </div>
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h3>Recent Activity</h3>

          {/* Demo Toast Buttons */}
          <div className="demo-buttons">
            <h4>Demo UI Enhancements</h4>
            <div className="demo-btn-grid">
              <button
                onClick={() => addToast('Data exported successfully!', 'info')}
                className="btn btn-info"
                style={{ marginBottom: '10px' }}
              >
                📊 Export Demo
              </button>
            </div>
            <button
              onClick={toggleSkeleton}
              className="btn btn-warning"
              style={{ marginTop: '10px' }}
            >
              {showSkeleton ? '🔄 Show Content' : '🔄 Show Loading Skeletons'}
            </button>
          </div>

          {/* Skeleton Demo Section */}
          {showSkeleton && (
            <div className="skeleton-demo">
              <h3>Loading States Demo</h3>
              <div className="skeleton-grid">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-row">
                      <Skeleton
                        width="40px"
                        height="40px"
                        borderRadius="50%"
                        className="skeleton-avatar"
                      />
                      <div className="skeleton-text-wrap">
                        <Skeleton
                          width="80%"
                          height="20px"
                          variant="text"
                          className="skeleton-line"
                        />
                        <Skeleton
                          width="60%"
                          height="16px"
                          variant="text"
                          className="skeleton-line"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="skeleton-chart">
                <Skeleton width="100%" height="300px" />
              </div>
            </div>
          )}

          <div className="demo-buttons" style={{ marginTop: '20px' }}>
            <div className="demo-btn-grid">
              <button
                onClick={() => addToast('Welcome! Dashboard loaded successfully.', 'success')}
                className="btn btn-success"
              >
                Show Success Toast
              </button>
              <button
                onClick={() => addToast('Error occurred while saving data!', 'error')}
                className="btn btn-danger"
              >
                Show Error Toast
              </button>
              <button
                onClick={() => addToast('Please review your changes before submitting.', 'warning')}
                className="btn btn-warning"
              >
                Show Warning Toast
              </button>
              <button
                onClick={() => addToast('New employee reports are available for download.', 'info')}
                className="btn btn-info"
              >
                Show Info Toast
              </button>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-content">
                <p><strong>Aarav Patel</strong> joined as Software Engineer</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-content">
                <p><strong>Aditi Sharma</strong> updated project status</p>
                <p className="activity-time">4 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-content">
                <p><strong>Rohan Gupta</strong> completed certification</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-content">
                <p><strong>Priya Verma</strong> submitted leave request</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage