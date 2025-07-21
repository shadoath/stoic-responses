# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js TypeScript application called "Stoic Mind AI" that provides an interface for asking questions and receiving Stoic philosophy-based responses or quotes. The app integrates with OpenAI's GPT-4 model to generate responses in two modes:
- **Response mode**: AI responds as a Stoic philosopher would
- **Quote mode**: Provides relevant quotes from Stoic philosophers with context

## Development Commands

```bash
# Development server
npm run dev

# Build for production  
npm run build

# Start production server
npm run start

# Type checking
npm run type-check
```

## Architecture

### Core Structure
- **Frontend**: React with Material-UI components, custom blue theme
- **Backend**: Next.js API routes handling OpenAI integration
- **State Management**: Local React state with useState hooks
- **Styling**: Material-UI with custom theme (`lib/theme.ts`)

### Key Components
- `pages/index.tsx`: Main UI with question input, mode toggle, and response display
- `pages/api/stoic/ai.ts`: API endpoint that handles both response modes via OpenAI
- `lib/openAi.ts`: OpenAI client configuration
- `pages/_app.tsx`: App wrapper with Material-UI theme and navigation

### API Integration
The app uses OpenAI's chat completions API with:
- Model: GPT-4
- Temperature: 0.7
- Max tokens: 210
- Different system prompts for response vs quote modes

## Environment Variables

Required environment variable:
- `OPENAI_API_KEY`: OpenAI API key for GPT-4 access

## TypeScript Configuration

The project uses TypeScript with relaxed settings (`strict: false`) and includes Material-UI type definitions. Type checking is available via `npm run type-check`.