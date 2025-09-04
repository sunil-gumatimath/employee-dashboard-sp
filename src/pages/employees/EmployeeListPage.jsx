import { useState, useMemo, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts'
import './EmployeeListPage.css'

// Status configuration with colors and styling
const STATUS_CONFIG = {
  'Active': { color: '#10b981', label: 'Active', icon: '●' },
  'On Leave': { color: '#f59e0b', label: 'On Leave', icon: '○' }
};

// Custom tooltip for department status chart
const CustomDeptTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const statusCounts = Object.entries(STATUS_CONFIG).reduce((acc, [statusKey, config]) => {
      const count = data[statusKey] || 0;
      return count > 0 ? [...acc, { status: statusKey, count, config }] : acc;
    }, []);

    const total = data.total || 0;

    return (
      <div className="custom-tooltip dept-tooltip">
        <h4 className="tooltip-title">{label}</h4>
        {statusCounts.map(({ status, count, config }) => {
          const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
          return (
            <div key={status} className="tooltip-item">
              <span className="tooltip-label">{config.icon} {config.label}:</span>
              <span className="tooltip-value" style={{ color: config.color }}>
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
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

// Mock employee data with Indian names and expanded status types
const mockEmployees = [
  { id: 1, name: 'Aarav Patel', position: 'Software Engineer', department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Aditi Sharma', position: 'Product Manager', department: 'Product', status: 'Active' },
  { id: 3, name: 'Rohan Gupta', position: 'UX Designer', department: 'Design', status: 'Active' },
  { id: 4, name: 'Priya Verma', position: 'HR Specialist', department: 'Human Resources', status: 'Active' },
  { id: 5, name: 'Karan Singh', position: 'Data Analyst', department: 'Analytics', status: 'On Leave' },
  { id: 6, name: 'Meera Iyer', position: 'Senior Developer', department: 'Engineering', status: 'Active' },
  { id: 7, name: 'Vikram Reddy', position: 'Marketing Manager', department: 'Marketing', status: 'Active' },
  { id: 8, name: 'Ananya Bose', position: 'Finance Analyst', department: 'Finance', status: 'Active' },
  { id: 10, name: 'Sneha Nair', position: 'Content Writer', department: 'Marketing', status: 'Active' },
  { id: 11, name: 'Arjun Desai', position: 'DevOps Engineer', department: 'Operations', status: 'Active' },
  { id: 12, name: 'Neha Kaur', position: 'Business Analyst', department: 'Product', status: 'Active' },
  { id: 14, name: 'Pooja Menon', position: 'Recruitment Specialist', department: 'Human Resources', status: 'Active' },
  { id: 15, name: 'Siddharth Pillai', position: 'Sales Manager', department: 'Sales', status: 'On Leave' },
  { id: 16, name: 'Kavita Joshi', position: 'Project Manager', department: 'Operations', status: 'Active' },
  { id: 17, name: 'Rajesh Kumar', position: 'System Administrator', department: 'IT', status: 'Active' },
  { id: 18, name: 'Swati Agarwal', position: 'Legal Counsel', department: 'Legal', status: 'Active' },
  { id: 19, name: 'Amitabh Saxena', position: 'Chief Technology Officer', department: 'Engineering', status: 'Active' },
  { id: 20, name: 'Divya Kapoor', position: 'Marketing Coordinator', department: 'Marketing', status: 'Active' },
  { id: 21, name: 'Naveen Sharma', position: 'Database Administrator', department: 'IT', status: 'Active' },
  { id: 22, name: 'Rashmi Tiwari', position: 'Training Specialist', department: 'Human Resources', status: 'On Leave' },
  { id: 24, name: 'Anjali Pandey', position: 'Customer Success Manager', department: 'Customer Support', status: 'Active' },
  { id: 26, name: 'Deepak Mehta', position: 'Frontend Developer', department: 'Engineering', status: 'Active' },
  { id: 27, name: 'Kriti Singh', position: 'Backend Developer', department: 'Engineering', status: 'Active' },
  { id: 28, name: 'Vijay Agrawal', position: 'Copywriter', department: 'Marketing', status: 'Active' },
  { id: 29, name: 'Simran Chauhan', position: 'Graphic Designer', department: 'Design', status: 'On Leave' },
  { id: 30, name: 'Ankur Jain', position: 'Network Engineer', department: 'IT', status: 'Active' },
  { id: 31, name: 'Maya Gupta', position: 'Operations Manager', department: 'Operations', status: 'Active' },
  { id: 32, name: 'Ravi Sharma', position: 'Senior Analyst', department: 'Finance', status: 'Active' },
  { id: 35, name: 'Anisha Mukherjee', position: 'Data Scientist', department: 'Analytics', status: 'Active' },
]

const EmployeeListPage = () => {
  const [employees] = useState(mockEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [chartFilters, setChartFilters] = useState({ department: '', status: '' })

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

  // Filter employees based on chart click
  const employeesWithChartFilters = useMemo(() => {
    if (!chartFilters.department && !chartFilters.status) {
      return filteredEmployees;
    }

    return filteredEmployees.filter(employee => {
      const matchesDept = !chartFilters.department || employee.department === chartFilters.department;
      const matchesStatus = !chartFilters.status || employee.status === chartFilters.status;
      return matchesDept && matchesStatus;
    });
  }, [filteredEmployees, chartFilters]);

  // Update the displayed employees to include chart filters
  const finalDisplayedEmployees = useMemo(() => employeesWithChartFilters, [employeesWithChartFilters]);

  const sortedEmployees = useMemo(() => {
    if (!sortConfig.key) return employeesWithChartFilters;

    return [...employeesWithChartFilters].sort((a, b) => {
      // Handle status sorting with multiple statuses
      if (sortConfig.key === 'status') {
        const statusOrder = Object.keys(STATUS_CONFIG).reduce((acc, statusType, index) => ({
          ...acc,
          [statusType]: index + 1
        }), {});
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
  }, [employeesWithChartFilters, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle chart bar click to filter employees
  const handleChartClick = (data, status) => {
    if (!data) return;

    setChartFilters(prevFilters => {
      if (prevFilters.department === data.name && prevFilters.status === status) {
        // Clear filters if same department/status clicked
        return { department: '', status: '' };
      } else {
        // Apply new filters
        return { department: data.name, status };
      }
    });
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
        totalEmployees: finalDisplayedEmployees.length,
        activeEmployees: finalDisplayedEmployees.filter(emp => emp.status === 'Active').length,
        onLeaveEmployees: finalDisplayedEmployees.filter(emp => emp.status === 'On Leave').length,
        departments: new Set(employees.map(emp => emp.department)).size
      };
    }, [finalDisplayedEmployees, employees]);

  // Prepare data for stacked bar chart (department vs status)
  const getDepartmentStatusData = useCallback(() => {
    const departmentStatusCounts = {};

    filteredEmployees.forEach(employee => {
      const dept = employee.department;
      const status = employee.status;

      if (!departmentStatusCounts[dept]) {
        departmentStatusCounts[dept] = {
          name: dept,
          total: 0,
          // Initialize all status types to 0
          ...Object.keys(STATUS_CONFIG).reduce((acc, statusType) => ({
            ...acc,
            [statusType]: 0
          }), {})
        };
      }

      // Count employees for valid statuses
      if (STATUS_CONFIG[status]) {
        departmentStatusCounts[dept][status]++;
        departmentStatusCounts[dept].total++;
      }
    });

    // Sort departments by total employee count (descending)
    return Object.values(departmentStatusCounts)
      .sort((a, b) => b.total - a.total);
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
        <div className="metric-card" style={{ borderColor: STATUS_CONFIG.Active.color }}>
          <h3 style={{ color: STATUS_CONFIG.Active.color }}>Active</h3>
          <p className="metric-value">{keyMetrics.activeEmployees}</p>
        </div>
        <div className="metric-card" style={{ borderColor: STATUS_CONFIG['On Leave'].color }}>
          <h3 style={{ color: STATUS_CONFIG['On Leave'].color }}>On Leave</h3>
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
              {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                <div key={status} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: config.color }}
                  ></div>
                  <span>{config.label}</span>
                </div>
              ))}
            </div>
            {(chartFilters.department || chartFilters.status) && (
              <div className="chart-filters">
                <span>Filtered by: {chartFilters.department} {chartFilters.status && `- ${chartFilters.status}`}</span>
                <button
                  className="clear-chart-filters"
                  onClick={() => setChartFilters({ department: '', status: '' })}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <BarChart
                data={departmentStatusData}
                margin={{
                  top: 20,
                  right: 30,
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
                  domain={[0, 'dataMax + 2']}
                />
                <Tooltip
                  content={<CustomDeptTooltip />}
                  wrapperStyle={{ zIndex: 1000 }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  isAnimationActive={true}
                />
                {Object.entries(STATUS_CONFIG).map(([statusKey, config]) => (
                  <Bar
                    key={statusKey}
                    dataKey={statusKey}
                    name={config.label}
                    fill={config.color}
                    stackId="status"
                    radius={[6, 6, 0, 0]}
                    onClick={(data) => handleChartClick(data, statusKey)}
                    cursor="pointer"
                  >
                    <LabelList
                      dataKey={statusKey}
                      position="center"
                      formatter={(value) => value > 0 ? value : ''}
                      style={{ fill: 'white', fontWeight: 'bold', fontSize: '12px' }}
                    />
                  </Bar>
                ))}
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
                  ? Math.max(...departmentStatusData.map(d => d.total))
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
                    {STATUS_CONFIG[employee.status]?.icon || '○'} {employee.status}
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
