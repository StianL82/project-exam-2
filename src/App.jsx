import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Venues from './pages/Venues';
import Venue from './pages/Venue';
import Profile from './pages/Profile';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/Venue/:id" element={<Venue />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
