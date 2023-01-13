import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        {/* <Route path="/:id" element={<Detail />}></Route> */}
      </Routes>
    </Router> 
    );
}

export default App;
