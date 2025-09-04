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

### Advanced Reporting
- **Interactive Charts**: Bar charts, pie charts, and line graphs using Recharts
- **Department Analytics**: Distribution and performance metrics by department
- **Hiring Trends**: Historical data visualization for recruitment insights
- **Employee Status Tracking**: Active, on leave, and other status categories
- **Dynamic Filtering**: Filter reports by department and date range
- **Export Functionality**: Download reports as CSV files

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
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components (Header, Sidebar)
│   │   ├── forms/         # Form components
│   │   └── ui/            # UI-specific components
│   ├── layouts/           # Page layout components
│   │   ├── auth/          # Authentication layouts
│   │   └── dashboard/     # Main dashboard layout
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── employees/     # Employee management pages
│   │   ├── reports/       # Reports and analytics
│   │   └── settings/      # Application settings
│   ├── services/          # API services and data management
│   ├── utils/             # Utility functions
│   ├── contexts/          # React contexts for state management
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🎯 Usage

### Navigation
- **Dashboard**: Overview of key metrics and recent activity
- **Employees**: Browse and manage employee information
- **Reports**: Generate and export detailed analytics
- **Settings**: Configure application preferences

### Reports
1. Navigate to the Reports page
2. Use department and date filters to customize data
3. View different chart types and metrics
4. Export data as CSV for external analysis

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
- Uses CSS modules for scoped styling
- Implements responsive design principles
- Follows ESLint configuration for code quality
- Supports hot module replacement during development

For more information about the build setup, see the [Vite documentation](https://vitejs.dev/).
