import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InternDashboard from './pages/InternDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import { useStore } from './store/useStore';

function App() {
  const role = useStore(state => state.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/intern/*"
          element={role ? <InternDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/coordinator/*"
          element={role ? <CoordinatorDashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
