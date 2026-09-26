import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './site.css';
import LandingPage from './LandingPage';
import LandingPage2 from './LandingPage2';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/enroll" element={<LandingPage2 />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
