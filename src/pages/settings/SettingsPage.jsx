import './SettingsPage.css'

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-content">
        <div className="settings-section">
          <h3>Account Settings</h3>
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" defaultValue="Admin User" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" defaultValue="admin@company.in" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input type="text" id="role" defaultValue="Administrator" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select id="timezone" defaultValue="Asia/Kolkata">
                <option value="Asia/Kolkata">India Standard Time (IST)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notification Preferences</h3>
          <div className="settings-form">
            <div className="checkbox-group">
              <label>
                <input type="checkbox" defaultChecked /> Email notifications
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" defaultChecked /> SMS notifications
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> WhatsApp notifications
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Push notifications
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Company Information</h3>
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" id="companyName" defaultValue="Tech Innovations Pvt. Ltd." />
            </div>
            <div className="form-group">
              <label htmlFor="companyLocation">Location</label>
              <input type="text" id="companyLocation" defaultValue="Bangalore, India" />
            </div>
            <div className="form-group">
              <label htmlFor="companyCurrency">Currency</label>
              <select id="companyCurrency" defaultValue="INR">
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
            <button className="btn btn-primary">Update Company Info</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage