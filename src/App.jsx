import React, { useState } from 'react';
import Header from './components/Header';
import RoadmapForm from './components/RoadmapForm';
import RoadmapDisplay from './components/RoadmapDisplay';
import ContentCalendar from './components/ContentCalendar';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [currentView, setCurrentView] = useState('roadmap');

  const handleRoadmapGenerated = (data, form) => {
    setRoadmapData(data);
    setFormData(form);
  };

  const handleNewRoadmap = () => {
    setRoadmapData(null);
    setFormData(null);
    setCurrentView('roadmap');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading && <LoadingSpinner />}
        
        {currentView === 'calendar' ? (
          <ContentCalendar />
        ) : (
          <>
            {!roadmapData && !loading && (
              <RoadmapForm 
                onRoadmapGenerated={handleRoadmapGenerated}
                setLoading={setLoading}
              />
            )}
            
            {roadmapData && !loading && (
              <RoadmapDisplay 
                roadmapData={roadmapData}
                formData={formData}
                onNewRoadmap={handleNewRoadmap}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;