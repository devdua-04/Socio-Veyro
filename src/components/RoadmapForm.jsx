import React, { useState } from 'react';
import { Send, Users, Building, AlertCircle, FileText } from 'lucide-react';
import { generateRoadmap } from '../services/geminiService';

import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

const industries = [
  "Technology/SaaS", "E-commerce/Retail", "Education/Online Courses",
  "Health/Fitness", "Finance/Fintech", "Creative/Design",
  "Consulting/Services", "Food/Restaurant", "Real Estate",
  "Personal Brand/Creator", "Gaming/Entertainment", "Travel/Tourism",
  "Beauty/Fashion", "Automotive", "Non-profit/Charity", "Other"
];

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

const RoadmapForm = ({ onRoadmapGenerated, setLoading }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    customIndustry: '',
    targetAudience: '',
    goals: '',
    experience: '',
    additionalContext: '',
    apiKey: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.apiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }

    if (formData.industry === 'Other' && !formData.customIndustry.trim()) {
      setError('Please specify your industry/category');
      return;
    }

    setLoading(true);
    try {
      const roadmap = await generateRoadmap(formData);
      onRoadmapGenerated(roadmap, formData);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setError(error.message || 'Failed to generate roadmap. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const dismissError = () => {
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4 sm:mb-6">
        <img
          src="/assets/Sv_wName.png"
          alt="Socio Veyro Logo"
          className="h-24 sm:h-40 w-auto mx-auto mb-2"
        />
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Design a Strategy as Bold as Your Brand.
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
          Build a focused, results-driven blueprint designed to elevate your brand across platforms.
           Socio-Veyro delivers a clear, 8-module roadmap that simplifies execution and ensures consistency —
           including targeted strategies for platforms like Reddit, Telegram, and more, whenever they align with your goals.
        </p>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3 shadow-lg shadow-red-500/10">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-red-400 font-medium mb-1">Error</h4>
            <p className="text-red-300 text-sm break-words">{error}</p>
          </div>
          <button
            onClick={dismissError}
            className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="bg-gray-900/50 rounded-2xl shadow-2xl border border-red-900/30 overflow-hidden backdrop-blur-sm">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 sm:p-6 shadow-lg shadow-red-500/20">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Brand Information</h3>
          <p className="text-red-100 text-sm sm:text-base">Tell us about your brand to get a personalized strategy</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <Building className="h-4 w-4 flex-shrink-0" />
                <span>Brand/Product Name *</span>
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="e.g., TechStartup Inc."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Industry/Category *</label>
              <Listbox value={formData.industry} onChange={(val) => setFormData({ ...formData, industry: val })}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-800/50 py-2 sm:py-3 px-4 text-left text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <span>{formData.industry || 'Select your industry'}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-800/90 border border-gray-700 py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm z-50">
                    {industries.map((industry, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4 ${active ? 'bg-red-600 text-white' : 'text-gray-200'}`
                        }
                        value={industry}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {industry}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 right-4 flex items-center text-red-300">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>

          {formData.industry === 'Other' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Specify Your Industry/Category *</label>
              <input
                type="text"
                name="customIndustry"
                value={formData.customIndustry}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="e.g., Pet Care, Agriculture, Legal Services, etc."
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>Target Audience *</span>
            </label>
            <textarea
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base resize-none"
              placeholder="Describe your ideal customers (age, profession, interests, pain points, etc.)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Primary Goals *</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base resize-none"
              placeholder="What do you want to achieve? (brand awareness, lead generation, sales, community building, etc.)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Social Media Experience</label>
            <Listbox value={formData.experience} onChange={(val) => setFormData({ ...formData, experience: val })}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-800/50 py-2 sm:py-3 px-4 text-left text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <span>{formData.experience || 'Select experience level'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-800/90 border border-gray-700 py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm z-50">
                  {experienceLevels.map((level, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${active ? 'bg-red-600 text-white' : 'text-gray-200'}`
                      }
                      value={level}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {level}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-4 flex items-center text-red-300">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span>Additional Context</span>
              <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="additionalContext"
              value={formData.additionalContext}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base resize-none"
              placeholder="Share any additional details about your product, brand, startup, or specific challenges you're facing."
            />
          </div>

          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 sm:p-6 shadow-lg shadow-orange-500/10">
            <h4 className="font-semibold text-orange-400 mb-3 text-sm sm:text-base">🔑 Gemini API Key Required</h4>
            <p className="text-xs sm:text-sm text-orange-300 mb-4">
              To generate your personalized roadmap, you'll need a Gemini API key.{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 underline hover:text-orange-300 transition-colors break-all"
              >
                Get your free API key here
              </a>
            </p>
            <div className="bg-orange-800/20 border border-orange-600/30 rounded-md p-3 mb-4">
              <p className="text-xs text-orange-300">
                <strong>Note:</strong> Make sure your API key has access to the Gemini Pro model and that you've enabled the Generative AI API in your Google Cloud Console.
              </p>
            </div>
            <input
              type="password"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-orange-600/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="Enter your Gemini API key (starts with AIza...)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-base sm:text-lg hover:from-red-700 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 flex items-center justify-center space-x-3"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Generate My Social Media Roadmap</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoadmapForm;
