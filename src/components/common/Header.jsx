import './Header.css'

const Header = () => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) {
      sidebar.classList.toggle('open');
    }

    if (overlay) {
      overlay.classList.toggle('visible');
    }
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              ☰
            </button>
            <h1>Employee-Management</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span>Admin User</span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header