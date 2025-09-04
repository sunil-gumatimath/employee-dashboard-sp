import { useParams } from 'react-router-dom'
import './EmployeeDetailsPage.css'

// Mock employee data with Indian names
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

const EmployeeDetailsPage = () => {
  const { id } = useParams()
  
  // Find the employee by ID or default to the first one
  const employee = mockEmployees.find(emp => emp.id === parseInt(id)) || mockEmployees[0]

  return (
    <div className="employee-details-page">
      <div className="employee-header">
        <div className="employee-basic-info">
          <div className="employee-avatar">
            <div className="avatar-placeholder">{employee.name.split(' ').map(n => n[0]).join('')}</div>
          </div>
          <div className="employee-name-role">
            <h2>{employee.name}</h2>
            <p className="employee-position">{employee.position}</p>
            <span className={`status-badge ${employee.status.toLowerCase()}`}>
              {employee.status}
            </span>
          </div>
        </div>
        <div className="employee-actions">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-primary">Message</button>
        </div>
      </div>

      <div className="employee-details-content">
        <div className="details-section">
          <h3>Contact Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <label>Email</label>
              <p>{employee.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{employee.phone}</p>
            </div>
            <div className="detail-item">
              <label>Address</label>
              <p>{employee.address}</p>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>Employment Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <label>Department</label>
              <p>{employee.department}</p>
            </div>
            <div className="detail-item">
              <label>Manager</label>
              <p>{employee.manager}</p>
            </div>
            <div className="detail-item">
              <label>Team</label>
              <p>{employee.team}</p>
            </div>
            <div className="detail-item">
              <label>Hire Date</label>
              <p>{employee.hireDate}</p>
            </div>
            <div className="detail-item">
              <label>Salary</label>
              <p>{employee.salary}</p>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {employee.skills.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetailsPage
