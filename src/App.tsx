
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AllTasksOverview from './pages/AllTasksOverview';
import SkillsAssessment from './pages/SkillsAssessment';
import PerformanceReview from './pages/PerformanceReview';
import TeamCollaboration from './pages/TeamCollaboration';
import { AuthProvider } from './contexts/AuthContext';
import TeamPage from './components/TeamPage';
import ReportsPage from './components/ReportsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Index />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/all-tasks" element={<AllTasksOverview />} />
          <Route path="/skills-assessment" element={<SkillsAssessment />} />
          <Route path="/performance-review" element={<PerformanceReview />} />
          <Route path="/team-collaboration" element={<TeamCollaboration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
