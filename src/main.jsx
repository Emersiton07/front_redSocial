import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MAP from "../src/assets/components/page_map";
import SocialPage from "../src/assets/components/SocialPage"; 
import Login from "../src/assets/components/Login";
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>       
        <Route path="/map" element={<MAP />} />
        <Route path="/socialpage" element={<SocialPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
