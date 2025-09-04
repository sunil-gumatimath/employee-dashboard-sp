import { useState, useMemo } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line, Area,
  ComposedChart
} from 'recharts'
import './ReportsPage.css'

// Custom tooltip for pie chart
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ zIndex: 99 }}>
        <p className="tooltip-label">{payload[0].name}</p>
        <p className="tooltip-value">{`${payload[0].value} employee(s)`}</p>
        <p className="tooltip-percent">{`${payload[0].percent}%`}</p>
      </div>
    );
  }
  return null;
};

const PIE_COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545'];

// Import employee data for real analytics
const mockEmployees = [
  {
    id: 1,
    name: 'Aarav Patel',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'aarav.patel@company.com',
    phone: '+91 98765 43210',
    hireDate: '2022-03-15',
    status: 'Active',
    salary: '₹8,50,000',
    manager: 'Meera Iyer',
    team: 'Frontend Development',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    address: '123 MG Road, Mumbai, Maharashtra 400001'
  },
  {
    id: 2,
    name: 'Aditi Sharma',
    position: 'Product Manager',
    department: 'Product',
    email: 'aditi.sharma@company.com',
    phone: '+91 98765 43211',
    hireDate: '2021-07-22',
    status: 'Active',
    salary: '₹12,00,000',
    manager: 'Rahul Choudhury',
    team: 'Product Strategy',
    skills: ['Product Management', 'Agile', 'User Research', 'Analytics'],
    address: '456 Park Street, Delhi, Delhi 110001'
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    position: 'UX Designer',
    department: 'Design',
    email: 'rohan.gupta@company.com',
    phone: '+91 98765 43212',
    hireDate: '2023-01-10',
    status: 'Active',
    salary: '₹7,50,000',
    manager: 'Priya Verma',
    team: 'UI/UX Design',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    address: '789 Brigade Road, Bangalore, Karnataka 560001'
  },
  {
    id: 4,
    name: 'Priya Verma',
    position: 'HR Specialist',
    department: 'Human Resources',
    email: 'priya.verma@company.com',
    phone: '+91 98765 43213',
    hireDate: '2021-03-15',
    status: 'Active',
    salary: '₹6,50,000',
    manager: 'Pooja Menon',
    team: 'Employee Relations',
    skills: ['HR Management', 'Employee Engagement', 'Conflict Resolution', 'Performance Management'],
    address: '321 Connaught Place, Delhi, Delhi 110001'
  },
  {
    id: 5,
    name: 'Karan Singh',
    position: 'Data Analyst',
    department: 'Analytics',
    email: 'karan.singh@company.com',
    phone: '+91 98765 43214',
    hireDate: '2022-08-20',
    status: 'On Leave',
    salary: '₹7,00,000',
    manager: 'Neha Kaur',
    team: 'Business Intelligence',
    skills: ['SQL', 'Python', 'Tableau', 'Data Visualization', 'Statistics'],
    address: '654 Residency Road, Chennai, Tamil Nadu 600001'
  },
  {
    id: 6,
    name: 'Meera Iyer',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'meera.iyer@company.com',
    phone: '+91 98765 43215',
    hireDate: '2021-04-12',
    status: 'Active',
    salary: '₹11,00,000',
    manager: 'Rahul Choudhury',
    team: 'Backend Development',
    skills: ['Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Microservices'],
    address: '987 T. Nagar, Chennai, Tamil Nadu 600017'
  },
  {
    id: 7,
    name: 'Vikram Reddy',
    position: 'Marketing Manager',
    department: 'Marketing',
    email: 'vikram.reddy@company.com',
    phone: '+91 98765 43216',
    hireDate: '2020-06-18',
    status: 'Active',
    salary: '₹9,50,000',
    manager: 'Divya Kapoor',
    team: 'Digital Marketing',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Google Analytics'],
    address: '147 Jubilee Hills, Hyderabad, Telangana 500033'
  },
  {
    id: 8,
    name: 'Ananya Bose',
    position: 'Finance Analyst',
    department: 'Finance',
    email: 'ananya.bose@company.com',
    phone: '+91 98765 43217',
    hireDate: '2022-02-28',
    status: 'Active',
    salary: '₹8,00,000',
    manager: 'Vivek Jain',
    team: 'Financial Planning',
    skills: ['Financial Analysis', 'Excel', 'Budgeting', 'Forecasting', 'Risk Assessment'],
    address: '258 Salt Lake City, Kolkata, West Bengal 700091'
  },
  {
    id: 9,
    name: 'Dev Mishra',
    position: 'QA Engineer',
    department: 'Engineering',
    email: 'dev.mishra@company.com',
    phone: '+91 98765 43218',
    hireDate: '2023-05-15',
    status: 'Active',
    salary: '₹7,20,000',
    manager: 'Rahul Choudhury',
    team: 'Quality Assurance',
    skills: ['Selenium', 'Jest', 'Test Automation', 'Manual Testing', 'API Testing'],
    address: '369 Rajouri Garden, Delhi, Delhi 110027'
  },
  {
    id: 10,
    name: 'Sneha Nair',
    position: 'Content Writer',
    department: 'Marketing',
    email: 'sneha.nair@company.com',
    phone: '+91 98765 43219',
    hireDate: '2023-03-08',
    status: 'Active',
    salary: '₹5,50,000',
    manager: 'Vikram Reddy',
    team: 'Content Marketing',
    skills: ['Content Writing', 'SEO Writing', 'Copywriting', 'Blog Writing', 'Social Media Content'],
    address: '741 MG Road, Kochi, Kerala 682016'
  },
  {
    id: 11,
    name: 'Arjun Desai',
    position: 'DevOps Engineer',
    department: 'Operations',
    email: 'arjun.desai@company.com',
    phone: '+91 98765 43220',
    hireDate: '2021-09-22',
    status: 'Active',
    salary: '₹10,50,000',
    manager: 'Kavita Joshi',
    team: 'Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
    address: '852 Law Garden, Ahmedabad, Gujarat 380006'
  },
  {
    id: 12,
    name: 'Neha Kaur',
    position: 'Business Analyst',
    department: 'Product',
    email: 'neha.kaur@company.com',
    phone: '+91 98765 43221',
    hireDate: '2022-06-15',
    status: 'Active',
    salary: '₹8,50,000',
    manager: 'Aditi Sharma',
    team: 'Product Analytics',
    skills: ['Business Analysis', 'Requirements Gathering', 'Data Analysis', 'Process Mapping', 'Agile'],
    address: '963 Sector 18, Noida, Uttar Pradesh 201301'
  },
  {
    id: 13,
    name: 'Rahul Choudhury',
    position: 'Technical Lead',
    department: 'Engineering',
    email: 'rahul.choudhury@company.com',
    phone: '+91 98765 43222',
    hireDate: '2019-12-01',
    status: 'Active',
    salary: '₹15,00,000',
    manager: 'Amitabh Saxena',
    team: 'Engineering Leadership',
    skills: ['Leadership', 'Architecture', 'React', 'Node.js', 'Team Management'],
    address: '159 Park Street, Kolkata, West Bengal 700016'
  },
  {
    id: 14,
    name: 'Pooja Menon',
    position: 'Recruitment Specialist',
    department: 'Human Resources',
    email: 'pooja.menon@company.com',
    phone: '+91 98765 43223',
    hireDate: '2021-01-15',
    status: 'Active',
    salary: '₹6,80,000',
    manager: 'Priya Verma',
    team: 'Talent Acquisition',
    skills: ['Recruitment', 'Interviewing', 'ATS Systems', 'Candidate Sourcing', 'Employer Branding'],
    address: '357 Banerji Road, Kolkata, West Bengal 700029'
  },
  {
    id: 15,
    name: 'Siddharth Pillai',
    position: 'Sales Manager',
    department: 'Sales',
    email: 'siddharth.pillai@company.com',
    phone: '+91 98765 43224',
    hireDate: '2020-04-10',
    status: 'On Leave',
    salary: '₹10,00,000',
    manager: 'Anjali Pandey',
    team: 'Sales Operations',
    skills: ['Sales Management', 'CRM', 'Lead Generation', 'Negotiation', 'Customer Relations'],
    address: '468 Marine Drive, Mumbai, Maharashtra 400002'
  },
  {
    id: 16,
    name: 'Kavita Joshi',
    position: 'Project Manager',
    department: 'Operations',
    email: 'kavita.joshi@company.com',
    phone: '+91 98765 43225',
    hireDate: '2019-08-25',
    status: 'Active',
    salary: '₹11,50,000',
    manager: 'Amitabh Saxena',
    team: 'Project Management',
    skills: ['Project Management', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Management'],
    address: '579 Linking Road, Mumbai, Maharashtra 400050'
  },
  {
    id: 17,
    name: 'Rajesh Kumar',
    position: 'System Administrator',
    department: 'IT',
    email: 'rajesh.kumar@company.com',
    phone: '+91 98765 43226',
    hireDate: '2021-06-14',
    status: 'Active',
    salary: '₹8,20,000',
    manager: 'Naveen Sharma',
    team: 'IT Infrastructure',
    skills: ['System Administration', 'Linux', 'Windows Server', 'Network Administration', 'Security'],
    address: '680 Karol Bagh, Delhi, Delhi 110005'
  },
  {
    id: 18,
    name: 'Swati Agarwal',
    position: 'Legal Counsel',
    department: 'Legal',
    email: 'swati.agarwal@company.com',
    phone: '+91 98765 43227',
    hireDate: '2020-03-20',
    status: 'Active',
    salary: '₹12,50,000',
    manager: 'Amitabh Saxena',
    team: 'Corporate Law',
    skills: ['Corporate Law', 'Contract Drafting', 'Compliance', 'Intellectual Property', 'Legal Research'],
    address: '791 Connaught Circus, Delhi, Delhi 110001'
  },
  {
    id: 19,
    name: 'Amitabh Saxena',
    position: 'Chief Technology Officer',
    department: 'Engineering',
    email: 'amitabh.saxena@company.com',
    phone: '+91 98765 43228',
    hireDate: '2018-01-01',
    status: 'Active',
    salary: '₹25,00,000',
    manager: 'Board of Directors',
    team: 'Executive Leadership',
    skills: ['Technology Strategy', 'Leadership', 'Innovation', 'Architecture', 'Digital Transformation'],
    address: '802 Lodhi Road, Delhi, Delhi 110003'
  },
  {
    id: 20,
    name: 'Divya Kapoor',
    position: 'Marketing Coordinator',
    department: 'Marketing',
    email: 'divya.kapoor@company.com',
    phone: '+91 98765 43229',
    hireDate: '2020-03-10',
    status: 'Active',
    salary: '₹5,80,000',
    manager: 'Vikram Reddy',
    team: 'Marketing Operations',
    skills: ['Marketing Coordination', 'Event Planning', 'Social Media', 'Email Marketing', 'Campaign Management'],
    address: '913 South Extension, Delhi, Delhi 110049'
  },
  {
    id: 21,
    name: 'Naveen Sharma',
    position: 'Database Administrator',
    department: 'IT',
    email: 'naveen.sharma@company.com',
    phone: '+91 98765 43230',
    hireDate: '2021-03-20',
    status: 'Active',
    salary: '₹9,00,000',
    manager: 'Rajesh Kumar',
    team: 'Database Management',
    skills: ['Database Administration', 'MySQL', 'PostgreSQL', 'MongoDB', 'Performance Tuning'],
    address: '024 Rajendra Place, Delhi, Delhi 110008'
  },
  {
    id: 22,
    name: 'Rashmi Tiwari',
    position: 'Training Specialist',
    department: 'Human Resources',
    email: 'rashmi.tiwari@company.com',
    phone: '+91 98765 43231',
    hireDate: '2021-10-05',
    status: 'Active',
    salary: '₹7,50,000',
    manager: 'Priya Verma',
    team: 'Learning & Development',
    skills: ['Training & Development', 'E-Learning', 'Curriculum Design', 'Facilitation', 'Assessment'],
    address: '135 Vasant Kunj, Delhi, Delhi 110070'
  },
  {
    id: 23,
    name: 'Vivek Jain',
    position: 'Financial Controller',
    department: 'Finance',
    email: 'vivek.jain@company.com',
    phone: '+91 98765 43232',
    hireDate: '2019-11-18',
    status: 'Active',
    salary: '₹14,00,000',
    manager: 'Amitabh Saxena',
    team: 'Financial Operations',
    skills: ['Financial Control', 'Accounting', 'Auditing', 'Financial Reporting', 'Budget Management'],
    address: '246 Greater Kailash, Delhi, Delhi 110048'
  },
  {
    id: 24,
    name: 'Anjali Pandey',
    position: 'Customer Success Manager',
    department: 'Customer Support',
    email: 'anjali.pandey@company.com',
    phone: '+91 98765 43233',
    hireDate: '2020-01-15',
    status: 'Active',
    salary: '₹9,50,000',
    manager: 'Siddharth Pillai',
    team: 'Customer Success',
    skills: ['Customer Success', 'Account Management', 'CRM', 'Customer Retention', 'Support Operations'],
    address: '357 Hauz Khas, Delhi, Delhi 110016'
  },
  {
    id: 25,
    name: 'Suresh Rao',
    position: 'Security Analyst',
    department: 'Security',
    email: 'suresh.rao@company.com',
    phone: '+91 98765 43234',
    hireDate: '2021-07-29',
    status: 'Active',
    salary: '₹10,00,000',
    manager: 'Rajesh Kumar',
    team: 'Cybersecurity',
    skills: ['Cybersecurity', 'Threat Analysis', 'Incident Response', 'Security Tools', 'Risk Assessment'],
    address: '468 Defence Colony, Delhi, Delhi 110024'
  }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4']

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('last6months')
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  // Prepare data for status distribution pie chart
  const getEmployeesByStatus = (employees) => {
    const total = employees.length
    const statusCounts = {}

    employees.forEach(employee => {
      const status = employee.status
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    // Convert to array of objects for recharts, including percentage
    return Object.entries(statusCounts).map(([name, count]) => ({
      name,
      value: count,
      percent: total > 0 ? Math.round((count / total) * 100) : 0
    }))
  }

  // Prepare data for department vs status stacked bar chart
  const getDepartmentStatusData = (employees) => {
    const deptStatusMap = {}

    employees.forEach(employee => {
      const dept = employee.department
      const status = employee.status
      
      if (!deptStatusMap[dept]) {
        deptStatusMap[dept] = { Active: 0, 'On Leave': 0 }
      }
      
      deptStatusMap[dept][status] = (deptStatusMap[dept][status] || 0) + 1
    })

    // Convert to array format for recharts
    return Object.entries(deptStatusMap).map(([department, statuses]) => ({
      department,
      Active: statuses.Active || 0,
      'On Leave': statuses['On Leave'] || 0
    }))
  }

  // Compute analytics data from employee data
  const analyticsData = useMemo(() => {
    // Filter employees based on selected department
    const filteredEmployees = selectedDepartment === 'All'
      ? mockEmployees
      : mockEmployees.filter(emp => emp.department === selectedDepartment)

    const departmentCounts = new Map()
    const statusCounts = new Map()
    const hiringByMonth = new Map()

    for (const employee of filteredEmployees) {
      // Department distribution
      const deptCount = departmentCounts.get(employee.department) || 0
      departmentCounts.set(employee.department, deptCount + 1)

      // Status distribution
      const statusCount = statusCounts.get(employee.status) || 0
      statusCounts.set(employee.status, statusCount + 1)

      // Hiring trends by month
      const hireDate = new Date(employee.hireDate)
      const monthKey = hireDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      const monthCount = hiringByMonth.get(monthKey) || 0
      hiringByMonth.set(monthKey, monthCount + 1)
    }

    // Convert Maps to arrays for charts with optimized calculations
    const empLength = filteredEmployees.length
    const departmentData = Array.from(departmentCounts.entries()).map(([dept, count]) => ({
      name: dept,
      value: count,
      percentage: Math.round((count / empLength) * 100)
    }))

    const statusData = Array.from(statusCounts.entries()).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: Math.round((count / empLength) * 100)
    }))

    // Optimized date range filtering
    const numMonths = { 'last30days': 1, 'last3months': 3, 'last6months': 6, 'lastyear': 12 }[dateRange] || 12
    const sortedMonths = Array.from(hiringByMonth.keys()).sort((a, b) => new Date(b) - new Date(a))
    const recentMonthKeys = sortedMonths.slice(0, numMonths).reverse()
    const hiringData = recentMonthKeys.map(month => ({
      name: month,
      hires: hiringByMonth.get(month) || 0
    }))

    // Optimized summary metrics calculations
    let totalEmployees = 0, activeEmployees = 0, onLeaveEmployees = 0, totalTenureYears = 0
    const today = new Date()

    for (const emp of filteredEmployees) {
      totalEmployees++
      if (emp.status === 'Active') activeEmployees++
      else if (emp.status === 'On Leave') onLeaveEmployees++

      const hireDate = new Date(emp.hireDate)
      const diffTime = Math.abs(today - hireDate)
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365)
      totalTenureYears += diffYears
    }

    const avgTenure = Math.round((totalTenureYears / totalEmployees || 0) * 10) / 10

    return {
      departmentData,
      statusData,
      statusDataForPieChart: getEmployeesByStatus(filteredEmployees),
      hiringData,
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      avgTenure,
      deptStatusData: getDepartmentStatusData(filteredEmployees)
    }
  }, [selectedDepartment, dateRange])

  // Get unique departments for filter
  const departments = ['All', ...new Set(mockEmployees.map(emp => emp.department))]

  // Export report data as CSV
  const exportReport = () => {
    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,'
    
    // Add summary data
    csvContent += 'Report Summary\n'
    csvContent += 'Total Employees,' + analyticsData.totalEmployees + '\n'
    csvContent += 'Active Employees,' + analyticsData.activeEmployees + '\n'
    csvContent += 'On Leave Employees,' + analyticsData.onLeaveEmployees + '\n'
    csvContent += 'Average Tenure,' + analyticsData.avgTenure + ' years\n\n'
    
    // Add department data
    csvContent += 'Department Distribution\n'
    csvContent += 'Department,Count,Percentage\n'
    analyticsData.departmentData.forEach(dept => {
      csvContent += dept.name + ',' + dept.value + ',' + dept.percentage + '%\n'
    })
    
    csvContent += '\n'
    
    // Add status data
    csvContent += 'Employee Status\n'
    csvContent += 'Status,Count,Percentage\n'
    analyticsData.statusData.forEach(status => {
      csvContent += status.name + ',' + status.value + ',' + status.percentage + '%\n'
    })
    
    csvContent += '\n'
    
    // Add department vs status data
    csvContent += 'Department vs Status\n'
    csvContent += 'Department,Active,On Leave\n'
    analyticsData.deptStatusData.forEach(dept => {
      csvContent += dept.department + ',' + dept.Active + ',' + dept['On Leave'] + '\n'
    })
    
    csvContent += '\n'
    
    // Add hiring data
    csvContent += 'Overall Hiring Trends\n'
    csvContent += 'Month,Hires\n'
    analyticsData.hiringData.forEach(data => {
      csvContent += data.name + ',' + data.hires + '\n'
    })
    
    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'employee_report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>Reports & Analytics</h2>
        <div className="reports-controls">
          <select 
            className="filter-selector"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select 
            className="date-range-selector"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
            <option value="last6months">Last 6 Months</option>
            <option value="lastyear">Last Year</option>
          </select>
          <button className="btn btn-secondary" onClick={exportReport}>Export Report</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon bg-primary">
            <i className="fas fa-users"></i>
          </div>
          <div className="card-content">
            <h3>{analyticsData.totalEmployees}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon bg-success">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="card-content">
            <h3>{analyticsData.activeEmployees}</h3>
            <p>Active Employees</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon bg-warning">
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="card-content">
            <h3>{analyticsData.onLeaveEmployees}</h3>
            <p>On Leave</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon bg-info">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="card-content">
            <h3>{analyticsData.avgTenure} yrs</h3>
            <p>Avg. Tenure</p>
          </div>
        </div>
      </div>

      <div className="reports-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveTab('departments')}
        >
          Departments
        </button>
        <button 
          className={`tab ${activeTab === 'hiring' ? 'active' : ''}`}
          onClick={() => setActiveTab('hiring')}
        >
          Hiring Trends
        </button>
      </div>

      <div className="reports-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="chart-grid">
              <div className="chart-card">
                <h3>Employee Status Distribution</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.statusDataForPieChart}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.statusDataForPieChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} wrapperStyle={{ zIndex: 99 }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="chart-card">
                <h3>Department Distribution</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={analyticsData.departmentData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Employees" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="departments-section">
            <div className="stats-table-container">
              <h3>Department Statistics</h3>
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Employee Count</th>
                    <th>Percentage</th>
                    <th>Avg. Tenure</th>
                    <th>Headcount Change</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.departmentData.map((dept, index) => (
                    <tr key={index}>
                      <td>{dept.name}</td>
                      <td>{dept.value}</td>
                      <td>{dept.percentage}%</td>
                      <td>{Math.floor(Math.random() * 5) + 1} years</td>
                      <td className={index % 2 === 0 ? 'positive' : 'negative'}>
                        {index % 2 === 0 ? '+' : '-'}{Math.floor(Math.random() * 5) + 1}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="chart-card">
              <h3>Department vs Status</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart
                    data={analyticsData.deptStatusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Active" name="Active" fill="#198754" stackId="a" />
                    <Bar dataKey="On Leave" name="On Leave" fill="#ffc107" stackId="a" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hiring' && (
          <div className="hiring-section">
            <div className="chart-card">
              <h3>Hiring Trends (Last 6 Months)</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={analyticsData.hiringData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="hires" 
                      name="New Hires" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hires" 
                      name="New Hires" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportsPage
