# Social Media Roadmap Generator with Content Calendar

A comprehensive React application that generates AI-powered social media strategies and includes a content calendar for managing post ideas.

## Features

### 🎯 Roadmap Generator
- AI-powered social media strategy generation using Google's Gemini API
- Comprehensive 8-module roadmap covering all aspects of social media marketing
- Detailed posting schedules and optimal timing recommendations
- Platform-specific strategies (LinkedIn, Instagram, YouTube, TikTok, Twitter/X, Facebook, Reddit, Telegram)
- PDF export functionality

### 📅 Content Calendar
- Add and manage content ideas with scheduling
- Store data locally using IndexedDB (no backend required)
- Email reminders for upcoming content (powered by EmailJS)
- Edit and delete content ideas
- Visual indicators for overdue, today, and tomorrow content
- Support for multiple platforms and content types

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling and responsive design
- **Dexie.js** - IndexedDB wrapper for local data storage
- **EmailJS** - Frontend email service for reminders
- **Google Gemini AI** - AI-powered content generation
- **jsPDF & html2canvas** - PDF generation
- **Lucide React** - Icon library

## Setup Instructions

### 1. Clone and Install
```bash
npm install
```

### 2. Configure EmailJS (for Content Calendar reminders)
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{to_email}}`
   - `{{to_name}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{idea_count}}`
   - `{{idea_list}}`
4. Update `src/services/emailService.js` with your credentials:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   ```

### 3. Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Enter it in the application when generating roadmaps

### 4. Run the Application
```bash
npm run dev
```

## Usage

### Generating a Roadmap
1. Navigate to the "Roadmap" tab
2. Fill in your brand information
3. Enter your Gemini API key
4. Click "Generate My Social Media Roadmap"
5. Download the PDF when ready

### Managing Content Ideas
1. Navigate to the "Content Calendar" tab
2. Set up your email for reminders
3. Add content ideas with titles, descriptions, and scheduled dates
4. Use "Check Reminders" to test email notifications
5. Edit or delete ideas as needed

## Content Calendar Features

- **Local Storage**: All data is stored locally using IndexedDB
- **Email Reminders**: Get notified about content scheduled for tomorrow
- **Visual Indicators**: 
  - Red: Overdue content
  - Green: Content scheduled for today
  - Yellow: Content scheduled for tomorrow
- **Platform Support**: LinkedIn, Instagram, Twitter/X, YouTube, TikTok, Facebook, Reddit, Telegram
- **Content Types**: Post, Story, Reel, Video, Carousel, Live, Thread

## File Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation header
│   ├── RoadmapForm.jsx         # Roadmap generation form
│   ├── RoadmapDisplay.jsx      # Generated roadmap display
│   ├── ContentCalendar.jsx     # Content calendar interface
│   └── LoadingSpinner.jsx      # Loading component
├── services/
│   ├── geminiService.js        # AI roadmap generation
│   ├── pdfService.js           # PDF export functionality
│   ├── database.js             # IndexedDB operations
│   ├── emailService.js         # Email notification service
│   └── reminderService.js      # Reminder checking logic
└── App.jsx                     # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.#   S o c i o - V e y r o  
 