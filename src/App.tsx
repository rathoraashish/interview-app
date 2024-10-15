import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TestPage from './components/TestPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/test/:slug" element={<TestPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 text-center py-4 text-gray-600">
          © 2023 InterviewStack. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;