import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/employees" className="nav-link">
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link">
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-link">
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar