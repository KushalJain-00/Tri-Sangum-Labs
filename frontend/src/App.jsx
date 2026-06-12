import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectFeed from './pages/ProjectFeed';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import Community from './pages/Community';
import Teams from './pages/Teams';
import Freelance from './pages/Freelance';
import Hiring from './pages/Hiring';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HomePage has its own nav, no Layout wrapper */}
        <Route path="/" element={<HomePage />} />
        
        {/* All other pages use the shared Layout */}
        <Route element={<Layout />}>
          <Route path="projects" element={<ProjectFeed />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="users/:username" element={<UserProfile />} />
          <Route path="community" element={<Community />} />
          <Route path="teams" element={<Teams />} />
          <Route path="freelance" element={<Freelance />} />
          <Route path="hiring" element={<Hiring />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
