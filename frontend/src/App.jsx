import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import Splash from './pages/Splash';
import Language from './pages/Language';
import Login from './pages/Login';
import Profession from './pages/Profession';
import Interests from './pages/Interests';
import Voice from './pages/Voice';
import Time from './pages/Time';
import Notification from './pages/Notification';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import AllSet from './pages/AllSet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/language" element={<Language />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profession" element={<Profession />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/time" element={<Time />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/all-set" element={<AllSet />} />
          
          {/* Main App Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/billing" element={<Billing />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;