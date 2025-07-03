import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { 
  addIdea, 
  getAllIdeas, 
  updateIdea, 
  deleteIdea, 
  getIdeasForDate
} from '../services/database.js';

const ContentCalendar = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateIdeas, setSelectedDateIdeas] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    time: '09:00',
    platform: 'LinkedIn',
    contentType: 'Post'
  });

  const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'YouTube', 'TikTok', 'Facebook'];
  const contentTypes = ['Post', 'Story', 'Reel', 'Video', 'Carousel', 'Live'];

  useEffect(() => {
    loadIdeas();
  }, []);

  useEffect(() => {
    loadSelectedDateIdeas();
  }, [selectedDate, ideas]);

  const loadIdeas = async () => {
    const allIdeas = await getAllIdeas();
    setIdeas(allIdeas);
  };

  const loadSelectedDateIdeas = async () => {
    const dateIdeas = await getIdeasForDate(selectedDate);
    setSelectedDateIdeas(dateIdeas);
  };

  const handleAddIdea = async (e) => {
    e.preventDefault();
    if (!newIdea.title) return;

    const scheduledDateTime = new Date(selectedDate);
    const [hours, minutes] = newIdea.time.split(':');
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

    await addIdea({
      ...newIdea,
      scheduledDate: scheduledDateTime
    });
    
    setNewIdea({
      title: '',
      description: '',
      time: '09:00',
      platform: 'LinkedIn',
      contentType: 'Post'
    });
    setShowAddForm(false);
    await loadIdeas();
  };

  const handleUpdateIdea = async (id, updates) => {
    const scheduledDateTime = new Date(selectedDate);
    const [hours, minutes] = updates.time.split(':');
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

    await updateIdea(id, {
      ...updates,
      scheduledDate: scheduledDateTime
    });
    setEditingId(null);
    await loadIdeas();
  };

  const handleDeleteIdea = async (id) => {
    if (window.confirm('Delete this idea?')) {
      await deleteIdea(id);
      await loadIdeas();
    }
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getIdeasForCalendarDate = (date) => {
    return ideas.filter(idea => {
      const ideaDate = new Date(idea.scheduledDate);
      return ideaDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelectedDate = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    const dayHeaders = dayNames.map(day => (
      <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-400 bg-gray-800/50">
        {day}
      </div>
    ));

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1 sm:p-2 bg-gray-900/30 min-h-[60px] sm:min-h-[80px]"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayIdeas = getIdeasForCalendarDate(date);
      const isCurrentDay = isToday(date);
      const isSelected = isSelectedDate(date);

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] border border-gray-700/50 cursor-pointer transition-all duration-300 hover:bg-red-900/20 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 ${
            isCurrentDay ? 'bg-orange-900/30 border-orange-500/50 shadow-lg shadow-orange-500/20' : 'bg-gray-900/30'
          } ${isSelected ? 'bg-red-900/30 border-red-500/50 shadow-lg shadow-red-500/20' : ''}`}
        >
          <div className={`text-xs sm:text-sm font-medium mb-1 ${
            isCurrentDay ? 'text-orange-400' : isSelected ? 'text-red-400' : 'text-gray-300'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayIdeas.slice(0, 2).map((idea, index) => (
              <div
                key={index}
                className="text-xs bg-red-600/20 text-red-300 border border-red-500/30 px-1 py-0.5 rounded truncate shadow-sm"
                title={idea.title}
              >
                {idea.title}
              </div>
            ))}
            {dayIdeas.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayIdeas.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-700/50 rounded-lg overflow-hidden shadow-2xl shadow-red-500/10">
        {dayHeaders}
        {days}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2">
          <div className="bg-gray-900/50 rounded-2xl shadow-2xl border border-red-900/30 overflow-hidden backdrop-blur-sm">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 sm:p-6 shadow-lg shadow-red-500/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Content Calendar</h1>
                    <p className="text-red-100 text-sm">Click on any date to add content</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <h2 className="text-lg sm:text-xl font-semibold text-white min-w-[180px] sm:min-w-[200px] text-center">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-3 sm:p-6 bg-gray-800/30">
              {renderCalendar()}
            </div>
          </div>
        </div>

        {/* Selected Date Panel */}
        <div className="space-y-4 sm:space-y-6">
          {/* Selected Date Info */}
          <div className="bg-gray-900/50 rounded-2xl shadow-2xl border border-red-900/30 p-4 sm:p-6 backdrop-blur-sm">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 break-words">
              {formatDate(selectedDate)}
            </h3>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 sm:py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 mb-3 sm:mb-4 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-[1.02] text-sm sm:text-base"
            >
              <Plus className="h-4 w-4" />
              <span>Add Content</span>
            </button>

            {/* Add Form */}
            {showAddForm && (
              <form onSubmit={handleAddIdea} className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-lg shadow-red-500/10">
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  placeholder="Content title"
                  required
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base"
                />
                
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base resize-none"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newIdea.platform}
                    onChange={(e) => setNewIdea({ ...newIdea, platform: e.target.value })}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white text-sm sm:text-base"
                  >
                    {platforms.map(platform => (
                      <option key={platform} value={platform} className="bg-gray-800">{platform}</option>
                    ))}
                  </select>
                  
                  <select
                    value={newIdea.contentType}
                    onChange={(e) => setNewIdea({ ...newIdea, contentType: e.target.value })}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white text-sm sm:text-base"
                  >
                    {contentTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">{type}</option>
                    ))}
                  </select>
                </div>
                
                <input
                  type="time"
                  value={newIdea.time}
                  onChange={(e) => setNewIdea({ ...newIdea, time: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white text-sm sm:text-base"
                />
                
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/20 text-sm sm:text-base"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-600 text-gray-200 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Ideas for Selected Date */}
            <div className="space-y-3">
              <h4 className="font-medium text-white text-sm sm:text-base">
                Content ({selectedDateIdeas.length})
              </h4>
              
              {selectedDateIdeas.length === 0 ? (
                <p className="text-gray-400 text-xs sm:text-sm">No content scheduled</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedDateIdeas.map((idea) => (
                    <div key={idea.id} className="border border-gray-700/50 bg-gray-800/30 rounded-lg p-3 shadow-lg shadow-red-500/5 hover:shadow-red-500/10 transition-all duration-300">
                      {editingId === idea.id ? (
                        <EditForm
                          idea={idea}
                          onSave={handleUpdateIdea}
                          onCancel={() => setEditingId(null)}
                          platforms={platforms}
                          contentTypes={contentTypes}
                        />
                      ) : (
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-white text-sm sm:text-base break-words flex-1 mr-2">{idea.title}</h5>
                            <div className="flex space-x-1 flex-shrink-0">
                              <button
                                onClick={() => setEditingId(idea.id)}
                                className="p-1 text-gray-400 hover:text-orange-400 transition-colors duration-300"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteIdea(idea.id)}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-300"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-red-600/20 text-red-300 border border-red-500/30 text-xs rounded-full">
                              {idea.platform}
                            </span>
                            <span className="px-2 py-1 bg-orange-600/20 text-orange-300 border border-orange-500/30 text-xs rounded-full">
                              {idea.contentType}
                            </span>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(idea.scheduledDate)}
                            </div>
                          </div>
                          
                          {idea.description && (
                            <p className="text-xs sm:text-sm text-gray-300 break-words">{idea.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditForm = ({ idea, onSave, onCancel, platforms, contentTypes }) => {
  const [editData, setEditData] = useState({
    title: idea.title,
    description: idea.description,
    time: new Date(idea.scheduledDate).toTimeString().slice(0, 5),
    platform: idea.platform,
    contentType: idea.contentType
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(idea.id, editData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={editData.title}
        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        required
        className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs sm:text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-white"
      />
      
      <textarea
        value={editData.description}
        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
        rows={2}
        className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs sm:text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 resize-none"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <select
          value={editData.platform}
          onChange={(e) => setEditData({ ...editData, platform: e.target.value })}
          className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs sm:text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-white"
        >
          {platforms.map(platform => (
            <option key={platform} value={platform} className="bg-gray-800">{platform}</option>
          ))}
        </select>
        
        <select
          value={editData.contentType}
          onChange={(e) => setEditData({ ...editData, contentType: e.target.value })}
          className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs sm:text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-white"
        >
          {contentTypes.map(type => (
            <option key={type} value={type} className="bg-gray-800">{type}</option>
          ))}
        </select>
      </div>
      
      <input
        type="time"
        value={editData.time}
        onChange={(e) => setEditData({ ...editData, time: e.target.value })}
        className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs sm:text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-white"
      />
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-1 shadow-lg hover:shadow-green-500/20"
        >
          <Save className="h-3 w-3" />
          <span>Save</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-gray-200 px-3 py-1 rounded text-xs sm:text-sm hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-1"
        >
          <X className="h-3 w-3" />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default ContentCalendar;