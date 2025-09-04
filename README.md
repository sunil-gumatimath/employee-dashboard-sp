# Employee Management Dashboard

A modern, responsive web application for managing employee data, built with React and Vite. This dashboard provides comprehensive tools for HR professionals to track employee information, generate reports, and monitor organizational metrics.

## 🚀 Features

### Dashboard
- **Real-time Statistics**: Total employees, active employees, new hires, and department counts
- **Performance Metrics**: Project completion, resource utilization, and employee satisfaction tracking
- **Recent Activity Feed**: Live updates on employee actions and organizational events
- **Visual Progress Bars**: Interactive metrics with color-coded progress indicators

### Employee Management
- **Employee Directory**: Complete list of all employees with search and filter capabilities
- **Detailed Profiles**: Individual employee pages with comprehensive information
- **Department Organization**: Employees organized by departments for easy management
- **Status Tracking**: Monitor employee status (Active, On Leave, etc.)

### Advanced Reporting
- **Interactive Charts with Recharts**: Professional visualization library with tooltips and responsive containers
  - Bar charts for department distribution
  - Pie charts for employee status breakdown
  - Line charts with area fill for hiring trends analysis
- **Summary Dashboard Cards**: Key metrics display including total employees, active employees, on leave, and average tenure
- **Real-time Smart Filtering**: Dual filtering system for department and date range with dynamic data updates
- **Comprehensive Department Analytics**: Detailed distribution and performance metrics across all departments
- **Historical Hiring Trends**: Timeline visualization of recruitment patterns and growth patterns
- **Employee Status Tracking**: Real-time monitoring of employee status categories
- **CSV Export Functionality**: One-click export of complete report data including metrics, charts, and filtered datasets

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1 with modern hooks and functional components
- **Routing**: React Router DOM 7.8.2 for client-side navigation
- **Build Tool**: Vite 7.1.2 for fast development and optimized production builds
- **Charts**: Recharts 3.1.2 for interactive data visualizations
- **Styling**: CSS modules and responsive design principles
- **Linting**: ESLint with React-specific rules
- **Type Safety**: TypeScript definitions for better development experience

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## 🏗️ Project Structure

```
react-app/
├── public/                 # Static assets
└── src/
│   ├── assets/             # Images, icons, and other static assets
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React contexts for state management
│   ├── layouts/            # Page layout components
│   │   ├── auth/          # Authentication layouts
│   │   └── dashboard/     # Main dashboard layout
│   ├── pages/              # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── employees/     # Employee management pages
│   │   ├── reports/       # Reports and analytics
│   │   └── settings/      # Application settings
│   ├── services/           # API services and data management
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── .gitignore              # Git ignore patterns
├── eslint.config.js        # ESLint configuration
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
├── CHANGELOG.md            # Development changelog and improvement notes
└── vite.config.js          # Vite configuration
```

## 🎯 Usage

### Navigation
- **Dashboard**: Overview of key metrics and recent activity
- **Employees**: Browse and manage employee information with filtering capabilities
- **Reports**: Generate and export detailed analytics with various chart types
- **Settings**: Configure application preferences (implementation pending)

### Reports
1. Navigate to the Reports page from the main navigation
2. Use the department dropdown to filter by specific departments
3. Select a date range using the date range selector for temporal filtering
4. Switch between tabbed report views:
   - **Overview**: Summary cards with key metrics and combined charts
   - **Departments**: Detailed department-specific statistics and breakdowns
   - **Hiring Trends**: Historical hiring data and timeline visualizations
5. Interact with charts by hovering for detailed tooltips and information
6. Export complete report data as CSV files with a single click

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Development Notes

- Built with modern React patterns and hooks
- Uses CSS for styling with responsive design principles
- Implements responsive design for multiple device sizes
- Follows ESLint configuration for code quality
- Supports hot module replacement during development

## 🔧 Recent Improvements

### Reports Page Enhancements
- **Bug Fix**: Resolved syntax error in ReportsPage.jsx causing "Unterminated string constant" error by properly escaping string literals
- **Professional Charting**: Integrated Recharts library for enhanced data visualization capabilities
- **Summary Cards**: Added metric cards displaying total employees, active employees, on leave count, and average tenure
- **Interactive Visualization Suite**:
  - Bar charts for department-wise employee distribution
  - Pie charts for employee status categories (Active, On Leave, etc.)
  - Line charts with area fill for hiring trend analysis
  - Responsive containers with hover tooltips and interactive legends
- **Advanced Filtering System**: Dual filtering by department selection and date range with real-time data updates
- **Responsive Design Updates**: Improved mobile experience with flexible grid layouts and screen-size adaptations
- **Export Capabilities**: One-click CSV export functionality for complete report datasets
- **User Experience**: Clean, modern interface with visual hierarchy and intuitive navigation

### Technical Implementation Details
- Utilized React hooks for efficient state management
- Responsive design implemented with CSS Grid and Flexbox
- Created reusable components for code consistency and maintenance

For more information about the build setup, see the [Vite documentation](https://vitejs.dev/).