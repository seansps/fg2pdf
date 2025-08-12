# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web application called "Fantasy Grounds PDF Generator" that converts Fantasy Grounds Unity character XML files into PDF character sheets. The application supports multiple tabletop RPG systems:

- **D&D 5th Edition**: Generates multi-page character sheets with attributes, skills, features, inventory, notes, adventure log, and actions
- **Dungeon Crawl Classics (DCC)**: Similar structure to 5e but with DCC-specific layouts and components
- **Cyberpunk RED**: Fills a pre-existing PDF form with character data using pdf-lib

## Development Commands

```bash
# Install dependencies
yarn install

# Start development server
yarn start
# Navigate to http://localhost:3000

# Build for production
yarn run build

# Run tests
yarn test

# Eject from create-react-app (irreversible)
yarn run eject
```

Note: All react-scripts commands use `--openssl-legacy-provider` flag due to Node.js compatibility requirements.

## Architecture

### Core Application Flow
1. **File Selection**: `FileSelector.tsx` handles XML file upload and system selection
2. **XML Processing**: Uses xml2js to parse Fantasy Grounds XML files into JavaScript objects
3. **System Routing**: Based on selected system, routes to appropriate character sheet component
4. **PDF Generation**: 
   - 5e/DCC: Renders HTML components for printing/PDF conversion
   - Cyberpunk RED: Fills PDF form fields using pdf-lib and downloads directly

### Key Components Structure

```
src/components/
├── 5e/                    # D&D 5th Edition components
│   ├── CharacterSheet.tsx # Main container with multi-page layout
│   ├── CharacterHeader.tsx
│   ├── AttibutesAndSkills.tsx
│   ├── Features.tsx
│   ├── Inventory.tsx
│   ├── Notes.tsx
│   ├── AdventureLog.tsx
│   └── Actions.tsx
├── dcc/                   # Dungeon Crawl Classics components
│   ├── CharacterSheet.tsx # Similar structure to 5e
│   └── Pages/             # Page-specific components
├── cyberpunkred/
│   └── fillForm.ts        # PDF form filling logic
└── FileSelector.tsx       # File upload and system selection
```

### Data Processing

- **XML Structure**: Fantasy Grounds XML files have nested structure accessed via `characterData.root.character[0]`
- **Value Extraction**: Use `getValue()` utility from `src/utils/getValue.ts` to safely extract field values from XML structure
- **System Detection**: Each system has different XML structures and fields

### PDF Handling

- **Cyberpunk RED**: Uses pdf-lib to fill form fields in `public/pdf/CyberpunkRed.pdf`
- **5e/DCC**: Components render to HTML for browser-based PDF generation
- **Downloads**: Cyberpunk RED downloads filled PDFs directly via downloadjs

## Development Notes

- Uses TypeScript with React 18
- XML parsing handled by xml2js library
- Legacy OpenSSL provider required for build process
- Static PDF template stored in public/pdf/ directory
- Character data structure varies significantly between game systems
- pdf-lib used for programmatic PDF form filling (Cyberpunk RED only)