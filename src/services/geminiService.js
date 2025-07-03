import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are a world-class social media strategist with experience managing viral campaigns and revenue-driving social media operations for startups, creators, and education-based brands.

I want you to generate a full-stack, execution-ready social media marketing blueprint for a product or personal brand.

The strategy should be so detailed that anyone can become a social media manager by following it. The structure should follow these 8 modules:

1. 📍 Audience and Platform Strategy:
Define the target audience clearly: age, goals, problems, location, content preference.

Pick 5-6 best social platforms to reach them (LinkedIn, YouTube, Instagram, TikTok, Twitter/X, Facebook, etc.).

IMPORTANT: Also consider niche platforms like Reddit, Telegram, Discord, Clubhouse, or specialized forums when they align with the target audience and industry. For example:
- Reddit for tech, gaming, finance, or niche communities
- Telegram for crypto, tech, or international audiences
- Discord for gaming, tech communities, or younger demographics
- Industry-specific forums and communities

For each platform, explain why it fits, what kind of content works, and list specific tactics.

CRITICAL: Include a comprehensive posting frequency and timing table with:
<table>
<thead>
<tr>
<th>Platform</th>
<th>Optimal Posting Times</th>
<th>Best Days</th>
<th>Posting Frequency</th>
<th>Peak Engagement Hours</th>
<th>Time Zone Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>LinkedIn</td>
<td>8-10 AM, 12-2 PM, 5-6 PM</td>
<td>Tuesday-Thursday</td>
<td>3-5 posts/week</td>
<td>8-9 AM, 12-1 PM</td>
<td>Business hours in target market</td>
</tr>
<tr>
<td>Instagram</td>
<td>11 AM-1 PM, 7-9 PM</td>
<td>Tuesday-Friday</td>
<td>4-7 posts/week</td>
<td>6-9 AM, 7-9 PM</td>
<td>Consider global audience</td>
</tr>
<tr>
<td>YouTube</td>
<td>2-4 PM, 6-9 PM</td>
<td>Thursday-Sunday</td>
<td>1-3 videos/week</td>
<td>7-9 PM weekdays</td>
<td>Evening entertainment time</td>
</tr>
<tr>
<td>TikTok</td>
<td>6-10 AM, 7-9 PM</td>
<td>Tuesday-Thursday</td>
<td>3-5 videos/week</td>
<td>6-9 AM, 7-9 PM</td>
<td>Commute and evening hours</td>
</tr>
<tr>
<td>Twitter/X</td>
<td>8-10 AM, 6-9 PM</td>
<td>Tuesday-Thursday</td>
<td>3-5 tweets/day</td>
<td>9 AM, 3 PM, 6 PM</td>
<td>News cycle timing</td>
</tr>
<tr>
<td>Facebook</td>
<td>1-3 PM, 7-9 PM</td>
<td>Tuesday-Thursday</td>
<td>3-5 posts/week</td>
<td>1-3 PM, 7-9 PM</td>
<td>Lunch and evening leisure</td>
</tr>
</tbody>
</table>

2. 💡 Brand Positioning and Profile Optimization:
Create a sample bio/headline for the brand on LinkedIn/Instagram/X.

Recommend profile picture styles, banner ideas, and an "About" section that builds trust.

Suggest proof-based elements (testimonials, stats, authority building).

3. 🎯 Content Themes and Weekly Content Plan:
Define at least 7 core content themes (e.g., success stories, behind-the-scenes, learning nuggets).

For each theme:
- Give 3 post examples with format (carousel, reel, text)
- Suggest AI tools/templates to make them fast
- Include optimal posting times for each content type

Generate a comprehensive weekly content calendar with specific posting schedule:
<table>
<thead>
<tr>
<th>Day</th>
<th>Time</th>
<th>Platform</th>
<th>Content Type</th>
<th>Theme</th>
<th>Caption Example</th>
<th>Hashtags</th>
</tr>
</thead>
<tbody>
<tr>
<td>Monday</td>
<td>8:00 AM</td>
<td>LinkedIn</td>
<td>Carousel</td>
<td>Industry Insights</td>
<td>5 trends shaping [industry] in 2024...</td>
<td>#Industry #Trends #Business</td>
</tr>
<tr>
<td>Monday</td>
<td>7:00 PM</td>
<td>Instagram</td>
<td>Reel</td>
<td>Behind the Scenes</td>
<td>Monday motivation: Here's how we...</td>
<td>#MondayMotivation #BTS #Startup</td>
</tr>
</tbody>
</table>

Include a detailed posting frequency breakdown:
<table>
<thead>
<tr>
<th>Platform</th>
<th>Daily Posts</th>
<th>Weekly Posts</th>
<th>Monthly Posts</th>
<th>Content Mix</th>
<th>Optimal Duration</th>
</tr>
</thead>
<tbody>
<tr>
<td>LinkedIn</td>
<td>0-1</td>
<td>3-5</td>
<td>15-20</td>
<td>60% Educational, 30% Personal, 10% Promotional</td>
<td>Text: 150-300 words, Video: 30-90 sec</td>
</tr>
<tr>
<td>Instagram</td>
<td>1-2</td>
<td>4-7</td>
<td>20-30</td>
<td>40% Educational, 40% Entertainment, 20% Promotional</td>
<td>Reels: 15-30 sec, Posts: Visual + caption</td>
</tr>
</tbody>
</table>

4. 📹 Video + Carousel Creation Toolkit:
Suggest the best tools for:
- Video editing (CapCut, OpusClip, DaVinci Resolve)
- Graphic creation (Canva, Figma, Adobe Creative Suite)
- Caption writing (Magic Write, Taplio, Copy.ai)
- Screen recording, voice-over, auto-subtitling
- Thumbnail creation and optimization

Add hacks for speed, quality, and repurposing content into multiple formats.

Include a content creation workflow with time estimates:
<table>
<thead>
<tr>
<th>Task</th>
<th>Tool</th>
<th>Time Required</th>
<th>Output</th>
<th>Repurposing Options</th>
</tr>
</thead>
<tbody>
<tr>
<td>Video Creation</td>
<td>CapCut</td>
<td>30-60 min</td>
<td>1 main video</td>
<td>3-5 short clips, audio podcast, blog post</td>
</tr>
<tr>
<td>Carousel Design</td>
<td>Canva</td>
<td>15-30 min</td>
<td>10-slide carousel</td>
<td>Individual posts, story highlights, PDF guide</td>
</tr>
</tbody>
</table>

5. 🧠 AI-Powered Workflow & Automation Plan:
Design a comprehensive workflow using:
- Taplio / Hypefury for hooks, captions, and reposts
- Metricool / Buffer / Hootsuite for scheduling
- OpusClip for AI repurposing videos
- Shield Analytics / Sprout Social for insights
- ChatGPT / Claude for content ideation

Create a detailed 5-minute daily task loop:
<table>
<thead>
<tr>
<th>Time</th>
<th>Task</th>
<th>Tool</th>
<th>Action</th>
<th>Expected Outcome</th>
</tr>
</thead>
<tbody>
<tr>
<td>1 min</td>
<td>Check Analytics</td>
<td>Metricool</td>
<td>Review yesterday's performance</td>
<td>Identify top-performing content</td>
</tr>
<tr>
<td>2 min</td>
<td>Engage</td>
<td>Native Apps</td>
<td>Reply to comments, like posts</td>
<td>Build community engagement</td>
</tr>
<tr>
<td>2 min</td>
<td>Schedule Content</td>
<td>Buffer</td>
<td>Queue next day's posts</td>
<td>Maintain consistent posting</td>
</tr>
</tbody>
</table>

Include weekly and monthly automation routines with specific timing.

6. 📈 Proof-Based and Value-Centric Growth Strategy:
Plan how to showcase results (e.g., "85% cracked interviews", or "10K in 30 days").

Include tactics like:
- Reverse-engineered problems
- Myth-busting content
- Weekly challenges
- User success panels
- Case studies and testimonials

Give engagement hacks like comment baiting, polls, Q&A loops, and community building.

Include growth metrics and KPIs to track:
<table>
<thead>
<tr>
<th>Metric</th>
<th>Target (Month 1)</th>
<th>Target (Month 3)</th>
<th>Target (Month 6)</th>
<th>Tracking Tool</th>
</tr>
</thead>
<tbody>
<tr>
<td>Followers</td>
<td>+500</td>
<td>+2,000</td>
<td>+5,000</td>
<td>Native Analytics</td>
</tr>
<tr>
<td>Engagement Rate</td>
<td>3-5%</td>
<td>5-8%</td>
<td>8-12%</td>
<td>Metricool</td>
</tr>
</tbody>
</table>

7. 🎤 Events, Lives, and Community Strategy:
Design a comprehensive plan for:
- LinkedIn Lives or IG Lives (frequency, topics, promotion)
- Community groups (Telegram, Discord, Reddit communities)
- Hosting events or masterclasses
- Webinars and workshops
- Podcast appearances

Include detailed scheduling recommendations:
<table>
<thead>
<tr>
<th>Event Type</th>
<th>Platform</th>
<th>Frequency</th>
<th>Best Time</th>
<th>Duration</th>
<th>Promotion Timeline</th>
</tr>
</thead>
<tbody>
<tr>
<td>LinkedIn Live</td>
<td>LinkedIn</td>
<td>Bi-weekly</td>
<td>Thursday 2-3 PM</td>
<td>30-45 min</td>
<td>1 week prior</td>
</tr>
<tr>
<td>Instagram Live</td>
<td>Instagram</td>
<td>Weekly</td>
<td>Tuesday 7-8 PM</td>
<td>20-30 min</td>
<td>3 days prior</td>
</tr>
<tr>
<td>Webinar</td>
<td>Zoom/Teams</td>
<td>Monthly</td>
<td>Wednesday 2-3 PM</td>
<td>60 min</td>
<td>2 weeks prior</td>
</tr>
</tbody>
</table>

8. 📊 Analytics & Optimization:
Define comprehensive KPIs: reach, engagement rate, follower growth, CTR, conversion rates, brand mentions.

Create a detailed weekly reporting format:
<table>
<thead>
<tr>
<th>Platform</th>
<th>Reach</th>
<th>Engagement Rate</th>
<th>Top Performing Content</th>
<th>Best Posting Time</th>
<th>Action Items</th>
</tr>
</thead>
<tbody>
<tr>
<td>LinkedIn</td>
<td>5,000</td>
<td>6.2%</td>
<td>Industry insights carousel</td>
<td>Tuesday 8 AM</td>
<td>Create more carousel content</td>
</tr>
<tr>
<td>Instagram</td>
<td>8,000</td>
<td>4.8%</td>
<td>Behind-the-scenes reel</td>
<td>Monday 7 PM</td>
<td>Increase BTS content</td>
</tr>
</tbody>
</table>

Include A/B testing strategies for:
- Posting times (test 3 different time slots for 2 weeks each)
- Content formats (carousel vs video vs text)
- Captions and hooks (test different opening lines)
- Hashtag strategies (branded vs trending vs niche)

📦 IMPORTANT FORMATTING REQUIREMENTS:
- Use HTML tables for ALL structured data (content calendars, platform comparisons, tool lists, posting schedules, etc.)
- Use proper table headers (<th>) and data cells (<td>)
- Include clear section headings with <h3> and <h4> tags
- Use bullet points (<ul><li>) for lists
- Use <strong> for emphasis on important points
- Structure content with proper HTML hierarchy

Deliver the output in a modular, well-formatted guide with clear sub-headings, tables, toolkits, and examples. Include hacks, AI tools, and case-style illustrations where possible.

Act like you're writing for someone who has zero marketing background but high intent to build a powerful social presence.`;

export const generateRoadmap = async (formData) => {
  try {
    // Validate API key format
    if (!formData.apiKey || !formData.apiKey.startsWith('AIza')) {
      throw new Error('Invalid API key format. Gemini API keys should start with "AIza"');
    }

    const genAI = new GoogleGenerativeAI(formData.apiKey.trim());
    
    // Use the correct model name for Gemini
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    const industry = formData.industry === 'Other' ? formData.customIndustry : formData.industry;

    const prompt = `${SYSTEM_PROMPT}

Brand Information:
- Brand Name: ${formData.brandName}
- Industry/Category: ${industry}
- Target Audience: ${formData.targetAudience}
- Goals: ${formData.goals}
- Experience Level: ${formData.experience || 'Not specified'}
${formData.additionalContext ? `- Additional Context: ${formData.additionalContext}` : ''}

IMPORTANT: Based on the industry "${industry}" and target audience, make sure to include relevant niche platforms like Reddit, Telegram, Discord, or specialized communities in Module 1 if they would be beneficial for growth. Consider the specific characteristics of this industry and audience when recommending platforms.

${formData.additionalContext ? `
CRITICAL: Pay special attention to the additional context provided: "${formData.additionalContext}". Use this information to:
1. Tailor platform recommendations more specifically
2. Create more relevant content themes and examples
3. Suggest industry-specific tools and tactics
4. Address any unique challenges or opportunities mentioned
5. Incorporate specific goals or features mentioned into the strategy
6. Make the roadmap more actionable based on their current situation
` : ''}

CRITICAL: Include comprehensive posting schedules with specific times, days, and frequencies for each platform. Make sure to include detailed tables for:
1. Platform-specific posting times and frequencies
2. Weekly content calendar with exact times
3. Content creation workflow with time estimates
4. Daily automation tasks with timing
5. Event scheduling with optimal times
6. Analytics reporting format

Please generate a comprehensive 8-module roadmap specifically tailored to this brand. Format the response with proper HTML structure including detailed tables for all scheduling and timing information.

Return the response in this JSON format:
{
  "modules": [
    {
      "title": "Audience and Platform Strategy",
      "content": "<h3>Target Audience Analysis</h3><p>...</p><h4>Platform Recommendations</h4><table><thead><tr><th>Platform</th><th>Why It Fits</th><th>Content Type</th><th>Key Tactics</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>Posting Frequency and Best Times</h4><table><thead><tr><th>Platform</th><th>Optimal Posting Times</th><th>Best Days</th><th>Posting Frequency</th><th>Peak Engagement Hours</th><th>Time Zone Notes</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "Brand Positioning and Profile Optimization",
      "content": "<h3>Brand Positioning</h3><p>...</p><h4>Sample Bios</h4><table><thead><tr><th>Platform</th><th>Sample Bio</th><th>Key Elements</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "Content Themes and Weekly Content Plan",
      "content": "<h3>Content Themes</h3><table><thead><tr><th>Theme</th><th>Description</th><th>Post Examples</th><th>AI Tools</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>Weekly Content Calendar</h4><table><thead><tr><th>Day</th><th>Time</th><th>Platform</th><th>Content Type</th><th>Theme</th><th>Caption Example</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>Posting Frequency Breakdown</h4><table><thead><tr><th>Platform</th><th>Daily Posts</th><th>Weekly Posts</th><th>Monthly Posts</th><th>Content Mix</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "Video + Carousel Creation Toolkit",
      "content": "<h3>Tool Recommendations</h3><table><thead><tr><th>Category</th><th>Tool</th><th>Purpose</th><th>Key Features</th><th>Pricing</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>Content Creation Workflow</h4><table><thead><tr><th>Task</th><th>Tool</th><th>Time Required</th><th>Output</th><th>Repurposing Options</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "AI-Powered Workflow & Automation Plan",
      "content": "<h3>Automation Workflow</h3><table><thead><tr><th>Step</th><th>Tool</th><th>Action</th><th>Time Required</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>5-Minute Daily Loop</h4><table><thead><tr><th>Time</th><th>Task</th><th>Tool</th><th>Action</th><th>Expected Outcome</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "Proof-Based and Value-Centric Growth Strategy",
      "content": "<h3>Growth Tactics</h3><table><thead><tr><th>Tactic</th><th>Implementation</th><th>Expected Result</th><th>Timeline</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>Growth Metrics & KPIs</h4><table><thead><tr><th>Metric</th><th>Target (Month 1)</th><th>Target (Month 3)</th><th>Target (Month 6)</th><th>Tracking Tool</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "Events, Lives, and Community Strategy",
      "content": "<h3>Event Strategy</h3><table><thead><tr><th>Event Type</th><th>Platform</th><th>Frequency</th><th>Best Time</th><th>Duration</th><th>Promotion Timeline</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    },
    {
      "title": "Analytics & Optimization",
      "content": "<h3>KPI Dashboard</h3><table><thead><tr><th>Metric</th><th>Target</th><th>Tracking Tool</th><th>Review Frequency</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table><h4>Weekly Reporting Format</h4><table><thead><tr><th>Platform</th><th>Reach</th><th>Engagement Rate</th><th>Top Performing Content</th><th>Best Posting Time</th><th>Action Items</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>..."
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response) {
      throw new Error('No response received from Gemini API');
    }

    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    
    // Try to parse JSON response, fallback to structured parsing if needed
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return parseTextResponse(text);
      }
    } catch (parseError) {
      console.warn('JSON parsing failed, using text parser:', parseError);
      return parseTextResponse(text);
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Invalid API key. Please check your Gemini API key and try again.');
    } else if (error.message?.includes('PERMISSION_DENIED')) {
      throw new Error('Permission denied. Please ensure your API key has access to the Gemini API.');
    } else if (error.message?.includes('QUOTA_EXCEEDED')) {
      throw new Error('API quota exceeded. Please check your Gemini API usage limits.');
    } else if (error.message?.includes('MODEL_NOT_FOUND')) {
      throw new Error('Model not found. The Gemini model may not be available in your region.');
    } else if (error.message?.includes('Invalid API key format')) {
      throw error; // Re-throw our custom validation error
    } else {
      throw new Error(`Failed to generate roadmap: ${error.message || 'Unknown error occurred'}`);
    }
  }
};

const parseTextResponse = (text) => {
  const modules = [
    { title: "Audience and Platform Strategy", content: "" },
    { title: "Brand Positioning and Profile Optimization", content: "" },
    { title: "Content Themes and Weekly Content Plan", content: "" },
    { title: "Video + Carousel Creation Toolkit", content: "" },
    { title: "AI-Powered Workflow & Automation Plan", content: "" },
    { title: "Proof-Based and Value-Centric Growth Strategy", content: "" },
    { title: "Events, Lives, and Community Strategy", content: "" },
    { title: "Analytics & Optimization", content: "" }
  ];

  // Split content by modules and assign to appropriate sections
  const sections = text.split(/(?=Module \d+|##?\s*\d+|📍|💡|🎯|📹|🧠|📈|🎤|📊)/i);
  
  sections.forEach((section, index) => {
    if (index < modules.length && section.trim()) {
      // Clean up the content and format it properly with enhanced table structure
      let content = section
        .replace(/Module \d+:?\s*/i, '')
        .replace(/##?\s*\d+\.?\s*/g, '')
        .trim();
      
      // Convert simple lists to comprehensive tables where appropriate
      content = formatContentWithEnhancedTables(content, index);
      
      if (content) {
        modules[index].content = content;
      }
    }
  });

  // If modules are still empty, try a different parsing approach
  if (modules.every(module => !module.content)) {
    const fallbackContent = formatContentWithEnhancedTables(text, 0);
    modules[0].content = fallbackContent;
  }

  return { modules };
};

const formatContentWithEnhancedTables = (content, moduleIndex) => {
  // Convert markdown-style content to HTML with tables
  let formatted = content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Add comprehensive table structures based on module type
  if (moduleIndex === 0) { // Platform Strategy
    formatted = `
      <h3>Platform Strategy & Posting Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Optimal Times</th>
            <th>Best Days</th>
            <th>Frequency</th>
            <th>Peak Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>LinkedIn</strong></td>
            <td>8-10 AM, 12-2 PM, 5-6 PM</td>
            <td>Tuesday-Thursday</td>
            <td>3-5 posts/week</td>
            <td>8-9 AM, 12-1 PM</td>
          </tr>
          <tr>
            <td><strong>Instagram</strong></td>
            <td>11 AM-1 PM, 7-9 PM</td>
            <td>Tuesday-Friday</td>
            <td>4-7 posts/week</td>
            <td>6-9 AM, 7-9 PM</td>
          </tr>
          <tr>
            <td><strong>YouTube</strong></td>
            <td>2-4 PM, 6-9 PM</td>
            <td>Thursday-Sunday</td>
            <td>1-3 videos/week</td>
            <td>7-9 PM weekdays</td>
          </tr>
          <tr>
            <td><strong>TikTok</strong></td>
            <td>6-10 AM, 7-9 PM</td>
            <td>Tuesday-Thursday</td>
            <td>3-5 videos/week</td>
            <td>6-9 AM, 7-9 PM</td>
          </tr>
          <tr>
            <td><strong>Twitter/X</strong></td>
            <td>8-10 AM, 6-9 PM</td>
            <td>Tuesday-Thursday</td>
            <td>3-5 tweets/day</td>
            <td>9 AM, 3 PM, 6 PM</td>
          </tr>
        </tbody>
      </table>
      <div>${formatted}</div>
    `;
  } else if (moduleIndex === 2) { // Content Calendar
    formatted = `
      <h3>Weekly Content Calendar</h3>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Platform</th>
            <th>Content Type</th>
            <th>Theme</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>8:00 AM</td>
            <td>LinkedIn</td>
            <td>Carousel</td>
            <td>Industry Insights</td>
          </tr>
          <tr>
            <td>Monday</td>
            <td>7:00 PM</td>
            <td>Instagram</td>
            <td>Reel</td>
            <td>Behind the Scenes</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>9:00 AM</td>
            <td>Twitter/X</td>
            <td>Thread</td>
            <td>Tips & Tricks</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>12:00 PM</td>
            <td>LinkedIn</td>
            <td>Text Post</td>
            <td>Personal Story</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>6:00 PM</td>
            <td>YouTube</td>
            <td>Tutorial Video</td>
            <td>Educational Content</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>8:00 PM</td>
            <td>Instagram</td>
            <td>Story + Post</td>
            <td>Week Recap</td>
          </tr>
        </tbody>
      </table>
      <div>${formatted}</div>
    `;
  }

  return `<div>${formatted}</div>`;
};