import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VenueDetail from './pages/VenueDetail';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Timer from './pages/Timer';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venue/:id" element={<VenueDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
      <BottomNav />
    </HashRouter>
  );
}

export default App;
