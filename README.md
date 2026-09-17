# WorkMate AI Assistant

Create a modern, professional, responsive web application called WorkMate AI – Workplace Assistant.

The application must have 4 main AI features:

✉️ Smart Email Generator

📝 Meeting Notes Summarizer

📅 AI Task Planner

🔎 AI Research Assistant

The application should be easy to use for students, employees, managers, and general workplace users.

1. Overall Design

Create a clean and professional dashboard with:

Left sidebar navigation on desktop

Collapsible/mobile navigation on smaller screens

Main content dashboard

Professional business-style UI

Responsive design for desktop, tablet, and mobile

Cards with icons for each feature

Clear buttons and input fields

AI-generated output sections

Loading states while generating responses

Copy-to-clipboard buttons

Clear/reset buttons

Friendly error messages

Responsible AI disclaimer

Use a modern layout with good spacing, rounded cards, readable typography, subtle shadows, and a professional colour scheme.

2. Dashboard

Create a homepage/dashboard with:

Header:
"Welcome to WorkMate AI"

Subtitle:
"Your intelligent assistant for everyday workplace tasks."

Display four feature cards:

Smart Email Generator

"Create professional emails in seconds."

Button:
"Generate Email"

Meeting Notes Summarizer

"Turn long meeting notes into clear summaries and action items."

Button:
"Summarize Notes"

AI Task Planner

"Organize, prioritize, and schedule your tasks."

Button:
"Plan My Tasks"

AI Research Assistant

"Research topics and turn information into useful insights."

Button:
"Start Research"

Clicking each card should open its corresponding feature.

3. SMART EMAIL GENERATOR ✉️

Create an email-generation page.

Include:

Input fields

Email Purpose
Example placeholder:
"e.g. Requesting leave from my manager"

Recipient
Example:
"e.g. Manager"

Key Information
Large textarea where the user explains what they want to communicate.

Tone
Create a dropdown with:

Formal

Friendly

Persuasive

Length
Dropdown:

Short

Medium

Detailed

Add a button:

Generate Email

AI Output

Display:

Generated Email

Show:

Subject:
[AI-generated subject]

Email Body:
[AI-generated email]

Add buttons:

Copy Email

Regenerate

Clear

The AI must create professional emails based only on information provided by the user.

Do not invent names, dates, company information, prices, or other important details.

If important information is missing, use neutral wording or ask the user for clarification.

4. MEETING NOTES SUMMARIZER 📝

Create a meeting notes page.

Include a large textarea:

Paste Your Meeting Notes

Placeholder:

"Paste your meeting notes here..."

Add an optional field:

Meeting Title

Add button:

Summarize Meeting

The AI output should be divided into four sections:

Meeting Summary

Provide a concise summary of the meeting.

Key Discussion Points

List the main topics discussed.

Decisions Made

List decisions that were actually mentioned in the notes.

Action Items

Display:

TaskResponsible PersonDeadline

Only include a responsible person or deadline if it was provided in the notes.

Important Dates

List important dates and deadlines mentioned in the notes.

Add buttons:

Copy Summary

Regenerate

Clear

The AI must never invent meeting decisions, names, responsibilities, or deadlines.

5. AI TASK PLANNER 📅

Create a task-planning page.

Allow the user to enter multiple tasks.

Include:

Task Name

Description

Deadline

Estimated Time

Priority

Priority options:

High

Medium

Low

Allow users to add multiple tasks using an:

+ Add Task

button.

Add:

Create My Schedule

The AI should:

Analyze the tasks.

Identify urgent tasks.

Prioritize tasks.

Consider deadlines.

Organize tasks logically.

Create a realistic daily or weekly schedule.

Avoid scheduling too many tasks at the same time.

Highlight urgent deadlines.

Display the result as:

My Priority List

PriorityTaskDeadline

Then:

Suggested Schedule

TimeTaskPriority

Then:

Planning Tips

Provide a few short suggestions for completing the tasks efficiently.

Add buttons:

Copy Schedule

Regenerate

Clear Tasks

The AI should not create unrealistic schedules. If there is insufficient information to estimate time, clearly state that an estimate has been made.

6. AI RESEARCH ASSISTANT 🔎

Create a research assistant page.

Include:

Research Topic

Large input field.

Placeholder:

"e.g. The impact of artificial intelligence in the workplace"

Include:

Research Depth

Options:

Quick Overview

Detailed Research

In-depth Analysis

Include:

What would you like to know?

Textarea where the user can enter specific questions.

Button:

Research Topic

AI Output

Display:

Research Overview

Provide a clear explanation of the topic.

Key Points

List the most important information.

Insights

Explain useful insights based on the information available.

Advantages and Disadvantages

Where appropriate, provide balanced advantages and disadvantages.

Recommendations

Provide practical recommendations when appropriate.

Sources / Verification

Clearly indicate sources when the AI has access to reliable sources.

Do not invent sources or citations.

If information may be outdated or uncertain, clearly tell the user that it should be verified.

Add:

Copy Research

Regenerate

Clear

7. RESPONSIBLE AI

Place a small disclaimer at the bottom of the application and on relevant feature pages:

"Responsible AI: WorkMate AI provides AI-generated assistance and information. Users should review and verify AI-generated content before using it for important workplace, employment, legal, financial, or other high-impact decisions."

The application must not present AI-generated information as guaranteed fact.

8. NAVIGATION

Create a sidebar containing:

🏠 Dashboard
✉️ Email Generator
📝 Meeting Summarizer
📅 Task Planner
🔎 Research Assistant

Include a clear active-state indicator showing which page is currently selected.

On mobile, convert the sidebar into a hamburger menu or mobile navigation drawer.

9. USER EXPERIENCE

Make the application very easy to use.

Every feature should follow this simple process:

Enter Information → Click Generate → AI Processes Request → Display Result

Include:

Loading animation/spinner

Disabled Generate button while processing

Error handling

Empty-state messages

Copy-to-clipboard functionality

Regenerate functionality

Clear/reset functionality

Show helpful placeholder examples inside input fields.

10. AI PROMPT ENGINEERING

Create separate AI instructions for each feature.

The AI should:

Follow the user's request accurately.

Use the information provided by the user.

Never deliberately fabricate information.

Ask for clarification when necessary.

Clearly identify uncertainty.

Use professional and easy-to-understand language.

Structure responses using headings, bullet points, and tables where appropriate.

The four AI tools should behave differently according to their purpose rather than using the same generic response.

11. TECHNICAL REQUIREMENTS

Build the application as a fully responsive web application.

Use:

React

TypeScript

Tailwind CSS

Modern component-based architecture

Keep the code clean, organized, and reusable.

Create reusable components for:

Sidebar

Header

Feature cards

Input fields

Buttons

AI output cards

Loading states

Error messages

Copy buttons

Make sure there are no broken links, buttons, or navigation elements.

All four features must be accessible from the dashboard.

12. FINAL GOAL

The final application should look like a real professional workplace productivity tool rather than a simple school project.

Prioritize:

Professional UI/UX

Easy navigation

Responsive design

Clear AI outputs

Good prompt engineering

Useful functionality

Responsible AI

Clean presentation

Application name:

WorkMate AI Your workplace Assistant.

Tagline:

"Work smarter. Communicate better. Get more done."

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://office-ai-mate.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fd7c8cc0-f9ba-4201-87f7-38d23b2bbf88).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
