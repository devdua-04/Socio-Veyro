import React from 'react';
import { Download, RefreshCw, MapPin, Lightbulb, Target, Video, Zap, Calendar, Mic, BarChart } from 'lucide-react';
import { downloadPDF } from '../services/pdfService';

const RoadmapDisplay = ({ roadmapData, formData, onNewRoadmap }) => {
  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(roadmapData, formData);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  const moduleIcons = {
    0: MapPin,
    1: Target,
    2: Lightbulb,
    3: Video,
    4: Zap,
    5: BarChart,
    6: Mic,
    7: BarChart
  };

  const moduleColors = [
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600',
    'from-red-600 to-orange-500',
    'from-orange-600 to-red-500',
    'from-red-500 to-orange-600',
    'from-orange-500 to-red-600',
    'from-red-600 to-orange-600',
    'from-orange-600 to-red-600'
  ];

  const displayIndustry = formData.industry === 'Other' ? formData.customIndustry : formData.industry;

  const processContent = (content) => {
    if (!content) return '';
    
    let processedContent = content.replace(
      /<table[^>]*>/gi,
      '<div class="overflow-x-auto mb-6"><table class="min-w-full bg-gray-800/50 border border-gray-700 rounded-lg shadow-sm"'
    );
    
    processedContent = processedContent.replace(
      /<\/table>/gi,
      '</table></div>'
    );
    
    processedContent = processedContent.replace(
      /<th([^>]*)>/gi,
      '<th$1 class="px-2 sm:px-4 py-2 sm:py-3 bg-gray-700/50 border-b border-gray-600 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">'
    );
    
    processedContent = processedContent.replace(
      /<td([^>]*)>/gi,
      '<td$1 class="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-700 text-xs sm:text-sm text-gray-300">'
    );
    
    processedContent = processedContent.replace(
      /<h3([^>]*)>/gi,
      '<h3$1 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 mt-4 sm:mt-6">'
    );
    
    processedContent = processedContent.replace(
      /<h4([^>]*)>/gi,
      '<h4$1 class="text-base sm:text-lg font-semibold text-gray-200 mb-2 sm:mb-3 mt-3 sm:mt-4">'
    );
    
    processedContent = processedContent.replace(
      /<ul([^>]*)>/gi,
      '<ul$1 class="list-disc list-inside mb-3 sm:mb-4 space-y-1 sm:space-y-2">'
    );
    
    processedContent = processedContent.replace(
      /<ol([^>]*)>/gi,
      '<ol$1 class="list-decimal list-inside mb-3 sm:mb-4 space-y-1 sm:space-y-2">'
    );
    
    processedContent = processedContent.replace(
      /<li([^>]*)>/gi,
      '<li$1 class="text-gray-300 text-sm sm:text-base">'
    );
    
    processedContent = processedContent.replace(
      /<p([^>]*)>/gi,
      '<p$1 class="text-gray-300 mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base">'
    );
    
    processedContent = processedContent.replace(
      /<strong([^>]*)>/gi,
      '<strong$1 class="font-semibold text-white">'
    );
    
    return processedContent;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900/50 rounded-2xl shadow-2xl border border-red-900/30 mb-6 sm:mb-8 overflow-hidden backdrop-blur-sm">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 sm:p-6 lg:p-8 shadow-lg shadow-red-500/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 break-words">
                Social Media Roadmap for {formData.brandName}
              </h1>
              <p className="text-red-100 text-sm sm:text-base lg:text-lg break-words">
                Comprehensive strategy blueprint for {displayIndustry}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <button
                onClick={handleDownloadPDF}
                className="bg-white text-red-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={onNewRoadmap}
                className="bg-red-500 bg-opacity-20 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <RefreshCw className="h-4 w-4" />
                <span>New Roadmap</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-center">
            <div>
              <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Target Audience</h3>
              <p className="text-gray-400 text-xs sm:text-sm break-words">
                {formData.targetAudience.length > 100 
                  ? `${formData.targetAudience.slice(0, 100)}...` 
                  : formData.targetAudience
                }
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Primary Goals</h3>
              <p className="text-gray-400 text-xs sm:text-sm break-words">
                {formData.goals.length > 100 
                  ? `${formData.goals.slice(0, 100)}...` 
                  : formData.goals
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8" id="roadmap-content">
        {roadmapData.modules?.map((module, index) => {
          const IconComponent = moduleIcons[index];
          const colorClass = moduleColors[index];
          
          return (
            <div key={index} className="bg-gray-900/50 rounded-2xl shadow-2xl border border-red-900/30 overflow-hidden backdrop-blur-sm">
              <div className={`bg-gradient-to-r ${colorClass} p-4 sm:p-6 shadow-lg shadow-red-500/20`}>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                      Module {index + 1}
                    </h2>
                    <h3 className="text-base sm:text-lg lg:text-xl text-white opacity-90 break-words">
                      {module.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: processContent(module.content) }}
                    className="text-gray-300 leading-relaxed [&_table]:text-xs [&_table]:sm:text-sm [&_th]:text-xs [&_td]:text-xs [&_th]:sm:text-sm [&_td]:sm:text-sm"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 sm:p-8 mt-8 sm:mt-12 text-center shadow-2xl shadow-red-500/30">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Ready to Execute Your Strategy?
        </h3>
        <p className="text-red-100 mb-4 sm:mb-6 text-base sm:text-lg">
          Download your complete roadmap and start building your social media presence today!
        </p>
        <button
          onClick={handleDownloadPDF}
          className="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 flex items-center justify-center space-x-2 mx-auto"
        >
          <Download className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Get Your PDF Roadmap</span>
        </button>
      </div>
    </div>
  );
};

export default RoadmapDisplay;