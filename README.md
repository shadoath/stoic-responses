# Stoic Mind AI

A Next.js application that provides Stoic philosophy-based responses to your questions. Ask any question and receive wisdom inspired by the great Stoic philosophers like Marcus Aurelius, Epictetus, and Seneca.

View it now at [stoicresponses.com](https://stoicresponses.com)

## Features

- **Two response modes:**
  - **Response**: Get advice from the perspective of Stoic philosophy
  - **Quote**: Receive relevant quotes from Stoic philosophers with context
- **Clean, intuitive interface** built with Material-UI
- **Real-time responses** powered by OpenAI's GPT-4
- **Responsive design** that works on desktop and mobile

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

## Tech Stack

- **Framework**: Next.js with TypeScript
- **UI**: Material-UI with custom theme
- **AI Integration**: OpenAI GPT-4 API
- **Analytics**: Vercel Analytics

## Deploy

Deploy easily with [Vercel](https://vercel.com/new) or any other Next.js hosting platform. Make sure to add your `OPENAI_API_KEY` environment variable in your deployment settings.
