import { useState, useMemo, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './EmployeeListPage.css'

// Custom tooltip for department status chart
const CustomDeptTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const activeCount = data.Active || 0;
    const onLeaveCount = data['On Leave'] || 0;
    const total = activeCount + onLeaveCount;
    const activePercent = total > 0 ? ((activeCount / total) * 100).toFixed(1) : "0.0";
    const onLeavePercent = total > 0 ? ((onLeaveCount / total) * 100).toFixed(1) : "0.0";

    return (
      <div className="custom-tooltip dept-tooltip">
        <h4 className="tooltip-title">{label}</h4>
        <div className="tooltip-item">
          <span className="tooltip-label">Active:</span>
          <span className="tooltip-value active">{activeCount} ({activePercent}%)</span>
        </div>
        {onLeaveCount > 0 && (
          <div className="tooltip-item">
            <span className="tooltip-label">On Leave:</span>
            <span className="tooltip-value on-leave">{onLeaveCount} ({onLeavePercent}%)</span>
          </div>
        )}
        <hr />
        <div className="tooltip-total">
          <span>Total:</span>
          <span>{total} employees</span>
        </div>
      </div>
    );
  }
  return null;
};

// Mock employee data with Indian names
const mockEmployees = [
  { id: 1, name: 'Aarav Patel', position: 'Software Engineer', department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Aditi Sharma', position: 'Product Manager', department: 'Product', status: 'Active' },
  { id: 3, name: 'Rohan Gupta', position: 'UX Designer', department: 'Design', status: 'Active' },
  { id: 4, name: 'Priya Verma', position: 'HR Specialist', department: 'Human Resources', status: 'Active' },
  { id: 5, name: 'Karan Singh', position: 'Data Analyst', department: 'Analytics', status: 'On Leave' },
  { id: 6, name: 'Meera Iyer', position: 'Senior Developer', department: 'Engineering', status: 'Active' },
  { id: 7, name: 'Vikram Reddy', position: 'Marketing Manager', department: 'Marketing', status: 'Active' },
  { id: 8, name: 'Ananya Bose', position: 'Finance Analyst', department: 'Finance', status: 'Active' },
  { id: 9, name: 'Dev Mishra', position: 'QA Engineer', department: 'Engineering', status: 'Active' },
  { id: 10, name: 'Sneha Nair', position: 'Content Writer', department: 'Marketing', status: 'Active' },
  { id: 11, name: 'Arjun Desai', position: 'DevOps Engineer', department: 'Operations', status: 'Active' },
  { id: 12, name: 'Neha Kaur', position: 'Business Analyst', department: 'Product', status: 'Active' },
  { id: 13, name: 'Rahul Choudhury', position: 'Technical Lead', department: 'Engineering', status: 'Active' },
  { id: 14, name: 'Pooja Menon', position: 'Recruitment Specialist', department: 'Human Resources', status: 'Active' },
  { id: 15, name: 'Siddharth Pillai', position: 'Sales Manager', department: 'Sales', status: 'On Leave' },
  { id: 16, name: 'Kavita Joshi', position: 'Project Manager', department: 'Operations', status: 'Active' },
  { id: 17, name: 'Rajesh Kumar', position: 'System Administrator', department: 'IT', status: 'Active' },
  { id: 18, name: 'Swati Agarwal', position: 'Legal Counsel', department: 'Legal', status: 'Active' },
  { id: 19, name: 'Amitabh Saxena', position: 'Chief Technology Officer', department: 'Engineering', status: 'Active' },
  { id: 20, name: 'Divya Kapoor', position: 'Marketing Coordinator', department: 'Marketing', status: 'Active' },
  { id: 21, name: 'Naveen Sharma', position: 'Database Administrator', department: 'IT', status: 'Active' },
  { id: 22, name: 'Rashmi Tiwari', position: 'Training Specialist', department: 'Human Resources', status: 'Active' },
  { id: 23, name: 'Vivek Jain', position: 'Financial Controller', department: 'Finance', status: 'Active' },
  { id: 24, name: 'Anjali Pandey', position: 'Customer Success Manager', department: 'Customer Support', status: 'Active' },
  { id: 25, name: 'Suresh Rao', position: 'Security Analyst', department: 'Security', status: 'Active' },
]

const EmployeeListPage = () => {
  const [employees] = useState(mockEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // Get unique departments for filter dropdown
  const departments = useMemo(() => {
    const deptSet = new Set(employees.map(emp => emp.department));
    return Array.from(deptSet).sort();
  }, [employees]);

  // Get unique statuses for filter dropdown
  const statuses = useMemo(() => {
    const statusSet = new Set(employees.map(emp => emp.status));
    return Array.from(statusSet).sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment ? employee.department === filterDepartment : true;
      const matchesStatus = filterStatus ? employee.status === filterStatus : true;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, filterDepartment, filterStatus]);

  const sortedEmployees = useMemo(() => {
    if (!sortConfig.key) return filteredEmployees;
    
    return [...filteredEmployees].sort((a, b) => {
      // Handle status sorting (Active should come before On Leave)
      if (sortConfig.key === 'status') {
        const statusOrder = { 'Active': 1, 'On Leave': 2 };
        const statusA = statusOrder[a.status] || 0;
        const statusB = statusOrder[b.status] || 0;
        
        if (statusA < statusB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (statusA > statusB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
      
      // Handle other string comparisons
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredEmployees, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'asc' ? ' \u2191' : ' \u2193';
    }
    return ' \u2195';
  };

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    return {
      totalEmployees: filteredEmployees.length,
      activeEmployees: filteredEmployees.filter(emp => emp.status === 'Active').length,
      onLeaveEmployees: filteredEmployees.filter(emp => emp.status === 'On Leave').length,
      departments: new Set(filteredEmployees.map(emp => emp.department)).size
    };
  }, [filteredEmployees]);

  // Prepare data for stacked bar chart (department vs status)
  const getDepartmentStatusData = useCallback(() => {
    const departmentStatusCounts = {};

    filteredEmployees.forEach(employee => {
      const dept = employee.department;
      const status = employee.status;

      if (!departmentStatusCounts[dept]) {
        departmentStatusCounts[dept] = { name: dept, Active: 0, 'On Leave': 0 };
      }

      // Ensure we only count valid statuses
      if (status === 'Active' || status === 'On Leave') {
        departmentStatusCounts[dept][status]++;
      }
    });

    // Sort departments by total employee count (descending)
    return Object.values(departmentStatusCounts)
      .sort((a, b) => (b.Active + b['On Leave']) - (a.Active + a['On Leave']));
  }, [filteredEmployees]);

  const departmentStatusData = useMemo(() => getDepartmentStatusData(), [getDepartmentStatusData])

  return (
    <div className="employee-list-page">
      <div className="employee-list-header">
        <h2>Employee Directory</h2>
        <div className="header-actions">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search employees..."
              className={`search-input ${searchTerm ? 'filtered' : ''}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          <button className="btn btn-primary">Add Employee</button>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(searchTerm || filterDepartment || filterStatus) && (
        <div className="active-filters">
          <h3>Active Filters:</h3>
          <div className="filter-tags">
            {searchTerm && (
              <span className="filter-tag">
                Search: "{searchTerm}"
                <button 
                  className="remove-tag-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="Remove search filter"
                >
                  &times;
                </button>
              </span>
            )}
            {filterDepartment && (
              <span className="filter-tag">
                Department: {filterDepartment}
                <button 
                  className="remove-tag-btn"
                  onClick={() => setFilterDepartment('')}
                  aria-label="Remove department filter"
                >
                  &times;
                </button>
              </span>
            )}
            {filterStatus && (
              <span className="filter-tag">
                Status: {filterStatus}
                <button 
                  className="remove-tag-btn"
                  onClick={() => setFilterStatus('')}
                  aria-label="Remove status filter"
                >
                  &times;
                </button>
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Key Metrics Section */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Employees</h3>
          <p className="metric-value">{keyMetrics.totalEmployees}</p>
        </div>
        <div className="metric-card">
          <h3>Active</h3>
          <p className="metric-value">{keyMetrics.activeEmployees}</p>
        </div>
        <div className="metric-card">
          <h3>On Leave</h3>
          <p className="metric-value">{keyMetrics.onLeaveEmployees}</p>
        </div>
        <div className="metric-card">
          <h3>Departments</h3>
          <p className="metric-value">{keyMetrics.departments}</p>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="department-filter">Department</label>
          <div className="filter-wrapper">
            <select 
              id="department-filter"
              className={`filter-select ${filterDepartment ? 'filtered' : ''}`}
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {filterDepartment && (
              <button 
                className="clear-filter-btn"
                onClick={() => setFilterDepartment('')}
                aria-label="Clear department filter"
              >
                &times;
              </button>
            )}
          </div>
        </div>
        
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <div className="filter-wrapper">
            <select 
              id="status-filter"
              className={`filter-select ${filterStatus ? 'filtered' : ''}`}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {filterStatus && (
              <button 
                className="clear-filter-btn"
                onClick={() => setFilterStatus('')}
                aria-label="Clear status filter"
              >
                &times;
              </button>
            )}
          </div>
        </div>
        
        <button 
          className="btn btn-secondary"
          onClick={() => {
            setFilterDepartment('');
            setFilterStatus('');
          }}
        >
          Clear All Filters
        </button>
      </div>
      
      {/* Enhanced Charts Section */}
      <div className="charts-section">
        <div className="chart-container enhanced-chart">
          <div className="chart-header">
            <h3>Employees by Department & Status</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color active"></div>
                <span>Active Employees</span>
              </div>
              <div className="legend-item">
                <div className="legend-color on-leave"></div>
                <span>On Leave</span>
              </div>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <BarChart
                data={departmentStatusData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 80,
                }}
                barCategoryGap="15%"
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickMargin={8}
                  tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#666' }}
                  allowDecimals={false}
                  tickMargin={10}
                  domain={[0, 'dataMax + 1']}
                />
                <Tooltip 
                  content={<CustomDeptTooltip />} 
                  wrapperStyle={{ zIndex: 1000 }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  isAnimationActive={false}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  align="right"
                  verticalAlign="top"
                  height={40}
                />
                <Bar
                  dataKey="Active"
                  name="Active"
                  fill="#10b981"
                  stackId="status"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="On Leave"
                  name="On Leave"
                  fill="#f59e0b"
                  stackId="status"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-insights">
            <div className="insight-item">
              <span className="insight-label">Total Departments:</span>
              <span className="insight-value">{departmentStatusData.length}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Largest Dept:</span>
              <span className="insight-value">
                {departmentStatusData.length > 0 
                  ? Math.max(...departmentStatusData.map(d => d.Active + (d['On Leave'] || 0))) 
                  : 0}
              </span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Active Rate:</span>
              <span className="insight-value">
                {keyMetrics.totalEmployees > 0 
                  ? Math.round((keyMetrics.activeEmployees / keyMetrics.totalEmployees) * 100) 
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="sortable">
                Name{getSortIcon('name')}
              </th>
              <th onClick={() => handleSort('position')} className="sortable">
                Position{getSortIcon('position')}
              </th>
              <th onClick={() => handleSort('department')} className="sortable">
                Department{getSortIcon('department')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status{getSortIcon('status')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                    {employee.status === 'Active' ? '●' : '○'} {employee.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeListPage
