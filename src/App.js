import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Dashboard from './components/layout/Dashboard';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
