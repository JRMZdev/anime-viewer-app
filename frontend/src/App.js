import React from 'react';
import './styles/App.css';
import Home from './views/Home';
import './styles/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
          </Routes>
        </Router>

  );
}

export default App;
