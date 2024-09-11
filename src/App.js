import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateStoryPage from './pages/CreateStoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompletedStoriesPage from './pages/CompletedStoriesPage';
import StoryPage from './pages/StoryPage';
import NavBar from './components/Navbar'; // Ensure you have a NavBar component

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-story" element={<CreateStoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/completed-stories" element={<CompletedStoriesPage />} />
        <Route path="/story/:storyId" element={<StoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;



