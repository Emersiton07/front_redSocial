import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MAP from "../src/assets/components/page_map";
import SocialPage from "../src/assets/components/SocialPage"; // Tu nueva página
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MAP />} />
        <Route path="/socialpage" element={<SocialPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
